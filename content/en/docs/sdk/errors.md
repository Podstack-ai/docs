---
title: SDK errors
weight: 130
description: "PodstackError subclasses, including NotAvailableYet and ConfirmationRequired. Billable calls need confirm=True."
aliases:
  - /docs/sdk/error-handling/
keywords:
  - NotAvailableYet
  - ConfirmationRequired
  - confirm=True
---

# SDK errors

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/).

Catch `podstack.PodstackError`. These subclasses are the ones to branch on:

| Exception | When it is raised |
| --- | --- |
| `AuthenticationError` | The key is missing, revoked, or rejected |
| `PermissionDenied` | The key is not allowed to perform that action |
| `NotFoundError` | The id is unknown. A missing model id is this error, not `NotAvailableYet` |
| `ValidationError` | The request body was rejected |
| `RateLimitError` | HTTP 429 |
| `InsufficientBalance` | The wallet cannot cover the request. The message does not invent a shortfall |
| `GPUNotAvailableError` | That GPU is not free to launch |
| `NotAvailableYet` | The platform does not implement that route |
| `ConfirmationRequired` | A billable call was made without `confirm=True` |
| `CommandFailed` | A local `ssh` or `scp` command failed |

```python
from podstack import ConfirmationRequired, NotAvailableYet, Podstack

with Podstack() as client:
    try:
        client.instances.create(gpu_type="h100_sxm")
    except ConfirmationRequired as exc:
        print(exc)
    try:
        client.wallet.balance()
    except NotAvailableYet as exc:
        print("wallet route is not on this API base")
```

## confirm=True

These calls require `confirm=True` or they raise `ConfirmationRequired`:

- `instances.create` and `instances.terminate`
- `jobs.submit` and `jobs.cancel`
- `endpoints.create` and `endpoints.delete`
- `chat.completions`, `chat.stream`, `embeddings.create`, and `images.generate`
- function `deploy`, `invoke`, and `ainvoke`
- function `delete` and secret delete

`dry_run=True` returns a `DryRun` and does not send HTTP. Check that before you ask the user to confirm. Do not put a guessed price inside a dry run. Read `rates.list()` and use `price_per_hour`.

## NotAvailableYet

Raise this, and stop, for:

- instance stop or start that would keep a disk
- an instance logs or exec HTTP API (SSH exec is separate and uses the local `ssh` binary)
- dataset upload
- a fine-tune API
- function logs, and polling an async function call the API does not store
- wallet or transactions when the route is 404

Retries cover connection errors and HTTP 429 and 5xx. Other status codes are not retried.
