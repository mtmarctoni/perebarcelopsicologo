// Prevent `zod` from leaking into the client bundle.
//
// Allowed server-only paths (add as needed):
//   - src/app/api/
//   - server-*.config.ts
//   - *.server.ts
//
// Usage: node scripts/check-server-only-imports.mjs

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, sep } from "node:path";

const ALLOWED_PATTERNS = [
  (p) => p.startsWith(`src${sep}app${sep}api${sep}`),
  (p) => p.includes(`${sep}server-`) && p.endsWith(".config.ts"),
  (p) => /\.server\.(ts|tsx)$/.test(p),
];

const zodImportRE = /from\s+["']zod["']/;
let failed = false;

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      files.push(...walk(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk("src");

for (const file of files) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf-8");

  if (!zodImportRE.test(content)) continue;

  const isClient = content.includes('"use client"');

  if (isClient) {
    console.error(`Error: "${file}" is a client component but imports zod.`);
    failed = true;
    continue;
  }

  const isAllowed = ALLOWED_PATTERNS.some((pred) => pred(file));
  if (!isAllowed) {
    console.error(
      `Error: "${file}" imports zod but is not in an allowed server-only path.\n` +
        `  Files importing zod must be in src/app/api/, named *.server.ts, or server-*.config.ts.`,
    );
    failed = true;
  }
}

if (failed) {
  console.error("\nServer-only import check FAILED.");
  process.exit(1);
}

console.log("Server-only import check passed.");
