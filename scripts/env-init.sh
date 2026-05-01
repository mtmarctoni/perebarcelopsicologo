#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-init.sh
# =============================================================================
# Generates local .env files from .env.example so you never start from scratch.
#
# Usage:
#   ./scripts/env-init.sh
#
# Creates (if they don't already exist):
#   .env              → local development
#   .env.production   → production values
#   .env.preview      → preview / staging values
# =============================================================================

if [ ! -f ".env.example" ]; then
  echo "❌ .env.example not found. Are you in the project root?"
  exit 1
fi

generated=0
skipped=0

for env_file in .env .env.production .env.preview; do
  if [ -f "$env_file" ]; then
    echo "⚠️  $env_file already exists — skipping."
    ((skipped++)) || true
  else
    cp .env.example "$env_file"
    echo "✅ Created $env_file"
    ((generated++)) || true
  fi
done

echo ""
echo "────────────────────────────────────────────────────────────"
if [ "$generated" -gt 0 ]; then
  echo "📝 $generated file(s) generated. Next steps:"
  echo "   1. Edit each file and replace the placeholder values."
  echo "   2. Run ./scripts/env-push.sh <file> to sync to GitHub."
fi
if [ "$skipped" -gt 0 ]; then
  echo "⏭️  $skipped file(s) skipped (already exist)."
fi
echo "────────────────────────────────────────────────────────────"
