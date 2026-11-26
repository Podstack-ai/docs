---
title: SDK functions
weight: 50
description: "Deploy a Python function with the podstack decorator, then invoke it synchronously or with ainvoke. confirm=True is required."
keywords:
  - podstack.function
  - ainvoke
  - confirm=True
---

# SDK functions

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/).

A function is Python that runs on a GPU when you call it. You are billed only while it runs. The function has to be a top-level function in a file. Arguments must be JSON-serializable.

Creating a function is this package. `podstack functions list` only lists functions after they have run.

```python
import asyncio
import podstack

@podstack.function(gpu="h100_sxm", requirements=["torch"], timeout=3600)
def device_name():
    import torch
    return str(torch.cuda.get_device_name(0))

print(device_name.source())
print(device_name.deploy(dry_run=True).to_dict())
print(device_name.invoke(dry_run=True).to_dict())

# After you accept the spend:
print(device_name.deploy(confirm=True))
print(device_name.invoke(confirm=True))
print(asyncio.run(device_name.ainvoke(confirm=True)))
```

`gpu` should be a type from `client.gpus.list()`, not a guess. Other arguments: `image`, `requirements`, `name`, `timeout` (default 3600 seconds), and `confirm` on the decorator.

Calling the function like a normal function (`device_name()`) raises `ConfirmationRequired` unless the decorator was created with `confirm=True`. Prefer `invoke(confirm=True)` so a dry run stays the default.

`deploy` posts the function. `invoke` deploys on first use if needed, then calls it. `ainvoke` is the async call. `local` runs the body in this process and does not spend GPU time.

`logs` and polling an async call that the API does not store raise `NotAvailableYet`. Delete with `device_name.delete(confirm=True)`.

The first invoke starts a GPU and can take a few minutes. Later invokes are much shorter. Names start with a letter and use letters, numbers, hyphens, and underscores, 51 characters at most.
