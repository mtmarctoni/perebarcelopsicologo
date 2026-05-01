#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-push-all.sh
# =============================================================================
# Pushes all per-environment .env files to their corresponding GitHub
# Environments in one go.
#
# Usage:
#   ./scripts/env-push-all.sh
#
# Optional flags:
#   --dry-run    Show what would be pushed without uploading anything.
#
# Environments pushed (if local files exist):
#   .env.production  →  GitHub Environment "Production"
#   .env.preview     →  GitHub Environment "Preview"
#   .env.develop     →  GitHub Environment "Development"
#
# Requirements:
#   - gh CLI installed and authenticated
#   - You have write access to the repository
# =============================================================================

DRY_RUN=false
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Parse optional flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    -*)
      echo "❌ Unknown option: $1"
      echo ""
      echo "Usage: $0 [--dry-run]"
      exit 1
      ;;
    *)
      shift
      ;;
  esac
done

# Mapping: local file → GitHub Environment name
declare -a ENVS=(
  "Production:.env.production"
  "Preview:.env.preview"
  "Development:.env.develop"
)

pushed=0
skipped=0
errors=0

echo "🚀 Bulk push to GitHub Environments"
echo "===================================="

if [ "$DRY_RUN" = true ]; then
  echo "🔍 DRY RUN — no secrets will be uploaded."
  echo ""
fi

for pair in "${ENVS[@]}"; do
  ENV_NAME="${pair%%:*}"
  ENV_FILE="${pair##*:}"

  echo ""
  echo "────────────────────────────────────────────────────────────"

  if [ ! -f "$ENV_FILE" ]; then
    echo "⏭️  Skipping $ENV_NAME — $ENV_FILE not found."
    ((skipped++)) || true
    continue
  fi

  if [ "$DRY_RUN" = true ]; then
    echo "🔍 Would push $ENV_FILE → GitHub Environment '$ENV_NAME'"
    echo "   ($(grep -c '=' "$ENV_FILE") variable(s) found)"
    ((pushed++)) || true
  else
    echo "🔄 Pushing $ENV_FILE → GitHub Environment '$ENV_NAME'..."
    if "$SCRIPT_DIR/env-push.sh" --env "$ENV_NAME" "$ENV_FILE"; then
      ((pushed++)) || true
    else
      echo "❌ Failed to push $ENV_NAME"
      ((errors++)) || true
    fi
  fi
done

echo ""
echo "════════════════════════════════════════════════════════════"
if [ "$DRY_RUN" = true ]; then
  echo "🔍 DRY RUN complete."
fi
echo "✅ Pushed: $pushed  |  ⏭️  Skipped: $skipped  |  ❌ Errors: $errors"
echo "════════════════════════════════════════════════════════════"

if [ "$errors" -gt 0 ]; then
  echo ""
  echo "Some pushes failed. Check the output above for details."
  exit 1
fi

if [ "$pushed" -eq 0 ]; then
  echo ""
  echo "💡 No environments were pushed. Did you run 'npm run env:init' first?"
fi
