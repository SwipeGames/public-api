# Swipe Games Integration Skill

An official [Agent Skill](https://agentskills.io) that gives your AI coding agent expertise in integrating the [Swipe Games](https://swipegames.github.io/public-api/) casino platform. Install it once and it auto-loads whenever the agent works on a Swipe Games integration.

It detects your project's language and type, then walks the agent through wiring up:

- **Core API** (you → Swipe Games): launch games, list games, manage free-rounds campaigns.
- **Integration Adapter** (Swipe Games → you): the four inbound *reverse-call* endpoints — `GET /balance`, `POST /bet`, `POST /win`, `POST /refund` — with `X-REQUEST-SIGN` signature verification, idempotency on `txID`, and the correct retry/refund policy.

It covers the official **Node, Go, and PHP** SDKs, plus **any other language** (Python, Ruby, C#, Java, …) by working directly against the public HTTP API and OpenAPI specs.

## Install

```bash
npx skills add swipegames/public-api
```

The skill then triggers automatically when you ask your agent to "integrate Swipe Games."

## What's inside

- `SKILL.md` — the router: project analysis, the integration checklist, and the hard rules.
- `references/node.md`, `references/go.md`, `references/php.md` — per-SDK setup, methods, and reverse-call handlers.
- `references/manual.md` — the from-scratch path for languages without an SDK.
- `references/reverse-calls.md` — reverse-call semantics: idempotency, retries, refunds, free rounds, timeouts.
- `references/error-codes.md` — error-response shape and the error-code list.

## Without the skills CLI

If your agent can't run the `skills` CLI, the docs site has self-contained copy-paste prompts you can hand to it instead: https://swipegames.github.io/public-api/tools

## Links

- Full API documentation: https://swipegames.github.io/public-api/
- Integration Adapter (reverse calls): https://swipegames.github.io/public-api/swipegames-integration
- Source: https://github.com/swipegames/public-api (under `skills/swipegames-integration/`)
