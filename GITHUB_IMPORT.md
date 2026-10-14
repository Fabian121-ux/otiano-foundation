# Push source into a NEW GitHub repository

The intended name is `otiano-foundation` (GitHub repository names do not contain spaces), owned by `Fabian121-ux`.

This package is prepared; it has not yet been uploaded or pushed to GitHub.

## On a computer with Git and GitHub CLI (`gh`) installed

Extract the ZIP and open a terminal inside the `otiano-foundation` folder. Then run:

```bash
gh auth login
git init -b main
git add .
git commit -m "Initial Otiano Foundation website source"
gh repo create Fabian121-ux/otiano-foundation --private --source=. --remote=origin --push
```

If a repository with that name already exists, create a different name or push using its remote URL instead. Do not paste passwords or access tokens into this chat.

The package intentionally omits environment files, live SQLite data, dependencies, compiled site output, old Git history and a duplicate PHP archive. These should not be publicly published.
