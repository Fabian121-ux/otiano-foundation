"""Unpack the verified 3-part Otiano Foundation source archive into this repository."""
from __future__ import annotations
import hashlib
import io
from pathlib import Path, PurePosixPath
import shutil
import stat
import zipfile

ROOT = Path(__file__).resolve().parents[2]
PARTS = ROOT / ".import"
PART_NAMES = [f"otiano-foundation.part{i:03d}" for i in range(1, 4)]
EXPECTED_SHA256 = "b8df0ad0443829c3f7e4d29289fb4a5ce5bbe285136c85ec5f2e66041672bb59"

missing = [name for name in PART_NAMES if not (PARTS / name).is_file()]
if missing:
    raise SystemExit(f"Missing source archive parts: {', '.join(missing)}")
archive_data = b"".join((PARTS / name).read_bytes() for name in PART_NAMES)
actual_digest = hashlib.sha256(archive_data).hexdigest()
if actual_digest != EXPECTED_SHA256:
    raise SystemExit(f"Archive checksum mismatch: {actual_digest}")
with zipfile.ZipFile(io.BytesIO(archive_data)) as archive:
    files = [info for info in archive.infolist() if not info.is_dir()]
    if len(files) != 151:
        raise SystemExit(f"Expected 151 source files; found {len(files)}")
    checked = []
    for info in files:
        if "\\" in info.filename:
            raise SystemExit(f"Invalid archive path: {info.filename}")
        p = PurePosixPath(info.filename)
        if p.is_absolute() or ".." in p.parts or len(p.parts) < 2 or p.parts[0] != "otiano-foundation":
            raise SystemExit(f"Unexpected archive path: {info.filename}")
        subpath = PurePosixPath(*p.parts[1:])
        if subpath.parts[0] in {".git", ".github", ".import"}:
            raise SystemExit(f"Cannot overwrite repository metadata: {subpath}")
        filename = subpath.name.lower()
        if filename == ".env" or (filename.startswith(".env.") and filename != ".env.example") or filename.endswith((".sqlite", ".sqlite3", ".db")):
            raise SystemExit(f"Private file in source package: {subpath}")
        mode = (info.external_attr >> 16) & 0xFFFF
        if stat.S_ISLNK(mode):
            raise SystemExit(f"Symlink not allowed: {subpath}")
        checked.append((info, subpath))
    for info, path in checked:
        dest = ROOT.joinpath(*path.parts)
        dest.parent.mkdir(parents=True, exist_ok=True)
        with archive.open(info) as source, dest.open("wb") as target:
            shutil.copyfileobj(source, target)
shutil.rmtree(PARTS)
print(f"Imported {len(files)} verified source files; removed temporary archive parts.")
