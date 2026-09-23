// Server only — transcript and session-id persistence under the app's data/agent/. One JSONL per
// deck; text-delta events are skipped (text-final supersedes them) so replays stay compact.
import { appendFile, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { TranscriptEvent } from "../../chat/events";

const agentDir = (dataDir: string) => join(dataDir, "agent");
const transcriptPath = (dataDir: string, slug: string) => join(agentDir(dataDir), "transcripts", `${slug}.jsonl`);
const sessionsPath = (dataDir: string) => join(agentDir(dataDir), "sessions.json");

export async function appendTranscript(dataDir: string, slug: string, ev: TranscriptEvent): Promise<void> {
  await mkdir(join(agentDir(dataDir), "transcripts"), { recursive: true });
  await appendFile(transcriptPath(dataDir, slug), JSON.stringify(ev) + "\n");
}

export async function readTranscript(dataDir: string, slug: string): Promise<TranscriptEvent[]> {
  try {
    const raw = await readFile(transcriptPath(dataDir, slug), "utf8");
    const events: TranscriptEvent[] = [];
    for (const line of raw.split("\n")) {
      if (!line.trim()) continue;

      try {
        events.push(JSON.parse(line) as TranscriptEvent);
      } catch {
        // A torn line from a crash mid-append; skip it rather than lose the conversation.
      }
    }
    return events;
  } catch {
    return [];
  }
}

/** Move the current transcript aside (timestamped) so a new conversation starts empty. */
export async function archiveTranscript(dataDir: string, slug: string): Promise<void> {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  try {
    await rename(transcriptPath(dataDir, slug), join(agentDir(dataDir), "transcripts", `${slug}.${stamp}.jsonl`));
  } catch {
    // Nothing to archive.
  }
}

export async function loadSessionIds(dataDir: string): Promise<Record<string, string>> {
  try {
    return JSON.parse(await readFile(sessionsPath(dataDir), "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function saveSessionId(dataDir: string, slug: string, id: string | null): Promise<void> {
  const ids = await loadSessionIds(dataDir);
  if (id) ids[slug] = id;
  else delete ids[slug];

  await mkdir(agentDir(dataDir), { recursive: true });
  await writeFile(sessionsPath(dataDir), JSON.stringify(ids, null, 2) + "\n");
}
