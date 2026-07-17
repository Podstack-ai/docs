---
title: Launch a Pod
weight: 20
description: "Click-by-click guide to launching a GPU pod on Podstack QuickPods — pick a GPU, choose a template, configure resources and storage, and connect over SSH, web terminal, or Jupyter."
keywords:
  - launch GPU pod
  - create pod
  - deploy GPU container
  - QuickPods launch
  - select GPU instance
  - fractional GPU
  - pod SSH access
  - Jupyter notebook GPU
  - expose port pod
  - pod configuration
---
# Launch a Pod

This is the full click-by-click flow for launching a QuickPod from the customer portal. The launch wizard has three steps — **Instance Type**, **Template**, and **Configure** — shown as a progress indicator at the top of the page.

<!-- screenshot: the Launch Pod wizard header with the 3-step progress indicator -->

## Before you start

You need:

- A **verified account** — launching a pod requires KYC verification. If you aren't verified, a verification prompt appears instead of the wizard. See [KYC](/docs/billing/kyc/).
- A **project** to launch into. See [Creating Projects](/docs/projects/creating-projects/).
- **Wallet balance** — pods bill per second while running. See [Wallet & Billing](/docs/billing/wallet/).
- (Optional) An **SSH key** if you want shell access. Keys can only be added during pod creation, so add one first at **SSH Keys** if you don't have one. See [SSH Keys](/docs/account/ssh-keys/).

## Step 1 — Select Instance Type

1. Go to **Pods** and click **Launch Pod**.
2. On the **Select Instance Type** step, browse the available GPUs. Use the search box (**Search GPUs (e.g., A100, RTX, H100)...**) to filter.
3. By default only GPUs with live availability are shown. Tick **Show All GPUs** to include everything, including sold-out types.
4. Each GPU card shows its VRAM, CUDA/Tensor cores, the included CPU and RAM (e.g. *Includes 4 vCPU + 16GB RAM*), an availability badge (e.g. **3/8 Available**), and the price per minute and per hour.
5. Click **Select** on the GPU you want.
   - If the GPU is sold out, the button reads **Join Waitlist** instead. Click it to queue for capacity; you'll be notified when it frees up. See [Troubleshooting](/docs/quickpod/troubleshooting/).

Selecting a GPU auto-fills sensible defaults: 1 GPU, 100% of the card, and the CPU/RAM included with that GPU.

