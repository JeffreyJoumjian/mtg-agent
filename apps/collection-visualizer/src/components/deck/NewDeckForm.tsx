import { useState } from "react";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { createDeck } from "~/server/decks";
import { slugify, isValidSlug } from "~/lib/deck/slug";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function NewDeckForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const router = useRouter();

  const slug = slugify(name);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex min-h-28 items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition hover:bg-accent hover:text-foreground"
      >
        <Plus className="h-4 w-4" /> New deck
      </button>
    );
  }

  async function submit() {
    if (!isValidSlug(slug) || pending) return;
    setPending(true);
    setError(null);

    try {
      const created = await createDeck({ data: { name } });
      await router.invalidate();

      const intro =
        `New deck: ${name.trim()}.` +
        (notes.trim().length > 0 ? ` My commander/theme thoughts so far: ${notes.trim()}.` : "") +
        " Please onboard me — ask what you need to know, then seed the deck files.";
      await navigate({ to: "/decks/$slug", params: { slug: created.slug }, search: { intro } });
    } catch (err) {
      setError(String(err));
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="flex flex-col gap-2 rounded-lg border bg-card p-4"
    >
      <span className="font-semibold">New deck</span>
      <Input autoFocus placeholder="Deck name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea
        placeholder="Commander / theme notes (optional) — the agent starts from these"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {name.length > 0 && <code>decks/{slug || "…"}/</code>}
        {error && <span className="text-destructive">{error}</span>}
        <span className="ml-auto flex gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={!isValidSlug(slug) || pending}>
            {pending ? "Creating…" : "Create"}
          </Button>
        </span>
      </div>
    </form>
  );
}
