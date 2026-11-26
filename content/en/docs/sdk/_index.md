---
title: Python SDK
weight: 80
description: "The podstack Python package talks to https://podstack.ai/api/v1. Version 1.8.0 replaces the old notebook API and is releasing soon."
keywords:
  - podstack Python SDK
  - podstack 1.8.0
  - ps_live_
---

# Python SDK

> Releasing soon: `pip install "podstack>=1.8.0"`
>
> PyPI currently has podstack 1.7.0, the old notebook API. Version 1.8.0 removes that surface. Do not install 1.7.0 for the pages in this section.

The 1.8.0 client calls `https://podstack.ai/api/v1`. GPU types, VRAM, regions, and prices come from the API. The package does not ship a catalogue or a price table.

```python
from podstack import Podstack

with Podstack() as client:
    for gpu in client.gpus.list():
        print(gpu.gpu_type, gpu.vram_gb)
```

Billable and destructive calls need `confirm=True`. `dry_run=True` returns the request and sends nothing. `dry_run` is checked first.

## Pages

| Page | What you can copy |
| --- | --- |
| [Install](/docs/sdk/install/) | The pip command, and why 1.7.0 is the wrong package |
| [Authentication](/docs/sdk/authentication/) | `PODSTACK_API_KEY`, a client argument, or the CLI credentials file |
| [Quickstart](/docs/sdk/quickstart/) | List GPUs, rates, and models. Nothing is billed |
| [Functions](/docs/sdk/functions/) | Decorator, deploy, invoke, async invoke |
| [GPU instances](/docs/sdk/instances/) | Create, SSH exec, terminate |
| [Jobs](/docs/sdk/jobs/) | Submit, logs, cancel |
| [Endpoints](/docs/sdk/endpoints/) | Create and delete a dedicated endpoint |
| [Inference](/docs/sdk/inference/) | Chat, streaming, embeddings |
| [Wallet and pricing](/docs/sdk/wallet/) | Balance, transactions, `price_per_hour` |
| [Tool calling](/docs/sdk/tools/) | `podstack.tools()` for OpenAI and Anthropic schemas |
| [MCP](/docs/sdk/mcp/) | `python -m podstack.mcp` |
| [Errors](/docs/sdk/errors/) | `NotAvailableYet`, `confirm=True`, and the other exceptions |

Async code uses `AsyncPodstack`. Method names match the sync client.

What the platform does not implement is on [Not available yet](/docs/guides/not-available/).
