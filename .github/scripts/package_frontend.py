"""Package frontend files only. This CI archive is NOT approved for deployment."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT_FILES = {"index.html", "SMTIcon.png", "favicon.png", "lastlogoss.png",
              "ofdlogo-red.png", "og-image.png", "images/ofd-placeholder.svg"}
BLOCKED_SUFFIXES = {".php", ".phtml", ".phar", ".sqlite", ".sqlite3", ".db",
                    ".sql", ".ini", ".pem", ".key"}
SOURCE = Path("dist")

def collect(source):
    if not (source / "index.html").is_file():
        raise ValueError("Missing build entry point")
    selected = []
    for path in sorted(source.rglob("*")):
        if path.is_symlink():
            raise ValueError("Symlinks are not allowed")
        rel = path.relative_to(source)
        if path.is_dir():
            if rel.parts[0] != "assets" and rel.as_posix() != "images":
                raise ValueError("Unexpected build directory")
            continue
        # Never copy build-generated Apache configuration to the server.
        if rel.as_posix() == ".htaccess":
            continue
        if any(part.startswith(".") for part in rel.parts):
            raise ValueError("Hidden files are not allowed")
        if path.suffix.lower() in BLOCKED_SUFFIXES:
            raise ValueError("Backend or sensitive file in frontend output")
        if rel.as_posix() not in ROOT_FILES and rel.parts[0] != "assets":
            raise ValueError("Unexpected frontend file; review the allowlist")
        selected.append((path, rel.as_posix()))
    if not any(name.startswith("assets/") and name.endswith(".js") for _, name in selected):
        raise ValueError("Missing JavaScript bundle")
    return selected

def main():
    files = collect(SOURCE)
    manifest = {
        "purpose": "CI compilation verification only; do not deploy",
        "files": {name: hashlib.sha256(path.read_bytes()).hexdigest()
                  for path, name in files},
    }
    with zipfile.ZipFile("frontend-ci-only.zip", "w", zipfile.ZIP_DEFLATED) as archive:
        for path, name in files:
            archive.write(path, name)
        archive.writestr("frontend-manifest.json", json.dumps(manifest, indent=2))
    print(f"Packaged {len(files)} frontend files; Apache configuration excluded")

if __name__ == "__main__":
    main()
