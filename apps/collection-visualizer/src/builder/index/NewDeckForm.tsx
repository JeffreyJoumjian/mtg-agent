import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useCreateDeck } from "../state/queries";

/** Name a deck, get a folder with an empty main list, and land in the workbench where the agent
 *  asks about the commander. */
export function NewDeckForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const create = useCreateDeck();
  const navigate = useNavigate();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">
          <Plus /> New deck
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            create.mutate(name.trim(), {
              onSuccess: ({ slug }) => {
                setOpen(false);
                setName("");
                void navigate({ to: "/decks/$slug", params: { slug }, search: { intro: "1" } });
              },
            });
          }}
        >
          <label className="block text-[13px] font-medium">Deck name</label>
          <Input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chatterfang — Acorn Economy"
            className="h-8 text-[13px]"
          />
          <p className="text-[12px] text-muted-foreground">
            The folder is named from it. The agent asks about the commander once you are in.
          </p>
          {create.error && <p className="text-[12px] text-bad">{String(create.error)}</p>}
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!name.trim() || create.isPending}>
              {create.isPending ? "Creating…" : "Create"}
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
