---
title: Troubleshooting
weight: 70
description: "Fix common Podstack TrainPod issues — provisioning stuck or failing, SSH permission denied, no SSH connection yet, ambiguous SSH keys, scp/cp errors, port-forwarding, low-balance stops, and fine-tuning job failures."
keywords:
  - GPU provisioning failed
  - permission denied publickey
  - no SSH connection yet
  - ambiguous ssh key
  - scp error GPU
  - podstack troubleshooting
  - GPU instance error
  - low balance instance stopped
  - fine-tuning job failed
  - port forward GPU
---

# Troubleshooting

Fixes for the most common issues when provisioning, connecting to, and moving data with TrainPods. If you're stuck after this, contact **support@podstack.ai**.

## First, check the basics

```bash
podstack version              # CLI is installed
podstack auth whoami          # you're authenticated
podstack gpu instances list   # instance status and any billing warnings
podstack gpu instances get <id>   # detailed status + connection info
```

Instance status flows through: `allocating` → `starting` / `provisioning` → **`running`** → (`stopping`) → `stopped` / `terminated`. An `error` status means provisioning failed.

---

## Provisioning

### `no available GPUs match the filter`

`podstack gpu launch` found nothing matching your filters. Broaden them and check availability:

```bash
podstack gpu pricing
podstack gpu pricing --gpu-type h100
```

Try another region, GPU type, or the other tier (`spot` vs `on_demand`). The `AVAIL` column shows what's launchable right now.

### `--type and --tier are required`

`podstack gpu instances create` needs both. Add them:

```bash
podstack gpu instances create --type h100 --tier on_demand --ssh-key-id sshkey_abc123
```

### Instance stuck in `allocating` / `provisioning`

Provisioning usually takes a minute or two. Keep polling:

```bash
podstack gpu instances list
```

If it's been unusually long or lands in `error`, terminate and retry — possibly with a different region or tier:

```bash
podstack gpu instances delete <id>
```

### `quick launch needs an interactive terminal`

`podstack gpu launch` requires a TTY. In scripts or CI, use the flag-driven command instead:

```bash
podstack gpu instances create --type h100 --tier on_demand --ssh-key-id sshkey_abc123
```

---

## SSH connection

### `instance ... has no SSH connection yet (status: ...)`

The instance isn't ready. SSH details appear only once it's **`running`**. Wait and re-check:

```bash
podstack gpu instances get <id>
```

### Permission denied (publickey)

The private key you're offering doesn't match a public key injected into the instance.

- Confirm the key was injected **at launch** with `--ssh-key-id` (keys aren't added retroactively).
- Confirm this machine holds the private key — `podstack gpu keys list` should show **LOCAL KEY: yes**.
- Select the right key explicitly:

  ```bash
  podstack gpu instances ssh <id> --key my-key
  # or
  podstack gpu instances ssh <id> --identity ~/.ssh/podstack_my-key
  ```
- Fix over-permissive key files:

  ```bash
  chmod 600 ~/.ssh/podstack_my-key
  ```

### `several local podstack keys exist ... ambiguous`

You have multiple local Podstack keys and the CLI won't guess. Name the one to use:

```bash
podstack gpu instances ssh <id> --key my-key
# or an explicit path
podstack gpu instances ssh <id> --identity ~/.ssh/podstack_my-key
```

### `no local private key for "<name>" ...`

The named key was created on another machine, so its private half isn't here. Copy the private key over securely, or use `--identity <path>` to point at the correct file.

### Debug the exact SSH command

Print what the CLI would run without connecting:

```bash
podstack gpu instances ssh <id> --print
```

You can also connect with plain `ssh` using the command from `podstack gpu instances get <id>` plus `-i <key>`:

```bash
ssh -i ~/.ssh/podstack_my-key -p <port> root@<host>
```

---

## Data transfer

### `exactly one path must be remote (<instance-id>:<path>)`

`podstack gpu instances cp` needs exactly one local and one remote path. The remote side is written `<instance-id>:<path>`:

```bash
# upload
podstack gpu instances cp ./data.tar gpu-abc123:/workspace/
# download
podstack gpu instances cp gpu-abc123:/workspace/out.ckpt ./
```

### Copying a directory does nothing / errors

Add `-r` for recursive copies:

```bash
podstack gpu instances cp ./dataset/ gpu-abc123:/workspace/dataset -r
```

### `cp` fails with permission or key errors

`cp` uses the same key resolution as `ssh`. Pass the identity explicitly if needed:

```bash
podstack gpu instances cp ./data.tar gpu-abc123:/workspace/ --key my-key
```

### A `send` / `receive` transfer was interrupted

Re-run the **same** command in the same directory — the transfer resumes from the last completed chunk (detected by the partial file's hash). If the relay is unreachable, try `--relay-default` or a specific `--relay host:port`.

---

## Port forwarding

### `podstack gpu instances expose` — can't reach the service

- Confirm the service is actually listening **on the instance** at the port you gave.
- The instance-side port is the **second** argument; `--local` changes only the local bind port:

  ```bash
  podstack gpu instances expose gpu-abc123 8000 --local 8888
  ```
- The tunnel stays open until **Ctrl-C** — keep the command running while you use the service.
- If the service listens on a different host the instance can see, set `--remote-host`.

---

## Billing

### Instance stopped unexpectedly / low-balance warning

A low wallet balance can stop instances. The warning appears in:

```bash
podstack gpu instances list
```

```
⚠  my-trainer: under 5 min of runtime left — recharge or this instance will stop
```

Top up your wallet — see [Pricing & billing](/docs/trainpod/pricing-and-billing/) and the [Wallet docs](/docs/billing/wallet/). For interruptible work, checkpoint frequently.

### I'm being charged and don't know why

List anything still running and terminate it:

```bash
podstack gpu instances list --status running
podstack gpu instances delete <id>
```

---

## Fine-tuning jobs

### Job failed or errored

Inspect the events for the reason:

```bash
podstack train events <id>
```

Common causes: a malformed training file (re-check your JSONL and re-upload with `podstack files upload`), an unavailable base model (`podstack train models`), or hitting the `--budget` cap. Fix and re-create the job.

### `--model and --training-file are required`

Both flags are mandatory on `podstack train create`:

```bash
podstack train create --model podstack/qwen2.5-7b-instruct --training-file file_123
```

### Job stuck in `queued`

Jobs queue while a training GPU is scheduled. Watch progress:

```bash
podstack train events <id> --follow
```

Cancel if needed with `podstack train cancel <id>`.

---

## Still stuck?

- Re-read the relevant guide: [Provision](/docs/trainpod/provision-a-gpu/) · [SSH](/docs/trainpod/ssh-access/) · [Move data](/docs/trainpod/move-data/) · [Fine-tuning](/docs/trainpod/fine-tuning/).
- Check the [CLI reference](/docs/cli/).
- Email **support@podstack.ai** with the command you ran, the instance or job id, and the full error output.
