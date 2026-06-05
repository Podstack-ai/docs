---
title: How to SSH into Pods (Video Tutorial)
weight: 35
description: "Step-by-step video tutorial showing how to SSH into a running Podstack pod — launch a GPU pod, configure your local SSH client, and connect from your terminal in 3 simple steps."
keywords:
  - SSH into pod
  - SSH into GPU instance
  - Podstack SSH tutorial
  - connect to GPU pod
  - SSH config Podstack
  - SSH key Podstack
  - PyTorch pod SSH
  - L40S GPU SSH
  - remote terminal GPU
  - SSH proxy command
  - first-time SSH setup
  - GPU cloud SSH access
  - cheapest GPU cloud SSH
  - Podstack pod terminal
  - SSH client configuration
tags:
  - SSH
  - Pods
  - Tutorial
  - Video
  - GPU Cloud
og_image: https://img.youtube.com/vi/vO0khicfxM4/maxresdefault.jpg
---

# How to SSH into Pods on Podstack

A complete walkthrough of SSH access to a Podstack GPU pod — launch the pod, set up your SSH client, then connect from your terminal. The full process takes about 5 minutes.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px; background: #000;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    src="https://www.youtube.com/embed/vO0khicfxM4?rel=0&modestbranding=1"
    title="How to SSH into Pods on Podstack GPU Cloud"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

## What You'll Learn

This tutorial covers the three parts of setting up SSH access to a Podstack pod:

1. **Launching a Pod** — configure GPU, template, storage, and SSH key
2. **Configuring the SSH Client** — set up your local machine to recognize Podstack's SSH proxy
3. **Accessing the Pod** — copy the SSH command and connect from your terminal

## Prerequisites

