#!/usr/bin/env python3
"""carddata.py — print card descriptions from the local cache, fetching + caching any misses.

Cache-first: looks each card up in decks/cards.txt; only cards not found are fetched from
Scryfall (one batched call) and appended to the cache. Keeps the cache the source of truth.

Usage:
  python scripts/carddata.py "Blood Artist" "Sol Ring"        # names as args
  python scripts/carddata.py --file mylist.txt                 # a decklist (strips "1x", set codes)
  echo "1 Mirkwood Bats" | python scripts/carddata.py          # stdin
"""
import sys, os, re, json, urllib.request

def find_root(start=None):
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.exists(os.path.join(d, "decks", "cards.txt")):
            return d
        nd = os.path.dirname(d)
        if nd == d:
            # fall back to two levels up from this script (…/.claude/skills/deck-finalizer/scripts)
            here = os.path.dirname(os.path.abspath(__file__))
            cand = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
            return cand
        d = nd

ROOT = find_root()
CACHE = os.path.join(ROOT, "decks", "cards.txt")

def clean(name):
    name = re.sub(r"^\s*\d+\s*x?\s+", "", name)          # leading "1 " / "1x "
    name = re.sub(r"\s*\([^)]*\)\s*", " ", name)          # (Showcase), (Extended Art)
    name = re.sub(r"\s*\[[A-Za-z0-9]+\]\s*\d*\s*$", "", name)  # [DSK] 138
    return name.strip()

def front(name):  # DFC: match on front face for cache + Scryfall
    return name.split(" // ")[0].strip()

def read_names():
    args = sys.argv[1:]
    names = []
    if "--file" in args:
        i = args.index("--file")
        path = args[i+1]
        for line in open(path):
            line = line.strip()
            if line: names.append(line)
        args = args[:i] + args[i+2:]
    names += [a for a in args if not a.startswith("--")]
    if not names and not sys.stdin.isatty():
        names += [l.strip() for l in sys.stdin if l.strip()]
    return [clean(n) for n in names if clean(n)]

def cache_text():
    return open(CACHE).read() if os.path.exists(CACHE) else ""

def block_for(name, text):
    fn = re.escape(front(name))
    m = re.search(r"^## " + fn + r"(?: //.*)?\n.*?(?=^## |\Z)", text, re.M | re.S)
    return m.group(0).strip() if m else None

def fetch_and_cache(missing):
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
    with open(CACHE, "a") as f:
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
    names = read_names()
    if not names:
        print("usage: carddata.py <names…|--file path>  (or pipe a list on stdin)", file=sys.stderr); sys.exit(1)
    text = cache_text()
    missing = [n for n in names if not block_for(n, text)]
    if missing:
        fetch_and_cache(list(dict.fromkeys(missing)))
        text = cache_text()
    for n in names:
        b = block_for(n, text)
        print(b if b else f"## {n}\n[no data — not in cache or on Scryfall]")
        print()

if __name__ == "__main__":
    main()
