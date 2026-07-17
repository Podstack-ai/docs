---
title: Quick Start
weight: 30
description: "Go from install to a live app preview and your first GPU with the Podstack CLI in minutes."
keywords:
  - Podstack CLI quickstart
  - first app preview
  - podstack code tutorial
  - GPU cloud getting started
---

# Quick Start

## 1. Install & sign in

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh
podstack auth login          # opens your browser (Google / GitHub / SSO)
```

`login` also selects your default project. If you have more than one, pick it later with `podstack projects use <name>`.

## 2. Build and preview an app

```sh
mkdir my-app && cd my-app
podstack code
```

At the prompt, describe what you want — for example:

> "Build a FastAPI todo API with a small React front end, then show me a live preview."

The agent recommends the app shape, plans it, installs everything in a cloud sandbox, builds it, and hands you a **public preview URL**. Backends include interactive Swagger docs, and every project gets a `README.md`.

Track spend with `/cost`, and stop the preview (and its billing) with `/preview off`. See [Coding agent](/docs/cli/code/).

## 3. (Optional) Rent a GPU

```sh
podstack gpu launch                 # pick a GPU and launch it
podstack gpu instances ssh <id>     # connect over SSH
```

See [GPUs](/docs/cli/gpu/) and the [TrainPod](/docs/trainpod/) guides.

## 4. (Optional) Call a model

```sh
podstack models list                # models on Inference Cloud
```

Use them over an OpenAI-compatible API — see [Inference](/docs/inference/).

## Where to next

- [Coding agent](/docs/cli/code/) — the full `podstack code` reference.
- [Sandboxes](/docs/cli/sandbox/) — drive previews directly.
- [FAQs & scenarios](/docs/cli/faqs/) — common questions and end-to-end walkthroughs.
