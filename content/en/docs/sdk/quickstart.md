---
title: SDK quickstart
weight: 40
description: "List GPU types, live price_per_hour rates, and model ids. This quickstart does not spend money."
keywords:
  - podstack quickstart
  - gpus.list
  - rates.list
---

# SDK quickstart

> Releasing soon: `pip install "podstack>=1.8.0"`

This script only reads. It does not launch, submit, or call a model.

```python
from podstack import Podstack

with Podstack() as client:
    print("GPU types")
    for gpu in client.gpus.list():
        print(f"  {gpu.gpu_type}\tvram_gb={gpu.vram_gb}")
    print("Rates (price_per_hour is the API value)")
    for rate in client.rates.list():
        print(f"  {rate.gpu_type}\t{rate.region}\t{rate.price_per_hour}")
    print("Models")
    for model in client.models.list():
        print(f"  {model.id}\t{model.modality}")
```

Run it with a key:

```bash
export PODSTACK_API_KEY=ps_live_...
python quickstart.py
```

Use a `gpu_type` and a model `id` from this output in later calls. If a list is empty, the API returned no rows. Do not substitute a type or a price from memory.

Async:

```python
import asyncio
from podstack import AsyncPodstack

async def main():
    async with AsyncPodstack() as client:
        print(await client.gpus.list())

asyncio.run(main())
```
