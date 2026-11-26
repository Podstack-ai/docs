---
title: Connect an agent
weight: 50
description: "podstack agent connect signs in, adds the MCP server, and installs the five Podstack skills for Claude, Codex, Cursor, Gemini, or Grok."
keywords:
  - podstack agent connect
  - MCP
  - Claude Code
  - Cursor
---

# Connect an agent

`podstack agent connect` signs in if the CLI has no login, merges the Podstack MCP server into that agent's config, installs the five skills, writes `.podstack/AGENTS.md` in the current project, and checks the MCP handshake.

Other servers already in the file stay in place. The original file is saved beside it as `<file>.podstack.bak`. The API key stays in the [CLI credentials file](/docs/cli/authentication/). It is not written into the agent config.

## Commands

```sh
podstack agent connect claude
podstack agent connect claude-desktop
podstack agent connect codex
podstack agent connect cursor
podstack agent connect gemini
podstack agent connect grok
podstack agent connect --all
podstack agent connect claude --dry-run
podstack agent status
podstack agent disconnect claude
podstack agent welcome
```

| Flag | Meaning |
| --- | --- |
| `--all` | Set up every installed agent. Do not also pass a name |
| `--dry-run` | Print the plan and write nothing. Does not sign in |
| `--print` | Same as `--dry-run` |
| `--http host:port` | Tell the agent to use streamable HTTP instead of stdio |

`disconnect` restores the backups. `disconnect --all`, or `disconnect all`, restores every agent this command recorded.

`status` prints which agents are installed and whether the CLI is signed in.

`welcome` prints the short onboarding guide. An MCP client also receives that text in the `initialize` instructions. The longer guide is [podstack.ai/agents.md](https://podstack.ai/agents.md).

Install and connect in one step. See [Install](/docs/cli/install/).

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh -s -- --connect cursor
```

## Where the files go

### Claude Code

| OS | Config | Skills |
| --- | --- | --- |
| macOS and Linux | `~/.claude.json` and the project `.mcp.json` | `~/.claude/skills/<name>/SKILL.md` |
| Windows | `%USERPROFILE%\.claude.json` and the project `.mcp.json` | `%USERPROFILE%\.claude\skills\<name>\SKILL.md` |

This is the same result as `claude mcp add podstack -- podstack mcp serve`.

### Claude Desktop

| OS | Config file |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

The project guide is `.podstack/AGENTS.md`.

### Codex

| OS | Config | Skills and instructions |
| --- | --- | --- |
| macOS and Linux | `~/.codex/config.toml` | `~/.codex/skills`, `~/.codex/AGENTS.md`, `~/.codex/prompts/podstack.md` |
| Windows | `%USERPROFILE%\.codex\config.toml` | `%USERPROFILE%\.codex\skills`, `%USERPROFILE%\.codex\AGENTS.md`, `%USERPROFILE%\.codex\prompts\podstack.md` |

### Cursor

| OS | Config | Rules |
| --- | --- | --- |
| macOS and Linux | `~/.cursor/mcp.json` and the project `.cursor/mcp.json` | `~/.cursor/rules` and the project `.cursor/rules` |
| Windows | `%USERPROFILE%\.cursor\mcp.json` and the project `.cursor\mcp.json` | `%USERPROFILE%\.cursor\rules` and the project `.cursor\rules` |

The command also prints a Cursor install deeplink.

### Gemini CLI

| OS | Config | Instructions |
| --- | --- | --- |
| macOS and Linux | `~/.gemini/settings.json` | `~/.gemini/GEMINI.md` |
| Windows | `%USERPROFILE%\.gemini\settings.json` | `%USERPROFILE%\.gemini\GEMINI.md` |

### Grok and other MCP clients

| OS | Config | Skills |
| --- | --- | --- |
| macOS and Linux | `~/.podstack/mcp.json` and the project `.podstack/mcp.json` | `~/.podstack/skills` |
| Windows | `%USERPROFILE%\.podstack\mcp.json` and the project `.podstack\mcp.json` | `%USERPROFILE%\.podstack\skills` |

The server command in that file is `podstack` with arguments `mcp` and `serve`. Do not add `PODSTACK_API_KEY` there.

Recipes an agent can follow are in [Agent examples](/docs/agents/).
