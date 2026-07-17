---
title: Provision a GPU
weight: 20
description: "Launch an on-demand NVIDIA GPU pod on Podstack — fund your wallet, browse GPU types and prices, register an SSH key, and create a running H100, A100, or L40S instance from the podstack CLI or the portal."
keywords:
  - provision GPU
  - launch H100
  - rent A100 GPU
  - create GPU instance
  - podstack gpu instances create
  - podstack gpu launch
  - spot vs on demand GPU
  - GPU pricing CLI
  - fund GPU wallet
  - GPU pod SSH key
---

# Provision a GPU

This page walks through launching a TrainPod GPU instance end to end: sign in, fund your wallet, choose a GPU, and create a running instance. Two paths are covered — the interactive **quick launch** and the scriptable **flag-driven** command.

## Before you start

1. **Install and authenticate the CLI.** See [CLI installation](/docs/cli/installation/) and [authentication](/docs/cli/authentication/).

   ```bash
   podstack auth login      # opens your browser to sign in
   podstack auth whoami     # confirm you're authenticated
   ```

   For CI or headless machines, set an API key (it starts with `psk_`) instead:

   ```bash
   export PODSTACK_API_KEY=psk_xxxxxxxxxxxxxxxxxxxx
   ```

2. **Fund your wallet.** GPUs bill per hour against your wallet balance. Add funds in the dashboard, or see [Pricing & billing](/docs/trainpod/pricing-and-billing/) and the [Wallet docs](/docs/billing/wallet/).

## Step 1 — See what's available

List the GPU chips Podstack supports:

```bash
podstack gpu types list
```

```
GPU TYPE   VRAM    ARCH
H100       80 GB   Hopper
A100-80G   80 GB   Ampere
L40S       48 GB   Ada
...
```

Then check live pricing and availability. You can filter by GPU type, region, or tier:

```bash
podstack gpu pricing
podstack gpu pricing --gpu-type h100
podstack gpu pricing --gpu-type h100 --tier on_demand
podstack gpu pricing --region us-east --tier spot
```

```
GPU TYPE   COUNT   REGION    TIER        PRICE      AVAIL
H100       1       us-east   on_demand   $2.49/hr   6
H100       1       us-east   spot        $1.79/hr   3
...
```

