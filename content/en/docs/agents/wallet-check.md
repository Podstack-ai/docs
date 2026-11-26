---
title: Check the wallet before and after
weight: 90
description: "Read the wallet and live rates before a run and again after it. Do not invent a balance if the route is missing."
keywords:
  - balance
  - wallet
  - price_per_hour
---

# Check the wallet before and after

Read-only. If the wallet route is missing, say so. Do not guess a balance.

## Prompt to give the agent

```text
Before any billable call, call balance and list_rates. Print the balance, currency, and the price_per_hour for the GPU we are about to use. After the run finishes, call balance again and tell me the two numbers the API returned. Do not subtract them yourself if either call failed.
```

## Tool calls

```json
{"name": "balance", "arguments": {}}
```

```json
{"name": "list_rates", "arguments": {"gpu_type": "<gpu_type>"}}
```

CLI:

```sh
podstack billing
podstack gpu pricing --gpu-type <gpu_type>
```

**requires podstack>=1.8.0:**

```python
from podstack import NotAvailableYet, Podstack

with Podstack() as client:
    try:
        wallet = client.wallet.balance()
        print(wallet.balance, wallet.currency)
    except NotAvailableYet as exc:
        print(exc)
    for rate in client.rates.list():
        print(rate.gpu_type, rate.price_per_hour)
```

Run the same `balance` call after the instance, job, or chat from another recipe.

## Expected output

A balance and a currency, or a not-available message that points at [Billing](https://podstack.ai/app/billing). Rate rows include `price_per_hour`. After the run, a second balance from the API. The agent quotes both responses. It does not invent the difference when a call failed.

## Cost safety

`balance` and `list_rates` do not take `confirm` and do not spend. Do not launch from this recipe.
