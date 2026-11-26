---
title: SDK wallet and pricing
weight: 100
description: "Read the project wallet and live price_per_hour rates. A missing wallet route raises NotAvailableYet."
keywords:
  - wallet.balance
  - price_per_hour
  - NotAvailableYet
---

# SDK wallet and pricing

> Releasing soon: `pip install "podstack>=1.8.0"`

Balance and transactions are read-only. They do not need `confirm`. Debits are negative. Do not invent a balance or convert currency in the client. Print the numbers the API returned.

`price_per_hour` on a rate row is the hourly GPU price. `disk_price_per_gb_hour` is the extra-disk price when the API sends it. `job_gpus.list()` uses `price_per_gpu_hour` for jobs.

```python
from podstack import NotAvailableYet, Podstack

with Podstack() as client:
    try:
        wallet = client.wallet.balance()
        print(f"balance={wallet.balance} currency={wallet.currency}")
    except NotAvailableYet as exc:
        print(exc)
    try:
        for row in client.wallet.transactions(limit=10):
            print(row.created_at, row.type, row.amount, row.description)
    except NotAvailableYet as exc:
        print(exc)
    for rate in client.rates.list():
        print(rate.gpu_type, rate.region, rate.price_per_hour, rate.disk_price_per_gb_hour)
```

`NotAvailableYet` here means this API base has no wallet route. The balance is still on [Billing](https://podstack.ai/app/billing). `InsufficientBalance` means the wallet cannot cover a later billable call. The exception does not include a guessed shortfall.
