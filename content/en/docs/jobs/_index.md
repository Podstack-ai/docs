---
aliases:
  - /docs/trainpod/
title: Jobs
weight: 30
description: "Rent on-demand NVIDIA GPUs at low prices with Podstack Jobs — provision a GPU pod, SSH in, move datasets in and out, and run managed fine-tuning jobs, all from the podstack CLI."
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

# Jobs

Jobs was formerly called TrainPod. Links under `/docs/trainpod/` still open this section.

**Jobs** are Podstack's on-demand GPU machines and managed training: rent a GPU, SSH in with your own key, move data in and out, and run fine-tuning — provisioned and controlled from the [`podstack` CLI](/docs/cli/).

GPU time is billed **per second from the hourly rate**, from boot until you terminate the instance. A job is billed **only while it is running**. Both come out of your prepaid wallet. There is no monthly or annual subscription.

## What you can do

- **Provision GPUs on demand** — one command launches an H100, A100, L40S, or any other GPU in the catalog, on `spot` or `on_demand` pricing.
- **SSH in with your local key** — Podstack registers only your public key; the private key never leaves your machine. `podstack gpu instances ssh <id>` drops you into a shell.
- **Move data in and out** — `podstack gpu instances cp` for SCP transfers, or `podstack send` / `podstack receive` for large, resumable, relay-based transfers.
- **Expose services locally** — tunnel TensorBoard, a training dashboard, or an inference server to `localhost` over SSH with `podstack gpu instances expose`.
- **Run managed fine-tuning** — hand Podstack a dataset and a base model with `podstack train create` and let the platform run a LoRA/QLoRA job for you — no instance management required.

## What's available today

Jobs are driven through the [`podstack` CLI](/docs/cli/), and every step below works right now:

- **Provision GPUs on demand** — `podstack gpu instances create` (or the interactive `podstack gpu launch`) starts an instance; browse the catalog and rates first with `podstack gpu types list` and `podstack gpu pricing`, on `spot` or `on_demand` pricing.
- **Manage instances** — `podstack gpu instances list`, `get`, and `delete` cover the full lifecycle.
- **SSH with your own key** — register keys with `podstack gpu keys create` / `list` / `delete`, then `podstack gpu instances ssh <id>` drops into a shell. Only your public key is registered; the private key stays local.
- **Move data in and out** — `podstack gpu instances cp` for SCP transfers, or `podstack send` / `podstack receive` for large, resumable, relay-based transfers.
- **Expose services locally** — `podstack gpu instances expose <id> <port>` tunnels TensorBoard, a dashboard, or an inference server to `localhost`.
- **Run managed fine-tuning** — `podstack train create` runs LoRA/QLoRA jobs with no box to manage; `podstack train list` / `get` / `cancel` / `events` track them and `podstack files upload` sends the dataset. See [Fine-tuning](/docs/jobs/fine-tuning/).
- **Per-hour, wallet-based billing** — you pay by the hour only while an instance runs. See [Pricing & billing](/docs/jobs/pricing-and-billing/).

> **Not yet generally available:** an in-portal GPU marketplace (browse and order instances from the dashboard) is built but currently gated behind a feature flag, so it may not appear in your portal. Today, provision Jobs through the CLI.

## Use cases

- **Custom training on rented hardware** — an ML engineer runs `podstack gpu launch`, picks an H100, SSHes in, and runs their own multi-GPU training script with full root control.
- **Fine-tune an LLM, hands-off** — a data scientist uploads a JSONL dataset, runs a managed LoRA job with `podstack train create --budget 25`, and collects the fine-tuned model id — no instance to manage.
- **Bring your own environment** — a PhD student launches a raw GPU box, installs a specific CUDA and framework stack, and runs experiments that don't fit a prebuilt template.
- **Cheap overnight batch run** — a cost-conscious team launches a `spot`-priced instance for an overnight job and deletes it in the morning to stop billing.
- **Watch training remotely** — an engineer starts TensorBoard on the instance and runs `podstack gpu instances expose <id> 6006` to view the curves at `localhost` over SSH.
- **Move a large dataset to the GPU** — a researcher pushes a multi-gigabyte dataset with `podstack send` and pulls checkpoints back with `podstack receive`, resuming if the link drops.

