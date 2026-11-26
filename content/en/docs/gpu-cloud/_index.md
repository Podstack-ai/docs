---
title: GPU Cloud
description: "Launch a dedicated GPU on Podstack. Billed per second from the hourly rate, from boot until you terminate it."
weight: 20
aliases:
  - /docs/quickpod/
  - /docs/compute/
  - /docs/compute/gpu-marketplace/
  - /docs/compute/pods/
  - /docs/gpu-cloud/scenarios/
  - /docs/gpu-cloud/mlops/
  - /docs/mlops/
  - /docs/mlops/approvals/
  - /docs/mlops/drift-detection/
  - /docs/mlops/model-monitoring/
  - /docs/mlops/pipelines/
  - /docs/mlops/schedules/
  - /docs/advanced/
  - /docs/advanced/ai-studio/
keywords:
  - GPU Cloud
  - instances
---

# GPU Cloud

GPU Cloud was formerly called QuickPod. Links under `/docs/quickpod/` still open this section.

GPU Cloud is the live board of machines you can launch. Each card is a GPU that is free right now. Prices on the card include the machine. Extra disk is separate. You pay for the time the instance runs, pro-rated by the second from the hourly rate, from boot until you terminate it. Charges come out of the project wallet.

Each offer is **Secured** or **Community** capacity. The two are priced and stocked separately. An offer that does not name a class is Secured.

The board is the list of GPUs. These docs do not copy that list or its prices. Open [podstack.ai/app](https://podstack.ai/app) or [podstack.ai/#pricing](https://podstack.ai/#pricing). India is shown in INR. Every other location is shown in USD.

## What you get

- A dedicated machine, not a slice of a GPU.
- SSH, using a key from this project. The command is on the instance row. Hosts that use a Podstack name are on `cloud.podstack.ai`.
- A disk. The launch wizard includes 100 GB. Extra disk, where the machine allows it, is billed per GB-hour. See [Disk and network](/docs/gpu-cloud/disk-and-network/).
- An environment: a framework image, a base image with CUDA drivers, or a VM when that machine can run one.

There is no shared network volume, no object store, and no separate MLOps product on this console. Data on the instance disk is deleted when you terminate the machine.

## In this section

- [Launch an instance](/docs/gpu-cloud/launch-a-pod/)
- [Instances and SSH](/docs/gpu-cloud/instances/)
- [Disk and network](/docs/gpu-cloud/disk-and-network/)
- [Schedules](/docs/gpu-cloud/schedules/)
- [Watchlists](/docs/gpu-cloud/watchlists/)
- [Troubleshooting](/docs/gpu-cloud/troubleshooting/)

Ready-made apps such as JupyterLab and ComfyUI are under [Deploy](/docs/deploy/).
