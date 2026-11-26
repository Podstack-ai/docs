---
title: Connect an agent and verify
weight: 20
description: "One command connects Claude Code, Codex, Cursor, Gemini CLI, or Grok, then status and a read-only MCP call prove the handshake."
keywords:
  - podstack agent connect
  - agent status
---

# Connect an agent and verify

No spend. This recipe does not launch a GPU.

## Prompt to give the agent

```text
Install nothing yourself if `podstack` is already on PATH. Run `podstack agent connect <agent> --dry-run`, show me the files, and stop. After I say yes, run `podstack agent connect <agent>`, then `podstack agent status` and a read-only list_gpus tool call. Do not set confirm.
```

Replace `<agent>` with `claude`, `claude-desktop`, `codex`, `cursor`, `gemini`, or `grok`.

## Commands

```sh
podstack --version
podstack agent connect cursor --dry-run
podstack agent connect cursor
podstack agent status
podstack auth whoami
```

`--version` prints `1.2.0`. `--dry-run` prints paths and writes nothing. The real `connect` signs in if needed, merges MCP config, installs the five skills, and writes `.podstack/AGENTS.md`.

MCP tool, after the agent reloads:

```json
{"name": "list_gpus", "arguments": {}}
```

## Expected output

`agent status` lists the agent as connected and the CLI as signed in. `auth whoami` prints an email, not the key. `list_gpus` returns catalogue rows with `gpu_type` and VRAM fields from the API.

## Cost safety

Do not pass `confirm`. Do not call `create_instance`, `submit_job`, `create_endpoint`, `run_inference`, or `chat` in this recipe.
