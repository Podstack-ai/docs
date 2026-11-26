---
title: Examples for AI agents
weight: 85
description: "End-to-end recipes for Claude Code, Codex, Cursor, Gemini CLI, and Grok. Each one shows the prompt, the tool calls, the expected output, and when to set confirm."
keywords:
  - AI agent
  - MCP
  - confirm
---

# Examples for AI agents

These recipes are for an agent that already has the Podstack MCP server, or that can run `podstack` and Python. They match CLI 1.2.0 and Python SDK 1.8.0 (`pip install podstack`).

Give the agent the prompt in the recipe. The agent should show you the dry run and wait. It sets `confirm: true` or `confirm=True` only after you approve that spend.

SDK steps need `podstack` 1.8.0 or newer.

| Recipe | Spends money? |
| --- | --- |
| [Connect and verify](/docs/agents/connect-and-verify/) | No |
| [Pick a GPU](/docs/agents/pick-a-gpu/) | No. Reads prices only |
| [Instance, exec, terminate](/docs/agents/instance-and-ssh/) | Yes, after you approve |
| [Training job](/docs/agents/training-job/) | Yes, after you approve |
| [Deploy a function](/docs/agents/deploy-function/) | Yes, after you approve. SDK only |
| [Endpoint and chat](/docs/agents/endpoint-and-chat/) | Yes, after you approve |
| [Tool-calling loop](/docs/agents/tool-calling/) | The preview does not. A later confirm does |
| [Wallet before and after](/docs/agents/wallet-check/) | No |
| [Clean up](/docs/agents/cleanup/) | Terminate and cancel need approval |

Actions that are not on the API are skipped on purpose. The list is [Not available yet](/docs/guides/not-available/).
