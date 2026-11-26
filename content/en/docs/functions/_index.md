---
title: Functions
description: "Run a Python function on a Podstack GPU when it is called. Install podstack-sdk and use a ps_live_ key."
weight: 46
aliases:
  - /docs/sdk/
  - /docs/sdk/installation/
  - /docs/sdk/quickstart/
  - /docs/sdk/authentication/
  - /docs/sdk/pods/
  - /docs/sdk/error-handling/
keywords:
  - podstack-sdk
  - functions
  - ps_live_
---

# Functions

A function is Python that runs on a GPU only when you call it. You are billed only while it runs.

Open [Functions](https://podstack.ai/app/functions). The page lists functions after the first call, with GPU, status, runs in the last 24 hours, and cost.

## Quick start

The console shows these three steps.

1. Install the package.

```bash
pip install podstack-sdk
```

2. Create a key under [API Keys](/docs/account/api-tokens/) with functions access, then:

```bash
export PODSTACK_API_KEY=ps_live_...
```

3. Decorate a function and call it. The first call starts a GPU (2–4 minutes). Later calls take about 2 seconds.

```python
import podstack

@podstack.function(gpu="A100")
def hello():
    import torch
    return torch.cuda.get_device_name()

print(hello())
```

Names start with a letter and use letters, numbers, hyphens, and underscores, 51 characters at most.

There is no other published SDK in these docs. Calling hosted models uses the OpenAI SDK against [Inference](/docs/inference/quickstart/).
