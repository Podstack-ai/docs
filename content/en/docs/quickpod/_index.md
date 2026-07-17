---
title: QuickPods
weight: 20
description: "Deploy production-ready AI stacks in one click. Launch GPU pods from 1-click templates (Jupyter, ComfyUI, Ollama, vLLM), with persistent storage, fractional GPUs, and built-in MLOps."
keywords:
  - QuickPods
  - one-click GPU deployment
  - 1-click AI templates
  - managed GPU pods
  - fractional GPU
  - deploy Jupyter GPU
  - deploy ComfyUI
  - deploy vLLM
  - deploy Ollama
  - built-in MLOps
  - experiment tracking
  - model registry
  - persistent GPU storage
  - RunPod alternative
---
# QuickPods

**Deploy production-ready AI stacks in one click.** QuickPods is Podstack's managed, click-to-deploy product for GPU workloads. Pick a 1-click template, choose a GPU (full or fractional), and launch a running pod in seconds — no Dockerfiles, no Kubernetes, no infrastructure to wire up.

Every pod comes with persistent storage, SSH and a browser terminal, live logs and metrics, and a built-in MLOps stack for experiment tracking, model versioning, monitoring, and pipelines.

## What is a QuickPod?

A QuickPod is a containerized GPU workload — a **pod** — running on Podstack's managed infrastructure. Each pod runs a container built from a 1-click template (or any image you choose) with:

- **GPU access** — a full GPU or a fractional slice, across A100, H100, H200, L40S, V100, and T4 hardware
- **CPU, memory, and disk** allocation you control
- **Persistent storage** via NFS/data volumes that survive restarts and recreations
- **Access** through SSH, an in-browser web terminal, Jupyter, and auto-generated HTTPS URLs for any exposed port
- **Live observability** — streaming logs and real-time CPU/GPU/memory metrics

## When to use QuickPods

QuickPods is the fastest path when you want to:

- Spin up a **Jupyter or JupyterLab** GPU notebook for experimentation
- Run a ready-made app — **ComfyUI**, **Automatic1111**, **Ollama**, **vLLM**, **text-generation-webui** — without building an image
- **Fine-tune or train** a model (Axolotl, Unsloth, LLaMA-Factory, Kohya)
- **Serve** an LLM or embedding model on a GPU
- Track experiments, register models, and monitor them from one place

If you need dedicated, non-virtualized hardware for large-scale training, see the [GPU Marketplace](/docs/compute/gpu-marketplace/) instead. If you need auto-scaling, OpenAI-compatible serving endpoints, see [Inference](/docs/inference/).

## Capabilities

| Capability | What it gives you |
|---|---|
| **1-click templates** | A catalog of pre-built, GPU-ready app images — launch with defaults already set. See [Templates](/docs/quickpod/templates/). |
| **Fractional GPUs** | Rent a slice of a GPU (as little as a fraction of a card) to cut cost on light workloads. See [Manage & Scale](/docs/quickpod/manage-and-scale/). |
| **Persistent storage** | Attach volumes at `/data` so datasets, models, and outputs survive restarts. See [Storage & Data](/docs/quickpod/storage-and-data/). |
| **MLOps** | Experiment tracking, model registry, monitoring/drift, pipelines, and schedules. See [MLOps](/docs/quickpod/mlops/). |
| **Per-second billing** | Pay only for the GPU fraction and the seconds you run. Stop a pod to pause billing. |
| **Save your own templates** | Turn any pod configuration into a reusable 1-click template for your team. |

## The path

Work through these pages in order, or jump to the one you need:

1. **[Launch a Pod](/docs/quickpod/launch-a-pod/)** — the full click-by-click launch flow.
2. **[Templates](/docs/quickpod/templates/)** — the 1-click template catalog and how to use and save templates.
3. **[Storage & Data](/docs/quickpod/storage-and-data/)** — volumes, the `/data` convention, and moving files in and out.
4. **[Manage & Scale](/docs/quickpod/manage-and-scale/)** — start/stop, logs, metrics, resizing, and fractional GPUs.
5. **[MLOps](/docs/quickpod/mlops/)** — experiment tracking, model registry, monitoring, pipelines, and schedules.
6. **[Scenarios & Walkthroughs](/docs/quickpod/scenarios/)** — end-to-end examples you can follow along with.
7. **[Troubleshooting](/docs/quickpod/troubleshooting/)** — fixes for the most common issues.

## FAQs

**What's the difference between a QuickPod and a "pod"?**
They're the same resource. "QuickPod" is the managed, template-first launch experience in the portal; the underlying resource is a pod (container) you manage on the pod detail page.

**Do I need to know Docker or Kubernetes?**
No. Pick a 1-click template and launch. Everything — the image, ports, and environment — is pre-configured. Advanced users can still supply a custom image and settings.

**How is billing calculated?**
Per second, based on the GPU fraction, CPU, memory, and disk you allocate. You only pay while a pod is **Running**. Stop the pod to pause billing while keeping its configuration.

**What happens to my data when I stop or delete a pod?**
Data written inside the container (ephemeral disk) may be lost on stop or delete. Anything on an attached volume — mounted at `/data` by default — persists. Always keep important files under `/data`. See [Storage & Data](/docs/quickpod/storage-and-data/).

**Can I use a fractional GPU?**
Yes. When you pick a GPU you can request a slice rather than a whole card, which lowers the hourly rate for light inference and development. See [Manage & Scale](/docs/quickpod/manage-and-scale/).

**How do I connect to my pod?**
Over SSH, through the in-browser web terminal, via Jupyter (on notebook images), or through an auto-generated HTTPS URL for any port you expose. See [Launch a Pod](/docs/quickpod/launch-a-pod/).

**My GPU type shows as unavailable — what now?**
Choose a different GPU type, reduce the count, or join the waitlist to be notified when capacity frees up. See [Troubleshooting](/docs/quickpod/troubleshooting/).

**Is MLOps available on every account?**
MLOps features may be gated by a feature flag or account level. If the **MLOps**/registry sections aren't visible, contact support.
