import urllib.request, urllib.parse, json, time, os

OUT = "/Users/skylerdj/Desktop/mtg-agent/decks"

# ---------------- D1 (base) ----------------
D1 = {
 "Akroma's Will":1,"Arcane Signet":1,"Banner of Kinship":1,"Bartolomé del Presidio":1,
 "Battlefield Forge":1,"Black Market Connections":1,"Blade of the Bloodchief":1,"Blasphemous Act":1,
 "Blasphemous Edict":1,"Blazemire Verge":1,"Blood Crypt":1,"Bloodletter of Aclazotz":1,
 "Bloodline Keeper":1,"Bloodthirsty Conqueror":1,"Bojuka Bog":1,"Boros Charm":1,"Cabal Coffers":1,
 "Captivating Vampire":1,"Cavern of Souls":1,"Caves of Koilos":1,"Champion of Dusk":1,"Chaos Warp":1,
 "Charismatic Conqueror":1,"Clavileño, First of the Blessed":1,"Clever Concealment":1,"Command Tower":1,
 "Cordial Vampire":1,"Dawn's Truce":1,"Demonic Tutor":1,"Dusk Legion Duelist":1,"Edgar, Charmed Groom":1,
 "Eiganjo, Seat of the Empire":1,"Exotic Orchard":1,"Exquisite Blood":1,"Fellwar Stone":1,
 "Flawless Maneuver":1,"Fracture":1,"Generous Gift":1,"Godless Shrine":1,"High-Society Hunter":1,
 "Idol of Oblivion":1,"Indulgent Aristocrat":1,"Knight of the Ebon Legion":1,"Legion Lieutenant":1,
 "Luxury Suite":1,"Malakir Bloodwitch":1,"Markov Baron":1,"Mountain":3,"Nullpriest of Oblivion":1,
 "Orzhov Signet":1,"Pact of the Serpent":1,"Path of Ancestry":1,"Patron of the Vein":1,"Phyrexian Tower":1,
 "Plains":4,"Rakdos Signet":1,"Rakish Heir":1,"Sacred Foundry":1,"Sanctum Seeker":1,"Sanguine Bond":1,
 "Savai Triome":1,"Secluded Courtyard":1,"Shared Animosity":1,"Skullclamp":1,"Smothering Tithe":1,
 "Sol Ring":1,"Sorin, Imperious Bloodlord":1,"Spectator Seating":1,"Stromkirk Captain":1,
 "Sulfurous Springs":1,"Swamp":5,"Swords to Plowshares":1,"Takenuma, Abandoned Mire":1,
 "Talisman of Hierarchy":1,"Talisman of Indulgence":1,"Terminate":1,"Three Tree City":1,
 "Tocasia's Welcome":1,"Toxic Deluge":1,"Unclaimed Territory":1,"Urborg, Tomb of Yawgmoth":1,
 "Vampire Socialite":1,"Vampiric Tutor":1,"Vanquisher's Banner":1,"Vault of Champions":1,"Vein Ripper":1,
 "Viscera Seer":1,"Vito, Thorn of the Dusk Rose":1,"Welcoming Vampire":1,"Yahenni, Undying Partisan":1,
}
D1_CMD = "Edgar Markov"

# ---------------- D1 + Improvements ----------------
D1IMP_CUTS = ["Blasphemous Edict","Banner of Kinship","Vanquisher's Banner","Blade of the Bloodchief",
              "Pact of the Serpent","Dusk Legion Duelist","High-Society Hunter","Markov Baron",
              "Patron of the Vein","Idol of Oblivion"]
D1IMP_ADDS = ["Olivia's Wrath","Blood Artist","Cruel Celebrant","Impact Tremors","Mirkwood Bats",
              "Elenda, the Dusk Rose","Purphoros, God of the Forge","Mondrak, Glory Dominus",
              "Grave Pact","Roaming Throne"]
D1IMP = dict(D1)
for c in D1IMP_CUTS: del D1IMP[c]
for c in D1IMP_ADDS: D1IMP[c] = 1

# ---------------- D3 (base) — fetched live from Moxfield ----------------
def fetch_moxfield(pid):
    url = f"https://api.moxfield.com/v3/decks/all/{pid}"
    h = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",
         "Accept":"application/json","Referer":"https://moxfield.com/"}
    d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=25))
    def names(board):
        return {info["card"]["name"]: info.get("quantity",1) for _, info in board.items()}
    main = names(d["boards"]["mainboard"]["cards"])
    cmds = list(names(d["boards"]["commanders"]["cards"]).keys())
    return main, (cmds[0] if cmds else "Edgar Markov")

