#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# env-list.sh
# =============================================================================
# Lists the names of all secrets currently stored in GitHub for this repo.
# NOTE: GitHub never reveals secret values (not even to repo owners).
#
# Usage:
#   ./scripts/env-list.sh
# =============================================================================

echo "🔐 Secrets configured in GitHub for $(gh repo view --json nameWithOwner -q .nameWithOwner):"
echo ""
gh secret list
echo ""
echo "────────────────────────────────────────────────────────────"
echo "💡 To see local values, open your .env / .env.production files."
echo "   To update GitHub, run: ./scripts/env-push.sh <file>"
echo "────────────────────────────────────────────────────────────"
