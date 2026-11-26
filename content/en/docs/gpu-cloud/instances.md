---
title: Instances and SSH
description: "Find the SSH command for a Podstack instance and terminate it. SSH hostnames stay on cloud.podstack.ai."
weight: 40
aliases:
  - /docs/compute/pods/connecting-to-pods/
  - /docs/compute/pods/managing-pods/
  - /docs/compute/pods/ssh-powershell/
  - /docs/compute/pods/ssh-tutorial/
  - /docs/gpu-cloud/manage-and-scale/
  - /docs/jobs/ssh-access/
keywords:
  - SSH
  - cloud.podstack.ai
  - terminate instance
---

# Instances and SSH

[Instances](https://podstack.ai/app/instances) lists machines you have launched. Each row shows the name, GPU, status, hourly price, and SSH command.

The command on the row is the one to use. When Podstack gives the host a name, that name is on `cloud.podstack.ai`. Copy it from the row. A typical command looks like:

```bash
ssh -i ~/.ssh/id_ed25519 root@ssh-<id>.cloud.podstack.ai
```

Use the private key that matches a public key you attached at launch. The user in the command the console falls back to is `root`.

If the row shows an address instead of a `cloud.podstack.ai` name, use that command as printed. Do not rewrite the host.

A dedicated IP, when you added one, is listed under the SSH command with its ports and status. It does not replace SSH. Port 22 stays on the SSH command.

## Terminate

The trash control terminates the instance and stops the per-second charge. Data on the instance disk is deleted.

If the project wallet cannot cover the machine, Podstack terminates running instances. You get a low-balance email while there is still about two hours of runway, and again at about thirty minutes. Add credits on [Billing](/docs/billing/wallet/) before that if you need the disk.

## Schedules

The calendar control on a row opens [Schedules](/docs/gpu-cloud/schedules/) for that instance.
