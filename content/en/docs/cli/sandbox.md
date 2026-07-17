---
title: Sandboxes
weight: 50
description: "Preview the app in your current directory in a Podstack cloud sandbox and get a public URL — with podstack sandbox run, logs, cost, and close."
keywords:
  - cloud sandbox
  - app preview URL
  - podstack sandbox
  - live preview cloud
  - ephemeral compute
---

# Sandboxes — `podstack sandbox`

A **sandbox** runs the workspace in your current directory in the Podstack cloud and gives you a **public preview URL**. It's what powers the live previews in [`podstack code`](/docs/cli/code/), but you can drive it directly too. Sandboxes are billed per hour from your wallet and auto-close after a TTL (default 2h) — close one to stop billing.

## Launch a preview

```sh
podstack sandbox run --setup "pip install -r requirements.txt" --port 8000
```

This syncs your workspace into a sandbox, installs dependencies, starts your app, and prints the public URL.

**Flags for `run`:**

| Flag | Description |
|------|-------------|
| `--port <int>` | The port your app listens on (routed to the public URL) |
| `--setup <cmd>` | Dependency-install command run before the app starts |
| `--image <name\|uri>` | Sandbox image (name from the catalog or a full URI) |
| `--cpu <k8s>` | CPU limit, e.g. `"1"` or `"500m"` |
| `--mem <k8s>` | Memory limit, e.g. `"1Gi"` |
| `--gpu <int>` | GPU count (metered extra cost) |
| `--ttl <dur>` | Auto-close TTL as a Go duration (default `2h`) |
| `-- <command…>` | Everything after `--` is the run command |

Re-running `sandbox run` after edits syncs only the changed files and skips setup unless your dependency files changed, so iterations are fast. If a previous sandbox has become unreachable, the CLI transparently spins up a fresh one.

## Manage a sandbox

```sh
podstack sandbox list                 # all your sandboxes and their state
podstack sandbox logs                 # the previewed app's recent output
podstack sandbox cost                 # accrued cost for this workspace's sandbox
podstack sandbox renew --ttl 4h       # extend the auto-close deadline
podstack sandbox close                # stop the sandbox (and its billing)
```

Most subcommands default to **this workspace's** sandbox; pass a sandbox id to target another. `podstack sandbox close --all` closes every running sandbox.

## Cost & billing

Sandboxes bill per hour from your wallet at a flat rate for default resources (GPUs add cost). Always `podstack sandbox close` when you're done — `podstack sandbox list` shows anything still running and billing.

## Using it from the agent

Inside `podstack code`, the agent writes the `sandbox` block into `.podstack/config.json` (`image`, `port`, `setup`, `run`), installs all dependencies, and previews automatically. See [Coding agent](/docs/cli/code/).

## Related

- [Coding agent](/docs/cli/code/) — auto-previews as part of a build.
- [Projects](/docs/cli/projects/) — a sandbox runs inside your default project.
