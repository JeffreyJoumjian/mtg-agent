import { ManaCost } from "~/components/symbols/Mana";

interface OracleTextProps {
  text: string;
  className?: string;
}

/** Oracle text with its `{T}`, `{W}`, `{2/U}`… tokens drawn as the real symbols, inline with the
 *  words. Line breaks in the text stay line breaks. */
export function OracleText(props: OracleTextProps) {
  const parts = props.text.split(/(\{[^}]+\})/g).filter((p) => p.length > 0);

  return (
    <p className={`whitespace-pre-wrap ${props.className ?? ""}`}>
      {parts.map((part, i) =>
        /^\{[^}]+\}$/.test(part) ? <ManaCost key={i} cost={part} size="size-3.5" /> : <span key={i}>{part}</span>,
      )}
    </p>
  );
}
