# Deployment preparation and investigation

Status: BUILD VALIDATION PREPARED; HOSTING DEPLOYMENT NOT CONFIGURED.

## Verified on 14 October 2026
- GitHub integration has administrative access to this repository; default branch is main.
- React/Vite frontend: npm ci and npm run build; output is dist/.
- PHP backend is separate in php-backend/. No PHP or database changes were made.
- The hosting client area shows an active Shared Hosting STARTER PLAN.
- Client-area authentication succeeded.
- cPanel single sign-on and the canonical cPanel origin at https://pro.hosting.markets:2083/ returned 502 Bad Gateway / connection refused from the cloud browser.
- SSH/SFTP, shell access, live permissions and server-side deployment options remain unknown.
- The paths supplied by the owner have not been verified on the server.

## Build validation workflow
.github/workflows/frontend-build.yml runs on pull requests to main, main pushes, the preparation branch, and manual dispatch. Node 22, locked npm dependencies, immutable action SHAs, read-only repository permissions and a 15-minute timeout are used.

The archive is compilation-only and deliberately uses example.invalid API URLs. It must NEVER be uploaded to production. Production URLs must first be verified against the current live frontend/backend configuration.

.github/scripts/package_frontend.py uses an explicit frontend allowlist and checks file hashes. It excludes .htaccess and rejects unexpected directories, symlinks, hidden files and backend/database file types. The resulting archive contains a CI-only manifest; it is not a server upload payload.

## Findings
src/services/api.js falls back to localhost URLs when VITE_API_BASE_URL or VITE_UPLOAD_URL is missing. Production builds must fail closed if verified HTTPS endpoint settings are absent. VITE settings are public browser configuration, not secrets.

public/.htaccess is copied by Vite into dist/. It must not replace the existing live .htaccess without a separate reviewed change.

No staging upload, backup, production deployment or rollback test has occurred.

## Required continuation
1. Restore cloud-browser connectivity to the provider's cPanel destination, or obtain a provider-confirmed reachable control-panel/SSH endpoint.
2. Inspect Git Version Control, Terminal, SSH Access, document roots, existing frontend asset inventory, backend URLs, ownership/permissions and disk space. Read configuration without printing credentials.
3. If SSH is supported, prefer a dedicated deployment key with limited access. Pin the SSH host key using a trusted provider source, not blind trust of ssh-keyscan. Credentials belong in GitHub Actions environment secrets.
4. Configure a staging destination outside production. Build with verified endpoint settings; validate payload and checksums. Test upload and serving before production.
5. Configure main branch review/check requirements and a production environment with required reviewers and a main-only branch policy. Do not activate a production workflow before owner approval.
6. Use an explicit manifest of frontend-owned files; never mirror/delete public_html. Never copy PHP, SQLite, API/portal directories, uploads or unrelated hosting configuration.
7. Before production, preserve the exact existing frontend files and any overwritten frontend-owned paths in a timestamped private backup outside public_html. Record hashes; test restoration in staging.
8. Upload assets before switching index.html atomically where supported. Retain old hashed assets for rollback and cached visitors. Serialize deployments; abort on permission, manifest, backup or upload failures.
9. Verify frontend routes, referenced assets and read-only API behavior; restore the prior frontend on a failed health check.
10. After explicit production approval, merge approved changes into main; the future deployment workflow should build automatically and wait for production environment approval before receiving secrets or touching live files.

The hosting method cannot responsibly be finalized until its supported capabilities and staging behavior are verified.

## Local test results
npm ci succeeded. The original Linux build failed on two case-sensitive trustee image imports. Correcting the imports to match the existing filenames made npm run build pass. Frontend packaging passed, and negative tests rejected API, portal, uploads, SQLite, hidden files and symlinks. GitHub Actions run 38594058888 passed dependency installation, production compilation, frontend packaging and artifact upload. These checks validate build preparation, not hosting deployment.

## Live read-only check
The cloud browser displayed the Foundation homepage at https://otianofoundation.org/ successfully. A container HTTP request instead redirected to https://www.hostseo.uk/. This environment-dependent discrepancy remains unexplained; future automated production health checks must verify the expected Foundation content, not merely HTTP 200.
