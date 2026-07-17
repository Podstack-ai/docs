---
title: CLI
weight: 50
description: "The Podstack CLI: an AI coding agent, live app previews in cloud sandboxes, on-demand GPUs, fine-tuning, and OpenAI-compatible inference — all from your terminal."
keywords:
  - Podstack CLI
  - GPU cloud CLI
  - AI coding agent CLI
  - terminal GPU management
  - podstack code
  - cloud sandbox preview
  - command line ML platform
---

# CLI

`podstack` is the official command-line interface for the Podstack cloud. It bundles four things into one binary:

- **`podstack code`** — an AI coding agent that plans, builds, and previews full applications for you, live, in a cloud sandbox.
- **Cloud sandboxes** — sync your workspace into a sandbox and get a public preview URL (`podstack sandbox`).
- **On-demand GPUs & fine-tuning** — rent GPUs, SSH in, move data, and run managed fine-tuning jobs (`podstack gpu`, `podstack train`, `podstack files`).
- **Inference** — list and use the models on Podstack Inference Cloud (`podstack models`).

Authentication is a single browser sign-in (`podstack auth login`) — no API key to copy.

## Install

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh
```

Then sign in and confirm:

```sh
podstack auth login      # opens your browser (Google / GitHub / SSO)
podstack version
```

See [Installation](/docs/cli/installation/) for other platforms and upgrades.

## Command map

| Command | What it does | Guide |
|---------|--------------|-------|
| `podstack auth` | Sign in / out, show identity | [Authentication](/docs/cli/authentication/) |
| `podstack projects` | Pick the project resources bill to | [Projects](/docs/cli/projects/) |
| `podstack code` | AI coding agent — build & preview apps | [Coding agent](/docs/cli/code/) |
| `podstack sandbox` | Preview the current app in a cloud sandbox | [Sandboxes](/docs/cli/sandbox/) |
| `podstack gpu` | Rent and manage GPU instances, SSH keys | [GPUs](/docs/cli/gpu/) |
| `podstack train` | Managed fine-tuning jobs | [Fine-tuning](/docs/cli/train/) |
| `podstack files` | Upload datasets for fine-tuning | [Files](/docs/cli/files/) |
| `podstack models` | List Inference Cloud models | [Models](/docs/cli/models/) |
| `podstack secrets` | Store secrets the agent can use blind | [Secrets](/docs/cli/secrets/) |
| `podstack send` / `receive` | Peer-to-peer file transfer | [Send & receive](/docs/cli/send-receive/) |
| `podstack upgrade` | Update the CLI | [Installation](/docs/cli/installation/) |

## Global flags

- `--output json|table` — force the output format. The default is a human table on a terminal and JSON when piped, so `podstack gpu instances list | jq` just works.
- `PODSTACK_API_KEY` — supply a `psk_` key via environment instead of an interactive login (useful in CI).
- `PODSTACK_PROJECT_ID` — override the default project for a single command.

## In this section

| Guide | Description |
|-------|-------------|
| [Installation](/docs/cli/installation/) | Install, upgrade, platforms |
| [Authentication](/docs/cli/authentication/) | Browser sign-in and CI keys |
| [Quick Start](/docs/cli/quickstart/) | Zero to running in minutes |
| [Coding agent](/docs/cli/code/) | `podstack code` — build & preview apps |
| [Sandboxes](/docs/cli/sandbox/) | Live previews in cloud sandboxes |
| [Projects](/docs/cli/projects/) | Choose the billing project |
| [GPUs](/docs/cli/gpu/) | Rent and manage GPU instances |
| [Fine-tuning](/docs/cli/train/) | Managed training jobs |
| [Files](/docs/cli/files/) | Upload datasets |
| [Models](/docs/cli/models/) | Inference Cloud models |
| [Secrets](/docs/cli/secrets/) | Blind secret injection for the agent |
| [Send & receive](/docs/cli/send-receive/) | Peer-to-peer transfer |
| [Configuration](/docs/cli/configuration/) | Config files and environment |
| [FAQs](/docs/cli/faqs/) | Common questions |
