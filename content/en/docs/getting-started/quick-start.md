---
title: Quick Start Guide

weight: 30
description: "Go from zero to a running GPU pod on PodStack in about 10 minutes — sign in, verify identity, create a project, add an SSH key, fund your wallet, launch a pod, and connect over SSH. Console and CLI paths."
keywords:
  - PodStack quick start
  - launch GPU pod fast
  - deploy GPU container tutorial
  - first GPU pod
  - podstack CLI launch
---
# Quick Start Guide

This guide takes you from a brand-new account to a running GPU pod you can SSH
into — about 10 minutes. Each step links to a deeper guide if you want detail.

## What you'll accomplish

Sign in, get verified, set up a project and key, fund your wallet, launch a pod,
and connect to it.

## The path

### 1. Sign in

Open the portal and sign in with an email code or a social login. Your first
sign-in creates your account. → [Creating Your Account](/docs/getting-started/creating-account/)

### 2. Create a project

Create a project so your resources and costs have a home. It becomes your active
context automatically. → [Creating & Switching Projects](/docs/projects/creating-projects/)

### 3. Add an SSH key

Generate a key in-platform (download the private key once) or upload an existing
public key. → [SSH Keys](/docs/account/ssh-keys/)

### 4. Fund your wallet

Add funds so you can launch paid resources. Billing is **per-second** — you pay
only for the GPU fraction and the seconds you use. → [Wallet & Billing](/docs/billing/wallet/)

### 5. Launch a pod

**Console:** go to **Pods → Create Pod**, pick a GPU (fractional or full), choose
a template or image, select your SSH key, and launch. For the full walkthrough,
see [Creating Pods](/docs/compute/pods/creating-pods/).

**CLI:** the fastest path from a terminal:

```bash
# Interactive: arrow-select a GPU, pick count + SSH key, confirm
podstack launch

# Or scripted, with flags
podstack gpu instances create --gpu-type <type> --gpu-count 1
```

See the [CLI](/docs/cli/) section for setup and full commands.

### 6. Connect

```bash
ssh root@<pod-address>
# or, with a specific key
ssh -i ~/.ssh/podstack_key root@<pod-address>
```

See [Connecting to Pods](/docs/compute/pods/connecting-to-pods/) for SSH config,
port forwarding, and Windows instructions.

## Verify it worked

- The pod shows **Running** in the Pods list (or `podstack gpu instances list`).
- You get a shell after `ssh`, greeted by the PodStack banner.
- The dashboard's **Run Rate** card now shows an hourly cost.

## What's next

- **[Compute](/docs/compute/)** — pods, VMs, sandboxes, notebooks, the GPU marketplace.
- **[Storage](/docs/storage/)** — object storage, volumes, and NFS for your data.
- **[Inference](/docs/inference/)** — serve models on OpenAI-compatible endpoints.
- **[CLI](/docs/cli/)** — manage everything from your terminal.
