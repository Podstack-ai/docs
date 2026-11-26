---
title: Documentation
description: "How Podstack GPU Cloud, Jobs, Inference, Endpoints, Functions, Deploy, Reservations, and the prepaid wallet work."
keywords:
  - Podstack docs
  - GPU cloud
  - podstack.ai/api/v1
  - prepaid wallet
---

# Podstack documentation

Podstack is the console at [podstack.ai](https://podstack.ai). You rent GPUs, run jobs, and call models. Billing is a prepaid wallet.

| Product | What it does |
| --- | --- |
| [GPU Cloud](/docs/gpu-cloud/) | Launch a dedicated machine. Billed per second from the hourly rate, from boot until you terminate it. |
| [Jobs](/docs/jobs/) | Run a script on a GPU until it finishes. You pay for the time the job runs. |
| [Inference](/docs/inference/) | Open models on an OpenAI-compatible API at `https://podstack.ai/api/v1`. Billed per token. |
| [Endpoints](/docs/endpoints/) | A Hugging Face model on dedicated GPUs that can scale to zero. |
| [Functions](/docs/functions/) | A Python function that runs on a GPU when you call it. |
| [Deploy](/docs/deploy/) | Ready-to-run apps such as JupyterLab and ComfyUI on a dedicated GPU. |
| [Reservations](/docs/reservations/) | A quoted cluster of 16 to 1,024 GPUs for a fixed term. |
| [CLI](/docs/cli/) | The `podstack` command, version 1.2.0. Install, auth, GPU, jobs, agents, and MCP. |
| [Python SDK](/docs/sdk/) | The `podstack` package, version 1.8.0, releasing soon. |
| [Agent examples](/docs/agents/) | Recipes an agent can follow, with a confirm step before any spend. |

GPU Cloud was formerly called QuickPod. Jobs was formerly called TrainPod. Older links under `/docs/quickpod/` and `/docs/trainpod/` still open those sections.

Prices on [podstack.ai](https://podstack.ai/#pricing) and in the console are in INR for India and USD everywhere else. Live GPU rates are not copied into these pages.

## Start here

1. [Create an account](/docs/getting-started/creating-account/) with Google, Microsoft, or GitHub.
2. [Add credits](/docs/billing/wallet/) with Razorpay.
3. [Add an SSH key](/docs/account/ssh-keys/), then [launch a GPU](/docs/gpu-cloud/launch-a-pod/).

Sign in at [podstack.ai/auth](https://podstack.ai/auth). The console is [podstack.ai/app](https://podstack.ai/app).
