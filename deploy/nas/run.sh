#!/bin/sh
# Entry point for both mtg-agent services on the NAS (docker-compose.yaml next to this file):
#
#   run.sh workbench   installs the Workbench's packages and runs its dev server on port 3200
#   run.sh nightly     pushes edhplay-data to its private GitHub repo once a night
#
# Both start as root only to hand their own folders (the package volume, the log folder) to
# PUID:PGID, then run everything as that user, so every file they write on the share stays editable
# from the PC and the Mac over SMB.
set -eu

mode="${1:-}"
: "${PUID:?Set PUID in the project's .env}"
: "${PGID:?Set PGID in the project's .env}"

# HOME lives in the container, not on the share: Bun's package cache and the git config below.
export HOME=/tmp/home
mkdir -p "$HOME"
chown "$PUID:$PGID" "$HOME"

as_user() {
  setpriv --reuid="$PUID" --regid="$PGID" --clear-groups "$@"
}

case "$mode" in
  workbench)
    cd /repo/apps/collection-visualizer
    chown "$PUID:$PGID" node_modules
    # --host 0.0.0.0 so Nginx Proxy Manager (and the extension) can reach it from outside the
    # container. WORKBENCH_ALLOWED_HOSTS and VITE_WORKBENCH_CHAT come from the compose file.
    exec setpriv --reuid="$PUID" --regid="$PGID" --clear-groups \
      sh -c 'bun install && exec bun run dev --host 0.0.0.0'
    ;;

  nightly)
    : "${GITHUB_TOKEN:?Set GITHUB_TOKEN in the project's .env, a fine-grained token with Contents read and write on mtg-agent-data only}"
    hour="${SYNC_HOUR:-4}"
    log=/logs/nightly-sync.log
    last=/logs/last-sync
    mkdir -p /logs
    chown "$PUID:$PGID" /logs

    # The token stays in the environment: the credential helper reads it when git asks, so it never
    # lands in a file. safe.directory because the share's files may belong to another NAS user.
    as_user git config --global credential.helper \
      '!f() { echo username=x-access-token; echo "password=$GITHUB_TOKEN"; }; f'
    as_user git config --global --add safe.directory '*'
    as_user git config --global user.name "mtg-agent nightly sync"
    as_user git config --global user.email "nightly-sync@mtg-agent.invalid"

    # The same pattern as libcat's backup_loop: check every 15 minutes and run once a day after
    # SYNC_HOUR, so a NAS that was off at that hour catches up when it's back.
    # Text goes through stdin, never into a command string, so quotes in git's output can't break it.
    log_line() {
      printf '%s %s\n' "$(date '+%F %H:%M')" "$1" | as_user sh -c "cat >> $log"
    }

    log_line "Started. Syncs once a day after ${hour}:00."
    while true; do
      today="$(date +%F)"
      done_on="$(cat "$last" 2>/dev/null || true)"
      if [ "$(date +%H)" -ge "$hour" ] && [ "$done_on" != "$today" ]; then
        if out="$(cd /repo && as_user bun run games sync 2>&1)"; then
          printf '%s\n' "$today" | as_user sh -c "cat > $last"
          log_line "$(printf '%s\n' "$out" | tail -n 1)"
        else
          log_line "The sync failed. It tries again in 15 minutes."
          printf '%s\n' "$out" | as_user sh -c "cat >> $log"
        fi
      fi
      sleep 900
    done
    ;;

  *)
    echo "usage: run.sh workbench | nightly" >&2
    exit 2
    ;;
esac
