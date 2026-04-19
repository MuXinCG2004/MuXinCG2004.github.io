#!/usr/bin/env bash
# Remove build artifacts, caches, and OS junk from the project.
# Usage: scripts/clean.sh [--deep] [--dry-run]
#   --deep     also remove node_modules and package-lock.json (requires reinstall)
#   --dry-run  list what would be removed without deleting

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

DEEP=0
DRY=0
for arg in "$@"; do
  case "$arg" in
    --deep) DEEP=1 ;;
    --dry-run|-n) DRY=1 ;;
    -h|--help)
      sed -n '2,6p' "$0"; exit 0 ;;
    *) echo "unknown flag: $arg" >&2; exit 2 ;;
  esac
done

# Targets to remove if they exist (directories or files).
TARGETS=(
  ".astro"
  "dist"
  ".vercel"
  "node_modules/.cache"
  ".eslintcache"
  ".turbo"
)

if [ "$DEEP" -eq 1 ]; then
  TARGETS+=("node_modules" "package-lock.json")
fi

remove() {
  if [ "$DRY" -eq 1 ]; then
    echo "would remove: $1"
  else
    rm -rf -- "$1"
    echo "removed: $1"
  fi
}

# Remove listed targets.
for t in "${TARGETS[@]}"; do
  [ -e "$t" ] && remove "$t"
done

# Sweep common junk files, skipping node_modules and .git.
sweep() {
  local pattern="$1"
  while IFS= read -r -d '' f; do
    remove "$f"
  done < <(find . \
    -type d \( -name node_modules -o -name .git \) -prune -o \
    -type f -name "$pattern" -print0 2>/dev/null)
}

sweep ".DS_Store"
sweep "npm-debug.log*"
sweep "yarn-debug.log*"
sweep "yarn-error.log*"
sweep "pnpm-debug.log*"
sweep "[._]*.un~"

echo "clean complete."
