"""One-time, checksum-verified importer for two Foundation-approved trustee photos."""
from hashlib import sha256
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
ARCHIVE = ROOT / '.import/ofd-trustees-photo-update.zip'
ASSETS = ROOT / 'src/assets/trustees'
PAGE = ROOT / 'src/Components/Trustees/Trustess.jsx'
EXPECTED_HASH = '332105b35db35711d47b7c2a07a4f0974f9c69716a47e7e769d0145ab837f0e5'
NAMES = ('trustees-hero.jpg', 'zanang-diana-awan.jpg')

if not ARCHIVE.is_file() or sha256(ARCHIVE.read_bytes()).hexdigest() != EXPECTED_HASH:
    raise SystemExit('Uploaded ZIP does not match the two approved trustee photographs.')
with ZipFile(ARCHIVE) as z:
    if sorted(z.namelist()) != sorted(NAMES):
        raise SystemExit('Archive must contain exactly the two approved JPG files.')
    photos = {name: z.read(name) for name in NAMES}
for name, data in photos.items():
    if not data.startswith(bytes([255, 216, 255])) or not 50_000 < len(data) < 4_000_000:
        raise SystemExit('Invalid original JPEG: ' + name)

source = PAGE.read_text(encoding='utf-8')
changes = [
    ("import Awan from '../../assets/trustees/zanang-awan.jpg'",
     "import Awan from '../../assets/trustees/zanang-diana-awan.jpg'\nimport TrusteesHero from '../../assets/trustees/trustees-hero.jpg'"),
    ('<section className="brand-hero trustees-hero" aria-label="Our Trustees">',
     '<section className="brand-hero trustees-hero" aria-label="Our Trustees">\n'
     '        <img src={TrusteesHero} alt="" decoding="async" fetchPriority="high" className="trustees-hero-image" />'),
]
for old, new in changes:
    if source.count(old) != 1:
        raise SystemExit('Expected trustee page structure missing: ' + old[:90])
    source = source.replace(old, new, 1)
if "name: 'Miss Zanang Diana Awan'" not in source or 'stronger, more resilient communities.' not in source:
    raise SystemExit('Approved Zanang biography is missing.')

ASSETS.mkdir(parents=True, exist_ok=True)
for name, data in photos.items():
    (ASSETS / name).write_bytes(data)
PAGE.write_text(source, encoding='utf-8')
print('Installed red portrait hero background and Miss Zanang Diana Awan studio portrait.')
