---
title: Troubleshooting
weight: 80
description: "Fix common Podstack QuickPods issues — pods stuck pending, GPU unavailable and the waitlist, insufficient balance, out-of-memory failures, image pull errors, and connection problems."
keywords:
  - pod stuck pending
  - GPU unavailable
  - GPU waitlist
  - insufficient balance
  - out of memory pod
  - image pull failed
  - pod failed
  - SSH connection pod
  - relaunch pod
  - troubleshooting GPU pod
---
# Troubleshooting

Common issues when launching and running QuickPods, and how to fix them.

## Can't open the launch wizard

**Symptom:** clicking **Launch Pod** shows a verification prompt instead of the wizard.

Launching requires a **verified account**. Complete identity verification and try again. See [KYC](/docs/billing/kyc/).

## GPU is unavailable

**Symptom:** the GPU you want shows **0 Available**, or launch fails with a GPU-unavailable error.

- On the **Instance Type** step, the button reads **Join Waitlist** for sold-out GPUs. Click it to queue — you'll be notified when capacity frees up, and you'll see your queue position.
- Alternatively, tick **Show All GPUs** to compare, then pick a different GPU type or reduce the **Number of GPUs**.
- Consider a **fractional GPU** (a smaller percentage of a card) if a whole card isn't free — see [Fractional GPUs](/docs/quickpod/manage-and-scale/#fractional-gpus).
- For guaranteed dedicated hardware, see the [GPU Marketplace](/docs/compute/gpu-marketplace/).

## Insufficient balance

**Symptom:** an insufficient-balance prompt appears when you click **Launch Pod**, or a running pod is auto-stopped.

- Top up your wallet, then launch again. See [Wallet & Billing](/docs/billing/wallet/).
- Review the **Summary** panel's total cost before launching, and reduce GPU count, CPU, or memory if needed.
- Enable auto-debit to avoid auto-stops when balance runs low.

## Pod stuck in creating or pending

A pod moves **creating → pending → running**. If it stays in **pending**:

- The requested GPU capacity may not be free yet — reduce the GPU count/fraction or join the waitlist.
- Check the pod's **Container Logs** and any **failure reason** shown on the pod.
- Verify your wallet has enough balance.

## Pod failed

A **failed** pod shows a red banner with the failure reason. Click **Relaunch** to try again.

- **Out of memory (OOM):** the relaunch dialog offers to increase the pod's **memory** before retrying. Bump it and relaunch.
- **Image pull failed:** check the **Container Image** name and tag. For private images, confirm the **Registry URL**, **Registry Username**, and **Registry Password/Token** are correct.
- **Startup command errors:** check your **Entry Point Command** and the logs.

## Can't connect over SSH

- SSH keys can only be added **during pod creation**. If you launched without a key, relaunch (or launch a new pod) with a key selected.
- First-time connections need a one-time SSH config entry. Click **Configure SSH** on the pod detail page and follow the steps for your OS. See [SSH & PowerShell](/docs/compute/pods/ssh-powershell/).
- Use the exact command shown in the **SSH Access** card, replacing `<key_name>` with your private key file, and make sure the key has the right permissions (`chmod 400`).
- If SSH still fails, use the **Web Terminal** (**Open Terminal**) as a fallback — it needs no keys.

## Can't reach an exposed service

- Confirm the port is listed under **Exposed Ports & Endpoints**. If not, click **Edit** and add it.
- If the endpoint says *"Endpoints are being provisioned…"*, wait a moment and refresh.
- Make sure your app is actually listening on that port inside the container (check the logs).
- Use the HTTPS URL shown for the port: `https://<subdomain>-<port>.cloud.podstack.ai`.

## Notebook password not shown

The auto-generated notebook password is shown **once** on the **Notebook Access** card. If you didn't copy it, relaunch the pod to get a fresh one, or use the **Web Terminal** / SSH instead.

## Lost data after stopping a pod

Data written to the container's own disk can be lost on stop or delete. Keep datasets, checkpoints, and outputs on an attached volume mounted at `/data`. See [Storage & Data](/docs/quickpod/storage-and-data/).

## MLOps section isn't visible

MLOps features may be gated by a feature flag or account level. If experiment tracking, the model registry, or related sections don't appear, contact support.

## Still stuck?

- Check the pod's **Container Logs** and **Infrastructure Stats** on the detail page.
- Review [Manage & Scale](/docs/quickpod/manage-and-scale/) for lifecycle actions.
- Reach out through [Support](/docs/support/).
