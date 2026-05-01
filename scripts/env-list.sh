#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-list.sh
# =============================================================================
# Lists the names of all secrets stored in GitHub for this repo,
# including repository-level and per-environment secrets.
# NOTE: GitHub never reveals secret values (not even to repo owners).
#
# Usage:
#   ./scripts/env-list.sh
# =============================================================================

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

echo "🔐 Secrets configured in GitHub for $REPO"
echo ""

# Repository-level secrets
echo "📦 Repository-level secrets:"
echo "────────────────────────────────────────────────────────────"
gh secret list
echo ""

# Per-environment secrets
for env in Production Preview; do
  # Check if environment exists by trying to list secrets
  if gh secret list --env "$env" &>/dev/null; then
    echo "🌍 Environment '$env' secrets:"
    echo "────────────────────────────────────────────────────────────"
    gh secret list --env "$env"
    echo ""
  fi
done

echo "────────────────────────────────────────────────────────────"
echo "💡 To see local values, open your .env files."
echo "   To update GitHub, run: ./scripts/env-push.sh --env <env> <file>"
echo "────────────────────────────────────────────────────────────"
