/** Tiny argument/stdin helpers shared by the deck-finalizer commands. */
import { readFileSync } from "node:fs";

/**
 * Pull `--flag <value>` out of an argument list, returning the value (or undefined) and the
 * remaining arguments. Keeps the callers free to treat whatever is left as positional names.
 */
export function popFlag(args: string[], flag: string): [string | undefined, string[]] {
  const i = args.indexOf(flag);
  if (i === -1) return [undefined, args];

  return [args[i + 1], [...args.slice(0, i), ...args.slice(i + 2)]];
}

/**
 * Read piped stdin, or return "" when stdin is a terminal.
 *
 * The TTY check is what stops an interactive invocation from hanging forever waiting on input
 * that will never arrive. Reads synchronously from fd 0 so the callers stay straight-line;
 * an EAGAIN on an empty non-blocking pipe is treated as no input.
 */
export function readStdin(): string {
  if (process.stdin.isTTY) return "";

  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}
