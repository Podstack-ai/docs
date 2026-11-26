---
title: SDK jobs
weight: 70
description: "Submit a GPU job, read its logs, and cancel it. confirm=True is required to submit or cancel."
keywords:
  - jobs.submit
  - jobs.logs
  - jobs.cancel
---

# SDK jobs

> Releasing soon: `pip install "podstack>=1.8.0"`

A job runs a script on a GPU until it finishes or you cancel it. You pay for the time it runs. There is no separate fine-tune API. Put the training script in the job.

```python
import os
from podstack import Podstack

with Podstack() as client:
    options = client.job_gpus.list()
    gpu_type = os.environ.get("PODSTACK_GPU") or options[0].gpu_type
    for row in options:
        if row.gpu_type == gpu_type:
            print(row.gpu_type, row.price_per_gpu_hour)

    script = "print('hello from podstack')"
    print(client.jobs.submit(
        name="sdk-example", gpu_type=gpu_type, script=script, dry_run=True
    ).to_dict())

    job = client.jobs.submit(
        name="sdk-example", gpu_type=gpu_type, script=script, confirm=True
    )
    print(job.id, job.status)
    print(client.jobs.logs(job.id))
    print(client.jobs.cancel(job.id, confirm=True))
```

`image` defaults to `pytorch/pytorch:latest`. `timeout_seconds` defaults to 3600. `logs` prints the text the API has so far. Call it again for newer lines. It is not a websocket.

`jobs.list(status=...)` filters by `queued`, `running`, `succeeded`, `failed`, or `cancelled`. Listing and reading logs do not need `confirm`.
