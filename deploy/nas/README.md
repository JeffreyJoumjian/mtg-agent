# mtg-agent on the NAS

The pilot's UGREEN NAS keeps the one working copy of this repo and runs the MTG Workbench all the
time. Claude Code on the PC and on the Mac edits that copy over SMB, so there's nothing to keep in
sync between machines, and the EDHPlay Lens extension always has a Workbench to send games to.

Two services run in one UGOS Docker project, both from the image in this folder (Bun at the
`mise.toml` version, plus git):

- **`mtg-workbench`** runs `bun run dev` in `apps/collection-visualizer`, so a file saved over SMB
  shows up straight away. The deck chat is off (`VITE_WORKBENCH_CHAT=off`), because this container
  has no Claude login. A local `bun run dev` on the PC or the Mac still has it.
- **`mtg-nightly`** commits `edhplay-data/` and pushes it to the private
  [mtg-agent-data](https://github.com/JeffreyJoumjian/mtg-agent-data) repo once a day after
  `SYNC_HOUR`, with the same `bun run games sync` as the terminal. It checks every 15 minutes, so a
  NAS that was off at that hour catches up when it's back. It writes `logs/nightly-sync.log` in the
  project folder.

Both containers start as root only to hand their own folders to `PUID:PGID`, then run as that user,
so every file they write stays editable over SMB (`run.sh`).

The proxy name and the GitHub token live in the project's `.env` on the NAS, not here, because this
repo is public.

## Deploy

1. **Make the project folder** on the docker share, e.g. `S:\mtg-agent` on the PC
   (`/volume1/docker/mtg-agent` on the NAS), and clone into it:

   ```bash
   git clone https://github.com/JeffreyJoumjian/mtg-agent.git /s/mtg-agent/repo
   git -C /s/mtg-agent/repo config core.autocrlf false
   git -C /s/mtg-agent/repo config core.eol lf
   git clone https://github.com/JeffreyJoumjian/mtg-agent-data.git /s/mtg-agent/repo/edhplay-data
   cp /s/mtg-agent/repo/deploy/nas/docker-compose.yaml /s/mtg-agent/
   cp /s/mtg-agent/repo/deploy/nas/.env.example /s/mtg-agent/.env
   mkdir -p /s/mtg-agent/logs
   ```

   `core.autocrlf false` matters because Windows and the Mac share this one checkout: Windows' default
   would rewrite files to CRLF, and the Mac would then see every file as changed.

2. **Fill in `.env`.** Take `TZ`, `PUID` and `PGID` from another project's `.env` on the share, set
   `WORKBENCH_ALLOWED_HOSTS` to the proxy name, and paste the GitHub token: a fine-grained token with
   Contents read and write on mtg-agent-data only.

3. **Create the project.** In the NAS web interface (not the Ugreen app), open Docker > Project >
   Create, name it `mtg-agent`, pick the project folder as its storage path, and start it. The first
   start builds the image and installs the Workbench's packages, which takes a few minutes and needs
   internet access. Then open `http://<NAS address>:3200`.

4. **Add the proxy name** in Nginx Proxy Manager, the same way as the other projects: a proxy host
   for the name in `WORKBENCH_ALLOWED_HOSTS`, forwarding to the NAS's LAN address on port 3200 over
   http, with Websockets Support on (Vite's live reload needs it) and the wildcard certificate.

5. **Point EDHPlay Lens at it.** Rebuild the extension (`bun run lens:build`), reload it, open
   Settings in its side panel, enter the Workbench's https address and press Save. Brave asks once
   whether Lens may reach that address.

6. **Point Claude Code at the NAS copy** on each machine (the PC through the mapped drive, the Mac
   through the mounted share). Git may refuse a repo on a network share owned by another user; add
   it once per machine:

   ```bash
   git config --global --add safe.directory '%(prefix)///SKYNAS/docker/mtg-agent/repo'
   ```

   Git on Windows names a mapped drive by its network path, so `S:/mtg-agent/repo` doesn't match;
   the error message prints the exact path to use. On the Mac, use the mounted path instead, e.g.
   `/Volumes/docker/mtg-agent/repo`. Do the same for `repo/edhplay-data`.

## After changing these files

- `docker-compose.yaml`: copy it into the project folder, then paste it into Docker > Project >
  mtg-agent > Edit, because UGOS keeps its own copy.
- `Dockerfile` or `run.sh`: restart the project. `pull_policy: build` rebuilds the image.
- The Workbench's packages: restart `mtg-workbench`, which runs `bun install --no-save` on every
  start.

## Notes

- Reachable from the home network only, with no login, like the other projects. Don't forward port
  3200 on the router. Away from home, use a VPN such as Tailscale.
- Anyone on the home network can open the Workbench and edit decks through it. The chat, which would
  spend the Claude subscription, is off.
- `git push` and `git commit` for the main repo still happen from the PC or the Mac, with their own
  GitHub sign-in. The NAS only pushes `edhplay-data`.
- `bun run games sync` from the PC or the Mac still works for an immediate push. Whoever runs it last
  writes their own path into `edhplay-data/.git/config` for the merge driver; `sync` rewrites it
  before every pull, so both sides keep working.
- The production build (`bun run build`) isn't used here: the Workbench runs its dev server.
