---
title: FAQs & scenarios
weight: 140
description: "Frequently asked questions and end-to-end scenarios for the Podstack CLI — the coding agent, sandboxes, previews, billing, and CI."
keywords:
  - Podstack CLI FAQ
  - podstack code scenarios
  - CLI troubleshooting
  - sandbox billing
  - coding agent help
---

# FAQs & scenarios

## Frequently asked questions

**How do I sign in without a browser (CI/servers)?**
Set `PODSTACK_API_KEY=psk_…` in the environment, or run `podstack auth login --key psk_…`. See [Authentication](/docs/cli/authentication/).

**Where are my credentials and settings stored?**
Credentials in `~/.config/podstack/credentials.json`; default project and settings in `~/.podstack/config.json`. See [Configuration](/docs/cli/configuration/).

**`podstack code` says "project_id is required" or "couldn't list projects."**
You need a default project. Run `podstack projects use <id-or-name>`, or `podstack projects create <name>`, or set `PODSTACK_PROJECT_ID`. See [Projects](/docs/cli/projects/).

**How much does a preview cost, and how do I stop it?**
Sandboxes bill per hour from your wallet and auto-close after the TTL (default 2h). Run `podstack sandbox close` (or `/preview off` in the agent) to stop billing; `podstack sandbox list` shows anything still running. Check spend with `podstack sandbox cost` or `/cost`.

**The agent changed files I didn't want it to.**
Use **manual** mode (the default — you approve each change) or **plan** mode (read-only). Press **shift+tab** to cycle modes. `auto` mode / `--yolo` runs without prompting.

**Does the agent install dependencies for me?**
Yes — the sandbox starts bare and the agent installs every runtime, package, and service the app needs (Node.js, Python, MongoDB, …) as part of setup.

**Can I resume a build later?**
Yes. `podstack code --continue` (most recent session here) or `--resume <id>`. The agent reads `.podstack/progress.json` and the plan file to pick up where it left off.

**How do I update the CLI?**
`podstack upgrade` (or `--version vX.Y.Z` to pin). The CLI also nudges you when a newer release is available.

**Which platforms are supported?**
macOS, Linux, and Windows (PowerShell or cmd; Git Bash recommended for the agent's bash tool).

## Scenarios

### Build and ship a full-stack app

```sh
mkdir notes-app && cd notes-app
podstack code
```

> "Build a full-stack notes app: React front end, Express API, MongoDB. Plan it first."

Press **shift+tab** to **plan** mode, review the plan the agent writes to `.podstack/plans/`, then **shift+tab** to build. The agent installs Node + MongoDB in the sandbox, builds all layers, and returns a live preview URL with Swagger docs and a README.

### One-shot change in CI

```sh
export PODSTACK_API_KEY=psk_…
podstack code -p "bump the version in package.json and update CHANGELOG.md" \
  --allow-tools read,edit --output-format json
```

### Rent a GPU, move data, train

```sh
podstack gpu launch                       # pick and launch a GPU
podstack gpu instances ssh <id>           # connect
# on the box: run your training…
podstack send ./results/                  # ship results back (code phrase)
```

### Fine-tune a model, then serve it

```sh
podstack files upload ./train.jsonl --purpose fine-tune       # → file_123
podstack train create --model podstack/qwen2.5-7b-instruct \
  --training-file file_123 --method lora
podstack train events <id> --follow
```

Then call it over the [Inference API](/docs/inference/).

## Still stuck?

See [Customer Support](/docs/support/) or run any command with `--help`.
