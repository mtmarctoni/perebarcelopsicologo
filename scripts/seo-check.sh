#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

REPORT_BASE="lighthouse-seo-report"
export APP_ENV=production
export SITE_URL=https://perebarcelopsicologo.com
export RESEND_API_KEY=dummy_seo_check_key

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

echo "=== Running Lighthouse SEO audit ==="
pnpm exec lighthouse http://localhost:3000 \
  --only-categories=seo \
  --skip-audits=canonical \
  --output=json \
  --output=html \
  --output-path="./$REPORT_BASE" \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

SCORE=$(node -e "const r=require('./${REPORT_BASE}.report.json'); console.log(Math.round(r.categories.seo.score * 100))")

echo ""
echo "=== SEO Score: $SCORE / 100 ==="
echo "Report: ${REPORT_BASE}.report.html"

if [ "$SCORE" -lt 100 ]; then
  echo "WARNING: SEO score is not 100. Check the report for details."
fi
