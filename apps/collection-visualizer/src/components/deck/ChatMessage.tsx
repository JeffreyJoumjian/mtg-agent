import ReactMarkdown from "react-markdown";

/** Hand-styled markdown container — no typography plugin; just the elements chat actually uses. */
const MD_STYLES =
  "[&_p]:my-1.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 " +
  "[&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_strong]:font-semibold " +
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] " +
  "[&_h1]:text-base [&_h2]:text-base [&_h3]:text-sm [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold " +
  "[&_h1]:mt-3 [&_h2]:mt-3 [&_h3]:mt-2 [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground " +
  "[&_table]:my-2 [&_th]:border [&_th]:px-2 [&_th]:py-1 [&_td]:border [&_td]:px-2 [&_td]:py-1 [&_hr]:my-3";

interface ChatMessageProps {
  role: "user" | "assistant";
  text: string;
  streaming?: boolean;
}

export function ChatMessage(props: ChatMessageProps) {
  if (props.role === "user") {
    return (
      <div className="ml-8 self-end rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground whitespace-pre-wrap">
        {props.text}
      </div>
    );
  }

  return (
    <div className={`mr-4 self-start text-sm leading-relaxed ${MD_STYLES}`}>
      <ReactMarkdown>{props.text}</ReactMarkdown>
      {props.streaming && (
        <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-foreground/60 align-baseline" />
      )}
    </div>
  );
}
