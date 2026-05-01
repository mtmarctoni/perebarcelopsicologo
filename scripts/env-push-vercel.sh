#!/usr/bin/env bash
set -uo pipefail

# =============================================================================
# env-push-vercel.sh
# =============================================================================
# Reads a local .env file and uploads every key-value pair to Vercel.
#
# ⚠️  SAFETY BEHAVIOR:
#     - Keys present in the file → created or updated in Vercel.
#     - Keys already in Vercel but NOT in the file → left untouched (NOT deleted).
#
# Usage:
#   ./scripts/env-push-vercel.sh --env production .env.production
#   ./scripts/env-push-vercel.sh --env preview .env.preview
#   ./scripts/env-push-vercel.sh --env development .env.develop
#
# Options:
#   --insecure    Skip SSL certificate validation (use behind corporate proxies)
#
# Mapping:
#   .env.production  →  Vercel production
#   .env.preview     →  Vercel preview
#   .env.develop     →  Vercel development
#
# Requirements:
#   - Vercel CLI installed (npm i -g vercel)
#   - Logged in to Vercel (vercel login)
#   - Your project linked to Vercel (vercel link)
# =============================================================================

ENV_NAME=""
ENV_FILE=""
INSECURE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)
      ENV_NAME="$2"
      shift 2
      ;;
    --insecure)
      INSECURE=true
      shift
      ;;
    -*)
      echo "❌ Unknown option: $1"
      echo ""
      echo "Usage: $0 --env <vercel-env> <.env-file> [--insecure]"
      echo ""
      echo "Examples:"
      echo "  $0 --env production .env.production"
      echo "  $0 --env preview .env.preview"
      echo "  $0 --env production .env.production --insecure"
      exit 1
      ;;
    *)
      ENV_FILE="$1"
      shift
      ;;
  esac
done

if [ -z "$ENV_NAME" ] || [ -z "$ENV_FILE" ]; then
  echo "❌ Missing required arguments."
  echo ""
  echo "Usage: $0 --env <vercel-env> <.env-file> [--insecure]"
  echo ""
  echo "Examples:"
  echo "  $0 --env production .env.production"
  echo "  $0 --env preview .env.preview"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ File not found: $ENV_FILE"
  exit 1
fi

# Validate Vercel env name
if [[ ! "$ENV_NAME" =~ ^(production|preview|development)$ ]]; then
  echo "❌ Invalid Vercel environment: '$ENV_NAME'"
  echo "   Must be one of: production, preview, development"
  exit 1
fi

# Check Vercel CLI is available
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI not found. Install it with:"
  echo "   npm install -g vercel"
  exit 1
fi

# Handle insecure mode (corporate proxies)
if [ "$INSECURE" = true ]; then
  echo "⚠️  Running in INSECURE mode — SSL certificate validation is disabled."
  echo "   Only use this if you are behind a corporate proxy or VPN."
  echo ""
  export NODE_TLS_REJECT_UNAUTHORIZED=0
fi

echo "🔄 Pushing secrets from $ENV_FILE → Vercel '$ENV_NAME'..."
echo ""

synced=0
skipped=0
errors=0

while IFS='=' read -r key value || [ -n "$key" ]; do
  # Skip comments and empty lines
  [[ "$key" =~ ^[[:space:]]*# ]] && continue
  [[ -z "$key" ]] && continue

  # Trim whitespace
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  # Skip if value is empty
  if [ -z "$value" ]; then
    echo "⚠️  Skipping $key (empty value)"
    ((skipped++)) || true
    continue
  fi

  echo "🔄 Syncing $key → $ENV_NAME"

  # Remove existing var (ignore errors if it doesn't exist)
  if ! vercel env rm "$key" "$ENV_NAME" --yes &>/dev/null; then
    # Ignore "not found" errors
    true
  fi

  # Add new var via stdin
  if ! printf '%s' "$value" | vercel env add "$key" "$ENV_NAME" --yes; then
    echo "❌ Failed to sync $key"
    ((errors++)) || true
  else
    ((synced++)) || true
  fi
done < "$ENV_FILE"

echo ""

if [ "$errors" -gt 0 ]; then
  echo "❌ Sync completed with errors."
  echo "   Synced: $synced  |  Skipped: $skipped  |  Errors: $errors"
  echo ""
  echo "────────────────────────────────────────────────────────────"
  echo "🔧 If you see 'unable to get local issuer certificate':"
  echo ""
  echo "   You are likely behind a corporate proxy or VPN that"
  echo "   intercepts SSL traffic. Try running with --insecure:"
  echo ""
  echo "   npm run env:push:vercel -- --env $ENV_NAME $ENV_FILE --insecure"
  echo ""
  echo "   Or permanently disable SSL checks for the Vercel CLI:"
  echo "   export NODE_TLS_REJECT_UNAUTHORIZED=0"
  echo ""
  echo "   (This is insecure — only use on trusted networks.)"
  echo "────────────────────────────────────────────────────────────"
  exit 1
fi

echo "✅ Vercel sync complete!"
echo "   Synced: $synced  |  Skipped: $skipped"
echo ""
echo "────────────────────────────────────────────────────────────"

if [[ "$ENV_NAME" == "production" ]]; then
  echo "⚠️  IMPORTANT: If you changed NEXT_PUBLIC_* variables, they are"
  echo "   baked at build time. You MUST trigger a new production deploy:"
  echo ""
  echo "   vercel --prod"
  echo ""
  echo "   Or push any commit to main to trigger the GitHub Action deploy."
else
  echo "⚠️  If you changed NEXT_PUBLIC_* variables, trigger a new deploy"
  echo "   so Vercel picks them up:"
  echo ""
  echo "   vercel"
fi

echo "────────────────────────────────────────────────────────────"
