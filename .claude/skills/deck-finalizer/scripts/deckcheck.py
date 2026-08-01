#!/usr/bin/env python3
"""deckcheck.py — validate a keep-pile / decklist against the project's guardrails.

Reports: total card count, Game Changers (→ bracket), mana sources (lands + rocks),
and — when the deck folder has a comparison sample — per-card coverage across it.
Uses decks/<slug>/research/cards.txt for type/mana info and any
decks/<slug>/research/premium_*_decks.json / new_*_decks_clean.json for field signal.

The deck comes from --deck <slug>, or is inferred from a --file path inside decks/<slug>/.

Usage:
  python scripts/deckcheck.py --file decks/edgar-markov/DECK.md
  cat keeppile.txt | python scripts/deckcheck.py --deck edgar-markov
"""
import sys, os, re, json, glob, urllib.request

def find_root(start=None):
    d = os.path.abspath(start or os.getcwd())
    while True:
        if os.path.isdir(os.path.join(d, "decks")) and os.path.exists(os.path.join(d, "CLAUDE.md")):
            return d
        nd = os.path.dirname(d)
        if nd == d:
            here = os.path.dirname(os.path.abspath(__file__))
            return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
        d = nd

ROOT = find_root()
norm = lambda n: n.split(" // ")[0].strip()

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

def read_deck(file_path):
    lines = []
    if file_path:
        lines = open(file_path).read().splitlines()
    elif not sys.stdin.isatty():
        lines = sys.stdin.read().splitlines()
    deck = {}
    for line in lines:
        s = line.strip()
        if not s or s.startswith(("#", ">")):
            continue
        if re.match(r"^(Commander|Bracket|Total|Strategy)\b", s):
            continue
        m = re.match(r"(\d+)\s*x?\s+(.*\S)", s)
        if m: deck[m.group(2).strip()] = deck.get(m.group(2).strip(), 0) + int(m.group(1))
        else: deck[s] = deck.get(s, 0) + 1
    return deck

def load_cache_info(slug):
    info = {}
    cache = os.path.join(ROOT, "decks", slug, "research", "cards.txt")
    text = open(cache).read() if os.path.exists(cache) else ""
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

def load_samples(slug):
    research = os.path.join(ROOT, "decks", slug, "research")
    samples = []
    for p in sorted(glob.glob(os.path.join(research, "premium_*_decks.json"))):
        for v in json.load(open(p)).values():
            samples.append({norm(c["n"]) for c in v.get("main",[]) + v.get("cmd",[])})
    for n in sorted(glob.glob(os.path.join(research, "new_*_decks_clean.json"))):
        for v in json.load(open(n)).values():
            keys = v.keys() if isinstance(v, dict) and "main" not in v else [c["n"] for c in v.get("main",[])]
            samples.append({norm(x) for x in keys})
    return samples

def main():
    args = sys.argv[1:]
    deck_flag, args = pop_flag(args, "--deck")
    file_path, args = pop_flag(args, "--file")
    slug = deck_slug(deck_flag, file_path)
    if not slug:
        print("usage: deckcheck.py --file decks/<slug>/<list>  |  deckcheck.py --deck <slug> (list on stdin)", file=sys.stderr)
        sys.exit(1)
    deck = read_deck(file_path)
    if not deck:
        print("usage: deckcheck.py --file <decklist>  (or pipe a list on stdin)", file=sys.stderr); sys.exit(1)
    info = load_cache_info(slug)
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
    samples = load_samples(slug)
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
            flag = " 🟢staple" if c >= 4 else (" ⚪0/" + str(len(samples)) if c == 0 else "")
            print(f"   {c}/{len(samples)}  {name}{flag}")
    else:
        print(f"\n[no field sample under decks/{slug}/research/ — skipping coverage]")

if __name__ == "__main__":
    main()
