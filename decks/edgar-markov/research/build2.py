import urllib.request, urllib.parse, json, time, os
OUT = "/Users/skylerdj/Desktop/mtg-agent/decks"
def front(n): return n.split(" // ")[0].strip()

# ---- D1 base ----
D1 = {
 "Akroma's Will":1,"Arcane Signet":1,"Banner of Kinship":1,"Bartolomé del Presidio":1,"Battlefield Forge":1,
 "Black Market Connections":1,"Blade of the Bloodchief":1,"Blasphemous Act":1,"Blasphemous Edict":1,
 "Blazemire Verge":1,"Blood Crypt":1,"Bloodletter of Aclazotz":1,"Bloodline Keeper":1,"Bloodthirsty Conqueror":1,
 "Bojuka Bog":1,"Boros Charm":1,"Cabal Coffers":1,"Captivating Vampire":1,"Cavern of Souls":1,"Caves of Koilos":1,
 "Champion of Dusk":1,"Chaos Warp":1,"Charismatic Conqueror":1,"Clavileño, First of the Blessed":1,
 "Clever Concealment":1,"Command Tower":1,"Cordial Vampire":1,"Dawn's Truce":1,"Demonic Tutor":1,
 "Dusk Legion Duelist":1,"Edgar, Charmed Groom":1,"Eiganjo, Seat of the Empire":1,"Exotic Orchard":1,
 "Exquisite Blood":1,"Fellwar Stone":1,"Flawless Maneuver":1,"Fracture":1,"Generous Gift":1,"Godless Shrine":1,
 "High-Society Hunter":1,"Idol of Oblivion":1,"Indulgent Aristocrat":1,"Knight of the Ebon Legion":1,
 "Legion Lieutenant":1,"Luxury Suite":1,"Malakir Bloodwitch":1,"Markov Baron":1,"Mountain":3,
 "Nullpriest of Oblivion":1,"Orzhov Signet":1,"Pact of the Serpent":1,"Path of Ancestry":1,"Patron of the Vein":1,
 "Phyrexian Tower":1,"Plains":4,"Rakdos Signet":1,"Rakish Heir":1,"Sacred Foundry":1,"Sanctum Seeker":1,
 "Sanguine Bond":1,"Savai Triome":1,"Secluded Courtyard":1,"Shared Animosity":1,"Skullclamp":1,
 "Smothering Tithe":1,"Sol Ring":1,"Sorin, Imperious Bloodlord":1,"Spectator Seating":1,"Stromkirk Captain":1,
 "Sulfurous Springs":1,"Swamp":5,"Swords to Plowshares":1,"Takenuma, Abandoned Mire":1,"Talisman of Hierarchy":1,
 "Talisman of Indulgence":1,"Terminate":1,"Three Tree City":1,"Tocasia's Welcome":1,"Toxic Deluge":1,
 "Unclaimed Territory":1,"Urborg, Tomb of Yawgmoth":1,"Vampire Socialite":1,"Vampiric Tutor":1,
 "Vanquisher's Banner":1,"Vault of Champions":1,"Vein Ripper":1,"Viscera Seer":1,"Vito, Thorn of the Dusk Rose":1,
 "Welcoming Vampire":1,"Yahenni, Undying Partisan":1,
}
CMD="Edgar Markov"
D1IMP=dict(D1)
for c in ["Blasphemous Edict","Banner of Kinship","Vanquisher's Banner","Blade of the Bloodchief","Pact of the Serpent","Dusk Legion Duelist","High-Society Hunter","Markov Baron","Patron of the Vein","Idol of Oblivion"]: del D1IMP[c]
for c in ["Olivia's Wrath","Blood Artist","Cruel Celebrant","Impact Tremors","Mirkwood Bats","Elenda, the Dusk Rose","Purphoros, God of the Forge","Mondrak, Glory Dominus","Grave Pact","Roaming Throne"]: D1IMP[c]=1

# ---- D3 base (Moxfield) ----
def fetch_moxfield(pid):
    url=f"https://api.moxfield.com/v3/decks/all/{pid}"
    h={"User-Agent":"Mozilla/5.0 AppleWebKit/537.36 Chrome/124.0 Safari/537.36","Accept":"application/json","Referer":"https://moxfield.com/"}
    d=json.load(urllib.request.urlopen(urllib.request.Request(url,headers=h),timeout=25))
    return {info["card"]["name"]:info.get("quantity",1) for _,info in d["boards"]["mainboard"]["cards"].items()}