- **`PRICE`** is the final Podstack price per hour — all fees are already included.
- **`TIER`** is `on_demand` (stable, won't be reclaimed) or `spot` (cheaper, but can be reclaimed when capacity is needed).
- **`AVAIL`** is how many matching GPUs are ready to launch right now.

## Step 2 — Register an SSH key

You need at least one SSH key so you can connect once the instance is running. The CLI generates the keypair locally and registers **only the public key** — the private key never leaves your machine.

```bash
podstack gpu keys create --name my-key
```

```
Registered SSH key "my-key" (id: sshkey_abc123)
Private key (local, keep safe): ~/.ssh/podstack_my-key
Public key  (registered):       ~/.ssh/podstack_my-key.pub
```

Note the key **id** (`sshkey_abc123`) — you pass it to `--ssh-key-id` when creating an instance with flags. To list existing keys:

```bash
podstack gpu keys list
```

Full details, including registering an existing public key, are on the [SSH access](/docs/trainpod/ssh-access/) page.

## Step 3 — Launch a GPU

### Option A — Quick launch (interactive)

The friendliest path. `podstack gpu launch` shows the available GPUs, then prompts you for a GPU count and an SSH key (reuse one or generate a new one on the spot), and creates the instance.

```bash
podstack gpu launch
```

You can pre-filter the list so you only see relevant offers:

```bash
podstack gpu launch --gpu-type h100 --tier on_demand --region us-east --name my-trainer
```

The flow is:

1. **Select a GPU** from the arrow-key list (each row shows type, count, tier, region, price, and availability).
2. **Enter a GPU count** (1–8).
3. **Choose an SSH key** — reuse a registered key or pick *"Generate a new key (stored locally)"*.
4. **Confirm** the summary to launch.

> Quick launch needs an interactive terminal. In scripts or CI, use Option B.

### Option B — Flag-driven create (scriptable)

For automation, use `podstack gpu instances create`. `--type` and `--tier` are required.

```bash
podstack gpu instances create \
  --type h100 \
  --tier on_demand \
  --count 1 \
  --name my-trainer \
  --ssh-key-id sshkey_abc123
```

| Flag | Purpose | Default |
|------|---------|---------|
| `--type` | GPU type (from `podstack gpu types list`) — **required** | — |
| `--tier` | `spot` or `on_demand` — **required** | — |
| `--count` | Number of GPUs | `1` |
| `--name` | Instance name | — |
| `--region` | Region to launch in | platform choice |
| `--ssh-key-id` | SSH key id to inject; repeatable for multiple keys | — |
| `--max-price` | Cap the per-hour price (won't launch above it) | none |

Use `--ssh-key-id` more than once to inject several keys, and `--max-price` to protect against spot price spikes:

```bash
podstack gpu instances create --type h100 --tier spot --max-price 2.00 \
  --ssh-key-id sshkey_abc123 --ssh-key-id sshkey_def456
```

Creation is asynchronous — the command returns an operation id and a state:

```
Provisioning instance (operation op_123, state pending).
Track it with: podstack gpu instances list
```

## Step 4 — Wait until it's running

Provisioning moves through several statuses: `allocating` → `starting` / `provisioning` → **`running`**. Watch progress with:

```bash
podstack gpu instances list
```

```
ID          NAME         STATUS       GPU       REGION    PRICE
gpu-abc123  my-trainer   ● running    1x H100   us-east   $2.49/hr
```

Filter by status, or inspect one instance in detail:

```bash
podstack gpu instances list --status running
podstack gpu instances get gpu-abc123
```

`get` also prints the SSH command and any app URL once the instance is ready:

```
ID:       gpu-abc123
Name:     my-trainer
Status:   ● running
GPU:      1x H100
Region:   us-east
Tier:     on_demand
Price:    $2.49/hr
Created:  2026-07-17T10:20:00Z
SSH:      ssh -p 22 root@203.0.113.10
```

Once the status is **`running`**, head to [SSH access](/docs/trainpod/ssh-access/) to connect.

## Step 5 — Stop paying: terminate when done

Instances bill per hour for as long as they run. When you're finished, **terminate** the instance to stop charges:

```bash
podstack gpu instances delete gpu-abc123
```

Run it with no id to arrow-select the instance and confirm:

```bash
podstack gpu instances delete
```

> **Terminating is permanent.** Local disk on the instance is wiped. Move any results off the box first — see [Move data](/docs/trainpod/move-data/).

## Provisioning in the portal

Prefer a UI? The Podstack dashboard covers the same flow: open the GPU / instances area, pick a GPU and tier, select an SSH key, and launch. The CLI and portal act on the same account and instances, so you can start in one and manage in the other.

## Scenario — Provision a GPU, SSH in, and run a training script

```bash
# 1. Register a key (once)
podstack gpu keys create --name trainer

# 2. Launch an on-demand H100 with that key
podstack gpu instances create --type h100 --tier on_demand \
  --name llama-run --ssh-key-id sshkey_abc123

# 3. Wait for it to be running
podstack gpu instances list

# 4. Connect
podstack gpu instances ssh gpu-abc123

# ...inside the instance, run your training...

# 5. Pull results back, then terminate to stop billing
podstack gpu instances cp gpu-abc123:/workspace/out.ckpt ./ 
podstack gpu instances delete gpu-abc123
```

## FAQs

**Which GPU should I pick?**
Run `podstack gpu types list` for the catalog and VRAM. H100 (80 GB) and A100-80G suit large-model training and fine-tuning; L40S (48 GB) is a strong price/performance choice for mid-size workloads. Match VRAM to your model and batch size.

**What's the difference between `spot` and `on_demand`?**
`on_demand` instances run until you terminate them. `spot` instances are cheaper but can be reclaimed when capacity is needed. Use `--max-price` on spot to avoid paying above your ceiling. Check both prices with `podstack gpu pricing --gpu-type <type>`.

**Do I have to register a key before launching?**
For `podstack gpu instances create` you pass an existing key id via `--ssh-key-id`. `podstack gpu launch` can generate a key for you during the flow. Without any key you won't be able to SSH in.

**How long does provisioning take?**
Usually a minute or two. Watch the status move from `allocating`/`provisioning` to `running` with `podstack gpu instances list`.

**Can I launch more than one GPU?**
Yes — `--count` (create) or the count prompt (quick launch) requests multiple GPUs on a single instance, up to 8.

**How do I stop being charged?**
Terminate the instance with `podstack gpu instances delete <id>`. Billing stops when the instance is no longer running.

## Next steps

- [SSH access](/docs/trainpod/ssh-access/) — connect to your running instance.
- [Move data](/docs/trainpod/move-data/) — get your dataset onto the box.
- [Pricing & billing](/docs/trainpod/pricing-and-billing/) — understand per-hour costs and the wallet.
- [CLI reference](/docs/cli/) — every `podstack` command.
