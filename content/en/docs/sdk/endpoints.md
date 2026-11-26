---
title: SDK endpoints
weight: 80
description: "Create and delete a dedicated inference endpoint. confirm=True is required. min_replicas 0 scales to zero."
keywords:
  - endpoints.create
  - dedicated endpoint
---

# SDK endpoints

> Releasing soon: `pip install "podstack>=1.8.0"`

An endpoint serves a model on dedicated GPUs and speaks the chat format on its own URL. Replicas are billed while they exist. `min_replicas=0` scales to zero.

The name must start with a letter and use lowercase letters, numbers, and hyphens.

```python
import os
from podstack import Podstack

with Podstack() as client:
    gpu_type = os.environ.get("PODSTACK_GPU") or client.gpus.list()[0].gpu_type
    model = os.environ.get("PODSTACK_MODEL") or client.models.list()[0].id
    name = os.environ.get("PODSTACK_ENDPOINT_NAME", "sdk-example")

    print(client.endpoints.create(
        name=name, model=model, gpu_type=gpu_type,
        min_replicas=0, max_replicas=1, dry_run=True,
    ).to_dict())

    endpoint = client.endpoints.create(
        name=name, model=model, gpu_type=gpu_type,
        min_replicas=0, max_replicas=1, confirm=True,
    )
    print(endpoint.id, endpoint.url, endpoint.status)
    client.endpoints.delete(endpoint.id or name, confirm=True)
```

`endpoints.list()` is read-only. Hosted catalog models that you do not deploy yourself are [Inference](/docs/sdk/inference/).
