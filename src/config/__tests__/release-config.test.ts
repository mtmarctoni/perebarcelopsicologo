import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("release configuration", () => {
  it("loads the preset and preserves release levels and generated notes", () => {
    const output = execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
          import config from './release.config.mjs';
          import { analyzeCommits } from '@semantic-release/commit-analyzer';
          import { generateNotes } from '@semantic-release/release-notes-generator';
          const logger = { log() {} };
          const levels = [];
          for (const message of ['chore(deps): update dependencies', 'fix(contact): restore booking', 'feat(home): add service', 'feat(routes)!: remove old route\\n\\nBREAKING CHANGE: old route removed']) {
            levels.push(await analyzeCommits(config.plugins[0][1], { commits: [{ message, hash: 'abc1234' }], logger }));
          }
          const notes = await generateNotes(config.plugins[1][1], {
            commits: [{ message: 'fix(contact): restore booking', hash: 'abc1234' }],
            logger,
            options: { repositoryUrl: 'https://github.com/mtmarctoni/perebarcelopsicologo.git' },
            lastRelease: { version: '1.0.0', gitTag: 'v1.0.0' },
            nextRelease: { version: '1.0.1', gitTag: 'v1.0.1' },
          });
          console.log(JSON.stringify({ levels, notes }));
        `,
      ],
      { encoding: "utf8" },
    );
    const result = JSON.parse(output);
    expect(result.levels).toEqual([null, "patch", "minor", "major"]);
    expect(result.notes).toContain("restore booking");
    expect(result.notes).toContain("1.0.1");
  });
});
