/** Zod raw shapes for the three deck-UI tools. Raw shapes (plain objects of zod fields), not
 *  z.object(...), because the Agent SDK's tool() helper takes a raw shape. The .describe() text
 *  is what the agent reads when deciding how to fill each field. */
import { z } from "zod";

export const batchSchema = {
  batchNumber: z.number().int().min(1).describe("1-based index of this batch in the exercise"),
  totalBatches: z.number().int().min(1).optional().describe("Total number of batches, if known"),
  cards: z
    .array(
      z.object({
        name: z.string().describe("Exact card name (front face for DFCs)"),
        manaCost: z.string().optional().describe("Mana cost like {1}{U}{R}"),
        typeLine: z.string().optional().describe("Type line, e.g. 'Creature — Vampire'"),
        blurb: z.string().optional().describe("One neutral clause on what the card does — no verdict"),
        set: z.string().optional().describe("Set code of the user's printing, if known"),
      }),
    )
    .min(1)
    .max(12)
    .describe("The 5–10 cards of this batch"),
};

export const tallySchema = {
  keeps: z.number().int().min(0).describe("Cards currently in the keep pile"),
  cuts: z.number().int().min(0).describe("Cards cut so far"),
  pockets: z.number().int().min(0).describe("Cards in the pocket/sideboard pile"),
  target: z.number().int().min(1).describe("Keep-pile target (usually 99)"),
  gameChangers: z.number().int().min(0).describe("Game Changers currently in the keep pile"),
  gcCeiling: z.number().int().min(0).optional().describe("Bracket ceiling for Game Changers (e.g. 3)"),
  manaSources: z.number().int().min(0).optional().describe("Lands + rocks in the keep pile"),
  categories: z
    .array(
      z.object({
        name: z.string().describe("Category, e.g. Ramp / Draw / Removal"),
        count: z.number().int().min(0).describe("Current count in the keep pile"),
        target: z.number().int().min(0).optional().describe("Rough target for this category"),
      }),
    )
    .optional()
    .describe("Category balance for the guardrail rail"),
};

export const finalListSchema = {
  groups: z
    .array(
      z.object({
        name: z.string().describe("Role header, e.g. Lands / Ramp / Win Conditions"),
        cards: z.array(z.string()).describe("Card names in this group, '2x ' prefix only when qty > 1"),
      }),
    )
    .min(1)
    .describe("The complete final list, grouped by role"),
  total: z.number().int().min(1).describe("Total card count — must equal the deck size target"),
  summary: z.string().optional().describe("A few sentences on what changed and why"),
};
