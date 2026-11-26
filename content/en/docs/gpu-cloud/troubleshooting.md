---
title: Troubleshooting
description: "What to check when a Podstack instance will not launch or SSH will not connect."
weight: 80
keywords:
  - troubleshooting
  - SSH
---

# Troubleshooting

**Launch refused for credits.** The wallet must cover the first hour of the machine, including extra disk and a dedicated IP if you selected one. Add credits on [Billing](/docs/billing/wallet/).

**No SSH key.** Add a key under [SSH keys](/docs/account/ssh-keys/) and attach it in the wizard. Launching requires one.

**SSH refused.** Copy the command from the instance row. Use the matching private key and the user printed in that command. If the host is a `cloud.podstack.ai` name, keep that hostname. If the row shows an IP, use the IP.

**Host key changed.** After a machine is replaced, clear the old key:

```bash
ssh-keygen -R ssh-<id>.cloud.podstack.ai
```

**Disk is gone.** Terminate, an off schedule, and a deletion rule all delete the instance disk. There is no separate volume to reattach.

**Instance stopped while you were away.** A project that cannot pay for the rest of the hour is shut down. Running instances are terminated. Check the wallet.
