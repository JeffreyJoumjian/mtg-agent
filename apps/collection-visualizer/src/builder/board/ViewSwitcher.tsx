import { BarChart3, LayoutGrid, Rows3, Table } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export type BoardView = "board" | "rows" | "table" | "curve";

/** Rows is the view a deck opens in until the user picks another. */
export const DEFAULT_VIEW: BoardView = "rows";

interface ViewSwitcherProps {
  value: BoardView;
  onChange: (view: BoardView) => void;
}

export function ViewSwitcher(props: ViewSwitcherProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={props.value}
      onValueChange={(v) => v && props.onChange(v as BoardView)}
    >
      <ToggleGroupItem value="rows" aria-label="Rows">
        <Rows3 /> Rows
      </ToggleGroupItem>
      <ToggleGroupItem value="board" aria-label="Board">
        <LayoutGrid /> Board
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table">
        <Table /> Table
      </ToggleGroupItem>
      <ToggleGroupItem value="curve" aria-label="Curve">
        <BarChart3 /> Curve
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
