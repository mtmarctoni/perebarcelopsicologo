#!/usr/bin/env node
/**
 * Check Next.js chunk sizes against compressed thresholds.
 *
 * This script runs after `next build` and checks the generated chunks
 * using gzip/brotli sizes — what users actually download over the wire.
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const CHUNKS_DIR = path.join(process.cwd(), '.next', 'static', 'chunks');
const BUDGETS = {
  // Largest single chunk (raw) — framework budget
  largestChunk: 300 * 1024,
  // Total compressed JS — what users download
  totalGzip: 400 * 1024,
  totalBrotli: 350 * 1024,
};

function formatBytes(bytes) {
  const kb = bytes / 1024;
  return `${kb.toFixed(1)} KB`;
}

function getCompressedSize(filePath, type) {
  const cmd = type === 'gzip' ? 'gzip -c' : 'brotli -c';
  const buffer = execSync(`${cmd} "${filePath}"`, { maxBuffer: 10 * 1024 * 1024 });
  return buffer.length;
}

function checkBundles() {
  if (!fs.existsSync(CHUNKS_DIR)) {
    console.error('❌ .next/static/chunks not found. Run `next build` first.');
    process.exit(1);
  }

  const files = fs
    .readdirSync(CHUNKS_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((f) => {
      const filePath = path.join(CHUNKS_DIR, f);
      return {
        name: f,
        raw: fs.statSync(filePath).size,
        gzip: getCompressedSize(filePath, 'gzip'),
        brotli: getCompressedSize(filePath, 'brotli'),
      };
    })
    .sort((a, b) => b.raw - a.raw);

  if (files.length === 0) {
    console.error('❌ No JS chunks found.');
    process.exit(1);
  }

  let hasError = false;
  let totalRaw = 0;
  let totalGzip = 0;
  let totalBrotli = 0;

  console.log('📦 Bundle size check (compressed)\n');

  for (const file of files) {
    totalRaw += file.raw;
    totalGzip += file.gzip;
    totalBrotli += file.brotli;
  }

  // Check largest chunk
  const largest = files[0];
  console.log(`Largest chunk:      ${largest.name} — ${formatBytes(largest.raw)} raw`);
  if (largest.raw > BUDGETS.largestChunk) {
    console.error(
      `   ❌ Exceeds budget of ${formatBytes(BUDGETS.largestChunk)} by ${formatBytes(largest.raw - BUDGETS.largestChunk)}`,
    );
    hasError = true;
  } else {
    console.log(`   ✅ Under budget`);
  }

  // Show remaining chunks
  const remaining = files.slice(1).filter((f) => f.raw > 1024);
  if (remaining.length > 0) {
    console.log(`\nOther chunks:`);
    for (const chunk of remaining) {
      console.log(`  ${chunk.name} — ${formatBytes(chunk.raw)} raw`);
    }
  }

  // Check total compressed
  console.log(`\nTotal static JS:`);
  console.log(`  Raw:    ${formatBytes(totalRaw)}`);
  console.log(`  Gzip:   ${formatBytes(totalGzip)}`);
  console.log(`  Brotli: ${formatBytes(totalBrotli)}`);

  if (totalGzip > BUDGETS.totalGzip) {
    console.error(
      `   ❌ Gzip exceeds budget of ${formatBytes(BUDGETS.totalGzip)} by ${formatBytes(totalGzip - BUDGETS.totalGzip)}`,
    );
    hasError = true;
  } else {
    console.log(`   ✅ Gzip under budget`);
  }

  if (totalBrotli > BUDGETS.totalBrotli) {
    console.error(
      `   ❌ Brotli exceeds budget of ${formatBytes(BUDGETS.totalBrotli)} by ${formatBytes(totalBrotli - BUDGETS.totalBrotli)}`,
    );
    hasError = true;
  } else {
    console.log(`   ✅ Brotli under budget`);
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
