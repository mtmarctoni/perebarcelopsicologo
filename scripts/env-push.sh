#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-push.sh
# =============================================================================
# Reads a local .env file and uploads every key-value pair to GitHub Secrets.
#
# ⚠️  SAFETY BEHAVIOR:
#     - Keys present in the file → created or updated in GitHub.
#     - Keys already in GitHub but NOT in the file → left untouched (NOT deleted).
#     This means you can safely push a file with only the new/changed vars.
#
# Supports GitHub Environments (Preview, Development, Production).
#
# Usage:
#   ./scripts/env-push.sh --env Production .env.production
#   ./scripts/env-push.sh --env Preview .env.preview
#   ./scripts/env-push.sh --env Development .env.develop
#   ./scripts/env-push.sh .env                      # repository-level (default)
#
# Examples (safe partial updates):
#   # Only add/update NEXT_PUBLIC_CALENDLY_URL, leave RESEND_API_KEY alone
#   echo "NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/foo" > /tmp/calendly-only.env
#   ./scripts/env-push.sh --env Production /tmp/calendly-only.env
#
# Requirements:
#   - gh CLI installed and authenticated
#   - You have write access to the repository
# =============================================================================

ENV_NAME=""
ENV_FILE=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      ENV_NAME="$2"
      shift 2
      ;;
    -*)
      echo "❌ Unknown option: $1"
      echo ""
      echo "Usage: $0 [--env <environment>] <.env-file>"
      echo ""
      echo "Examples:"
      echo "  $0 --env Production .env.production"
      echo "  $0 --env Preview .env.preview"
      echo "  $0 --env Development .env.develop"
      echo "  $0 .env                                    # repository-level"
      exit 1
      ;;
    *)
      ENV_FILE="$1"
      shift
      ;;
  esac
done

if [ -z "$ENV_FILE" ]; then
  echo "❌ Missing .env file argument."
  echo ""
  echo "Usage: $0 [--env <environment>] <.env-file>"
  echo ""
  echo "Examples:"
  echo "  $0 --env Production .env.production"
  echo "  $0 --env Preview .env.preview"
  echo "  $0 --env Development .env.develop"
  echo "  $0 .env                                    # repository-level"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ File not found: $ENV_FILE"
  exit 1
fi

if [ -n "$ENV_NAME" ]; then
  echo "🔄 Pushing secrets from $ENV_FILE → GitHub Environment '$ENV_NAME'..."
  GH_FLAGS="--env $ENV_NAME"
else
  echo "🔄 Pushing secrets from $ENV_FILE → GitHub (repository-level)..."
  GH_FLAGS=""
fi

echo ""

# gh secret set -f reads the file and sets every key automatically
if [ -n "$GH_FLAGS" ]; then
  gh secret set -f "$ENV_FILE" $GH_FLAGS
else
  gh secret set -f "$ENV_FILE"
fi

echo ""
echo "✅ Sync complete!"
echo ""
echo "────────────────────────────────────────────────────────────"
echo "Next steps:"
echo "   1. Verify with: ./scripts/env-list.sh"
if [ -n "$ENV_NAME" ]; then
  echo "   2. Sync to Vercel via GitHub Action:"
  echo "      Actions → 'Sync Env to Vercel' (select: $ENV_NAME)"
  echo "   3. Or push directly from local:"
  # Convert GitHub env name to Vercel env name
  VC_ENV=$(echo "$ENV_NAME" | tr '[:upper:]' '[:lower:]')
  echo "      npm run env:push:vercel -- --env $VC_ENV $ENV_FILE"
fi
echo "   4. Trigger a redeploy if you changed NEXT_PUBLIC_* vars:"
echo "      git commit --allow-empty -m 'chore: trigger rebuild' && git push"
echo "────────────────────────────────────────────────────────────"
