---
title: Billing
description: "Podstack prepaid wallet. GPU time per second, jobs only while running, inference per token, extra disk per GB-hour. Top up with Razorpay."
weight: 80
aliases:
  - /docs/billing/kyc/
  - /docs/billing/invoices/
keywords:
  - billing
  - wallet
  - Razorpay
---

# Billing

Podstack has one way to pay: a prepaid wallet on the project. There is no monthly or annual subscription and no postpaid upgrade.

| What | How it is billed |
| --- | --- |
| GPU instances | Per second from the hourly rate, from boot until you terminate them. |
| Extra disk | Per GB-hour. |
| Dedicated IP | The hourly fee and transfer shown at launch. |
| Jobs | Only while the job runs. |
| Inference | Per token. |
| Endpoints and functions | For the GPU time their machines run. |

Live rates are in the console and on [podstack.ai/#pricing](https://podstack.ai/#pricing). India is shown in INR. Every other location is shown in USD.

The wallet, top-ups, and activity are documented in [Wallet](/docs/billing/wallet/). The console does not issue a separate invoice PDF. Top-ups and per-resource charges are listed on Billing.

There is no identity-verification step in this billing flow.
