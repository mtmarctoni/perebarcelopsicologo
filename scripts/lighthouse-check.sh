#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

REPORT_BASE="lighthouse-report"
export APP_ENV=production
export SITE_URL=https://perebarcelopsicologo.com
export RESEND_API_KEY=dummy_lighthouse_key

cleanup() {
  if [ -n "${SERVER_PID:-}" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "=== Building with production env (APP_ENV=production) ==="
pnpm build

echo "=== Starting server ==="
pnpm start &
SERVER_PID=$!

echo "=== Waiting for server on http://localhost:3000 ==="
for i in $(seq 1 30); do
  if curl -s http://localhost:3000 >/dev/null 2>&1; then
    echo "Server is ready."
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "ERROR: Server failed to start within 30 seconds."
    exit 1
  fi
  sleep 1
done

echo "=== Running Lighthouse audit ==="
pnpm exec lighthouse http://localhost:3000 \
  --skip-audits=canonical \
  --output=json \
  --output=html \
  --output-path="./$REPORT_BASE" \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

echo ""
echo "=== Scores ==="
node -e "
const r = require('./${REPORT_BASE}.report.json');
const cats = r.categories || {};
for (const [name, cat] of Object.entries(cats)) {
  const score = Math.round(cat.score * 100);
  const icon = score >= 90 ? 'PASS' : score >= 50 ? 'WARN' : 'FAIL';
  console.log('  ' + icon + '  ' + cat.title.padEnd(20) + ' ' + score + '/100');
}
"

echo ""
echo "Report: ${REPORT_BASE}.report.html"