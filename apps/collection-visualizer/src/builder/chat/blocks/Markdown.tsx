import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import { CardChip } from "./CardChip";
import { cardRefsToMarkdown } from "./card-refs";

interface MarkdownProps {
  text: string;
}

/** react-markdown blanks any href whose protocol it does not know; `card:` must survive the
 *  transform or every chip degrades to a dead link. */
function urlTransform(url: string): string {
  return url.startsWith("card:") ? url : defaultUrlTransform(url);
}

/** Assistant markdown. Card references become chips; other links open in a new tab. */
export function Markdown(props: MarkdownProps) {
  return (
    <div className="chat-md text-[14px] leading-relaxed [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-px [&_code]:text-[13px] [&_h1]:mt-3 [&_h1]:mb-1 [&_h1]:text-[15px] [&_h1]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1 [&_h2]:text-[15px] [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:font-semibold [&_li]:my-0.5 [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-2 [&_pre]:text-[12px] [&_table]:my-2 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[13px] [&_td]:border-b [&_td]:border-border/60 [&_td]:px-1.5 [&_td]:py-1 [&_th]:border-b [&_th]:px-1.5 [&_th]:py-1 [&_th]:text-left [&_th]:font-medium [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-5">
      <ReactMarkdown
        urlTransform={urlTransform}
        components={{
          a: (p) => {
            const href = p.href ?? "";
            if (href.startsWith("card:")) return <CardChip name={decodeURIComponent(href.slice(5))} />;
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-muted-foreground underline-offset-2 hover:text-foreground"
              >
                {p.children}
              </a>
            );
          },
        }}
      >
        {cardRefsToMarkdown(props.text)}
      </ReactMarkdown>
    </div>
  );
}
