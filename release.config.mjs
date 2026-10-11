import { createRequire } from "node:module";

// Resolve the direct dependency so the analyzer and notes generator use the
// same preset, even if another tool installs a different version transitively.
// Knip ignores these dynamically resolved preset/plugin dependencies explicitly.
const conventionalCommits = createRequire(import.meta.url).resolve(
  "conventional-changelog-conventionalcommits",
);

export default {
  branches: ["main"],
  // biome-ignore lint/suspicious/noTemplateCurlyInString: semantic-release interpolates this placeholder.
  tagFormat: "v${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        config: conventionalCommits,
        releaseRules: [
          { breaking: true, release: "major" },
          { type: "revert", release: "patch" },
          { type: "docs", release: false },
          { type: "test", release: false },
          { type: "chore", release: false },
          { type: "refactor", release: false },
          { type: "style", release: false },
          { type: "build", release: false },
          { type: "ci", release: false },
        ],
      },
    ],
    ["@semantic-release/release-notes-generator", { config: conventionalCommits }],
    // Tags and GitHub Releases are the version/changelog. No package publishing
    // or version-bump commits back to the protected production branch.
    "@semantic-release/github",
  ],
};
