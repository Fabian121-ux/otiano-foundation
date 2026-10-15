"""Fail closed if Vite output could overwrite server/backend files."""
from pathlib import Path

ROOT_FILES = {"index.html", "SMTIcon.png", "favicon.png", "lastlogoss.png", "ofdlogo-red.png", "og-image.png"}
BLOCKED_SUFFIXES = {".php", ".phtml", ".phar", ".sqlite", ".sqlite3", ".db", ".sql", ".ini", ".pem", ".key"}
DIST = Path("dist")


def main():
    if not (DIST / "index.html").is_file():
        raise SystemExit("Missing Vite entrypoint")
    files = []
    for path in sorted(DIST.rglob("*")):
        if path.is_symlink():
            raise SystemExit(f"Symlink forbidden: {path}")
        rel = path.relative_to(DIST)
        if any(part.startswith(".") for part in rel.parts):
            raise SystemExit(f"Dotfile forbidden: {rel}")
        if path.is_dir():
            if rel.parts[0] not in {"assets", "images"}:
                raise SystemExit(f"Unexpected directory: {rel}")
            continue
        if path.suffix.lower() in BLOCKED_SUFFIXES:
            raise SystemExit(f"Unsafe extension: {rel}")
        if rel.parts[0] == "assets":
            pass
        elif rel.as_posix() == "images/ofd-placeholder.svg":
            pass
        elif rel.as_posix() in ROOT_FILES:
            pass
        else:
            raise SystemExit(f"Unexpected frontend file: {rel}")
        files.append(rel.as_posix())
    if not any(name.startswith("assets/") and name.endswith(".js") for name in files):
        raise SystemExit("Missing compiled JavaScript")
    js = b"\n".join(path.read_bytes() for path in DIST.glob("assets/*.js"))
    if (b"https://api.otianofoundation.org/api" not in js
            or b"https://api.otianofoundation.org/uploads" not in js):
        raise SystemExit("Production API/upload URLs missing from compiled JavaScript")
    if b"example.invalid" in js:
        raise SystemExit("Testing API endpoint found in compiled JavaScript")
    print(f"Validated {len(files)} frontend-only deployment files")


if __name__ == "__main__":
    main()
