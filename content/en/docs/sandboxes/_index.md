---
title: Sandboxes
description: "Short-lived isolated GPU environments for ephemeral compute, code execution, and one-off jobs. Pause and resume on demand."
keywords:
  - GPU sandbox
  - ephemeral compute
  - code execution sandbox
  - isolated GPU environment
---

# Sandboxes

Sandboxes are short-lived, project-scoped, isolated compute environments. They're built for ephemeral work — running untrusted code, evaluating a model, executing a one-off training job — without the lifecycle of a long-running pod.

A sandbox runs on a fraction or whole GPU, terminates on a timeout, and can be paused and resumed without losing state. Find it under **Sandboxes** in the sidebar. The feature is gated by `REACT_APP_ENABLE_SANDBOX`.

## Sandbox vs. Pod

| Sandbox | Pod |
|---------|-----|
| Auto-terminates on a timeout | Runs until you stop it |
| Pause/resume preserves state | Stop releases the GPU |
| Single image, single workload | Long-running, often multi-step |
| Use for: code exec, one-off jobs, evals | Use for: training, inference servers, notebooks |

## Creating a Sandbox

The wizard at **Sandboxes > Create Sandbox** walks through three steps.

### 1. GPU Selection

Pick a GPU type, count, and fraction:

| GPU | Memory |
|-----|--------|
| No GPU | — |
| T4 | 16 GB |
| A10 | 24 GB |
| L40 / L40S | 48 GB |
| A100 (40 GB / 80 GB) | 40 GB / 80 GB |
| H100 | 80 GB |

For each GPU you can take a **fractional share** (25%, 50%, 75%, or 100%) — useful when you need GPU access but don't need a whole card.

### 2. Image

Choose one of the curated sandbox images (organized by category — PyTorch, vLLM, code interpreter, etc.) or provide a **custom image URI**. Custom images can pull from private registries by supplying a username and password.

### 3. Configuration

- **CPU** and **Memory** (e.g. `1` CPU, `2Gi` memory)
- **Timeout** in seconds — the sandbox is terminated automatically after this duration (default 3600 s)
- **Environment variables** — key/value pairs available inside the sandbox
- **Project** — the sandbox is scoped to the selected project

Click **Create Sandbox** to launch. Provisioning typically takes seconds to a couple of minutes depending on image pull.

## Lifecycle

| State | Description |
|-------|-------------|
| **Running** | Actively executing; billing is live |
| **Paused** | State preserved, GPU released; billing reduced |
| **Terminated** | Stopped — either by you, by timeout, or by failure; cannot be resumed |
| **Failed** | Provisioning or runtime error; see logs |

Actions on the sandbox list:

- **Pause** — frees the GPU but keeps disk state; resume picks up where you left off
- **Resume** — bring a paused sandbox back online (may schedule on a different GPU)
- **Delete** — terminate and clean up

The sandbox list auto-refreshes every 10 seconds while there are active sandboxes.

## KYC Requirement

Creating a sandbox requires KYC verification. Unverified users are prompted to complete [KYC](/docs/billing/kyc/) before provisioning.

## Use Cases

- **Code execution in chat agents** — run model-generated code against a real interpreter without trusting the model
- **One-off evals** — fire up a sandbox, run a benchmark, capture metrics, tear down
- **Reproducing a bug report** — bring up an isolated env matching the user's stack
- **Short training experiments** — when you'd otherwise leave a pod idle between iterations

## Billing

Sandboxes are billed per second on GPU/CPU/memory while **Running**. Paused sandboxes accrue a much smaller storage charge for the held state. See the wallet expenditure breakdown for current rates.

## Next Steps

- [Pods](/docs/compute/pods/) — for long-running container workloads
- [Serverless GPU](/docs/advanced/serverless-gpu/) — for interactive notebook sessions
- [KYC Verification](/docs/billing/kyc/) — required to create sandboxes
