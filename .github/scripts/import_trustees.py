"""Import seven owner-supplied trustee portraits; preserve the originals."""
from __future__ import annotations

from hashlib import sha256
from pathlib import Path
import re
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
ARCHIVE = ROOT / ".import" / "trustee-photos.zip"
DEST = ROOT / "src" / "assets" / "trustees"
TRUSTEES = ROOT / "src" / "Components" / "Trustees" / "Trustess.jsx"
FOUNDER = ROOT / "src" / "Components" / "About" / "FoundersMessage.jsx"

EXPECTED_SHA256 = "ef1b90bdcc9d79a8f9c82dbdd5f96559770b4b2818482900300513aaa28b4bba"
NAMES = [
    "kingsley-otiaba.jpg",
    "david-achugbu.jpg",
    "raphael-anyanwu.jpg",
    "zanang-awan.jpg",
    "cheeka-onyeka.jpg",
    "ekeoma-solomon-ogbu.jpg",
    "lucy-simon-ashide.jpg",
]

if not ARCHIVE.is_file():
    raise SystemExit("Upload .import/trustee-photos.zip to proceed")
if sha256(ARCHIVE.read_bytes()).hexdigest() != EXPECTED_SHA256:
    raise SystemExit("Wrong archive: expected the exact seven approved photographs")
with ZipFile(ARCHIVE) as z:
    if sorted(z.namelist()) != sorted(NAMES):
        raise SystemExit("Portrait names mismatch; no files replaced")
    images = {name: z.read(name) for name in NAMES}
for name, data in images.items():
    if len(data) > 4_000_000 or not data.startswith(b"\xff\xd8\xff"):
        raise SystemExit(f"Invalid JPEG: {name}")

source = TRUSTEES.read_text(encoding="utf-8")
import_pattern = r"^import (?:Cheeka|Ekeoma|David|Kingsley|Awan|Lucy) from .*?\r?\n"
source, old_import_count = re.subn(import_pattern, "", source, flags=re.MULTILINE)
if old_import_count != 6:
    raise SystemExit(f"Expected 6 old trustee imports; got {old_import_count}")
imports = "\n".join(
    f"import {symbol} from '../../assets/trustees/{filename}'"
    for symbol, filename in [
        ("Kingsley", NAMES[0]),
        ("David", NAMES[1]),
        ("Raphael", NAMES[2]),
        ("Awan", NAMES[3]),
        ("Cheeka", NAMES[4]),
        ("Ekeoma", NAMES[5]),
        ("Lucy", NAMES[6]),
    ]
)
source = source.replace(
    "import { Link } from 'react-router-dom'",
    "import { Link } from 'react-router-dom'\n" + imports,
    1,
)

new_array = """const trustees = [
  { name: founderProfile.name, image: Kingsley, role: 'Founder and Executive Chairman', founder: true },
  { name: 'David Achugbu', image: David, role: 'Secretary, Board of Trustees' },
  { name: 'Raphael Anyanwu', image: Raphael, role: 'Trustee' },
  { name: 'Zanang Awan', image: Awan, role: 'Trustee' },
  { name: 'Cheeka Onyeka Esq.', image: Cheeka, role: 'Trustee' },
  { name: 'Ekeoma Solomon Ogbu Esq.', image: Ekeoma, role: 'Trustee' },
  { name: 'Lucy Simon Ashide', image: Lucy, role: 'Trustee' },
]

function Trustees"""
source, n = re.subn(r"const trustees = \[.*?\]\s*function Trustees", lambda _: new_array, source, count=1, flags=re.DOTALL)
if n != 1:
    raise SystemExit("Could not find original trustee cards; stopped")
founder_source = FOUNDER.read_text(encoding="utf-8")
founder_source, m = re.subn(
    "from '../../assets/trustees/Kingsley Otiaba.png'",
    "from '../../assets/trustees/kingsley-otiaba.jpg'",
    founder_source,
    count=1,
)
if m != 1:
    raise SystemExit("Could not find founder portrait import; stopped")

DEST.mkdir(parents=True, exist_ok=True)
for name, data in images.items():
    (DEST / name).write_bytes(data)
TRUSTEES.write_text(source, encoding="utf-8")
FOUNDER.write_text(founder_source, encoding="utf-8")
ARCHIVE.unlink()
print("Imported all seven trustee portraits in approved order, including founder profile.")