D3, D3_CMD = fetch_moxfield("183Yp19znUerOEoyU7a9Gw")

# ---------------- D3 + Improvements ----------------
D3IMP_CUTS = ["Insolent Neonate","Falkenrath Pit Fighter","Vicious Conquistador","Painful Lesson",
              "Creeping Bloodsucker","High-Society Hunter","Vanquisher's Banner","Dusk Legion Sergeant"]
D3IMP_ADDS = ["Impact Tremors","Mirkwood Bats","Purphoros, God of the Forge","Mondrak, Glory Dominus",
              "Roaming Throne","Elenda, the Dusk Rose","Kindred Dominance","Kalitas, Traitor of Ghet"]
D3IMP = dict(D3)
for c in D3IMP_CUTS: del D3IMP[c]
for c in D3IMP_ADDS: D3IMP[c] = 1

DECKS = [("D1", D1, D1_CMD), ("D1+Imp", D1IMP, D1_CMD), ("D3", D3, D3_CMD), ("D3+Imp", D3IMP, D3_CMD)]

# validate counts
for name, d, cmd in DECKS:
    total = sum(d.values()) + 1  # +1 commander
    print(f"{name}: {sum(d.values())} mainboard + 1 commander = {total} {'OK' if total==100 else '!!!!! NOT 100'}")

# write decklist txt files (pasted format: '<n> <name>' alpha, blank line, commander)
fnames = {"D1":"D1.txt","D1+Imp":"D1+Imp.txt","D3":"D3.txt","D3+Imp":"D3+Imp.txt"}
for name, d, cmd in DECKS:
    lines = [f"{q} {n}" for n, q in sorted(d.items(), key=lambda x: x[0].lower())]
    body = "\n".join(lines) + "\n\n" + f"1 {cmd}\n"
    with open(os.path.join(OUT, fnames[name]), "w") as f:
        f.write(body)
    print("wrote", fnames[name])

# ---------------- shopping list: union, max qty per card ----------------
def front(n): return n.split(" // ")[0].strip()

union = {}  # frontface -> max qty across decks
for name, d, cmd in DECKS:
    for n, q in d.items():
        k = front(n)
        union[k] = max(union.get(k, 0), q)
# commander (shared)
union["Edgar Markov"] = max(union.get("Edgar Markov", 0), 1)

# extras: recs not in any deck
EXTRAS = ["Elenda's Hierophant", "Attrition", "Teferi's Protection"]
for e in EXTRAS:
    union.setdefault(e, 1)

# track which decks each card is in (for grouping)
inwhich = {}
for name, d, cmd in DECKS:
    keys = set(front(n) for n in d) | {"Edgar Markov"}
    for k in keys:
        inwhich.setdefault(k, set()).add(name)
for e in EXTRAS:
    inwhich.setdefault(e, set())

print(f"\nUNION unique cards: {len(union)}")

# ---------------- price via Scryfall collection endpoint ----------------
names = list(union.keys())
prices = {}      # name -> usd float or None
notfound = []
hdr = {"User-Agent":"mtg-agent/1.0","Accept":"application/json","Content-Type":"application/json"}

def collection(batch):
    body = json.dumps({"identifiers":[{"name":n} for n in batch]}).encode()
    req = urllib.request.Request("https://api.scryfall.com/cards/collection", data=body, headers=hdr)
    return json.load(urllib.request.urlopen(req, timeout=30))

for i in range(0, len(names), 70):
    batch = names[i:i+70]
    try:
        r = collection(batch)
        for c in r.get("data", []):
            usd = (c.get("prices") or {}).get("usd")
            prices[c["name"]] = float(usd) if usd else None
            # also map by front face for our key
            prices[front(c["name"])] = float(usd) if usd else None
        for nf in r.get("not_found", []):
            notfound.append(nf.get("name"))
    except Exception as e:
        print("batch err:", e)
    time.sleep(0.12)

