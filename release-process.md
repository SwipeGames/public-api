# Release process (main branch only)

We use **Release Please** to generate versions, changelog, Git tags, and GitHub Releases using **Conventional Commits**.

This repo has **one branch: `main`**.
Releases are created **only when we manually run the “Release” workflow**.

---

## 1) Daily development rules

### 1.1 Branching
- Work in feature branches.
- Open PRs into `main`.

### 1.2 Merge method
Use **Squash merge** for PRs (recommended).
This ensures the final commit message on `main` matches the PR title and can be parsed by Release Please.

### 1.3 PR title / commit message format (Conventional Commits)
Release Please calculates the next version from commit history, so the **PR title** (or the squash commit title) must follow one of these:

- `fix: ...` → patch bump (0.0.1 → 0.0.2)
- `feat: ...` → minor bump (0.1.0 → 0.2.0, or 0.0.x → 0.1.0 depending on current version)
- `docs: ...` → usually no version bump (release notes only)
- `chore: ...` → usually no version bump
- `refactor: ...` → usually no version bump (unless it includes breaking change)
- `perf: ...` → usually patch/minor depending on config (typically patch if it’s a fix)
- `test: ...` → no version bump
- `ci: ...` → no version bump

### 1.4 Breaking changes
A breaking change must be marked as either:

**Option A (preferred):**
- `feat!: ...`

**Option B (footer):**
- Title: `feat: ...`
- Body includes: `BREAKING CHANGE: ...`

Example:
```
feat!: change API contract for /v1/users
```

or

```
feat: change API contract

BREAKING CHANGE: renamed field userId -> user_id
```

> Tip for zsh users: `!` is special in zsh. Use single quotes:
> `git commit -m 'feat!: breaking change'`

---

## 2) When to do a release

We release when we decide `main` is in a good state (tested + ready for deployment).

Releases are **not created automatically** on every merge to `main`.

---

## 3) How to create a release (step-by-step)

### Step 1 — Run Release workflow (creates/updates Release PR)
1. Go to **GitHub → Actions**
2. Open workflow **“Release workflow”**
3. Click **Run workflow** (branch: `main`)

This will create (or update) a PR like:
- `chore(main): release X.Y.Z`

### Step 2 — Review Release PR
The PR contains:
- version bump changes (manifest/version files)
- generated `CHANGELOG.md` (if enabled/configured)
- release notes content

Review and merge it.

### Step 3 — Merge the Release PR (creates the tag & GitHub Release automatically)
When the Release PR is merged into `main`, the workflow runs automatically and:
- creates git tag `vX.Y.Z`
- creates a GitHub Release for that tag

✅ After this, the release is complete.

---

## 4) How version numbers are chosen

Release Please looks at the commits since the last tag and chooses:
- **patch** for `fix: ...`
- **minor** for `feat: ...`
- **major** for `feat!: ...` or `BREAKING CHANGE: ...`

Examples (assuming current version `v0.1.3`):
- commits: `fix: ...` → next release `v0.1.4`
- commits: `feat: ...` → next release `v0.2.0`
- commits: `feat!: ...` → next release `v1.0.0`

---

## 5) What NOT to do

- ❌ Don’t manually create release tags (unless explicitly instructed by the maintainers).
- ❌ Don’t rename Release PR titles.
- ❌ Don’t merge Release PRs with a merge method that destroys the conventional title (avoid “merge commit” with default message if it loses `feat:` / `fix:`).
- ❌ Don’t use non-standard titles like `Update stuff` if you expect a version bump.

---

## 6) Troubleshooting

### “My change didn’t bump the version”
Most common reason: the PR title / squash commit message did not follow Conventional Commits.
Fix: rename the PR title to `fix: ...` / `feat: ...` and squash-merge.

### “No release PR was created”
- Ensure you ran **Actions → Release → Run workflow**
- Ensure workflow permissions allow creating PRs/releases

### “zsh: illegal modifier” when committing `feat!: ...`
Use single quotes:
```bash
git commit -m 'feat!: breaking change'
```

---

## 7) Examples

### Patch release
PR title:
- `fix: handle nil pointer in auth middleware`

### Minor release
PR title:
- `feat: add new payment webhook`

### Major release
PR title:
- `feat!: remove deprecated endpoint /v1/legacy`
