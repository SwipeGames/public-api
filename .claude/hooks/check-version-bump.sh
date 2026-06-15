#!/usr/bin/env bash
#
# Stop hook — if the current branch changes release-affecting files but its
# API_VERSION is not higher than main's, block finishing the turn and ask for a
# bump. Reads the WORKING TREE, so nothing needs to be committed first.
#
# Logic (no tags, no commit required):
#   1. on a feature branch (PRs target main),
#   2. that changes something outside the internal carve-out — committed OR
#      uncommitted, including new files,
#   3. whose working-tree API_VERSION is NOT greater than main's,
#   -> block with instructions to run `make bump-version` and fill the changelog.
#
# Baseline is main's own version (origin/main if present, else local main). Each
# release tags main's version, so comparing to main is enough — no tag lookup.
# Network-free: uses refs as last fetched. CI is the final backstop.
#
# Output: print {"decision":"block","reason":...} to keep Claude working;
# print nothing (exit 0) to allow the turn to end.

INTERNAL_RE='^(\.github/|\.claude/|\.gitignore$|CLAUDE\.md$)'

root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
cd "$root" 2>/dev/null || exit 0

config="docusaurus.config.ts"
[ -f "$config" ] || exit 0

read_version() { sed -nE 's/.*const[[:space:]]+API_VERSION[[:space:]]*=[[:space:]]*"v?([^"]+)".*/\1/p' | head -n1; }
gt() { [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | tail -n1)" = "$1" ] && [ "$1" != "$2" ]; }

# Only enforce on feature branches — PRs target main.
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
case "$branch" in "" | "main" | "HEAD") exit 0 ;; esac

# main, as the merge target and version baseline.
base="origin/main"
git rev-parse --verify -q "refs/remotes/$base" >/dev/null 2>&1 || base="main"
git rev-parse --verify -q "$base" >/dev/null 2>&1 || exit 0

# What this branch changes vs where it forked from main — committed, uncommitted,
# and new files — minus the internal carve-out. Nothing release-y -> allow.
mb="$(git merge-base HEAD "$base" 2>/dev/null)"
[ -n "$mb" ] || exit 0
changed="$( { git diff --name-only "$mb"; git ls-files --others --exclude-standard; } 2>/dev/null | sort -u)"
release_changed="$(printf '%s\n' "$changed" | grep -vE "$INTERNAL_RE" | grep -vE '^[[:space:]]*$' || true)"
[ -n "$release_changed" ] || exit 0

# Working-tree version vs main's version.
cur="$(read_version <"$config")"
[ -n "$cur" ] || exit 0
main_ver="$(git show "$base:$config" 2>/dev/null | read_version)"
[ -n "$main_ver" ] || exit 0

gt "$cur" "$main_ver" && exit 0 # already bumped above main -> allow

reason="Version not bumped. docusaurus.config.ts API_VERSION is ${cur}, not higher than main's ${main_ver}, but this branch changes release-affecting files — so the PR will fail CI. Run 'make bump-version v=x.y.z' (patch = bug fix / non-API change, minor = new backward-compatible API, major = breaking change), then replace the auto-inserted '- no changes' line for the new version in docs/changes-log.md with a short summary of this PR's changes (leave '- no changes' only if nothing notable changed). bump-version also regenerates code + docs."

jq -nc --arg r "$reason" '{decision:"block",reason:$r}'
exit 0
