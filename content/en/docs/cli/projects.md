---
title: Projects
weight: 60
description: "Choose the Podstack project your sandboxes and compute bill to, from the CLI — podstack projects list, use, and create."
keywords:
  - CLI project management
  - podstack projects
  - default project CLI
  - X-Project-ID
---

# Projects — `podstack projects`

Every sandbox and compute resource runs inside a **project**, and its cost bills to that project. The project id is sent as the `X-Project-ID` header on API calls. Set a default so you don't have to pass it each time.

```sh
podstack projects                    # list your projects (marks the default)
podstack projects use <id-or-name>   # set the default project
podstack projects create <name>      # create a project and make it the default
```

The default is saved to `~/.podstack/config.json`. Override it for a single command with the `PODSTACK_PROJECT_ID` environment variable.

## First-run picker

When you run `podstack code` (or `podstack auth login`) with no default project set, the CLI lists your projects and lets you pick one with the arrow keys — or create a new one on the spot. A single project is adopted automatically.

## Commands

| Command | Description |
|---------|-------------|
| `podstack projects` / `projects list` | List projects; the default is marked |
| `podstack projects use <id\|name>` | Set the default project (by id or name) |
| `podstack projects create <name>` | Create a project and set it as the default |

## Related

- [Authentication](/docs/cli/authentication/) — sign-in also selects a project.
- [Configuration](/docs/cli/configuration/) — where the default is stored.