D3=fetch_moxfield("183Yp19znUerOEoyU7a9Gw")
D3IMP=dict(D3)
for c in ["Insolent Neonate","Falkenrath Pit Fighter","Vicious Conquistador","Painful Lesson","Creeping Bloodsucker","High-Society Hunter","Vanquisher's Banner","Dusk Legion Sergeant"]: del D3IMP[c]
for c in ["Impact Tremors","Mirkwood Bats","Purphoros, God of the Forge","Mondrak, Glory Dominus","Roaming Throne","Elenda, the Dusk Rose","Kindred Dominance","Kalitas, Traitor of Ghet"]: D3IMP[c]=1

# ---- budget transforms ----
SUB_D1={"Demonic Tutor":"Diabolic Tutor","Vampiric Tutor":"Grim Tutor","Black Market Connections":"Dark Prophecy",
 "Purphoros, God of the Forge":"Witty Roastmaster","Flawless Maneuver":"Unbreakable Formation",
 "Charismatic Conqueror":"Vicious Conquistador","Smothering Tithe":"Mind Stone","Grave Pact":"Dictate of Erebos"}
# keep FULL drain combo (Exquisite Blood + Bloodthirsty + Sanguine Bond + Vito) + Bloodletter; cut Akroma's Will (was budget Rush of Battle) + off-plan cards
CUT_D1=["Akroma's Will","Mondrak, Glory Dominus","Roaming Throne","Champion of Dusk","Malakir Bloodwitch","Nullpriest of Oblivion","Shared Animosity","Tocasia's Welcome"]
ADD_D1=["Cathars' Crusade","Animation Module","Ashnod's Altar","Goblin Bombardment","Pitiless Plunderer","Oathsworn Vampire","Pawn of Ulamog","Scion of Opulence"]

SUB_D3={"Enlightened Tutor":"Idyllic Tutor","Phyrexian Altar":"Ashnod's Altar","Grave Pact":"Dictate of Erebos",
 "Purphoros, God of the Forge":"Witty Roastmaster","Trouble in Pairs":"Midnight Reaper","Bolas's Citadel":"Night's Whisper",
 "The One Ring":"Read the Bones","Razaketh, the Foulblooded":"Wishclaw Talisman","Kindred Dominance":"Crippling Fear"}
# keep Bloodthirsty Conqueror (B-half) + Bloodletter; add cheap Sanguine Bond as 2nd A-half for redundancy
CUT_D3=["Anointed Procession","Mondrak, Glory Dominus","Roaming Throne","Champion of Dusk","Forerunner of the Legion","Master of Dark Rites","Dusk Legion Duelist","Vampire Gourmand"]
ADD_D3=["Cathars' Crusade","Animation Module","Goblin Bombardment","Pitiless Plunderer","Oathsworn Vampire","Pawn of Ulamog","Scion of Opulence","Sanguine Bond"]

ALLNAMES=set()
for d in (D1,D1IMP,D3,D3IMP): ALLNAMES|=set(front(n) for n in d)
for m in (SUB_D1,SUB_D3):
    ALLNAMES|=set(m.keys())|set(m.values())
ALLNAMES|=set(ADD_D1)|set(ADD_D3)|set(CUT_D1)|set(CUT_D3)|{CMD,"Swamp","Plains","Mountain","Rush of Battle"}

# ---- price + type fetch ----
price={}; typ={}
hdr={"User-Agent":"mtg-agent/1.0","Accept":"application/json","Content-Type":"application/json"}
names=list(ALLNAMES)
for i in range(0,len(names),70):
    batch=names[i:i+70]
    body=json.dumps({"identifiers":[{"name":n} for n in batch]}).encode()
    try:
        r=json.load(urllib.request.urlopen(urllib.request.Request("https://api.scryfall.com/cards/collection",data=body,headers=hdr),timeout=30))
        for c in r.get("data",[]):
            usd=(c.get("prices") or {}).get("usd")
            price[front(c["name"])]=float(usd) if usd else None
            typ[front(c["name"])]=c.get("type_line","")
        for nf in r.get("not_found",[]): print("NF:",nf.get("name"))
    except Exception as e: print("err",e)
    time.sleep(0.12)
for n in list(ALLNAMES):
    if price.get(n) is None:
        try:
            c=json.load(urllib.request.urlopen(urllib.request.Request("https://api.scryfall.com/cards/named?fuzzy="+urllib.parse.quote(n),headers={"User-Agent":"mtg-agent/1.0"}),timeout=20))
            usd=(c.get("prices") or {}).get("usd")
            if usd: price[n]=float(usd)
            typ.setdefault(n,c.get("type_line",""))
        except Exception: pass
        time.sleep(0.08)
def P(n):
    p=price.get(front(n))
    if p is not None: return p
    if front(n) in ("Swamp","Plains","Mountain"): return 0.20
    return 0.0

