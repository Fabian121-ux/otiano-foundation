"""Import three owner-approved OFD landing photos, from a checksum-verified ZIP."""
from hashlib import sha256
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[2]
ARCHIVE = ROOT / '.import' / 'landing-photos.zip'
DEST = ROOT / 'src/assets/homepage'
HERO = ROOT / 'src/Components/HomeComponents/Home.jsx'
EXPECTED_SHA256 = '5e1dc4014e0808104cf096cd1a74d365222170c2e854ca6b23193f64862363ae'
NAMES = ('landing-speaker.jpg', 'landing-team.jpg', 'landing-students.png')

if not ARCHIVE.is_file() or sha256(ARCHIVE.read_bytes()).hexdigest() != EXPECTED_SHA256:
    raise SystemExit('Missing or incorrect approved landing-photos.zip')
with ZipFile(ARCHIVE) as archive:
    if sorted(archive.namelist()) != sorted(NAMES):
        raise SystemExit('Unexpected entries in landing photo ZIP')
    photos = {name: archive.read(name) for name in NAMES}
for name, image in photos.items():
    marker = bytes([255, 216, 255])  # Uploaded .png is actually a JPEG byte stream
    if not image.startswith(marker) or not 10_000 < len(image) < 3_000_000:
        raise SystemExit('Invalid approved image: ' + name)

original = HERO.read_text(encoding='utf-8')
new = original
changes = [
    ("import EducationImage from '../../assets/homepage/education.jpeg'",
     "import SpeakerPhoto from '../../assets/homepage/landing-speaker.jpg'\nimport TeamPhoto from '../../assets/homepage/landing-team.jpg'\nimport StudentsPhoto from '../../assets/homepage/landing-students.jpg'"),
    ("import AfricaImage from '../../assets/homepage/thirdimage.webp'", ""),
    ("button: 'Read Our Story', to: '/about/our-story', image: HealthcareImage",
     "button: 'Read Our Story', to: '/about/our-story', image: TeamPhoto"),
    ("button: 'Explore Education', to: '/education', image: EducationImage",
     "button: 'Explore Education', to: '/education', image: StudentsPhoto"),
    ("button: 'View Activities', to: '#activities', image: AfricaImage",
     "button: 'View Activities', to: '#activities', image: SpeakerPhoto"),
    ("position: '58% center',", "position: 'center 45%',"),
    ("position: '32% center',", "position: 'center 44%',"),
    ("position: 'center',\n  },\n]", "position: 'center 36%',\n  },\n]"),
    ("is-artwork", "is-photo"),
]
for old, replacement in changes:
    if new.count(old) != 1:
        raise SystemExit('Unexpected homepage code; refusing to edit: ' + old[:90])
    new = new.replace(old, replacement, 1)

DEST.mkdir(parents=True, exist_ok=True)
for name, image in photos.items():
    destination = name.replace('.png', '.jpg')
    (DEST / destination).write_bytes(image)
HERO.write_text(new, encoding='utf-8')
ARCHIVE.unlink()
print('Installed OFD landing photos: team (slide 1), pupils (slide 2), speaker (slide 4).')
