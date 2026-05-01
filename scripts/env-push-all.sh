#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-push-all.sh
# =============================================================================
# Pushes all per-environment .env files to GitHub Environments and/or
# Vercel in one go.
#
# Usage:
#   ./scripts/env-push-all.sh                # push to GitHub only
#   ./scripts/env-push-all.sh --vercel       # push to Vercel only
#   ./scripts/env-push-all.sh --both         # push to GitHub AND Vercel
#
# Optional flags:
#   --dry-run    Show what would be pushed without uploading anything.
#   --vercel     Push to Vercel instead of GitHub.
#   --both       Push to both GitHub and Vercel.
#
# Environments pushed (if local files exist):
#   .env.production  →  Production / production
#   .env.preview     →  Preview / preview
#   .env.develop     →  Development / development
#
# Requirements:
#   - gh CLI installed and authenticated (for GitHub)
#   - Vercel CLI installed and authenticated (for Vercel)
# =============================================================================

DRY_RUN=false
VERCEL_MODE=false
BOTH_MODE=false
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Parse optional flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --vercel)
      VERCEL_MODE=true
      shift
      ;;
    --both)
      BOTH_MODE=true
      shift
      ;;
    -*)
      echo "❌ Unknown option: $1"
      echo ""
      echo "Usage: $0 [--dry-run] [--vercel | --both]"
      echo ""
      echo "Options:"
      echo "  (no flag)   Push to GitHub Environments only"
      echo "  --vercel    Push to Vercel only"
      echo "  --both      Push to both GitHub and Vercel"
      echo "  --dry-run   Preview without uploading"
      exit 1
      ;;
    *)
      shift
      ;;
  esac
done

# Mapping: local file → GitHub Environment → Vercel env
declare -a ENVS=(
  "Production:production:.env.production"
  "Preview:preview:.env.preview"
  "Development:development:.env.develop"
)

gh_pushed=0
vercel_pushed=0
skipped=0
errors=0

echo "🚀 Bulk push"
echo "============"

if [ "$DRY_RUN" = true ]; then
  echo "🔍 DRY RUN — no secrets will be uploaded."
  echo ""
fi

if [ "$VERCEL_MODE" = true ] || [ "$BOTH_MODE" = true ]; then
  # Check Vercel CLI
  if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install it with: npm install -g vercel"
    exit 1
  fi
fi

for triple in "${ENVS[@]}"; do
  GH_ENV="${triple%%:*}"
  REST="${triple#*:}"
  VC_ENV="${REST%%:*}"
  ENV_FILE="${REST##*:}"

  echo ""
  echo "────────────────────────────────────────────────────────────"

  if [ ! -f "$ENV_FILE" ]; then
    echo "⏭️  Skipping $GH_ENV / $VC_ENV — $ENV_FILE not found."
    ((skipped++)) || true
    continue
  fi

  # GitHub push
  if [ "$VERCEL_MODE" = false ] || [ "$BOTH_MODE" = true ]; then
    if [ "$DRY_RUN" = true ]; then
      echo "🔍 Would push $ENV_FILE → GitHub '$GH_ENV'"
      ((gh_pushed++)) || true
    else
      echo "🔄 Pushing $ENV_FILE → GitHub '$GH_ENV'..."
      if "$SCRIPT_DIR/env-push.sh" --env "$GH_ENV" "$ENV_FILE"; then
        ((gh_pushed++)) || true
      else
        echo "❌ Failed to push $GH_ENV to GitHub"
        ((errors++)) || true
      fi
    fi
  fi

  # Vercel push
  if [ "$VERCEL_MODE" = true ] || [ "$BOTH_MODE" = true ]; then
    if [ "$DRY_RUN" = true ]; then
      echo "🔍 Would push $ENV_FILE → Vercel '$VC_ENV'"
      ((vercel_pushed++)) || true
    else
      echo "🔄 Pushing $ENV_FILE → Vercel '$VC_ENV'..."
      if "$SCRIPT_DIR/env-push-vercel.sh" --env "$VC_ENV" "$ENV_FILE"; then
        ((vercel_pushed++)) || true
      else
        echo "❌ Failed to push $VC_ENV to Vercel"
        ((errors++)) || true
      fi
    fi
  fi
done

echo ""
echo "════════════════════════════════════════════════════════════"
if [ "$DRY_RUN" = true ]; then
  echo "🔍 DRY RUN complete."
fi

if [ "$VERCEL_MODE" = false ] || [ "$BOTH_MODE" = true ]; then
  echo "✅ GitHub:  $gh_pushed pushed"
fi
if [ "$VERCEL_MODE" = true ] || [ "$BOTH_MODE" = true ]; then
  echo "✅ Vercel:  $vercel_pushed pushed"
fi
echo "⏭️  Skipped: $skipped  |  ❌ Errors: $errors"
echo "════════════════════════════════════════════════════════════"

if [ "$errors" -gt 0 ]; then
  echo ""
  echo "Some pushes failed. Check the output above for details."
  exit 1
fi

if [ "$gh_pushed" -eq 0 ] && [ "$vercel_pushed" -eq 0 ]; then
  echo ""
  echo "💡 No environments were pushed. Did you run 'npm run env:init' first?"
fi
