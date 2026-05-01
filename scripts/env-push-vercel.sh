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
#
# Options:
#   --insecure    Skip SSL certificate validation (use behind corporate proxies)
#   --debug       Show verbose output from Vercel CLI commands
#
# Mapping:
#   .env.production  →  Vercel production
#   .env.preview     →  Vercel preview
#
# Requirements:
#   - Vercel CLI installed (npm i -g vercel)
#   - Logged in to Vercel (vercel login)
#   - Your project linked to Vercel (vercel link)
# =============================================================================

ENV_NAME=""
ENV_FILE=""
INSECURE=false
DEBUG=false

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
    --debug)
      DEBUG=true
      shift
      ;;
    -*)
      echo "❌ Unknown option: $1"
      echo ""
      echo "Usage: $0 --env <vercel-env> <.env-file> [--insecure] [--debug]"
      echo ""
      echo "Examples:"
      echo "  $0 --env production .env.production"
      echo "  $0 --env preview .env.preview"
      echo "  $0 --env production .env.production --insecure --debug"
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
  echo "Usage: $0 --env <vercel-env> <.env-file> [--insecure] [--debug]"
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

# Pre-flight checks
echo "🔍 Pre-flight checks..."
echo ""

# Check if logged in
if ! vercel whoami &>/dev/null; then
  echo "❌ You are not logged in to Vercel."
  echo "   Run: vercel login"
  exit 1
fi

USER=$(vercel whoami 2>/dev/null)
echo "✅ Logged in as: $USER"

# Check if project is linked
if [ ! -f ".vercel/project.json" ]; then
  echo "❌ Project not linked to Vercel."
  echo "   Run: vercel link"
  exit 1
fi

PROJECT_ID=$(grep -o '"projectId"[^}]*' .vercel/project.json | cut -d'"' -f4)
echo "✅ Project linked: $PROJECT_ID"
echo ""

REDIRECT="/dev/null"
if [ "$DEBUG" = true ]; then
  REDIRECT="/dev/tty"
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

  # Remove existing var (show error in debug mode)
  if [ "$DEBUG" = true ]; then
    echo "   Running: vercel env rm $key $ENV_NAME --yes"
    vercel env rm "$key" "$ENV_NAME" --yes || true
  else
    vercel env rm "$key" "$ENV_NAME" --yes &>/dev/null || true
  fi

  # Add new var via stdin
  if [ "$DEBUG" = true ]; then
    echo "   Running: echo '$value' | vercel env add $key $ENV_NAME --yes"
    if echo "$value" | vercel env add "$key" "$ENV_NAME" --yes; then
      ((synced++)) || true
    else
      echo "❌ Failed to sync $key"
      ((errors++)) || true
    fi
  else
    if echo "$value" | vercel env add "$key" "$ENV_NAME" --yes &>/dev/null; then
      ((synced++)) || true
    else
      echo "❌ Failed to sync $key"
      ((errors++)) || true
    fi
  fi
done < "$ENV_FILE"

echo ""

if [ "$errors" -gt 0 ]; then
  echo "❌ Sync completed with $errors error(s)."
  echo "   Synced: $synced  |  Skipped: $skipped  |  Errors: $errors"
  echo ""
  echo "────────────────────────────────────────────────────────────"
  echo "🔧 Troubleshooting:"
  echo ""
  echo "   1. Run with --debug to see full CLI output:"
  echo "      npm run env:push:vercel -- --env $ENV_NAME $ENV_FILE --debug"
  echo ""
  echo "   2. If you see 'unable to get local issuer certificate':"
  echo "      npm run env:push:vercel -- --env $ENV_NAME $ENV_FILE --insecure"
  echo ""
  echo "   3. Verify you are in the project root and linked:"
  echo "      ls .vercel/project.json"
  echo "      vercel status"
  echo "────────────────────────────────────────────────────────────"
  exit 1
fi

echo "✅ Sync complete!"
echo "   Synced: $synced  |  Skipped: $skipped"
echo ""

# Verification: list env vars for this environment
echo "🔍 Verifying variables in Vercel '$ENV_NAME'..."
echo ""
vercel env ls "$ENV_NAME"
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
