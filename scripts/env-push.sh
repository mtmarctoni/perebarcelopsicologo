#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-push.sh
# =============================================================================
# Reads a local .env file and uploads every key-value pair to GitHub Secrets.
# Existing secrets with the same name will be overwritten.
#
# Usage:
#   ./scripts/env-push.sh .env              # push local dev values
#   ./scripts/env-push.sh .env.production   # push production values
#   ./scripts/env-push.sh .env.preview      # push preview values
#
# Requirements:
#   - gh CLI installed and authenticated
#   - You have write access to the repository
# =============================================================================

ENV_FILE="${1:-.env}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ File not found: $ENV_FILE"
  echo ""
  echo "Usage: $0 <.env-file>"
  echo ""
  echo "Examples:"
  echo "  $0 .env              # push local dev env"
  echo "  $0 .env.production   # push production env"
  echo "  $0 .env.preview      # push preview env"
  exit 1
fi

echo "🔄 Pushing secrets from $ENV_FILE → GitHub..."
echo ""

# gh secret set -f reads the file and sets every key automatically
gh secret set -f "$ENV_FILE"

echo ""
echo "✅ Sync complete!"
echo ""
echo "────────────────────────────────────────────────────────────"
echo "Next steps:"
echo "   1. Verify with: ./scripts/env-list.sh"
echo "   2. Sync to Vercel: GitHub Actions → 'Sync Env to Vercel'"
echo "   3. Trigger a redeploy if you changed NEXT_PUBLIC_* vars:"
echo "      git commit --allow-empty -m 'chore: trigger rebuild' && git push"
echo "────────────────────────────────────────────────────────────"
