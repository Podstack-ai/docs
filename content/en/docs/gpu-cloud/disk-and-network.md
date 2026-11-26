---
title: Disk and network
description: "Instance disk on Podstack, extra disk billed per GB-hour, and optional dedicated IPv4 addresses."
weight: 50
aliases:
  - /docs/gpu-cloud/storage-and-data/
  - /docs/storage/
  - /docs/storage/file-storage/
  - /docs/storage/nfs-volumes/
  - /docs/storage/object-storage/
  - /docs/sdk/storage/
keywords:
  - disk
  - dedicated IP
  - GB-hour
---

# Disk and network

Podstack does not offer a shared filesystem or an object store. Each instance has its own disk. Terminating the instance deletes that disk.

## Disk

In the launch wizard, 100 GB is the starting size. On a machine that can grow its disk you can set a whole number of gigabytes from 10 to 1,000. Disk beyond the size included with that machine is billed per GB-hour and is part of the hourly price you confirm before launch. A machine that cannot grow its disk keeps the fixed size shown in the wizard.

Copy files over the SSH command on the instance, for example:

```bash
scp -i ~/.ssh/id_ed25519 ./dataset.zip root@ssh-<id>.cloud.podstack.ai:/root/
```

Keep the `cloud.podstack.ai` host when that is the host on the instance row.

## Dedicated IP

A dedicated public IPv4 is optional at launch. The wizard shows the hourly fee and the per-GB transfer price for that address. Both are charged while the address is held. The exact amounts are on the launch screen, not in these docs.

- Forward 1 to 8 ports. The offer can restrict which ports are allowed.
- Do not forward port 22. SSH stays on the instance SSH command.
- A project can hold only so many addresses at once. The wizard shows the limit and how many you already use. The default limit is 2.
- The address is for serving your own workload. Open proxies, VPN exit nodes, mail relays, and scanning are not allowed. An address can be revoked after an abuse report.

The hourly fee is included in the first-hour balance check when you launch with an address.
