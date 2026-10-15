#!/usr/bin/env bash
# Deploy only the prebuilt React frontend through cPanel's Git deployment feature.
set -euo pipefail
umask 077

REPO=/home/otianofo/repositories/otiano-foundation
DOCROOT=/home/otianofo/public_html
BACKUP_ROOT=/home/otianofo/otiano-frontend-backups
DIST="$REPO/dist"

# Fail before touching the live site when paths or compiled files are missing.
[[ -d "$REPO/.git" && -d "$DOCROOT" && -d "$DIST/assets" && -f "$DIST/index.html" ]] || {
  echo 'ERROR: repository, document root, or compiled frontend missing' >&2
  exit 1
}
[[ ! -L "$DIST" && ! -L "$DIST/assets" && ! -L "$DOCROOT" ]] || {
  echo 'ERROR: symbolic link in deployment root' >&2
  exit 1
}
[[ -n "$(find "$DIST/assets" -type f -name '*.js' -print -quit)" ]] || {
  echo 'ERROR: compiled JavaScript assets missing' >&2
  exit 1
}
[[ -z "$(find "$DIST" -type l -print -quit)" ]] || {
  echo 'ERROR: symbolic links forbidden in frontend output' >&2
  exit 1
}
[[ -z "$(find "$DIST" -mindepth 1 -name '.*' -print -quit)" ]] || {
  echo 'ERROR: hidden files forbidden in frontend output' >&2
  exit 1
}
[[ -z "$(find "$DIST" -type f \( -name '*.php' -o -name '*.sqlite' -o -name '*.db' -o -name '*.pem' -o -name '*.key' \) -print -quit)" ]] || {
  echo 'ERROR: backend or sensitive file in frontend output' >&2
  exit 1
}
while IFS= read -r name; do
  case "$name" in
    index.html|SMTIcon.png|favicon.png|lastlogoss.png|ofdlogo-red.png|og-image.png) ;;
    *) echo "ERROR: unexpected root file: $name" >&2; exit 1 ;;
  esac
done < <(find "$DIST" -maxdepth 1 -type f -printf '%f\n')
while IFS= read -r name; do
  case "$name" in
    assets|images) ;;
    *) echo "ERROR: unexpected build directory: $name" >&2; exit 1 ;;
  esac
done < <(find "$DIST" -mindepth 1 -maxdepth 1 -type d -printf '%f\n')
if [[ -d "$DIST/images" ]]; then
  [[ -z "$(find "$DIST/images" -type f ! -name 'ofd-placeholder.svg' -print -quit)" ]] || {
    echo 'ERROR: unapproved image output' >&2
    exit 1
  }
fi

# Back up existing frontend-owned files in the private home directory.
# The PHP backend, database, API and portal are never copied or changed.
/bin/mkdir -p "$BACKUP_ROOT"
/bin/chmod 700 "$BACKUP_ROOT"
REV="$(git -C "$REPO" rev-parse --short=12 HEAD)"
BACKUP="$BACKUP_ROOT/$(date -u +%Y%m%dT%H%M%SZ)-$REV"
/bin/mkdir "$BACKUP"
for file in index.html SMTIcon.png favicon.png lastlogoss.png ofdlogo-red.png og-image.png; do
  if [[ -f "$DOCROOT/$file" ]]; then /bin/cp -p "$DOCROOT/$file" "$BACKUP/$file"; fi
done
if [[ -d "$DOCROOT/assets" ]]; then /bin/cp -a "$DOCROOT/assets" "$BACKUP/assets"; fi
if [[ -f "$DOCROOT/images/ofd-placeholder.svg" ]]; then
  /bin/mkdir -p "$BACKUP/images"
  /bin/cp -p "$DOCROOT/images/ofd-placeholder.svg" "$BACKUP/images/ofd-placeholder.svg"
fi

# Merge compiled assets into place. Do not delete old hashed files.
/bin/mkdir -p "$DOCROOT/assets"
/bin/cp -a "$DIST/assets/." "$DOCROOT/assets/"
if [[ -f "$DIST/images/ofd-placeholder.svg" ]]; then
  /bin/mkdir -p "$DOCROOT/images"
  /bin/cp -p "$DIST/images/ofd-placeholder.svg" "$DOCROOT/images/ofd-placeholder.svg"
fi
for file in SMTIcon.png favicon.png lastlogoss.png ofdlogo-red.png og-image.png; do
  if [[ -f "$DIST/$file" ]]; then /bin/cp -p "$DIST/$file" "$DOCROOT/$file"; fi
done
# Switch HTML last, once referenced assets are already present.
TEMP_HTML="$DOCROOT/.otiano-index-tmp-$$"
trap '/bin/rm -f "$TEMP_HTML"' EXIT
/bin/cp -p "$DIST/index.html" "$TEMP_HTML"
/bin/mv -f "$TEMP_HTML" "$DOCROOT/index.html"
echo "Frontend deployed from $REV. Rollback snapshot: $BACKUP"