# fuzzy fallback for not found
for n in list(notfound):
    try:
        url = "https://api.scryfall.com/cards/named?fuzzy=" + urllib.parse.quote(n)
        req = urllib.request.Request(url, headers={"User-Agent":"mtg-agent/1.0","Accept":"application/json"})
        c = json.load(urllib.request.urlopen(req, timeout=20))
        usd = (c.get("prices") or {}).get("usd")
        prices[n] = float(usd) if usd else None
        notfound.remove(n)
    except Exception as e:
        pass
    time.sleep(0.1)

# fuzzy fallback for cards that matched but had null usd (e.g. basics, some commons)
for n in list(union.keys()):
    if prices.get(n) is None:
        try:
            url = "https://api.scryfall.com/cards/named?fuzzy=" + urllib.parse.quote(n)
            req = urllib.request.Request(url, headers={"User-Agent":"mtg-agent/1.0","Accept":"application/json"})
            c = json.load(urllib.request.urlopen(req, timeout=20))
            usd = (c.get("prices") or {}).get("usd")
            if usd: prices[n] = float(usd)
        except Exception:
            pass
        time.sleep(0.1)

# assemble priced rows
rows = []
missing_price = []
for n, q in union.items():
    p = prices.get(n)
    if p is None:
        missing_price.append(n)
    rows.append((n, q, p, (p*q if p else None), sorted(inwhich.get(n, set()))))

priced_total = sum(r[3] for r in rows if r[3] is not None)
print(f"\nTOTAL (Scryfall USD, cards with price): ${priced_total:,.2f}")
print(f"cards missing price: {len(missing_price)} -> {missing_price}")
print(f"not found at all: {notfound}")

# premium drivers
prem = sorted([r for r in rows if r[2] and r[2] >= 8], key=lambda x: -x[2])
print("\n--- PREMIUM CARDS (>= $8 each) ---")
psum = 0
for n,q,p,lp,decks in prem:
    psum += lp
    print(f"${p:>7.2f} x{q}  {n}   [{','.join(decks) if decks else 'EXTRA'}]")
print(f"premium subtotal: ${psum:,.2f}  | rest: ${priced_total-psum:,.2f}")

# write shopping list file (sorted by price desc)
rows_sorted = sorted(rows, key=lambda x:(-(x[2] or 0), x[0].lower()))
with open(os.path.join(OUT,"shopping-list.txt"),"w") as f:
    f.write("MIX-AND-MATCH SHOPPING LIST (build any of D1 / D1+Imp / D3 / D3+Imp)\n")
    f.write(f"{len(union)} unique cards | Scryfall USD snapshot total (priced): ${priced_total:,.2f}\n")
    f.write("qty is the MAX needed in any single deck (you swap between builds)\n\n")
    for n,q,p,lp,decks in sorted(rows, key=lambda x:x[0].lower()):
        ps = f"${p:.2f}" if p is not None else "  n/a"
        f.write(f"{q} {n}\t{ps}\t[{','.join(decks) if decks else 'optional/extra'}]\n")
print("\nwrote shopping-list.txt")

# ---------------- budget scenario math ----------------
print("\n================ BUDGET SCENARIOS ================")
def front2(n): return n.split(" // ")[0].strip()
base_d1 = set(front2(n) for n in D1) | {"Edgar Markov"}
base_d3 = set(front2(n) for n in D3) | {"Edgar Markov"}

def cost_of(cardset):
    return sum(prices.get(c) or 0 for c in cardset), sum(1 for c in cardset)

allcards = set(union.keys())
new_beyond_both = sorted(c for c in allcards if c not in base_d1 and c not in base_d3)
need_if_own_d1 = sorted(c for c in allcards if c not in base_d1)
need_if_own_d3 = sorted(c for c in allcards if c not in base_d3)

for label, s in [("Own NOTHING (full union)", allcards),
                 ("Own base D1 only -> still need", need_if_own_d1),
                 ("Own base D3 only -> still need", need_if_own_d3),
                 ("Own BOTH bases -> only 'new tech'", set(new_beyond_both))]:
    tot, cnt = cost_of(s)
    print(f"{label}: {cnt} cards, ${tot:,.2f}")

print("\n--- 'NEW TECH' beyond both base decks (the upgrade delta) ---")
for c in sorted(new_beyond_both, key=lambda x:-(prices.get(x) or 0)):
    p = prices.get(c)
    print(f"  ${ (p or 0):>6.2f}  {c}   [{','.join(sorted(inwhich.get(c,set()))) or 'EXTRA'}]")
