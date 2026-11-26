---
title: Functions
description: "Run a Python function on a Podstack GPU when it is called. Install podstack 1.8.0 or newer with pip install podstack."
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

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/). The full guide is [Python SDK](/docs/sdk/).

The console lists functions after the first call. Creating one is the Python package, not a separate CLI command. `podstack functions list` only lists functions that have already run.

1. Create a key under [API Keys](/docs/account/api-tokens/) with functions access, then:

```bash
export PODSTACK_API_KEY=ps_live_...
```

2. Decorate a function in a file and invoke it. The first call starts a GPU (2–4 minutes). Later calls take about 2 seconds. `confirm=True` is required before the call is sent.

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
