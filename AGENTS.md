# AGENTS.md

## Branch Strategy

- **main**: Production branch. Small, self-contained changes and bug fixes may open PRs directly against `main`.
- **develop**: Client-preview branch for larger features, especially when a feature spans multiple PRs. Target those PRs at `develop` to preview and iterate with the client without affecting production. When the feature is ready for production, open a PR from `develop` to `main`.
- Always work on a feature or bugfix branch and deliver changes through a PR; never commit directly to `main`.
- Never merge a PR without explicit user approval.
