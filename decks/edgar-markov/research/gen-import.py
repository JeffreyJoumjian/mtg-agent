"""Generate importable decklists, joining each DECK-*.md against its own preferred-printings file.
Run from decks/edgar-markov/:  python3 research/gen-import.py"""
import re

DECKS = [
    ('DECK-SACRIFICE.md', 'research/printings-sacrifice.txt', 'research/sacrifice-import-2026-08-25.txt'),
    ('DECK-COMBAT.md',    'research/printings-combat.txt',    'research/combat-import-2026-08-25.txt'),
]

def printings(path):
    pref = {}
    for line in open(path):
        m = re.match(r'^\d+\s+(.+?)\s+(\([A-Z0-9]+\)\s+\S+)\s*$', line.strip())
        if m:
            pref[m.group(1).split(' // ')[0]] = m.group(2)
    return pref

for src, pref_path, dst in DECKS:
    pref = printings(pref_path)
    lines = [l.rstrip() for l in open(src) if re.match(r'^\d+ ', l)]
    cmd = [l for l in lines if l.endswith('Edgar Markov')]
    rest = sorted((l for l in lines if l not in cmd), key=lambda x: re.sub(r'^\d+ ', '', x))
    out, missing = [], []
    for l in cmd + rest:
        qty, name = re.match(r'^(\d+) (.+?)\s*$', l).groups()
        p = pref.get(name)
        out.append(f"{qty} {name} {p}" if p else f"{qty} {name}")
        if not p:
            missing.append(name)
    open(dst, 'w').write('\n'.join(out) + '\n')
    total = sum(int(x.split()[0]) for x in out)
    print(f"{dst}: {total} cards | no printing ({len(missing)}): {', '.join(missing) or 'none'}")
