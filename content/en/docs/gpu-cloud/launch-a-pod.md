---
title: Launch an instance
description: "Launch a GPU from the Podstack cloud board. Pick a region, disk, environment, and SSH key."
weight: 30
aliases:
  - /docs/compute/pods/creating-pods/
  - /docs/jobs/provision-a-gpu/
keywords:
  - launch GPU
  - instance
---

# Launch an instance

You need a [wallet balance](/docs/billing/wallet/) that covers the first hour, and at least one [SSH key](/docs/account/ssh-keys/) in the project.

1. Open [GPU Cloud](https://podstack.ai/app).
2. Filter by GPU model and type, search by region, and sort by price.
3. Click **Launch** on a card.
4. Walk through the wizard, then click **Launch**.

The instance shows up under [Instances](/docs/gpu-cloud/instances/) when it boots.

## Wizard

**Region.** Leave "Any region, cheapest price" on, or pick a region that has a free machine. The console already has labels for `ca-central`, `us-central`, `us-east`, `us-west`, `eu-west`, `eu-east`, `asia-pacific`, and `india-south`. Any other id is shown from its name. Only regions with stock appear.

**Name.** Letters, numbers, dots, hyphens, and underscores. 63 characters at most. The name is what you see in Instances and on the bill.

**Resources.** Pick a CPU and memory size, or the cheapest available. Disk starts at 100 GB in the wizard. On machines that allow a larger disk you can set 10 to 1,000 GB. Extra disk beyond what is included is added to the hourly price. Some machines have a fixed disk.

**Environment.** The list comes from the environments catalog, so it can change. When a framework id is one of `pytorch`, `cuda`, `cuda-devel`, `jupyter`, `tensorflow`, `jax`, or `vllm`, the console labels it PyTorch, CUDA, Jupyter, TensorFlow, JAX, or vLLM. **Base** is drivers and CUDA only. **VM** is a full root VM, and only if that GPU has a VM machine. You can pick a framework version or a VM operating system when the catalog offers one.

**Access.** Attach at least one SSH key from this project. Every key is attached unless you clear it.

You can also add a dedicated public IPv4. See [Disk and network](/docs/gpu-cloud/disk-and-network/). Port 22 is not forwarded. SSH stays on the instance SSH command.

**Review.** The price is the machine plus extra disk plus a dedicated IP if you asked for one. The launch is refused if the wallet does not cover the first hour, or if the price moved up since the wizard showed it.

Boot time depends on the machine and the image. The wizard shows an estimate. A machine marked instant boot is usually up in about a minute before the environment finishes loading.
