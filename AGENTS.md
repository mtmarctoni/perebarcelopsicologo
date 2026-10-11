# AGENTS.md

## Branch Strategy

- **main**: Production branch. Small, self-contained changes and bug fixes may open PRs directly against `main`.
- **develop**: Client-preview branch for larger features, especially when a feature spans multiple PRs. Target those PRs at `develop` to preview and iterate with the client without affecting production. When the feature is ready for production, open a PR from `develop` to `main`.
- Always work on a feature or bugfix branch and deliver changes through a PR; never commit directly to `main`.
- Never merge a PR without explicit user approval.

## Release Versioning

Every push to `main` runs `.github/workflows/release.yml` with semantic-release.
`release.config.mjs` derives the version from conventional commit messages,
creates a `vX.Y.Z` Git tag, and publishes generated notes as a GitHub Release.
`develop` and feature branches do not publish releases.

### Source of truth

- The Git tag is the release version. Leave `package.json` at `0.0.0-development`.
- Do not manually bump versions, add version-bump commits, or maintain a second changelog.
- Releases do not publish an npm package or commit changes back to `main`.
- Vercel deploys independently. A release records code on `main`, not proof of a successful production deployment. Use Vercel's deployment record and commit SHA to identify the exact live build, including housekeeping commits that do not produce a release.
- No version number needs to be displayed to website visitors.

### Commit messages drive releases

Use `type(scope): description`, with an optional scope describing the affected area.
Choose the type based on the effect of the change, not the files edited or the size of the diff.

| Commit | Release | Website examples |
| --- | --- | --- |
| `feat` | Minor | New service page, redesigned hero, new booking option |
| `fix` | Patch | Broken mobile layout, incorrect metadata, corrected client-facing copy |
| `perf` | Patch | Faster image loading, less client-side JavaScript |
| `revert` | Patch | Reverting a previously released change |
| `docs`, `test`, `chore`, `refactor`, `style`, `build`, `ci` | None | Repository docs, tests, routine dependency updates, behavior-preserving cleanup |
| Any type with a breaking change | Major | Removing an established URL without a redirect, incompatible integration changes |

Examples:

```text
feat(services): add couples therapy page
feat(home): redesign the hero section
fix(contact): restore the booking link on mobile
fix(seo): correct the canonical URL
perf(images): reduce hero image download size
chore(deps): update dependencies
docs: document release conventions
```

`style` means code formatting only; a visible design improvement is usually `feat`
and a visual bug correction is `fix`. Repository documentation is `docs`, but
client-facing website content is not automatically `docs`: classify it as `feat`
or `fix` when it adds or corrects something for visitors.

For an actual compatibility break, use `!` and explain the impact in a footer:

```text
feat(routes)!: remove the legacy booking URL

BREAKING CHANGE: /old-booking is no longer available; integrations must use /contacto.
```

A redesign is not automatically a breaking change. Prefer redirects when changing
URLs. Do not mark a commit as breaking just to obtain a particular version number.
The highest release level among commits since the last release wins.

### Preserve release intent when merging

- For a squash merge, the final squash commit must have a conventional subject. Set the PR title accordingly and check the final commit message; semantic-release reads commits on `main`, not PR titles directly.
- If a squash combines multiple changes, its subject must reflect the highest release level. Preserve any `BREAKING CHANGE:` footer in the final commit body.
- For a multi-PR client milestone merged from `develop` to `main`, prefer preserving the individual conventional commits so release notes retain each feature and fix. If squashing the milestone, write a meaningful conventional summary and describe the shipped changes in the body.
- Do not label a user-visible fix as `chore` or a new capability as `refactor`: that suppresses the release.
- Routine dependency changes use `chore(deps)`; use `fix` when the purpose is to resolve a real bug or security vulnerability.

### Initial release and verification

The first qualifying run creates `v1.0.0` using the existing conventional commit
history. The historical `v1.0-pre-wp-removal` tag is a checkpoint, not a release
in this stable `vX.Y.Z` stream; leave it intact. Subsequent releases analyze only
commits since the last release tag. Housekeeping-only changes do not create tags.

Use `pnpm release:dry` on `main` with GitHub credentials to preview a release
without publishing it. On a feature branch it skips publication because only
`main` is configured; this is not a validation of the next production version.
To retry a failed release, dispatch the Release workflow on `main`.
