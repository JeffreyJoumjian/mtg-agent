import type { ReactNode } from "react";
import { useAtom } from "jotai";
import { Group, Panel, Separator } from "react-resizable-panels";
import { bottomPaneAtom } from "../state/atoms";

interface BottomSplitProps {
  /** Which remembered height to use: the deck page and the history page each keep their own. */
  id: "deck" | "history";
  top: ReactNode;
  /** Null when there is nothing to show beneath — the top fills the space and there is no handle. */
  bottom: ReactNode | null;
}

/** The board above a panel that can be dragged up and down. The handle remembers where it was left. */
export function BottomSplit(props: BottomSplitProps) {
  const [sizes, setSizes] = useAtom(bottomPaneAtom);
  const remembered = sizes[props.id];

  return (
    <Group
      orientation="vertical"
      className="min-h-0 min-w-0 flex-1"
      onLayoutChanged={(layout) => {
        const size = layout.bottom;
        if (size === undefined || size <= 0 || size === remembered) return;

        setSizes((s) => ({ ...s, [props.id]: size }));
      }}
    >
      <Panel id="top" minSize="25" className="flex min-h-0 flex-col">
        <div className="min-h-0 flex-1">{props.top}</div>
      </Panel>
      {props.bottom && (
        <>
          <Separator
            aria-label="Resize the panel"
            className="h-1 bg-border/40 transition hover:bg-ring data-[separator=active]:bg-ring"
          />
          <Panel
            id="bottom"
            defaultSize={String(remembered ?? 38)}
            minSize="12"
            maxSize="80"
            className="flex min-h-0 flex-col"
          >
            {props.bottom}
          </Panel>
        </>
      )}
    </Group>
  );
}
