---
title: SDK GPU instances
weight: 60
description: "Create a GPU instance, run a command over SSH, and terminate it. confirm=True is required. There is no stop that keeps the disk."
aliases:
  - /docs/sdk/pods/
keywords:
  - instances.create
  - instances.exec
  - instances.terminate
---

# SDK GPU instances

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/).

An instance is billed per second from the hourly rate until you terminate it. Terminate deletes the disk. There is no stop or start that keeps a machine.

`exec`, `upload`, and `download` use the SSH command on the instance and the local `ssh` or `scp` binary. There is no exec or logs HTTP API. If SSH is not available, the call raises `NotAvailableYet` or `CommandFailed`.

```python
import os
import time
from podstack import NotAvailableYet, Podstack

with Podstack() as client:
    gpus = client.gpus.list()
    gpu_type = os.environ.get("PODSTACK_GPU") or gpus[0].gpu_type

    print(client.instances.create(gpu_type=gpu_type, name="sdk-example", dry_run=True).to_dict())

    operation = client.instances.create(gpu_type=gpu_type, name="sdk-example", confirm=True)
    instance_id = operation.resource_id or (operation.instance.id if operation.instance else "")
    instance = client.instances.get(instance_id)
    for _ in range(30):
        if instance.ssh_command:
            break
        time.sleep(2)
        instance = client.instances.get(instance_id)
    print(instance.status, instance.ssh_command)
    try:
        result = client.instances.exec(instance_id, "nvidia-smi")
        print(result.stdout)
    except NotAvailableYet as exc:
        print(exc)
    print(client.instances.terminate(instance_id, confirm=True))
```

`create` also takes `gpu_count`, `tier`, `region`, `offering_id`, `ssh_key_ids`, `environment`, `disk_gb`, and `template_id`. Pass ids you just read from `gpus.list()` or `rates.list()`.

`upload(instance_id, local_path, remote_path)` and `download(instance_id, remote_path, local_path)` copy files over SCP. Do not upload a credentials file.

`stop` and `start` are not methods you should call. They are not on the API. Use `terminate(confirm=True)`.
