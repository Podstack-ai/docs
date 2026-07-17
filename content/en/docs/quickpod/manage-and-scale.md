---
title: Manage & Scale
weight: 50
description: "Manage Podstack QuickPods after launch — start and stop to control billing, stream logs and live GPU metrics, expose ports, use fractional GPUs, and relaunch failed pods."
keywords:
  - manage GPU pod
  - start stop pod
  - pod logs
  - GPU metrics
  - fractional GPU
  - expose port pod
  - pause billing
  - relaunch pod
  - pod lifecycle
  - web terminal
---
# Manage & Scale

Once a pod is launched, you manage it from the **Pods** list and each pod's **detail page**.

## The Pods list

Go to **Pods** to see every pod in the current project. Filter by project with the **All Projects** dropdown. Each row shows:

- **Pod** — name and container image
- **Resources** — vCPU, RAM, and GPU allocation (shown as `1x A100` for whole GPUs or `50%` for a fractional slice)
- **Status** — the pod's state (see below)
- **Created** — when it was launched
- **Actions** — the controls for that pod

<!-- screenshot: the Pods list with status badges and row actions -->

### Pod states

| Status | Meaning | Billing |
|---|---|---|
| **creating** | Pod is being provisioned | No |
| **pending** | Waiting for resources | No |
| **running** | Pod is active | Yes |
| **stopped** | Paused by you | No |
| **failed** | An error occurred (a reason is shown) | No |
| **terminated** | Pod removed | No |

## Start, stop, and delete

From the list row or the pod's detail page header:

- **Stop** — appears on a **running** pod. Confirm in the **Stop Pod** dialog. Billing pauses, the GPU is released, and non-persistent data may be lost. The pod's configuration is kept so you can start it again.
- **Start** — appears on a **stopped** pod. Billing resumes when it reaches **running**.
- **Relaunch** — appears on a **failed** pod. If the pod failed because it ran out of memory, the relaunch dialog lets you bump its **memory** before trying again.
- **Delete** — permanently removes the pod. Confirm in the **Delete Pod** dialog. There's no pro-rated refund — you're billed for the full billing cycle even if you delete early.

> **Save money:** stop pods you aren't actively using. Stopping pauses billing immediately while preserving the pod's setup. Delete pods you're finished with. Keep anything important on a [volume](/docs/quickpod/storage-and-data/) so a stop or delete doesn't lose it.

> **Low balance auto-stop.** If your wallet balance runs out, running pods may be stopped automatically after a grace period. Keep enough balance (or enable auto-debit) to avoid interruption.

## The pod detail page

Click a pod to open its detail page, which gathers everything about it into one scrolling view.

### Web Terminal

On a running pod, click **Open Terminal** in the **Web Terminal** card for an interactive browser shell — no SSH client or keys required.

### SSH Access

If you attached an SSH key, the **SSH Access** card shows a copy-ready command. Click **Configure SSH** for one-time setup instructions per OS. See [SSH & PowerShell](/docs/compute/pods/ssh-powershell/).

### Notebook Access

On notebook images, the **Notebook Access** card shows the notebook URL, username (`podstack`), and an auto-generated password. Copy the password before leaving — it isn't shown again.

### Logs and metrics

- **Container Logs** stream live as your workload produces them.
- **Infrastructure Stats** show real-time CPU, memory, storage, and GPU utilization for the pod.

<!-- screenshot: the pod detail page showing live logs and infrastructure stats -->

### Billing

The **Billing** card shows the billing period, whether billing is **Active**/**Paused**/**Not Started**, the total billed so far, and the hourly rate breakdown across CPU, memory, storage, and GPU.

## Exposed ports

Open a service to the internet after launch:

1. On the pod detail page, find **Exposed Ports & Endpoints** and click **Edit**.
2. In the **Edit Exposed Ports** dialog, enter a container port and click **Add**. Remove a port with the **X** next to it. (Port 22 can't be removed while SSH is enabled.)
3. Click **Save Changes** — the change is applied to the running pod.

Each exposed port gets a public HTTPS endpoint:

- HTTP services: `https://<subdomain>-<port>.cloud.podstack.ai`
- SSH (port 22): `ssh-<subdomain>.cloud.podstack.ai`

## Fractional GPUs

You don't have to rent a whole GPU. When you configure a pod you set two independent controls (see [Launch a Pod](/docs/quickpod/launch-a-pod/#resources)):

- **Number of GPUs** — how many GPUs to attach (1 or more).
- **GPU Memory/Cores per GPU** — the percentage of each GPU to use, from **5%** to **100%** in 5% steps. 100% is a whole card.

Picking a fraction lowers your hourly rate, which is ideal for light inference, development, and notebook work. The launch wizard's donut chart shows how much of the GPU is already booked, how much you're requesting, and how much is free, plus the effective VRAM. Fractional pods display their allocation as a percentage (for example `25%`) in the list and on the detail page.

If your requested fraction exceeds what's free right now, the pod may queue until capacity opens up.

## Resizing a pod

CPU, memory, GPU count, and GPU fraction are set at launch and aren't changed in place. To run with different compute:

- **Change compute:** launch a new pod with the new sizing (save your config as a [template](/docs/quickpod/templates/) first to make this one click), point it at the same [volume](/docs/quickpod/storage-and-data/) so your data carries over, then delete the old pod.
- **Add memory to a failed pod:** if a pod failed from running out of memory, use **Relaunch** to bump its memory.
- **Change ports:** edit exposed ports on a running pod any time (above).

## Next steps

- [Storage & Data](/docs/quickpod/storage-and-data/) — keep data across relaunches.
- [Troubleshooting](/docs/quickpod/troubleshooting/) — fixes for common issues.
- [Scenarios & Walkthroughs](/docs/quickpod/scenarios/) — end-to-end examples.
