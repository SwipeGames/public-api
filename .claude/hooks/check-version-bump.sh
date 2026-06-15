#!/usr/bin/env bash
#
# Stop hook — block finishing a turn when the current branch is destined for a
# release PR to main but the version has NOT been bumped.
#
# Mirrors the version gate in .github/workflows/pr.yml, which fails EVERY release
# PR to main whose docusaurus.config.ts API_VERSION is not strictly greater than
# the latest released version. The point is to surface that locally, while the
# agent is still working, instead of after a PR is opened.
#
# A PR that touches ONLY internal paths (CI config, agent config) is exempt — it
# never reaches a published artifact, so no bump is required. Keep INTERNAL_RE in
# sync with the same carve-out in .github/workflows/pr.yml.
#
# Network-free by design: the baseline is the HIGHER of
#   (a) the API_VERSION at the merge-base with main  (always in local history —
#       no fetch needed; catches the common "forgot to bump entirely" case), and
#   (b) the latest local git tag                      (used when present/fresh —
#       also catches a same-version collision with an already-released branch).
# The team does NOT need to run `git fetch --tags` for (a). Fetching only
# sharpens (b); CI remains the source of truth for the rare stale-tag collision.
#
# Output contract (Claude Code Stop hook):
#   - print {"decision":"block","reason":"..."}  -> ask Claude to keep working
#   - print nothing and exit 0                   -> allow the turn to end

# Internal paths that do NOT require a version bump (keep in sync with pr.yml):
# CI config, agent config, and repo-only meta files that never ship in any
# published artifact (npm/php packages, docs site, Go modules).
INTERNAL_RE='^(\.github/|\.claude/|\.gitignore$|CLAUDE\.md$)'

root="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
cd "$root" 2>/dev/null || exit 0

config="docusaurus.config.ts"
[ -f "$config" ] || exit 0

read_version() { # reads API_VERSION from stdin, strips a leading "v"
  sed -nE 's/.*const[[:space:]]+API_VERSION[[:space:]]*=[[:space:]]*"v?([^"]+)".*/\1/p' | head -n1
}
gt() { # gt A B  -> true if A > B (semver), false if A <= B
  [ "$(printf '%s\n%s\n' "$1" "$2" | sort -V | tail -n1)" = "$1" ] && [ "$1" != "$2" ]
}

# Only enforce on feature branches — PRs target main.
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
case "$branch" in
  "" | "main" | "HEAD") exit 0 ;;
esac

# Pick a base ref and confirm the branch actually carries committed PR content.
base="origin/main"
git rev-parse --verify -q "refs/remotes/$base" >/dev/null 2>&1 || base="main"
git rev-parse --verify -q "$base" >/dev/null 2>&1 || exit 0
ahead="$(git rev-list --count "${base}..HEAD" 2>/dev/null)"
[ "${ahead:-0}" -gt 0 ] 2>/dev/null || exit 0

# Exempt PRs that touch only internal paths (committed + uncommitted changes).
changed="$( { git diff --name-only "${base}...HEAD"; git diff --name-only HEAD; } 2>/dev/null | sort -u)"
release_changed="$(printf '%s\n' "$changed" | grep -vE "$INTERNAL_RE" | grep -vE '^[[:space:]]*$' || true)"
[ -n "$release_changed" ] || exit 0 # only internal files changed -> no bump needed -> allow

# Current version from the working tree.
current="$(read_version <"$config")"
[ -n "$current" ] || exit 0

# Baseline = higher of merge-base version (network-free) and latest local tag.
baseline=""
mb="$(git merge-base HEAD "$base" 2>/dev/null)"
[ -n "$mb" ] && baseline="$(git show "$mb:$config" 2>/dev/null | read_version)"
tag="$(git tag -l --sort=-v:refname | head -n1 | sed -E 's/^v//')"
if [ -n "$tag" ]; then
  if [ -z "$baseline" ] || gt "$tag" "$baseline"; then baseline="$tag"; fi
fi
[ -n "$baseline" ] || exit 0 # nothing to compare against -> allow

# Bumped? (strictly greater, same as CI) -> allow.
gt "$current" "$baseline" && exit 0

reason="Version not bumped. docusaurus.config.ts API_VERSION is ${current}, but the baseline (latest released version) is ${baseline}. .github/workflows/pr.yml fails every release PR to main whose version is not strictly higher. Before finishing: (1) run 'make bump-version v=x.y.z' — pick the next semver (patch = bug fix / non-API change, minor = new backward-compatible API, major = breaking change); (2) in docs/changes-log.md, replace the auto-inserted '- no changes' line under the new version with a short summary of this PR's user-facing changes (leave '- no changes' only if nothing notable changed). bump-version also regenerates code + docs. If the user explicitly does not want a release, tell them the PR will fail CI without a bump."

jq -nc --arg r "$reason" '{decision:"block",reason:$r}'
exit 0
