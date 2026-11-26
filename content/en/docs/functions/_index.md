---
title: Functions
description: "Run a Python function on a Podstack GPU when it is called. The podstack package that deploys it is version 1.8.0, releasing soon."
weight: 46
keywords:
  - functions
  - ps_live_
  - podstack function decorator
---

# Functions

A function is Python that runs on a GPU only when you call it. You are billed only while it runs.

Open [Functions](https://podstack.ai/app/functions). The page lists functions after the first call, with GPU, status, runs in the last 24 hours, and cost.

## Quick start

> Releasing soon: `pip install "podstack>=1.8.0"`
>
> PyPI still serves podstack 1.7.0, which is the old notebook API. Do not use 1.7.0 for the snippets on this page. Version 1.8.0 replaces it. The full guide is [Python SDK](/docs/sdk/).

The console lists functions after the first call. Creating one is the Python package, not a separate CLI command. `podstack functions list` only lists functions that have already run.

1. Create a key under [API Keys](/docs/account/api-tokens/) with functions access, then:

```bash
export PODSTACK_API_KEY=ps_live_...
```

2. After 1.8.0 is on PyPI, decorate a function in a file and invoke it. The first call starts a GPU (2–4 minutes). Later calls take about 2 seconds. `confirm=True` is required before the call is sent.

```python
import podstack

@podstack.function(gpu="h100_sxm", requirements=["torch"])
def hello():
    import torch
    return torch.cuda.get_device_name(0)

print(hello.deploy(dry_run=True))
print(hello.invoke(confirm=True))
```

Pick `gpu` from `client.gpus.list()`. Names start with a letter and use letters, numbers, hyphens, and underscores, 51 characters at most. See [Functions in the SDK](/docs/sdk/functions/).

Hosted models are [Inference](/docs/inference/quickstart/). The Python client for those calls is [SDK inference](/docs/sdk/inference/).
