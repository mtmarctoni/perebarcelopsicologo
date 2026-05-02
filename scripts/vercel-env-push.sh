#!/usr/bin/env bash
set -euo pipefail

# Push a local .env file to Vercel.
# Usage: vercel env push <environment> <file>
# Example: vercel env push production .env.production

ENV="${1:-}"
FILE="${2:-}"

if [ -z "$ENV" ] || [ -z "$FILE" ]; then
  echo "Usage: $0 <environment> <file>"
  echo "Example: $0 production .env.production"
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE"
  exit 1
fi

echo "Pushing $FILE → Vercel '$ENV'..."

while IFS='=' read -r key value || [ -n "$key" ]; do
  [[ "$key" =~ ^[[:space:]]*# ]] && continue
  [[ -z "$key" ]] && continue

  # Try update first (silent if it doesn't exist), then add
  echo "$value" | vercel env update "$key" "$ENV" --yes 2>/dev/null || \
  echo "$value" | vercel env add "$key" "$ENV" --yes
done < "$FILE"

echo "Done."
