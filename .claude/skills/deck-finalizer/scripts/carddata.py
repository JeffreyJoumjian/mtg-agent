#!/usr/bin/env python3
"""carddata.py — print card descriptions from a deck's local cache, fetching + caching misses.

Cache-first: looks each card up in decks/<slug>/research/cards.txt; only cards not found are
fetched from Scryfall (one batched call) and appended to the cache. Keeps the cache the source
of truth.

The deck comes from --deck <slug>, or is inferred from a --file path inside decks/<slug>/.

Usage:
  python scripts/carddata.py --deck edgar-markov "Blood Artist" "Sol Ring"
  python scripts/carddata.py --file decks/edgar-markov/DECK.md      # slug inferred from path
  echo "1 Mirkwood Bats" | python scripts/carddata.py --deck edgar-markov
"""
import sys, os, re, json, urllib.request

def find_root(start=None):
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.isdir(os.path.join(d, "decks")) and os.path.exists(os.path.join(d, "CLAUDE.md")):
            return d
        nd = os.path.dirname(d)
        if nd == d:
            # fall back to four levels up from this script (…/.claude/skills/deck-finalizer/scripts)
            here = os.path.dirname(os.path.abspath(__file__))
            return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
        d = nd

ROOT = find_root()

def pop_flag(args, flag):
    if flag in args:
        i = args.index(flag)
        v = args[i + 1] if i + 1 < len(args) else None
        return v, args[:i] + args[i + 2:]
    return None, args

def deck_slug(deck, file_path):
    if deck:
        return deck
    if file_path:
        m = re.search(r"(?:^|/)decks/([a-z0-9-]+)/", os.path.abspath(file_path).replace(os.sep, "/"))
        if m:
            return m.group(1)
    return None

def clean(name):
    name = re.sub(r"^\s*\d+\s*x?\s+", "", name)          # leading "1 " / "1x "
    name = re.sub(r"\s*\([^)]*\)\s*", " ", name)          # (Showcase), (Extended Art)
    name = re.sub(r"\s*\[[A-Za-z0-9]+\]\s*\d*\s*$", "", name)  # [DSK] 138
    return name.strip()

def front(name):  # DFC: match on front face for cache + Scryfall
    return name.split(" // ")[0].strip()

def read_names(file_path, args):
    names = []
    if file_path:
        for line in open(file_path):
            line = line.strip()
            if not line or line.startswith(("#", ">")):
                continue
            if re.match(r"^(Commander|Bracket|Total|Strategy)\b", line):
                continue
            names.append(line)
    names += [a for a in args if not a.startswith("--")]
    if not names and not sys.stdin.isatty():
        names += [l.strip() for l in sys.stdin if l.strip()]
    return [clean(n) for n in names if clean(n)]

def cache_text(cache):
    return open(cache).read() if os.path.exists(cache) else ""

def block_for(name, text):
    fn = re.escape(front(name))
    m = re.search(r"^## " + fn + r"(?: //.*)?\n.*?(?=^## |\Z)", text, re.M | re.S)
    return m.group(0).strip() if m else None

def fetch_and_cache(missing, cache):
    body = json.dumps({"identifiers": [{"name": front(n)} for n in missing]}).encode()
    req = urllib.request.Request(
        "https://api.scryfall.com/cards/collection", data=body,
        headers={"User-Agent": "deck-finalizer/1.0", "Accept": "application/json",
                 "Content-Type": "application/json"})
    try:
        d = json.load(urllib.request.urlopen(req))
    except Exception as e:
        print(f"[fetch error: {e}]", file=sys.stderr); return {}
    added = {}
    os.makedirs(os.path.dirname(cache), exist_ok=True)
    with open(cache, "a") as f:
        for c in d.get("data", []):
            cost = c.get("mana_cost") or "".join(fc.get("mana_cost","") for fc in c.get("card_faces",[])) or "-"
            ci = "".join(c.get("color_identity", [])) or "-"
            prod = ",".join(c.get("produced_mana", []) or []) or "-"
            usd = c.get("prices", {}).get("usd") or "?"
            oracle = (c.get("oracle_text") or " // ".join(
                f.get("name","")+": "+f.get("oracle_text","") for f in c.get("card_faces", []))).replace("\n", " ")
            block = f"## {c['name']}\ncost={cost} | type={c.get('type_line','')} | CI={ci} | produces={prod} | usd=${usd}\n{oracle}\n"
            f.write("\n" + block)
            added[c["name"]] = block.strip()
    nf = [x.get("name") for x in d.get("not_found", [])]
    if nf: print(f"[not found on Scryfall: {nf}]", file=sys.stderr)
    return added

def main():
    args = sys.argv[1:]
    deck, args = pop_flag(args, "--deck")
    file_path, args = pop_flag(args, "--file")
    slug = deck_slug(deck, file_path)
    if not slug:
        print("usage: carddata.py --deck <slug> <names…>  |  carddata.py --file decks/<slug>/<list>", file=sys.stderr)
        sys.exit(1)
    cache = os.path.join(ROOT, "decks", slug, "research", "cards.txt")
    names = read_names(file_path, args)
    if not names:
        print("usage: carddata.py --deck <slug> <names…|--file path>  (or pipe a list on stdin)", file=sys.stderr)
        sys.exit(1)
    text = cache_text(cache)
    missing = [n for n in names if not block_for(n, text)]
    if missing:
        fetch_and_cache(list(dict.fromkeys(missing)), cache)
        text = cache_text(cache)
    for n in names:
        b = block_for(n, text)
        print(b if b else f"## {n}\n[no data — not in cache or on Scryfall]")
        print()

if __name__ == "__main__":
    main()
