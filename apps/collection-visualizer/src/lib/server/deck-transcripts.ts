// Server only — transcript persistence, one JSONL file per deck under the app's data/.
// text-delta events are skipped (text-final supersedes them), so replays stay compact.
import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA_DIR } from "./price-cache";
import type { TranscriptEvent } from "~/lib/deck/chat-events";

const DIR = join(DATA_DIR, "deck-transcripts");

export async function appendTranscript(slug: string, ev: TranscriptEvent): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await appendFile(join(DIR, slug + ".jsonl"), JSON.stringify(ev) + "\n");
}

export async function readTranscript(slug: string): Promise<TranscriptEvent[]> {
  try {
    const raw = await readFile(join(DIR, slug + ".jsonl"), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as TranscriptEvent);
  } catch {
    return [];
  }
}
