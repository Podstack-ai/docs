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

## What's available today

Every command below ships in the current `podstack` binary — no flags to unlock, no waitlist:

- **AI coding agent** — `podstack code` runs the agent in your current directory, and `podstack code sessions list` / `delete` manage saved sessions so you can resume work.
- **Cloud sandboxes** — `podstack sandbox run` syncs your workspace and returns a public preview URL; `list`, `logs`, `cost`, `renew`, and `close` manage the running sandboxes.
- **On-demand GPUs** — `podstack gpu types list` and `podstack gpu pricing` browse the catalog; `podstack gpu launch` is an interactive quick-launch; `podstack gpu instances` covers `create`, `list`, `get`, `delete`, `ssh`, `cp`, and `expose`; `podstack gpu keys` manages your SSH keys (`list`, `create`, `delete`).
- **Managed fine-tuning** — `podstack train create`, `list`, `get`, `cancel`, and `events` run LoRA/QLoRA jobs, and `podstack train models` lists base models.
- **Dataset uploads** — `podstack files upload` sends datasets for fine-tuning.
- **Inference** — `podstack models list` prints the Inference Cloud catalog.
- **Secrets** — `podstack secrets set` / `list` / `rm` store values the coding agent can use without seeing them.
- **Peer-to-peer transfer** — `podstack send` and `podstack receive` move files and directories between machines with a code phrase.
- **Projects & auth** — `podstack auth login` / `whoami` / `logout`, and `podstack projects list` / `use` / `create` to choose the billing project.
- **Scripting** — the `--output json|table` flag, plus the `PODSTACK_API_KEY` and `PODSTACK_PROJECT_ID` environment variables, make every command CI-friendly. `podstack upgrade` and `podstack version` keep the binary current.

## Use cases

- **Ship an app from a prompt** — a developer runs `podstack code` in a project directory and the agent plans, edits, and previews the running app in a cloud sandbox, then shares the preview URL with a teammate.
- **Rent a GPU without leaving the terminal** — an ML engineer runs `podstack gpu launch`, picks an H100, and is dropped into an SSH shell on the box seconds later with their own key.
- **Fine-tune hands-off** — a data scientist uploads a JSONL dataset with `podstack files upload`, kicks off a LoRA job with `podstack train create --budget 25`, and follows it to completion with `podstack train events --follow`.
- **Wire inference into CI** — a platform engineer sets `PODSTACK_API_KEY` in a pipeline, runs `podstack models list --output json`, and pipes the catalog into a deploy step with `jq`.
- **Move a dataset between machines** — a researcher runs `podstack send ./dataset` on their laptop and `podstack receive <code>` on a remote box for a resumable, relay-based transfer.
- **Keep secrets out of prompts** — a developer stores an API token with `podstack secrets set STRIPE_KEY` so the coding agent can call the service without ever seeing the value.

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
