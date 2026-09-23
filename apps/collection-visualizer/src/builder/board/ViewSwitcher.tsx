import { BarChart3, LayoutGrid, Rows3 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export type BoardView = "board" | "table" | "curve";

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
      <ToggleGroupItem value="board" aria-label="Board">
        <LayoutGrid /> Board
      </ToggleGroupItem>
      <ToggleGroupItem value="table" aria-label="Table">
        <Rows3 /> Table
      </ToggleGroupItem>
      <ToggleGroupItem value="curve" aria-label="Curve">
        <BarChart3 /> Curve
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
