---
title: TrainPods
weight: 30
description: "Rent on-demand NVIDIA GPUs at low prices with Podstack TrainPods — provision a GPU pod, SSH in, move datasets in and out, and run managed fine-tuning jobs, all from the podstack CLI."
keywords:
  - on-demand GPU
  - rent NVIDIA GPU
  - cheap H100 rental
  - A100 GPU cloud
  - GPU pod SSH
  - fine-tuning GPU cloud
  - podstack CLI GPU
  - train LLM on H100
  - GPU VM provisioning
  - move dataset to GPU
  - spot GPU pricing
  - LoRA fine-tuning
---

# TrainPods

**TrainPods** are Podstack's raw, on-demand NVIDIA GPU compute: rent a GPU pod, SSH in with your own key, move data in and out, and run training or fine-tuning — provisioned, connected, and controlled entirely from the [`podstack` CLI](/docs/cli/).

If you want a machine with GPUs that behaves like a plain Linux box you SSH into, TrainPods are it. Pick a GPU, launch it, connect, and start working. You pay by the hour only while the instance runs.

## What you can do

- **Provision GPUs on demand** — one command launches an H100, A100, L40S, or any other GPU in the catalog, on `spot` or `on_demand` pricing.
- **SSH in with your local key** — Podstack registers only your public key; the private key never leaves your machine. `podstack gpu instances ssh <id>` drops you into a shell.
- **Move data in and out** — `podstack gpu instances cp` for SCP transfers, or `podstack send` / `podstack receive` for large, resumable, relay-based transfers.
- **Expose services locally** — tunnel TensorBoard, a training dashboard, or an inference server to `localhost` over SSH with `podstack gpu instances expose`.
- **Run managed fine-tuning** — hand Podstack a dataset and a base model with `podstack train create` and let the platform run a LoRA/QLoRA job for you — no instance management required.

## TrainPods vs QuickPods

Podstack offers two ways to get GPUs. Pick based on how much of the environment you want to manage.

| | **TrainPods** (this section) | **QuickPods** (Pods) |
|---|---|---|
| What you get | A raw GPU instance you SSH into | A container running a template (PyTorch, ComfyUI, JupyterLab…) |
| Best for | Custom training, fine-tuning, full control of the box | One-click apps, notebooks, pre-built ML environments |
| Access | `podstack gpu instances ssh` with your local key | Web terminal, Jupyter, SSH via the `cloud.podstack.ai` proxy |
| Provisioning | `podstack gpu` CLI or the portal | The **Pods** section of the dashboard |
| Managed fine-tuning | `podstack train` jobs (no box to manage) | — |

> New to container pods and templates instead? See [Compute → Pods](/docs/compute/pods/).

## Get started

Work through these pages in order, or jump to what you need:

1. **[Provision a GPU](/docs/trainpod/provision-a-gpu/)** — fund your wallet, pick a GPU, and launch an instance.
2. **[SSH access](/docs/trainpod/ssh-access/)** — register an SSH key and connect from macOS, Linux, or Windows (with video walkthroughs).
3. **[Move data](/docs/trainpod/move-data/)** — upload datasets and pull results back with `cp`, `send`, and `receive`.
4. **[Fine-tuning](/docs/trainpod/fine-tuning/)** — run managed `podstack train` LoRA/QLoRA jobs.
5. **[Pricing & billing](/docs/trainpod/pricing-and-billing/)** — how per-hour pricing, spot vs on-demand, and the wallet work.
6. **[Troubleshooting](/docs/trainpod/troubleshooting/)** — fixes for the common provisioning, SSH, and data-transfer issues.

## Prerequisites

- A [Podstack account](https://cloud.podstack.ai) with wallet balance — see [Pricing & billing](/docs/trainpod/pricing-and-billing/).
- The `podstack` CLI installed and authenticated — see [CLI installation](/docs/cli/installation/) and [authentication](/docs/cli/authentication/).
- `ssh` and `scp` available on your machine (standard on macOS/Linux; on Windows use PowerShell or Git Bash).

```bash
# Confirm the CLI is installed and you're signed in
podstack version
podstack auth whoami
```
