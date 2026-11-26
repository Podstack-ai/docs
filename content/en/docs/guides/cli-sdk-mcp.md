---
title: CLI, SDK, or MCP
weight: 20
description: "When to use the podstack CLI, the Python SDK, or the MCP server. They share one ps_live_ key and the same API."
keywords:
  - CLI vs SDK
  - MCP
  - ps_live_
---

# CLI, SDK, or MCP

All three call `https://podstack.ai/api/v1` with a `ps_live_` key. Create the key at [API Keys](https://podstack.ai/app/api-keys). The CLI stores it. The SDK and both MCP servers read that file or `PODSTACK_API_KEY`.

| Surface | Install | Best for | Spend control |
| --- | --- | --- | --- |
| [CLI](/docs/cli/) 1.2.0 | Binary from the releases repo | A person in a terminal, or a shell script | `--dry-run`, then `--yes` |
| [Python SDK](/docs/sdk/) 1.8.0 | `pip install "podstack>=1.8.0"` when it is on PyPI | An application or a notebook you run yourself | `dry_run=True`, then `confirm=True` |
| [CLI MCP](/docs/cli/mcp/) | `podstack mcp serve`, usually via `podstack agent connect` | Claude Code, Claude Desktop, Codex, Cursor, Gemini CLI, Grok | `dry_run: true`, then `confirm: true` on billable tools |
| [SDK MCP](/docs/sdk/mcp/) | `python -m podstack.mcp` after 1.8.0 | An MCP client you configure yourself | Same tool names and the same confirm rule |

Use the CLI when you want one command and a table. Use the SDK when the next step is Python, including the function decorator. The CLI cannot create a function. Use MCP when an agent should call tools. `podstack agent connect` installs the CLI server and the five skills. You do not need both MCP servers in one agent.

Hosted chat from a non-Python client can also use the HTTP API on [Inference](/docs/inference/). That path is not the CLI and not this Python package.

Things none of them can do are listed on [Not available yet](/docs/guides/not-available/).
