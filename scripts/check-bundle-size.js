#!/usr/bin/env node
/**
 * Check Next.js chunk sizes against thresholds.
 *
 * This script runs after `next build` and checks the generated chunks
 * without relying on content-hash names (which change every build).
 */

const fs = require('node:fs');
const path = require('node:path');

const CHUNKS_DIR = path.join(process.cwd(), '.next', 'static', 'chunks');
const BUDGETS = {
  // The largest shared chunk should not exceed this
  largestChunk: 230 * 1024,
  // Total of all JS chunks (raw size)
  total: 700 * 1024,
};

function formatBytes(bytes) {
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
}

function checkBundles() {
  if (!fs.existsSync(CHUNKS_DIR)) {
    console.error('❌ .next/static/chunks not found. Run `next build` first.');
    process.exit(1);
  }

  const files = fs
    .readdirSync(CHUNKS_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({
      name: f,
      size: fs.statSync(path.join(CHUNKS_DIR, f)).size,
    }))
    .sort((a, b) => b.size - a.size);

  if (files.length === 0) {
    console.error('❌ No JS chunks found.');
    process.exit(1);
  }

  let hasError = false;
  let totalSize = 0;

  console.log('📦 Bundle size check\n');

  for (const file of files) {
    totalSize += file.size;
  }

  // Check largest chunk
  const largest = files[0];
  console.log(`Largest chunk:      ${largest.name} — ${formatBytes(largest.size)}`);
  if (largest.size > BUDGETS.largestChunk) {
    console.error(
      `   ❌ Exceeds budget of ${formatBytes(BUDGETS.largestChunk)} by ${formatBytes(largest.size - BUDGETS.largestChunk)}`,
    );
    hasError = true;
  } else {
    console.log(`   ✅ Under budget`);
  }

  // Show remaining chunks for info
  const remaining = files.slice(1).filter((f) => f.size > 1024);
  if (remaining.length > 0) {
    console.log(`\nOther chunks:`);
    for (const chunk of remaining) {
      console.log(`  ${chunk.name} — ${formatBytes(chunk.size)}`);
    }
  }

  // Check total
  console.log(`\nTotal static JS:    ${formatBytes(totalSize)}`);
  if (totalSize > BUDGETS.total) {
    console.error(
      `   ❌ Exceeds budget of ${formatBytes(BUDGETS.total)} by ${formatBytes(totalSize - BUDGETS.total)}`,
    );
    hasError = true;
  } else {
    console.log(`   ✅ Under budget`);
  }

  console.log();

  if (hasError) {
    console.error('❌ Bundle size check failed.\n');
    process.exit(1);
  }

  console.log('✅ All bundle sizes are within budget.\n');
  process.exit(0);
}

checkBundles();