- An active [Podstack account](https://cloud.podstack.ai) with sufficient wallet balance
- A terminal application (Terminal on macOS/Linux, PowerShell or Git Bash on Windows)
- An SSH key pair (you can also generate one inside Podstack — covered below)

---

## Part 1 — Launching a Pod

### Step 1: Select Pod Configuration

1. Open the **Podstack GPU Cloud Platform** dashboard. This is your home base showing current usage at a glance.
2. From the left-side navigation, click **Pods**.
3. Click the **Launch Pod** button to begin spinning up a new instance.
4. **Pick a GPU** that matches your workload. For this walkthrough, select the **L40S** by clicking its **Select** button.
5. **Choose a template** that comes pre-loaded with the tools you need — for example, the **PyTorch + OpenCV** template.
6. Scroll down through the **Configure Your Pod** page to set up the remaining details (project, GPU fraction, etc.).
7. **Attach storage** (optional): under volumes, select an NFS volume such as `my-vol`.

### Step 2: Add Your SSH Key

1. Under **SSH Access**, pick an existing key from the list (for example, `demo`).
2. **Don't have a key yet?** Click **Add New Key** to open the key modal. From there you can:
   - **Paste a public key** from your local machine, or
   - **Generate a brand new key pair** directly on the platform.
3. Close the modal once your key is selected.

> See [SSH Keys](/docs/account/ssh-keys/) for full details on managing keys across your account.

### Step 3: Enable SSH and Launch

1. Scroll down to the **Environment Variables** section.
2. **Verify** that `ENABLE_SSH` is set to `true` — this is what allows remote connections to the container.
3. Click **Launch Pod** to start the instance.
4. Your new pod appears with **Pending** status while it boots. Click the pod entry to open the detail page and watch its progress.

---

## Part 2 — Configuring the SSH Client

The first time you connect to any Podstack pod, your local machine needs a small one-time configuration so it can route traffic through Podstack's SSH proxy.

### Step 1: Open the First-Time Setup Instructions

1. On the pod detail page, find the **SSH Access** section.
2. Click the **First-time setup required** link.
3. The **SSH Configuration** modal opens with platform-specific guides. By default, **macOS** instructions are shown — switch tabs for **Linux** or **Windows** as needed.
4. The instructions walk through:
   - Creating the `~/.ssh` directory (if it doesn't exist).
   - Adding the Podstack host entry to your SSH config file.
   - Setting up the proxy command for routing connections.
5. Once reviewed, click **Done** to close the dialog.

### Step 2: Verify Your Local SSH Config

Open your terminal and run:

```bash
cat ~/.ssh/config
```

You should see the new **Podstack host entry**, which confirms the proxy command and host settings are saved.

> **Tip:** If the entry isn't there, re-open the modal in the dashboard and copy the block into `~/.ssh/config` manually. Create the file if it doesn't exist.

---

## Part 3 — Accessing the Pod

### Step 1: Copy the SSH Connection Command

1. Wait until your pod status switches from **Pending** to **Running** — this means it's live and ready.
2. On the pod detail page, scroll to **SSH Access**.
3. Click the **copy icon** next to the SSH command to copy it to your clipboard.

### Step 2: Connect from Your Terminal

1. Paste the SSH command into your terminal.
2. **Update the key path** to point to where your private key file actually lives on disk. For example, if you downloaded it to `~/Downloads/`, the command might look like:

   ```bash
   ssh -i ~/Downloads/demo podstack@ssh-<subdomain>.cloud.podstack.ai
   ```

   - `podstack` is the default username for all Podstack templates.
   - `ssh-<subdomain>.cloud.podstack.ai` is unique per pod.
3. Hit **Enter**.

You should see the **Podstack welcome banner** confirming you're connected to your remote environment. You can now run commands inside the pod as if it were a local machine.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Verify local SSH config | `cat ~/.ssh/config` |
| Connect to pod | `ssh -i <key_path> podstack@ssh-<subdomain>.cloud.podstack.ai` |
| Copy a file to the pod | `scp -i <key_path> <local_file> podstack@ssh-<subdomain>.cloud.podstack.ai:/path/` |
| Forward a port (e.g. TensorBoard) | `ssh -L 6006:localhost:6006 podstack@ssh-<subdomain>.cloud.podstack.ai` |
| Fix host-key change after pod rebuild | `ssh-keygen -R ssh-<subdomain>.cloud.podstack.ai` |

## Common Issues

**Permission denied (publickey)**
- The selected SSH key on the pod doesn't match the private key you're using locally.
- Check key file permissions: `chmod 600 <key_path>`.

**Connection refused**
- The pod isn't fully running yet — wait for status **Running**.
- Verify `ENABLE_SSH=true` was set in environment variables when launching the pod.

**Host key verification failed**
- Happens when a pod is recreated and reuses the same subdomain. Clear the cached host key:
  ```bash
  ssh-keygen -R ssh-<subdomain>.cloud.podstack.ai
  ```

For more troubleshooting, see [Connecting to Pods](/docs/compute/pods/connecting-to-pods/#troubleshooting).

## Next Steps

- Explore [Connecting to Pods](/docs/compute/pods/connecting-to-pods/) for Jupyter, web terminal, exposed ports, and file transfer options.
- Set up additional [SSH Keys](/docs/account/ssh-keys/) for teammates.
- Save your pod configuration as a [Template](/docs/advanced/templates/) for one-click relaunch.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to SSH into Pods on Podstack GPU Cloud",
  "description": "Step-by-step video tutorial showing how to SSH into a running Podstack pod — launch a GPU pod with PyTorch template, configure your local SSH client, and connect from your terminal in 3 simple steps.",
  "thumbnailUrl": [
    "https://img.youtube.com/vi/vO0khicfxM4/maxresdefault.jpg",
    "https://img.youtube.com/vi/vO0khicfxM4/hqdefault.jpg"
  ],
  "uploadDate": "2026-06-05",
  "duration": "PT4M40S",
  "contentUrl": "https://www.youtube.com/watch?v=vO0khicfxM4",
  "embedUrl": "https://www.youtube.com/embed/vO0khicfxM4",
  "publisher": {
    "@type": "Organization",
    "name": "Podstack",
    "logo": {
      "@type": "ImageObject",
      "url": "https://docs.podstack.ai/images/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SeekToAction",
    "target": "https://www.youtube.com/watch?v=vO0khicfxM4&t={seek_to_second_number}",
    "startOffset-input": "required name=seek_to_second_number"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to SSH into a Podstack GPU Pod",
  "description": "Launch a Podstack GPU pod, configure your local SSH client, and connect from your terminal in 3 steps.",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    { "@type": "HowToSupply", "name": "Podstack account with wallet balance" },
    { "@type": "HowToSupply", "name": "SSH key pair" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Web browser" },
    { "@type": "HowToTool", "name": "Terminal (macOS/Linux) or PowerShell/Git Bash (Windows)" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Launch a Pod",
      "text": "From the Podstack dashboard, open the Pods section, click Launch Pod, choose a GPU (e.g. L40S) and a template (e.g. PyTorch + OpenCV), attach storage, select an SSH key, set ENABLE_SSH=true, and click Launch Pod.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-tutorial/#part-1--launching-a-pod"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Configure the SSH Client",
      "text": "On the pod detail page, click 'First-time setup required' and follow the OS-specific instructions to add Podstack's host entry to your local ~/.ssh/config file. Verify with: cat ~/.ssh/config.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-tutorial/#part-2--configuring-the-ssh-client"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Connect via Terminal",
      "text": "Once the pod is Running, copy the SSH command from the SSH Access section, paste it into your terminal, update the -i flag to your private key path, and press Enter.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-tutorial/#part-3--accessing-the-pod"
    }
  ]
}
</script>
