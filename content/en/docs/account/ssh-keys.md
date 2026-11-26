---
title: SSH keys
description: "Add an SSH public key to a Podstack project so you can log into instances."
weight: 30
keywords:
  - SSH key
  - ed25519
---

# SSH keys

Instances log in with a public key stored on the project. Open [SSH Keys](https://podstack.ai/app/ssh-keys).

Generate a key if you need one:

```bash
ssh-keygen -t ed25519
```

Paste the contents of `~/.ssh/id_ed25519.pub`. The private key stays on your machine.

Attach one or more keys when you [launch](/docs/gpu-cloud/launch-a-pod/). The SSH command on the instance uses `cloud.podstack.ai` when Podstack assigns that hostname. See [Instances and SSH](/docs/gpu-cloud/instances/).

There is no prepaid cap of one key and no separate paid tier for more keys.