## Jobs vs GPU Cloud

Podstack offers two ways to get GPUs. Pick based on how much of the environment you want to manage.

| | **Jobs** (this section) | **GPU Cloud** (Pods) |
|---|---|---|
| What you get | A raw GPU instance you SSH into | A container running a template (PyTorch, ComfyUI, JupyterLab…) |
| Best for | Custom training, fine-tuning, full control of the box | One-click apps, notebooks, pre-built ML environments |
| Access | `podstack gpu instances ssh` with your local key | Web terminal, Jupyter, SSH via the `cloud.podstack.ai` proxy |
| Provisioning | `podstack gpu` CLI or the portal | The **Pods** section of the dashboard |
| Managed fine-tuning | `podstack train` jobs (no box to manage) | — |

> New to container pods and templates instead? See [Compute → Pods](/docs/compute/pods/).

## Get started

Work through these pages in order, or jump to what you need:

1. **[Provision a GPU](/docs/jobs/provision-a-gpu/)** — fund your wallet, pick a GPU, and launch an instance.
2. **[SSH access](/docs/jobs/ssh-access/)** — register an SSH key and connect from macOS, Linux, or Windows (with video walkthroughs).
3. **[Move data](/docs/jobs/move-data/)** — upload datasets and pull results back with `cp`, `send`, and `receive`.
4. **[Fine-tuning](/docs/jobs/fine-tuning/)** — run managed `podstack train` LoRA/QLoRA jobs.
5. **[Pricing & billing](/docs/jobs/pricing-and-billing/)** — per-second GPU billing, jobs, and the prepaid wallet.
6. **[Troubleshooting](/docs/jobs/troubleshooting/)** — fixes for the common provisioning, SSH, and data-transfer issues.

## Prerequisites

- A [Podstack account](https://cloud.podstack.ai) with wallet balance — see [Pricing & billing](/docs/jobs/pricing-and-billing/).
- The `podstack` CLI installed and authenticated — see [CLI installation](/docs/cli/installation/) and [authentication](/docs/cli/authentication/).
- `ssh` and `scp` available on your machine (standard on macOS/Linux; on Windows use PowerShell or Git Bash).

```bash
# Confirm the CLI is installed and you're signed in
podstack version
podstack auth whoami
```

## FAQs

**Which GPUs can I rent?**
Whatever is in the catalog — H100, A100, L40S, and more. List live options and rates with `podstack gpu types list` and `podstack gpu pricing`.

**What's the difference between `spot` and `on_demand`?**
`spot` is cheaper but can be reclaimed when capacity is needed; `on_demand` costs more but is more stable for long runs. Pick the mode when you create the instance.

**How do I connect to an instance?**
`podstack gpu instances ssh <id>` opens a shell using your local SSH key. Register keys first with `podstack gpu keys create`. See [SSH access](/docs/jobs/ssh-access/).

**Where does my SSH private key go?**
Nowhere — Podstack only registers your public key. The private key never leaves your machine.

**How am I billed?**
Per hour, from your wallet, only while the instance is running. Delete the instance to stop billing. See [Pricing & billing](/docs/jobs/pricing-and-billing/).

**Can I provision from the dashboard instead of the CLI?**
Today, provisioning is through the `podstack` CLI. An in-portal GPU marketplace is built but not yet generally available.

**When should I use managed fine-tuning instead of a raw box?**
Use `podstack train` when you want a LoRA/QLoRA model without managing a GPU. Rent a raw Jobs when you need a custom framework, data pipeline, or full control of the machine. See [Fine-tuning](/docs/jobs/fine-tuning/).
