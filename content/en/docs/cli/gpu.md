---
title: GPUs
weight: 70
description: "Rent and manage on-demand NVIDIA GPU instances from the Podstack CLI — check pricing, manage SSH keys, launch, and SSH in with podstack gpu."
keywords:
  - rent GPU CLI
  - on-demand GPU
  - podstack gpu
  - GPU SSH
  - H100 A100 rental
  - GPU pricing CLI
---

# GPUs — `podstack gpu`

Rent and manage on-demand GPU instances (TrainPods) from your terminal.

```sh
podstack gpu types list                                   # available GPU types
podstack gpu pricing --gpu-type h100                      # price for a type
podstack gpu keys list                                    # your SSH keys
podstack gpu instances create --type h100 --count 1 --tier on_demand
podstack gpu instances ssh <id>                           # connect
```

## Discover GPUs and pricing

```sh
podstack gpu types list              # list GPU types (h100, a100, …)
podstack gpu pricing --gpu-type h100 # show pricing for a GPU type
```

## SSH keys

You connect to instances over SSH, so register a public key first:

```sh
podstack gpu keys list               # list registered keys
podstack gpu keys --help             # add/remove keys
```

## Launch an instance

The fastest way is the interactive picker:

```sh
podstack gpu launch                  # pick a GPU and launch it
```

Or create one explicitly:

```sh
podstack gpu instances create --type h100 --count 1 --tier on_demand
```

Key options: `--type` (GPU type), `--count` (number of GPUs), `--tier` (e.g. `on_demand`). Run `podstack gpu instances create --help` for the full list.

## Manage instances

```sh
podstack gpu instances list          # your instances and their state
podstack gpu instances ssh <id>      # SSH into an instance
podstack gpu instances --help        # start/stop/terminate and more
```

## Billing

GPU instances bill from your wallet while running. Terminate an instance to stop billing. See [Wallet & pricing](/docs/trainpod/pricing-and-billing/) and the [TrainPod](/docs/trainpod/) section for the end-to-end provision → SSH → train workflow, including video walkthroughs.

## Related

- [TrainPods](/docs/trainpod/) — the full on-demand GPU product and SSH tutorials.
- [Fine-tuning](/docs/cli/train/) — managed training without managing a box.
- [Send & receive](/docs/cli/send-receive/) — move data to and from an instance.
