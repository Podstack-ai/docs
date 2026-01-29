---
title: Quick Start Guide
---

# Quick Start Guide

Deploy your first GPU container on Podstack in just a few minutes. This guide covers the essential steps from account setup to running workload.

## Prerequisites

Before you begin:
- [ ] Account created and verified
- [ ] Wallet topped up with funds
- [ ] Project created (or use default project)

## Step 1: Add Funds to Your Wallet

1. Navigate to **Billing > Wallet**
2. Click **Top Up**
3. Enter the amount (minimum varies)
4. Complete payment via Razorpay (UPI, cards, net banking)
5. Funds appear in your wallet immediately

## Step 2: Create a Project

1. Go to **Projects** in the sidebar
2. Click **Create Project**
3. Enter a project name and description
4. Click **Create**

Projects help organize resources and enable team collaboration.

## Step 3: Add an SSH Key

1. Navigate to **SSH Keys**
2. Click **Add SSH Key**
3. Either:
   - Paste your existing public key, or
   - Click **Generate New Key** to create one
4. Give the key a name and save
5. If generated, download the private key (one-time only)

## Step 4: Create Your First Pod

1. Go to **Compute > Pods**
2. Click **Create Pod**
3. Configure your pod:

**Basic Settings**
- **Name**: Give your pod a descriptive name
- **Project**: Select your project
- **Image**: Choose a container image (e.g., `pytorch/pytorch:latest`)

**Resources**
- **GPU Type**: Select from available GPUs (A100, H100, V100, etc.)
- **GPU Count**: Number of GPUs needed
- **CPU**: Number of CPU cores
- **Memory**: RAM allocation in GB

**Access**
- **SSH Key**: Select your SSH key
- **Ports**: Configure exposed ports (SSH is typically port 22)

4. Review the estimated cost
5. Click **Create Pod**

## Step 5: Connect to Your Pod

Once the pod status shows **Running**:

### Via SSH
```bash
ssh root@<pod-subdomain>.cloud.podstack.ai
```

The SSH connection details are displayed on the pod detail page.

### Via Web Terminal
Click the **Terminal** button on the pod card to open a browser-based terminal.

### Via Jupyter Notebook
If you enabled notebook access, click the **Notebook** link to open JupyterLab.

## Step 6: Monitor Your Pod

From the Pods list or Pod Detail page, you can:

- **View Logs** - See container output
- **Check Stats** - Monitor CPU, memory, GPU usage
- **Stop/Start** - Pause billing when not in use
- **Delete** - Remove the pod when done

## Cost Management Tips

- **Stop pods** when not actively using them (billing pauses)
- **Right-size resources** - don't over-allocate GPUs or memory
- **Use templates** - save configurations for quick redeployment
- **Monitor spending** - check the dashboard for run rates

## Next Steps

- [Learn more about Pod management](/docs/compute/pods/)
- [Set up object storage](/docs/storage/object-storage/)
- [Invite team members](/docs/projects/team-management/)
- [Create launch templates](/docs/advanced/templates/)
