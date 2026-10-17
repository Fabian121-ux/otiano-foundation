# Two approved trustee-page photographs

Upload **ofd-trustees-photo-update.zip** to this `.import/` folder on the
`improve/trustees-banner-zanang-profile` branch and commit it.

The ZIP contains exactly:
- `trustees-hero.jpg`: approved portrait with red background, for the **Our Trustees** header background only.
- `zanang-diana-awan.jpg`: approved studio portrait replacing the existing photo for **Miss Zanang Diana Awan**.

The workflow checks the entire archive against its SHA-256, installs both
photos, updates the source imports, runs build and lint, then removes this temporary
ZIP and import workflow. It does **not** deploy to production.
