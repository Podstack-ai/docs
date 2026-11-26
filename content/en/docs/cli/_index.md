---
title: CLI
weight: 70
description: "Install podstack 1.2.0, sign in with a ps_live_ key, and run GPU, job, inference, and agent commands."
keywords:
  - podstack CLI
  - podstack 1.2.0
  - ps_live_
---

# CLI

`podstack` is the command-line tool for [podstack.ai](https://podstack.ai). Release 1.2.0 talks to `https://podstack.ai/api/v1`.

It can list GPUs and live rates, launch instances, copy files over SSH, submit jobs, call hosted inference, list functions, and connect a coding agent. Rates and specs are printed from the API. The CLI does not ship a price table.

```sh
podstack --version
```

That prints `1.2.0`.

## Start here

1. [Install](/docs/cli/install/) the binary for your OS.
2. Create a `ps_live_` key at [API Keys](https://podstack.ai/app/api-keys) and [sign in](/docs/cli/authentication/).
3. Use the [command reference](/docs/cli/command-reference/) for flags and a copy-paste example of each command.
4. [Connect an agent](/docs/cli/agents/) when you want Claude Code, Claude Desktop, Codex, Cursor, Gemini CLI, or Grok to call Podstack.

Billable commands refuse to run without `--yes`. `--dry-run` prints the request and does not call the API.

Some commands exist only to say the action is not on the current API. Those are listed on [Not available yet](/docs/guides/not-available/).

The same login is what [`podstack mcp serve`](/docs/cli/mcp/) reads. Do not paste the API key into an agent config file.
