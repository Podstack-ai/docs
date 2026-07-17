---
title: Pricing & Billing
weight: 60
description: "How Podstack TrainPod GPU pricing and billing work — per-hour on-demand and spot pricing, checking live prices with podstack gpu pricing, funding your wallet, max-price caps, low-balance warnings, and fine-tuning budgets."
keywords:
  - GPU pricing per hour
  - spot vs on demand pricing
  - podstack gpu pricing
  - GPU cloud wallet
  - cheap H100 price
  - max price cap GPU
  - GPU billing
  - low balance warning
  - fine-tuning budget
  - pay per hour GPU
---

# Pricing & Billing

TrainPod GPUs bill **per hour** for as long as an instance runs, drawn from your Podstack **wallet** balance. Managed [fine-tuning](/docs/trainpod/fine-tuning/) jobs bill per run, which you can cap with a budget. This page explains how to check prices, fund your wallet, and control spend.

## Check live prices

Prices vary by GPU type, region, and tier. Query them with:

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
A100-80G   1       us-east   on_demand   $1.69/hr   9
L40S       1       us-east   on_demand   $0.99/hr   12
```

- **`PRICE`** is the **final** Podstack price per hour — all fees are already included. There's no separate management or egress markup on top.
- **`AVAIL`** is how many matching GPUs can be launched right now.

Prices shown above are illustrative — always run `podstack gpu pricing` for the current rates.

## Spot vs on-demand

| Tier | Price | Behavior |
|------|-------|----------|
| `on_demand` | Higher | Runs until **you** terminate it. Best for jobs you can't afford to be interrupted. |
| `spot` | Lower | Cheaper, but can be **reclaimed** when capacity is needed. Best for interruptible or checkpointed work. |

Compare both for a GPU type before launching:

```bash
podstack gpu pricing --gpu-type h100
```

## Cap the price with `--max-price`

When launching on `spot` (where prices can move), set a ceiling. The instance won't launch above your cap:

```bash
podstack gpu instances create --type h100 --tier spot --max-price 2.00 \
  --ssh-key-id sshkey_abc123
```

## Fund your wallet

GPU time and fine-tuning jobs draw from your wallet balance. Add funds in the [Podstack dashboard](https://cloud.podstack.ai), and manage payment and balance from the [Wallet docs](/docs/billing/wallet/). From the CLI, see [Wallet & pricing](/docs/cli/gpu/).

Keep enough balance to cover the full runtime of your instances — if the balance runs low, Podstack warns you and can stop instances to prevent a negative balance.

## Low-balance warnings

The CLI surfaces backend billing warnings when you list or inspect instances, so you see them even when piping output. For example:

```bash
podstack gpu instances list
```

```
⚠  my-trainer: under 5 min of runtime left — recharge or this instance will stop
```

If you see a warning, top up your wallet before the instance is stopped for non-payment.

## Stop paying: terminate instances

Billing continues for as long as an instance is **running**. To stop charges, terminate it:

```bash
podstack gpu instances delete gpu-abc123
```

> Terminating wipes the instance's local disk. [Move results off the box first](/docs/trainpod/move-data/).

Verify nothing is still running (and racking up cost):

```bash
podstack gpu instances list --status running
```

## Fine-tuning budgets

Managed [fine-tuning](/docs/trainpod/fine-tuning/) jobs bill per run rather than per instance-hour. Cap the spend on a job with `--budget`:

```bash
podstack train create --model podstack/qwen2.5-7b-instruct \
  --training-file file_123 --budget 25.00
```

## Cost-control checklist

- **Right-size the GPU.** Match VRAM to your model with `podstack gpu types list`; don't rent an H100 for a job an L40S handles.
- **Use spot for interruptible work**, with `--max-price` as a ceiling.
- **Terminate promptly.** `podstack gpu instances delete <id>` the moment you're done.
- **Watch for low-balance warnings** in `podstack gpu instances list`.
- **Cap fine-tuning jobs** with `--budget`.
- **Audit regularly:** `podstack gpu instances list --status running`.

## FAQs

**How am I charged for a GPU instance?**
Per hour, for the entire time the instance is `running`, from your wallet. Terminate to stop charges.

**Is the price shown the final price?**
Yes. `PRICE` in `podstack gpu pricing` is the final Podstack rate with all fees included.

**What happens if my wallet runs out mid-run?**
Podstack warns you (visible in `podstack gpu instances list`) and can stop the instance to prevent a negative balance. Top up before that happens; checkpoint spot/interruptible work.

**Does `spot` cost less than `on_demand`?**
Usually yes, but spot instances can be reclaimed. Compare both with `podstack gpu pricing --gpu-type <type>`.

**How do I avoid overpaying on spot?**
Pass `--max-price <usd>` on `podstack gpu instances create` so it won't launch above your ceiling.

**How is fine-tuning billed differently?**
Managed `podstack train` jobs bill per run. Cap them with `--budget <usd>`.

**Do data transfers cost extra?**
There's no separate per-GB charge; transfers happen during the instance runtime you're already paying for.

## Next steps

- [Provision a GPU](/docs/trainpod/provision-a-gpu/) — launch with the right tier and price cap.
- [Wallet](/docs/billing/wallet/) — fund and manage your balance.
- [CLI: Wallet & pricing](/docs/cli/gpu/) — pricing and balance from the terminal.
