---
title: Pick the cheapest fitting GPU
weight: 30
description: "Read the live catalogue and price_per_hour, then pick the cheapest GPU that fits. Do not launch."
keywords:
  - list_rates
  - price_per_hour
---

# Pick the cheapest fitting GPU

No spend. Prices are whatever `list_rates` returns. Do not invent a rate or convert currency.

## Prompt to give the agent

```text
I need one GPU with at least 40 GB of VRAM for an on-demand instance. Call list_gpus and list_rates. Pick the cheapest row that fits. Quote gpu_type, region, tier, and price_per_hour exactly as returned. Do not launch and do not set confirm.
```

Change the VRAM number to what you actually need.

## Tool calls

```json
{"name": "list_gpus", "arguments": {}}
```

```json
{"name": "list_rates", "arguments": {"tier": "on_demand"}}
```

CLI equivalents:

```sh
podstack gpu types list
podstack gpu pricing --tier on_demand
```

**requires podstack>=1.8.0** if the agent uses Python instead:

```python
from podstack import Podstack

with Podstack() as client:
    gpus = client.gpus.list()
    rates = client.rates.list(tier="on_demand")
```

Use `vram_gb` from the GPU row and `price_per_hour` from the matching rate row. Sort the rows that meet the VRAM floor by `price_per_hour`. If `available` is 0, skip that row.

## Expected output

A short table the agent copied from the tool result, plus one sentence: which `gpu_type`, region, and `price_per_hour` it recommends, and that it did not launch.

## Cost safety

`list_gpus` and `list_rates` are read-only. The next recipe is the one that spends. Stop here until the user asks to launch.
