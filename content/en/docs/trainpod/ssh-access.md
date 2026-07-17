---
title: SSH Access
weight: 30
description: "Connect to your Podstack TrainPod GPU instance over SSH — register an SSH key, connect from macOS, Linux, or Windows PowerShell with the podstack CLI, and expose ports to localhost. Includes video walkthroughs."
keywords:
  - SSH into GPU instance
  - podstack gpu instances ssh
  - SSH key GPU cloud
  - connect to GPU pod
  - ssh from PowerShell GPU
  - GPU SSH key ed25519
  - expose port over SSH
  - scp to GPU instance
  - Podstack SSH tutorial
  - remote GPU terminal
  - ssh identity key
  - Windows SSH GPU
og_image: https://img.youtube.com/vi/vO0khicfxM4/maxresdefault.jpg
---

# SSH Access

Once a TrainPod instance is **running**, you connect to it over SSH using your own private key. Podstack only ever stores your **public** key — the private key stays on your machine and never leaves it.

The `podstack` CLI is the fastest path: `podstack gpu instances ssh <id>` reads the connection details from Podstack, picks the right local key, and opens a shell. This page covers registering keys, connecting from every OS, and tunneling ports. Two video walkthroughs at the bottom show the terminal and Windows PowerShell setup step by step.

## Prerequisites

- A **running** instance — see [Provision a GPU](/docs/trainpod/provision-a-gpu/).
- `ssh` available on your machine (built in on macOS/Linux; on Windows use PowerShell or Git Bash).
- An SSH key registered with Podstack and injected into the instance.

---

## Step 1 — Register an SSH key

The CLI generates an **ed25519** keypair locally, writes it to `~/.ssh/podstack_<name>` (private) and `~/.ssh/podstack_<name>.pub` (public), and registers only the public key with Podstack.

```bash
podstack gpu keys create --name my-key
```

```
Registered SSH key "my-key" (id: sshkey_abc123)
Private key (local, keep safe): ~/.ssh/podstack_my-key
Public key  (registered):       ~/.ssh/podstack_my-key.pub

The private key is stored only on this machine and was never uploaded —
podstack holds the public key alone. Launch with: --ssh-key-id sshkey_abc123
```

**Already have a key?** Register your existing public key instead of generating a new one:

```bash
podstack gpu keys create --name my-key --public-key-file ~/.ssh/id_ed25519.pub
```

List registered keys — the **LOCAL KEY** column shows whether this machine holds the matching private key:

```bash
podstack gpu keys list
```

```
ID            NAME     FINGERPRINT       LOCAL KEY   CREATED
sshkey_abc123 my-key   SHA256:abcd...    yes         2026-07-17T10:00:00Z
```

Delete a key by id when you no longer need it:

```bash
podstack gpu keys delete sshkey_abc123
```

> The key must be **injected into the instance at launch** — pass its id with `--ssh-key-id` on `podstack gpu instances create`, or select it during `podstack gpu launch`. A key registered after an instance is created is not added retroactively. See [Provision a GPU](/docs/trainpod/provision-a-gpu/).

---

## Step 2 — Connect with the CLI (recommended)

The simplest way to connect on **any OS**:

```bash
podstack gpu instances ssh gpu-abc123
```

Run it with **no id** to arrow-select a running instance interactively:

```bash
podstack gpu instances ssh
```

The CLI fetches the connection details from Podstack, resolves your local private key, installs the Podstack login banner, and opens the shell. When you connect, you'll see the Podstack welcome banner and land in a root shell on the GPU box.

### Choosing which private key to use

The CLI resolves the identity in this order:

