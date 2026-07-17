import type { CardTile, ColorSymbol } from '~/lib/types'

type Predicate = (tile: CardTile) => boolean

const COLOR_NAMES: Record<string, ColorSymbol> = {
  w: 'W', u: 'U', b: 'B', r: 'R', g: 'G',
  white: 'W', blue: 'U', black: 'B', red: 'R', green: 'G',
}

/** Parse "wubrg" letters or color names into a set of color symbols. */
function parseColors(raw: string): ColorSymbol[] {
  const v = raw.toLowerCase()
  if (COLOR_NAMES[v]) return [COLOR_NAMES[v]]
  const out: ColorSymbol[] = []
  for (const ch of v) if (COLOR_NAMES[ch] && !out.includes(COLOR_NAMES[ch])) out.push(COLOR_NAMES[ch])
  return out
}

function contains(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

/** Build the predicate for a single `key:value` (or comparison) term. */
function termPredicate(key: string, op: string, value: string): Predicate {
  switch (key) {
    case 'name':
      return (t) => contains(t.name, value)
    case 'o':
      return (t) => contains(t.enriched.oracleText, value)
    case 't':
      return (t) => contains(t.enriched.typeLine, value)
    case 'r':
      return (t) => t.rarity.toLowerCase() === value.toLowerCase()
    case 's':
    case 'set':
      return (t) => t.setCode.toLowerCase() === value.toLowerCase()
    case 'f':
      return (t) => t.finish.toLowerCase() === value.toLowerCase()
    case 'c': {
      const want = parseColors(value)
      return (t) => !want.some((c) => !t.enriched.colors.includes(c))
    }
    case 'ci': {
      const want = parseColors(value)
      return (t) => !want.some((c) => !t.enriched.colorIdentity.includes(c))
    }
    case 'mv':
    case 'cmc': {
      const n = Number(value)
      return (t) => {
        const c = t.enriched.cmc
        if (op === '>') return c > n
        if (op === '<') return c < n
        if (op === '>=') return c >= n
        if (op === '<=') return c <= n
        return c === n
      }
    }
    default:
      return (t) => contains(t.name, value)
  }
}

const KNOWN_KEYS = new Set(['name', 'o', 't', 'r', 's', 'set', 'f', 'c', 'ci', 'mv', 'cmc'])

// ---- Tokenizer ----
type Token = { type: 'term'; pred: Predicate } | { type: 'or' } | { type: 'not' } | { type: 'lparen' } | { type: 'rparen' }

// Catch-all terms use [^\s()]+ (not \S+) so a `)` abutting a word — e.g. `bears)` in
// `(bolt or bears) c:g` — tokenizes as `bears` + `)` instead of being swallowed whole.
const TOKEN_RE = /\s*(-|\(|\)|(?:[a-zA-Z]+)(?:>=|<=|>|<|:|=)"[^"]*"|(?:[a-zA-Z]+)(?:>=|<=|>|<|:|=)[^\s()]+|"[^"]*"|[^\s()]+)/g

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let m: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(input)) !== null) {
    const raw = m[1]
    if (raw === '(') tokens.push({ type: 'lparen' })
    else if (raw === ')') tokens.push({ type: 'rparen' })
    else if (raw === '-') tokens.push({ type: 'not' })
    else if (raw.toLowerCase() === 'or') tokens.push({ type: 'or' })
    else if (raw.toLowerCase() === 'and') continue // implicit AND; ignore explicit
    else tokens.push({ type: 'term', pred: parseTermToken(raw) })
  }
  return tokens
}

function parseTermToken(raw: string): Predicate {
  const quoted = raw.match(/^"(.*)"$/)
  if (quoted) return (t) => contains(t.name, quoted[1])

  const m = raw.match(/^([a-zA-Z]+)(>=|<=|>|<|:|=)(.*)$/)
  if (m && KNOWN_KEYS.has(m[1].toLowerCase())) {
    const key = m[1].toLowerCase()
    let op = m[2]
    let value = m[3]
    const q = value.match(/^"(.*)"$/)
    if (q) value = q[1]
    // Numeric keys allow `mv:>1` — lift a comparator that follows the colon.
    const lead = value.match(/^(>=|<=|>|<|=)(.*)$/)
    if (op === ':' && lead) {
      op = lead[1]
      value = lead[2]
    } else if (op === ':') {
      op = '='
    }
    return termPredicate(key, op, value)
  }

  return (t) => contains(t.name, raw)
}

// ---- Recursive-descent parser: OR > AND > NOT > atom ----
function parseTokens(tokens: Token[]): Predicate {
  let pos = 0
  const peek = () => tokens[pos]

  function parseOr(): Predicate {
    let left = parseAnd()
    while (peek()?.type === 'or') {
      pos++
      const right = parseAnd()
      const l = left
      left = (t) => l(t) || right(t)
    }
    return left
  }

  function parseAnd(): Predicate {
    const preds: Predicate[] = []
    while (peek() && peek().type !== 'or' && peek().type !== 'rparen') {
      preds.push(parseNot())
    }
    // An empty clause here means a malformed query (a dangling `or`, an empty
    // `()`, etc.) — throw so compileQuery falls back to name-substring rather
    // than silently matching everything. (The truly-empty query is short-
    // circuited in compileQuery before we ever tokenize.)
    if (preds.length === 0) throw new Error('empty clause')
    return (t) => !preds.some((p) => !p(t))
  }

  function parseNot(): Predicate {
    if (peek()?.type === 'not') {
      pos++
      const inner = parseAtom()
      return (t) => !inner(t)
    }
    return parseAtom()
  }

  function parseAtom(): Predicate {
    const tok = peek()
    if (!tok) return () => true
    if (tok.type === 'lparen') {
      pos++
      const inner = parseOr()
      if (peek()?.type !== 'rparen') throw new Error('unbalanced parentheses')
      pos++
      return inner
    }
    if (tok.type === 'term') {
      pos++
      return tok.pred
    }
    throw new Error(`unexpected token ${tok.type}`)
  }

  const pred = parseOr()
  if (pos !== tokens.length) throw new Error('trailing tokens')
  return pred
}

/** Compile a search string into a predicate over tiles. Falls back to name-substring on parse error. */
export function compileQuery(input: string): Predicate {
  const trimmed = input.trim()
  if (trimmed === '') return () => true
  try {
    const tokens = tokenize(trimmed)
    if (tokens.length === 0) return () => true
    return parseTokens(tokens)
  } catch {
    return (t) => t.name.toLowerCase().includes(trimmed.toLowerCase())
  }
}
