# Otiano Foundation for Development

Source for the public website at https://otianofoundation.org.

## Architecture

- **Public frontend:** React + Vite, located in `src/` and `public/`.
- **Admin interface:** React routes; API-dependent functionality requires the existing live backend.
- **Separate backend source:** PHP + SQLite in `php-backend/`. The PHP backend and database are **not deployed** by the frontend workflow.
- **Production hosting:** Sagacious Teck cPanel shared hosting.
- **GitHub:** version control and automated frontend build. A successful GitHub build does **not** prove that changes are live.

## Local development

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Copy `.env.example` to a local `.env` and supply the relevant API and upload URLs.
Do not commit private configuration or credentials.

## Publishing the frontend

1. Merge an approved PR into `main`.
2. GitHub Actions automatically builds `dist/` using the configured public production API/upload URLs, validates its content, and commits frontend build files.
3. In **cPanel → Git Version Control → otiano-foundation → Manage → Pull or Deploy**, select **Update from Remote**, then **Deploy HEAD Commit**.
4. The checked-in `.cpanel.yml` uses `scripts/deploy_frontend.sh` to back up and update **frontend-only** files. It does not replace the backend, portal, uploads, database, or Apache rewrite rules.
5. Check the deployed public site and functional pages before considering the release complete.

Full instructions and limitations: [cPanel deployment instructions](docs/CPANEL_DEPLOY.md).

## Website status monitoring

A read-only GitHub Actions public-site smoke test runs daily (and supports manual runs).
It checks public homepage content and that a compiled JS asset is accessible.
It **does not verify** production deploy commit, admin login, database, or API availability.

## Editorial work still needed

- Documented activities require approved photos, dates, locations, and verified outcomes.
- Six non-founder trustee profiles still await approved biographies.
- Do not publish unsupported impact statistics.
- Founder biography must remain sourced from Foundation-approved content.

## Security / operational notes

**Do not upload or expose live database files or credentials.**
Backend authentication and upload handling require a dedicated security review before any backend rollout. The included PHP source should not be assumed to match the server's currently deployed implementation.

This is a live public nonprofit website: verify all hosting paths, keep rollback copies, and do not deploy unreviewed changes.
