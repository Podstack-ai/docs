---
title: Configuration
weight: 130
description: "Configure the Podstack CLI — credentials, default project, output format, and the environment variables that override them."
keywords:
  - Podstack CLI configuration
  - podstack config.json
  - PODSTACK_API_KEY
  - PODSTACK_PROJECT_ID
  - CLI settings
---

# Configuration

The CLI is configured by a few files and a handful of environment variables. Environment variables always win over files.

## Files

| Path | Holds |
|------|-------|
| `~/.config/podstack/credentials.json` | Your API key (written by `podstack auth login`, mode `0600`) |
| `~/.podstack/config.json` | Global settings — notably your default `project_id` |
| `./.podstack/config.json` | Per-project settings, including the `sandbox` block used for previews |

Example `~/.podstack/config.json`:

```json
{
  "project_id": "b90d34a5-…"
}
```

Example per-project `./.podstack/config.json` (the coding agent writes the `sandbox` block itself):

```json
{
  "sandbox": {
    "image": "python-3.12",
    "port": 8000,
    "setup": "pip install -r requirements.txt",
    "run": "uvicorn main:app --host 0.0.0.0 --port 8000"
  }
}
```

## Environment variables

| Variable | Effect |
|----------|--------|
| `PODSTACK_API_KEY` | Use this `psk_` key instead of the stored credentials (CI-friendly) |
| `PODSTACK_PROJECT_ID` | Override the default project for a single run |

## Output format

Every command accepts `--output json` or `--output table`. The default is a human table on a terminal and JSON when the output is piped, so scripting just works:

```sh
podstack gpu instances list --output json | jq '.[].id'
```

## Agent project files

Inside a project the coding agent also uses:

- `.podstack/PODSTACK.md` — instructions the agent always follows (create with `/init`).
- `.podstack/plans/` — implementation plans.
- `.podstack/progress.json` — the resumable build checkpoint.

You'll usually want to commit `PODSTACK.md` and `plans/` but git-ignore `progress.json`.

## Related

- [Authentication](/docs/cli/authentication/)
- [Projects](/docs/cli/projects/)