# lands we always downgrade to basics in budget builds (deterministic, price-fetch independent)
PREMIUM_LANDS={"Cavern of Souls","Luxury Suite","Phyrexian Tower","Three Tree City","Savai Triome",
 "Vault of Champions","Spectator Seating","Sacred Foundry","Takenuma, Abandoned Mire","Godless Shrine",
 "Blood Crypt","City of Brass","Blazemire Verge","Minas Tirith","Urborg, Tomb of Yawgmoth",
 "Cabal Coffers","Eiganjo, Seat of the Empire"}
def budgetize(deck, submap, cut, add):
    d=dict(deck); removed=[]  # premium cards removed (buyback menu)
    for old,new in submap.items():
        if old in d:
            q=d.pop(old);
            if new in d: d[new]+=q
            else: d[new]=q
            removed.append(old)
    for c in cut:
        if c in d: del d[c]; removed.append(c)
    for c in add:
        d[c]=d.get(c,0)+1
    cyc=["Swamp","Plains","Swamp","Mountain","Plains","Swamp"]; bi=0
    for name in list(d.keys()):
        if name in ("Swamp","Plains","Mountain"): continue
        t=typ.get(front(name),""); p=price.get(front(name))
        if (front(name) in PREMIUM_LANDS) or ("Land" in t and p is not None and p>=5):
            q=d.pop(name); removed.append(name)
            for _ in range(q):
                b=cyc[bi%len(cyc)]; bi+=1; d[b]=d.get(b,0)+1
    return d, removed

D1IMPB,REM_D1=budgetize(D1IMP,SUB_D1,CUT_D1,ADD_D1)
D1IMPB["Rush of Battle"]=1  # user: keep BOTH Rush of Battle + Vicious Conquistador for now (deck=101; trim one later)
D3IMPB,REM_D3=budgetize(D3IMP,SUB_D3,CUT_D3,ADD_D3)

DECKS=[("D1",D1),("D1+Imp",D1IMP),("D1+Imp+Budg",D1IMPB),("D3",D3),("D3+Imp",D3IMP),("D3+Imp+Budg",D3IMPB)]
print("=== COUNTS & PRICES (per deck, incl. commander) ===")
for nm,d in DECKS:
    cnt=sum(d.values())+1
    cost=sum(P(n)*q for n,q in d.items())+P(CMD)
    flag="OK" if cnt==100 else "!!NOT100!!"
    print(f"{nm:14} {cnt:3} {flag}   ${cost:,.2f}")

# write budget files
for nm,d in [("D1+Imp+Budg",D1IMPB),("D3+Imp+Budg",D3IMPB)]:
    lines=[f"{q} {n}" for n,q in sorted(d.items(),key=lambda x:x[0].lower())]
    open(os.path.join(OUT,nm+".txt"),"w").write("\n".join(lines)+f"\n\n1 {CMD}\n")
    print("wrote",nm+".txt")

# buyback menu (upgrade ladder) for the two budget decks
for nm,rem in [("D1+Imp+Budg",REM_D1),("D3+Imp+Budg",REM_D3)]:
    print(f"\n--- {nm}: premium cards removed (buyback to upgrade), sorted by price ---")
    tot=0
    for c in sorted(set(rem),key=lambda x:-(price.get(front(x)) or 0)):
        p=price.get(front(c)) or 0; tot+=p
        print(f"  ${p:>7.2f}  {c}")
    print(f"  full buyback (restore everything): ${tot:,.2f}")

# ---------------- type distribution + provenance ----------------
def cat(name):
    t=typ.get(front(name),"")
    if "Land" in t: return "Land"
    if "Creature" in t: return "Creature"   # incl. artifact/enchantment creatures
    if "Planeswalker" in t: return "Planeswalker"
    if "Artifact" in t: return "Artifact"
    if "Enchantment" in t: return "Enchantment"
    if "Instant" in t: return "Instant"
    if "Sorcery" in t: return "Sorcery"
    if "Battle" in t: return "Battle"
    return "Other"
ORDER=["Creature","Land","Artifact","Enchantment","Instant","Sorcery","Planeswalker","Battle","Other"]
def dist(d):
    c={k:0 for k in ORDER}
    for n,q in d.items(): c[cat(n)]+=q
    c["Creature"]+=1  # Edgar (commander) is a creature
    return c
families=[("D1 family",[("D1",D1),("D1+Imp",D1IMP),("D1+Imp+Budg",D1IMPB)]),
          ("D3 family",[("D3",D3),("D3+Imp",D3IMP),("D3+Imp+Budg",D3IMPB)])]
for fam,decks in families:
    print(f"\n=== {fam}: type distribution (incl. commander) ===")
    dists=[(nm,dist(d)) for nm,d in decks]
    print(f"{'Type':<13}"+"".join(f"{nm:>14}" for nm,_ in dists))
    for k in ORDER:
        if any(dd[k] for _,dd in dists):
            print(f"{k:<13}"+"".join(f"{dd[k]:>14}" for _,dd in dists))
    print(f"{'TOTAL':<13}"+"".join(f"{sum(dd.values()):>14}" for _,dd in dists))