> **Fractional GPUs.** You don't have to take a whole card. You'll set the exact GPU count and the percentage of each GPU in Step 3 — see [Fractional GPUs](/docs/quickpod/manage-and-scale/#fractional-gpus).

## Step 2 — Choose a Template

1. On the **Choose a Template** step, either:
   - Click a **1-click template** to start from a pre-configured app (image, ports, and command already set), or
   - Click **Custom Configuration** to configure everything manually.
2. Filter templates with the search box (**Search templates by name, image, GPU...**) or the **All Categories** dropdown. Templates you've saved yourself appear under the **User Templates** category.
3. Each template card shows its name, description, container image, and resource chips (vCPU, RAM, GPU type). Click one to pre-fill the configuration and jump to Step 3.

For the full catalog and how to save your own, see [Templates](/docs/quickpod/templates/).

## Step 3 — Configure Your Pod

The **Configure Your Pod** step is a set of cards on the left with a live **Summary** panel on the right.

### Basic Info

| Field | Notes |
|---|---|
| **Pod Name** | Required. A descriptive name, e.g. `my-training-pod`. |
| **Project** | Required. The project this pod is billed to. |
| **Container Image** | The Docker image. Pre-filled from your template, or defaults to a PyTorch image for custom configs. |
| **Private Registry (requires authentication)** | Tick to reveal **Registry URL**, **Registry Username**, and **Registry Password/Token** for private images. |

### Resources

- **vCPU** and **Memory (GB)** — set each with the slider or the number box. When a GPU is selected, the amount included with it is free; anything above that adds cost. A live caption shows how much capacity is free right now.
- **GPU Type** — read-only; shows the GPU you picked in Step 1.
- **Number of GPUs** — how many GPUs to attach (1 up to what's available).
- **GPU Memory/Cores per GPU** — the percentage of each GPU to use, from **5%** to **100%** in 5% steps. This is the fractional-GPU control. A donut chart shows what's already booked, your request, and what's free, and a summary line shows the effective VRAM.

<!-- screenshot: the Resources card showing the vCPU/Memory sliders and the GPU percentage donut -->

### NFS Volume (optional)

Attach persistent storage so your work survives restarts:

1. In the **NFS Volume** card, pick a volume from the list (or **No Volume** for ephemeral storage only).
2. Set the **Mount Path Inside Pod** — defaults to `/data`, the path every Podstack image expects.
3. No volume yet? Click **Create Volume** (a project must be selected first).

See [Storage & Data](/docs/quickpod/storage-and-data/) for details.

### Configuration

- **SSH Key Access** — pick an SSH key to enable shell access. Port 22 is exposed automatically. *SSH keys can only be added during pod creation*, so add one first if the list is empty. Choose **No SSH Access** to skip.
- **Environment Variables** — click **+ Add Variable** to add `KEY` / `value` pairs.
- **Entry Point Command** (optional) — override the container's default command, e.g. `python app.py`.
- **Exposed Ports** — enter a port and click **Add Port** to make it reachable over HTTPS. Each container port is mapped to a public URL after launch. Jupyter/notebook images default to port `8888`.

### Billing Period

Choose how you're billed: **Per Minute**, **Per Hour**, **Per Day**, **Per Month**, **Per Quarter**, or **Per Year**. Longer periods can carry a discount — click **Compare Savings** to see the breakdown. The default is **Per Minute**.

### Review and launch

1. Check the **Summary** panel — it shows your GPU allocation, CPU, memory, billing period, and the total cost with GST.
2. Click **Launch Pod**. (The button stays disabled until Pod Name and Project are set.)
3. You're taken to the **Pods** list, where the new pod appears and moves through **creating → pending → running**.

> **Tip:** Want to reuse this exact setup? Click **Save as Template** in the Summary panel before launching. See [Templates](/docs/quickpod/templates/#save-your-own-template).

If you see an **insufficient balance** prompt, top up your wallet and try again. If the GPU became unavailable between Step 1 and launch, you'll be offered the waitlist.

## Connect to your pod

Open the pod from the **Pods** list to reach its detail page. Depending on how you configured it, you'll see:

### Web Terminal

On a running pod, click **Open Terminal** in the **Web Terminal** card for an interactive browser shell — no SSH client or keys required.

### SSH

If you attached an SSH key, the **SSH Access** card shows a ready-to-copy command:

```bash
ssh -i ~/.ssh/<key_name> podstack@ssh-<subdomain>.cloud.podstack.ai
```

Replace `<key_name>` with your private key file. Click **Configure SSH** for step-by-step setup on macOS, Linux, Windows PowerShell, or Windows Git Bash — first-time connections need a one-time SSH config entry. See [SSH & PowerShell](/docs/compute/pods/ssh-powershell/).

### Jupyter / Notebook

On notebook images, the **Notebook Access** card shows the **Notebook URL**, **Username** (default `podstack`), and an auto-generated **Password**. Copy the password now — it isn't shown again after you leave the page.

### Exposed ports

The **Exposed Ports & Endpoints** card lists every port and its public URL:

- HTTP services: `https://<subdomain>-<port>.cloud.podstack.ai`
- SSH (port 22): `ssh-<subdomain>.cloud.podstack.ai`

Click **Edit** to add or remove ports on a running pod. See [Manage & Scale](/docs/quickpod/manage-and-scale/#exposed-ports).

## Next steps

- [Templates](/docs/quickpod/templates/) — the 1-click catalog.
- [Storage & Data](/docs/quickpod/storage-and-data/) — keep your data between runs.
- [Manage & Scale](/docs/quickpod/manage-and-scale/) — start/stop, logs, metrics, and fractional GPUs.
