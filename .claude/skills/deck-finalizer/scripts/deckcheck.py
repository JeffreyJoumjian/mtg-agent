#!/usr/bin/env python3
"""deckcheck.py — validate a keep-pile / decklist against the project's guardrails.

Reports: total card count, Game Changers (→ bracket), mana sources (lands + rocks),
and per-card coverage across the 6-deck comparison sample. Uses decks/cards.txt for
type/mana info and the sample JSONs for field signal.

Usage:
  python scripts/deckcheck.py --file decks/Edgar-...txt
  cat keeppile.txt | python scripts/deckcheck.py
"""
import sys, os, re, json, urllib.request

def find_root(start=None):
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.exists(os.path.join(d, "decks", "cards.txt")):
            return d
        nd = os.path.dirname(d)
        if nd == d:
            here = os.path.dirname(os.path.abspath(__file__))
            return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
        d = nd

ROOT = find_root()
norm = lambda n: n.split(" // ")[0].strip()

def read_deck():
    args = sys.argv[1:]
    lines = []
    if "--file" in args:
        path = args[args.index("--file") + 1]
        lines = open(path).read().splitlines()
    elif not sys.stdin.isatty():
        lines = sys.stdin.read().splitlines()
    deck = {}
    for line in lines:
        m = re.match(r"\s*(\d+)\s+(.*\S)", line)
        if m: deck[m.group(2).strip()] = deck.get(m.group(2).strip(), 0) + int(m.group(1))
        elif line.strip(): deck[line.strip()] = deck.get(line.strip(), 0) + 1
    return deck

def load_cache_info():
    info = {}
    text = open(os.path.join(ROOT, "decks", "cards.txt")).read() if os.path.exists(os.path.join(ROOT,"decks","cards.txt")) else ""
    for m in re.finditer(r"^## (.+?)\ncost=(.*?) \| type=(.*?) \| CI=(.*?) \| produces=(.*?) \|", text, re.M):
        info[m.group(1)] = {"type": m.group(3), "produces": m.group(5)}
    return info

def gamechangers():
    gc, url = set(), "https://api.scryfall.com/cards/search?q=is%3Agamechanger&unique=cards"
    while url:
        try:
            req = urllib.request.Request(url, headers={"User-Agent":"deck-finalizer/1.0","Accept":"application/json"})
            d = json.load(urllib.request.urlopen(req)); gc |= {c["name"] for c in d["data"]}; url = d.get("next_page")
        except Exception as e:
            print(f"[gamechanger fetch error: {e}]", file=sys.stderr); break
    return gc

def load_samples():
    samples = []
    p = os.path.join(ROOT, "premium_edgar_decks.json")
    if os.path.exists(p):
        for v in json.load(open(p)).values():
            samples.append({norm(c["n"]) for c in v.get("main",[]) + v.get("cmd",[])})
    n = os.path.join(ROOT, "new_edgar_decks_clean.json")
    if os.path.exists(n):
        for v in json.load(open(n)).values():
            keys = v.keys() if isinstance(v, dict) and "main" not in v else [c["n"] for c in v.get("main",[])]
            samples.append({norm(x) for x in keys})
    return samples

def main():
    deck = read_deck()
    if not deck:
        print("usage: deckcheck.py --file <decklist>  (or pipe a list on stdin)", file=sys.stderr); sys.exit(1)
    info = load_cache_info()
    total = sum(deck.values())

    # mana sources
    lands = rocks = 0
    for name, q in deck.items():
        fi = info.get(norm(name), {})
        t, prod = fi.get("type",""), fi.get("produces","-")
        if "Land" in t: lands += q
        elif "Artifact" in t and prod not in ("-", "", None): rocks += q

    # game changers
    gc = gamechangers()
    in_gc = sorted([n for n in deck if norm(n) in gc])
    bracket = "3 (or lower)" if len(in_gc) <= 3 else "4+"

    # field coverage
    samples = load_samples()
    print(f"=== DECK CHECK ===")
    print(f"Total cards: {total}" + ("" if total==100 else "   ⚠️ not 100"))
    print(f"Mana sources: lands {lands} + rocks {rocks} = {lands+rocks}" +
          ("   ⚠️ low (<40)" if lands+rocks < 40 else ""))
    print(f"Game Changers: {len(in_gc)} -> Bracket {bracket}")
    for c in in_gc: print(f"    🔴 {c}")
    if samples:
        print(f"\nField coverage (of {len(samples)} sample decks):")
        for name in sorted(deck):
            if norm(name) in ("Swamp","Plains","Mountain","Island","Forest"): continue
            c = sum(1 for s in samples if norm(name) in s)
            flag = " 🟢staple" if c >= 4 else (" ⚪0/6" if c == 0 else "")
            print(f"   {c}/{len(samples)}  {name}{flag}")

if __name__ == "__main__":
    main()
