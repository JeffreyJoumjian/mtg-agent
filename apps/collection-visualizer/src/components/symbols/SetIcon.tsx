import { useAtomValue } from "jotai";
import { setIconsAtom } from "~/lib/state/store";
import { cn } from "~/lib/utils";

interface SetIconProps {
  setCode: string;
  /** Color class. The symbol inherits it via `fill: currentColor` — callers pass a rarity color to
   *  mirror how a real card colors its set symbol. */
  className?: string;
}

/** A set's symbol, inlined so it can take its color from the surrounding text. Renders nothing when
 *  the symbol hasn't been vendored yet (before the first refresh, or a set Scryfall doesn't list). */
export function SetIcon(props: SetIconProps) {
  const icon = useAtomValue(setIconsAtom)[props.setCode];
  if (!icon) return null;

  return (
    <svg
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden
      className={cn("inline-block size-3.5 shrink-0", props.className)}
      // Safe: the body is validated against a tag allowlist when vendored (see lib/set-icons.ts).
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