1. `--identity <path>` — an explicit path to a private key file.
2. `--key <name>` — a Podstack key name, resolved to `~/.ssh/podstack_<name>`.
3. A single Podstack-managed key found in `~/.ssh` (used automatically when there's exactly one).

```bash
# Use a specific key file
podstack gpu instances ssh gpu-abc123 --identity ~/.ssh/id_ed25519

# Use a named podstack key
podstack gpu instances ssh gpu-abc123 --key my-key
```

> If several Podstack keys exist locally and the right one is ambiguous, the CLI asks you to disambiguate with `--key` or `--identity` rather than guessing (which would surface as a confusing "Permission denied").

### Useful flags

| Flag | What it does |
|------|--------------|
| `--print` | Print the SSH command instead of running it (handy for scripting or debugging) |
| `--no-banner` | Skip installing the Podstack login banner |
| `--identity <path>` | Use an explicit private key path |
| `--key <name>` | Use the local private key for a named Podstack key |
| `[-- extra ssh args]` | Pass extra arguments straight to `ssh` after `--` |

Pass native `ssh` arguments after `--`. For example, to forward a local port:

```bash
podstack gpu instances ssh gpu-abc123 -- -L 6006:localhost:6006
```

Print the command without connecting:

```bash
podstack gpu instances ssh gpu-abc123 --print
```

---

## Step 3 — Connect with plain `ssh` (optional)

The connection details are also available directly. `podstack gpu instances get <id>` prints the ready-made SSH command:

```bash
podstack gpu instances get gpu-abc123
```

```
SSH:      ssh -p 22 root@203.0.113.10
```

Copy that command and add your private key with `-i`:

```bash
ssh -i ~/.ssh/podstack_my-key -p 22 root@203.0.113.10
```

- The default login user for TrainPod instances is `root`.
- The host and port come from the instance's connection details.

> **Fix key permissions if you see a warning.** SSH refuses keys that are too open:
> ```bash
> chmod 600 ~/.ssh/podstack_my-key
> ```

---

## Step 4 — Expose a port to localhost

To reach a service running on the instance (TensorBoard, a training dashboard, an inference server) from your own browser, open a private SSH tunnel. Nothing is made public — only your machine can reach it.

```bash
# instance's :8000 becomes http://localhost:8000
podstack gpu instances expose gpu-abc123 8000
```

Bind to a different local port, or forward a service the instance reaches internally:

```bash
# map instance :8000 to http://localhost:8888
podstack gpu instances expose gpu-abc123 8000 --local 8888

# forward a service on a different host the instance can see
podstack gpu instances expose gpu-abc123 5432 --remote-host db.internal
```

The tunnel stays open until you press **Ctrl-C**. Like `ssh`, `expose` accepts `--identity` and `--key` to choose the private key.

---

## Video walkthroughs

These video guides cover the Podstack SSH experience — registering a key, configuring your local SSH client, and connecting from your terminal. The concepts (a local private key, a terminal on macOS/Linux, PowerShell + OpenSSL on Windows) apply directly to TrainPods; from the CLI, `podstack gpu instances ssh <id>` handles the connection for you.

### macOS, Linux & Git Bash

A complete terminal walkthrough of connecting to a Podstack GPU over SSH — launch, configure your SSH client, and connect. About 5 minutes.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px; background: #000;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    src="https://www.youtube.com/embed/vO0khicfxM4?rel=0&modestbranding=1"
    title="How to SSH into Podstack GPU Cloud"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

### Windows PowerShell

Windows PowerShell needs OpenSSL to route the SSH connection. This guide installs it and writes the config automatically, then connects.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px; background: #000;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    src="https://www.youtube.com/embed/uT7DahW1l3I?rel=0&modestbranding=1"
    title="How to SSH into Podstack from Windows PowerShell"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

> The full-length written versions of both videos live under Pods: [SSH tutorial](/docs/compute/pods/ssh-tutorial/) and [SSH from PowerShell](/docs/compute/pods/ssh-powershell/).

---

## Quick reference

| Action | Command |
|--------|---------|
| Register a new key | `podstack gpu keys create --name <name>` |
| Register an existing public key | `podstack gpu keys create --name <name> --public-key-file <path.pub>` |
| List keys | `podstack gpu keys list` |
| Connect (CLI) | `podstack gpu instances ssh <id>` |
| Connect with a specific key | `podstack gpu instances ssh <id> --identity <path>` |
| Print the SSH command | `podstack gpu instances ssh <id> --print` |
| Connect (plain ssh) | `ssh -i <key_path> -p <port> root@<host>` |
| Forward a port to localhost | `podstack gpu instances expose <id> <port>` |
| Fix key permissions | `chmod 600 ~/.ssh/podstack_<name>` |

## FAQs

**Where is my private key stored?**
In `~/.ssh/podstack_<name>` on the machine where you ran `podstack gpu keys create`. Podstack never sees or stores it — only the matching public key is registered.

**I get "Permission denied (publickey)". Why?**
The private key you're offering doesn't match a public key injected into the instance. Confirm the key was passed at launch with `--ssh-key-id`, that `podstack gpu keys list` shows **LOCAL KEY: yes**, and select the right key with `--key`/`--identity`. See [Troubleshooting](/docs/trainpod/troubleshooting/#permission-denied-publickey).

**Can I connect from a second machine?**
Yes, but the private key lives on the machine that created it. Copy the private key file over securely, or register a second key and inject it at launch. `podstack gpu keys list` shows **LOCAL KEY: no** on machines without the private key.

**What user do I log in as?**
`root`. The CLI and the `podstack gpu instances get` SSH command both use it.

**Do I need the Windows OpenSSL/proxy setup for TrainPods?**
No. That proxy setup in the PowerShell video is for container **Pods** that route through `cloud.podstack.ai`. TrainPod instances are reached directly, so `podstack gpu instances ssh <id>` (or plain `ssh -i <key> root@<host>`) works from PowerShell without the proxy.

**How do I add a key to an already-running instance?**
Keys are injected at launch. Register the key, then re-launch (or manually append the public key to `~/.ssh/authorized_keys` on the box while you're connected with an existing key).

## Next steps

- [Move data](/docs/trainpod/move-data/) — upload datasets and pull results back.
- [Fine-tuning](/docs/trainpod/fine-tuning/) — run managed training jobs.
- [Troubleshooting](/docs/trainpod/troubleshooting/) — SSH and connection fixes.
