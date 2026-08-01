/** The mana to render in a card's cost spot: its mana cost, or — for a land / cost-less producer with
 *  no cost — the mana it produces, as a token string like "{W}{U}{C}". Empty when there's neither. */
export function manaToShow(manaCost: string, producedMana: string[] | undefined): string {
  if (manaCost) return manaCost
  if (producedMana && producedMana.length > 0) return producedMana.map((m) => `{${m}}`).join('')
  return ''
}
