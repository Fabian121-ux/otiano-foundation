# Otiano Foundation — Website source

Source snapshot supplied by the previous developer, prepared for a new private GitHub repository.

## Stack
- React + Vite frontend (`src/`, `public/`)
- PHP + SQLite backend (`php-backend/`)

## Local frontend setup
1. Install a recent Node.js LTS version.
2. Run `npm ci`.
3. Copy `.env.example` to `.env` and set the correct deployment API URLs.
4. Run `npm run dev`.

The PHP backend must be hosted separately with PHP SQLite support and appropriate web-server rewrite rules.

## Important
- The source was not deployed or tested against the live production server.
- `node_modules/`, `dist/`, and the old developer's `.git/` history are excluded because they are generated/developer-specific files; `npm ci` recreates dependencies and `npm run build` regenerates the bundle.
- `.env` variants, `php-backend/database.sqlite`, old backend ZIP backup and uploaded runtime data are excluded for privacy/security. Preserve the original archive securely if those deployment-specific items are needed for migration.
- The default credentials in `php-backend/create_admin.php` were replaced by `OTIANO_ADMIN_EMAIL` and `OTIANO_ADMIN_PASSWORD` environment variables; ensure both are set before running it.
- The backend authorization logic requires a separate security review before deployment; possession of an arbitrary token may be sufficient in the existing implementation.

## GitHub import
See `GITHUB_IMPORT.md`. Keep the repository **private** until all authentication, database and data-protection concerns have been reviewed.
