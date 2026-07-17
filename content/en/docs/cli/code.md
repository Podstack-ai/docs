---
title: Coding agent
weight: 40
description: "podstack code is an AI coding agent that plans, builds, and previews full-stack applications for you in a live cloud sandbox — from your terminal."
keywords:
  - AI coding agent
  - podstack code
  - build app from prompt
  - live preview sandbox
  - full stack app generator
  - terminal AI developer
  - plan mode agent
---

# Coding agent — `podstack code`

`podstack code` is an AI coding agent that reads and changes the files in your current project, runs commands, and can **build a complete application and preview it live** in a Podstack cloud sandbox — all from your terminal. It's powered by models on Podstack Inference Cloud.

```sh
cd my-project
podstack code
```

Run it with no arguments for an interactive session, or pass `-p` to run a single prompt non-interactively (great for scripts and CI).

## The build loop

Ask for an app and the agent takes it end to end:

1. **Recommends a shape** — for an ambiguous request it decides whether a *full-stack* app (frontend + backend + database) or a *static* app (no backend/DB) fits better, then asks you to confirm.
2. **Plans first** — it writes an implementation plan to `.podstack/plans/<name>.md` and seeds a task checklist.
3. **Builds** — it works the checklist, marking tasks in progress and complete. Progress is checkpointed to `.podstack/progress.json`, so you can resume later exactly where it left off.
4. **Installs everything** — the sandbox starts from a bare image, so the agent installs every runtime, package, and service the app needs (Node.js, Python, MongoDB, …).
5. **Auto-previews** — once the app runs, it launches a live preview in a cloud sandbox and hands you a public URL. Backends ship interactive Swagger/OpenAPI docs, and every project gets a documented `README.md`.

> Example: *"Build a full-stack notes app with a React front end, an Express API, and MongoDB."* → the agent plans it, installs Node + MongoDB in the sandbox, builds all three layers, and returns a live URL.

## Permission modes (shift+tab)

Press **shift+tab** in a session to cycle how much the agent can do on its own. The current mode shows in the status line.

| Mode | Behavior |
|------|----------|
| **manual** *(default)* | You approve each file change or command. |
| **auto** | Changes run without prompting. Deny rules in your config still apply. |
| **plan** | Read-only. The agent proposes a plan instead of changing anything — press shift+tab to switch to a build mode and approve it. Large plans are built in phases, pausing for approval between them. |

`--yolo` starts a session already in auto mode. The `/auto` slash command toggles auto on and off.

## Slash commands (interactive)

Type `/` to see the command palette. Highlights:

| Command | Does |
|---------|------|
| `/preview` | Launch (or, with `/preview off`, close) the live cloud-sandbox preview |
| `/cost` | Development spend for this project — tokens plus ₹ (sandbox compute + wallet) |
| `/wallet [n]` | Account balance and the last *n* deductions |
| `/auto` | Toggle auto-approve on/off |
| `/models`, `/model [n\|id]` | Switch the model |
| `/compact` | Summarize older turns to shrink context (saves tokens) |
| `/init` | Scaffold `.podstack/` (project memory + plans folder) |
| `/plan <desc>` | Have the agent write an implementation plan file |
| `/secrets` | List stored secret names (managed with [`podstack secrets`](/docs/cli/secrets/)) |
| `/team [goal]` | Form an agent team (a lead plus teammates); `/team off` ends it |
| `/help` | Show all commands |

Keyboard: **shift+tab** cycles permission mode, **ctrl+p** opens the preview cockpit when a sandbox is live, **esc** interrupts a turn, **ctrl+c** twice quits.

## Non-interactive (headless) mode

Pass `-p` to run one prompt and exit — ideal for CI or scripting:

```sh
podstack code -p "explain what internal/relay does"
podstack code -p "add a --verbose flag to the send command" --allow-tools read,edit,bash
podstack code -p "run the tests and summarize failures" --output-format json
```

Because there's no interactive prompt in headless mode, choose what the agent may run:

- `--allow-tools read,edit,bash` — auto-allow specific tools (comma-separated), or `all`.
- `--dangerously-allow-all` — auto-allow every tool.
- `--output-format text|json` — machine-readable output for pipelines.
- `--quiet` — suppress progress notices.
- `--max-turns N` — cap the number of agent turns.

## Sessions

Every session is saved and resumable.

```sh
podstack code --continue          # resume the most recent session in this directory
podstack code --resume 01J8       # resume a specific session by id or id prefix
podstack code sessions            # list, resume, or delete saved sessions
```

On resume, the agent reads `.podstack/progress.json` and the plan file to pick up an in-progress build where it stopped.

## Flags

| Flag | Description |
|------|-------------|
| `-p, --prompt <text>` | Run a single prompt non-interactively and exit |
| `-c, --continue` | Continue the most recent session in this directory |
| `-r, --resume <id>` | Resume a session by id or id prefix |
| `--model <id>` | Model to use (overrides config) |
| `--yolo` | Start in auto-approve mode |
| `--allow-tools <list>` | Headless: tools to auto-allow (or `all`) |
| `--dangerously-allow-all` | Headless: auto-allow every tool |
| `--output-format text\|json` | Headless output format |
| `--quiet` | Headless: suppress progress notices |
| `--max-turns <n>` | Maximum agent turns for the request |

## Project files the agent uses

- `.podstack/config.json` — project settings, including the `sandbox` block (`image`, `port`, `setup`, `run`) that drives previews. The agent writes this itself when you first preview.
- `.podstack/PODSTACK.md` — project instructions the agent always follows (create with `/init`).
- `.podstack/plans/` — implementation plans.
- `.podstack/progress.json` — the resumable task checkpoint.

## Related

- [Sandboxes](/docs/cli/sandbox/) — the preview commands the agent drives.
- [Secrets](/docs/cli/secrets/) — give the agent credentials it can use without ever seeing the values.
- [Models](/docs/cli/models/) — the models that power the agent.
- Runs on macOS, Linux, and Windows (PowerShell or cmd; Git Bash recommended for the bash tool).
