# Sagacious cPanel deployment — Otiano Foundation

**Status:** GitHub compilation is automatic after pushes to main. cPanel publication remains manual and requires the two actions below.

The original developer's .env.production specified the public frontend endpoints
https://api.otianofoundation.org/api and https://api.otianofoundation.org/uploads.
These are embedded in a client-side React/Vite build, not secrets. Validate that they
still work in production before publishing.

## Publish through cPanel

1. Check GitHub Actions > "Compile production frontend for cPanel" is successful,
   and the bot committed compiled files under dist/ in main.
2. In cPanel > Files > Git Version Control > otiano-foundation > Manage > Pull or Deploy,
   click "Update from Remote". It should pull .cpanel.yml and dist/ into the clone.
3. Check the HEAD SHA is up to date. Click "Deploy HEAD Commit" once.
4. Verify https://otianofoundation.org: homepage, mobile navigation, trustees, news,
   events, admin login, and API-dependent functions.

The .cpanel.yml file invokes scripts/deploy_frontend.sh. This script:
- validates the dist/ shape and refuses unsafe files;
- makes a private snapshot under /home/otianofo/otiano-frontend-backups/;
- copies only compiled JS/CSS/media assets, a fixed set of frontend icons, the
  branded placeholder image and index.html (index.html is switched last);
- does NOT overwrite public_html/.htaccess, PHP, SQLite, the API/portal folders
  or uploads; does NOT delete previously deployed assets.

**Rollback:** Restore the snapshot's index.html, icon files and assets/ into
public_html using File Manager if anything fails. Old hashed assets are retained.

**Restrictions:** cPanel clone must have a clean git worktree. The script assumes
that the cPanel username/home path and public_html document root match the owner's
screenshots. We have NOT yet tested on the real hosting server. No direct hosting
connection, staging test or post-deploy production health check has been verified.
Do not treat a successful GitHub build as evidence the live site has updated.

In this setup, GitHub changes do not automatically reach the cPanel clone. Do the
two cPanel operations each time an approved change is ready to publish. No
hosting passwords or SSH/SFTP secrets are needed.
