---
title: Deploy a function and invoke it
weight: 60
description: "Deploy a decorated Python function and invoke it sync and async. Requires podstack 1.8.0. confirm=True only after approval."
keywords:
  - podstack.function
  - ainvoke
---

# Deploy a function and invoke it

**requires podstack>=1.8.0.** The CLI cannot create a function. `podstack functions list` and MCP `list_functions` only list functions that have already run.

## Prompt to give the agent

```text
Write a top-level function in device_name.py that returns the GPU name. Decorate it with podstack.function using a gpu_type from client.gpus.list(). Show deploy and invoke dry runs. Wait. After I approve, deploy and invoke with confirm=True, then ainvoke with confirm=True. Do not call the function as a normal Python call.
```

## SDK code

```python
import asyncio
import podstack

@podstack.function(gpu="<gpu_type>", requirements=["torch"])
def device_name():
    import torch
    return str(torch.cuda.get_device_name(0))

print(device_name.deploy(dry_run=True).to_dict())
print(device_name.invoke(dry_run=True).to_dict())

# only after the user approves:
print(device_name.deploy(confirm=True))
print(device_name.invoke(confirm=True))
print(asyncio.run(device_name.ainvoke(confirm=True)))
```

Replace `<gpu_type>` with a value from `client.gpus.list()`.

Check the list afterwards:

```sh
podstack functions list
```

## Expected output

The dry run is a dict and does not start a GPU. After confirm, `invoke` returns the device name string. `ainvoke` returns the same kind of result. The first call can take a few minutes while a GPU starts. `functions list` then shows the name.

Calling `device_name()` with no confirm raises `ConfirmationRequired`.

## Cost safety

`confirm=True` only after you approve the dry run. Invoke bills while the GPU runs. `logs` on the function raises `NotAvailableYet`. Skip it.