print("\n=== provenance of key drain cards (in which BASE decks?) ===")
for c in ["Bloodletter of Aclazotz","Bloodthirsty Conqueror","Exquisite Blood","Sanguine Bond","Vito, Thorn of the Dusk Rose"]:
    ind1 = c in D1; ind3 = c in D3
    print(f"  {c:<28} base D1: {'YES' if ind1 else 'no':<4}  base D3: {'YES' if ind3 else 'no'}")

# ---------------- FINAL: annotated guide + upgrade path for D3+Imp+Budg ----------------
def pr(n): 
    p=price.get(front(n)); return f"${p:,.2f}" if p else "$0.30"
land_swaps=[c for c in REM_D3 if c not in SUB_D3 and c not in CUT_D3]
combo_pkg=["Cathars' Crusade","Animation Module","Ashnod's Altar","Goblin Bombardment","Pitiless Plunderer","Oathsworn Vampire","Pawn of Ulamog","Scion of Opulence","Sanguine Bond","Bloodthirsty Conqueror","Bloodletter of Aclazotz","Vito, Thorn of the Dusk Rose"]
doubler_cuts=["Anointed Procession","Mondrak, Glory Dominus","Roaming Throne"]
filler_cuts=[c for c in CUT_D3 if c not in doubler_cuts]

T1=["Bolas's Citadel","Razaketh, the Foulblooded","Kindred Dominance","Enlightened Tutor","Phyrexian Altar"]
T2=sorted(land_swaps,key=lambda x:-(price.get(front(x)) or 0))
T3=["Anointed Procession","Mondrak, Glory Dominus","Roaming Throne"]
T4=["The One Ring","Trouble in Pairs","Purphoros, God of the Forge","Grave Pact"]

L=[]
L.append("EDGAR MARKOV  —  D3+Imp+Budg  (Budget Aristocrat-Combo)")
base=sum(P(n)*q for n,q in D3IMPB.items())+P(CMD)
L.append(f"~${base:,.0f} from scratch  |  Bracket 3 by count (Bracket-4 feel: 2 infinite combos)  |  Commander: Edgar Markov\n")
L.append("HOW IT WINS")
L.append("  Go wide with Edgar's eminence vampires + aristocrats, then close with EITHER infinite combo:")
L.append("   1) Cathars' Crusade + Animation Module + Ashnod's Altar  ->  infinite tokens/ETB/death  ->  Impact Tremors / Blood Artist")
L.append("   2) (Sanguine Bond or Vito) + Bloodthirsty Conqueror  ->  infinite life drain   [Bloodletter doubles it]\n")

L.append("BUDGET SUBSTITUTIONS  (placeholder  <-  premium it stands in for  |  upgrade cost)")
for prem,bud in sorted(SUB_D3.items(),key=lambda x:-(price.get(front(x[0])) or 0)):
    L.append(f"  {bud:<22} <- {prem:<26} {pr(prem)}")
L.append(f"\nMANA BASE  ({len(land_swaps)} premium lands replaced by basics  |  upgrade cost)")
for c in T2:
    L.append(f"  basic land            <- {c:<26} {pr(c)}")

L.append("\nNEW WIN ENGINE  (the deck — do NOT cut these)")
L.append("  "+", ".join(combo_pkg))
L.append("\nCUT FROM ORIGINAL D3")
L.append("  doublers replaced by the combo (it makes infinite tokens): "+", ".join(doubler_cuts))
L.append("  low-value filler: "+", ".join(filler_cuts))

L.append("\nUPGRADE PATH  (buy back in this order as budget allows)")
def tier(name,cards):
    L.append(f"  -- {name} --")
    sub=0
    for c in cards:
        p=price.get(front(c)) or 0; sub+=p
        L.append(f"     {pr(c):>9}  {c}")
    L.append(f"     subtotal: ${sub:,.2f}")
    return sub
g=0
g+=tier("Tier 1: engines & consistency (best value)",T1)
g+=tier("Tier 2: real manabase (fixing)",T2)
g+=tier("Tier 3: token doublers (raise ceiling)",T3)
g+=tier("Tier 4: luxury",T4)
L.append(f"\n  FULL upgrade to near-optimal: +${g:,.2f}  (deck total ~${base+g:,.0f})")

guide="\n".join(L)
open(os.path.join(OUT,"D3+Imp+Budg_GUIDE.txt"),"w").write(guide+"\n")
print(guide)
print("\n[wrote D3+Imp+Budg_GUIDE.txt]")
