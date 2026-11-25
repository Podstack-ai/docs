---
title: Billing

weight: 140
description: "Podstack prepaid wallet billing. GPU time per second from the hourly rate, jobs only while running, inference per token, extra disk per GB-hour. No monthly or annual subscriptions."
keywords:
  - cheapest GPU pricing
  - cheap GPU cloud cost
  - affordable GPU rental
  - budget GPU pricing
  - pocket friendly GPU
  - GPU cloud for students
  - student GPU pricing
  - billed per second GPU
  - pay for what you use
  - pay as you go GPU
  - zero lock-in pricing
  - no commitment GPU
  - no contract GPU cloud
  - transparent GPU pricing
  - GPU hourly rate
  - A100 GPU price
  - H100 GPU cost
  - V100 cheap
  - L40S pricing
  - low cost ML training
  - affordable AI compute
---
# Billing & Payments

Podstack bills a **prepaid wallet**. Add credits, then usage is deducted as it happens. There are no monthly or annual subscriptions.

## How billing works

- **GPU instances** are billed per second from the hourly rate, from boot until you terminate them.
- **Jobs** are billed only while they are running.
- **Inference** is billed per token.
- **Extra disk** is billed per GB-hour.

A project with no credits cannot start new usage. Live GPU prices are on [podstack.ai/#pricing](https://podstack.ai/#pricing). Model rates are on [podstack.ai/app/models](https://podstack.ai/app/models).

## Currency

Prices are shown in **INR** for India and in **USD** everywhere else. Set your location in **Settings**. Until you do, Podstack uses the country of the connection. The wallet itself is stored in US cents. The amount you see is that balance converted for display.

## In This Section

- **[Wallet](/docs/billing/wallet/)** - Manage balance, top-up, transactions
- **[Invoices](/docs/billing/invoices/)** - View and download invoices
- **[KYC Verification](/docs/billing/kyc/)** - Identity verification when your account requires it

## Billing Dashboard

The main dashboard shows:

### Wallet Balance
Current available funds in your account.

### Run rate
Projected spending based on what is running now. It is a forecast from the current hourly rates, not a subscription.

### Expenditure Breakdown
Costs split by resource type:
- Pods/Containers
- NFS Storage
- Object Storage (Buckets)

## Cost Optimization

### Stop Unused Resources
- **Stop pods** when not actively using them
- Storage charges continue while data is provisioned

### Right-Size Resources
- Don't over-allocate GPUs or memory
- Monitor actual usage vs. allocation
- Scale down if resources are underutilized

### Use Appropriate Resource Type
- Use pods for short-term, bursty workloads
- Use baremetal for dedicated, high-performance needs

### Clean Up Storage
- Delete unused buckets and files
- Remove old NFS volumes
- Delete completed experiment data

## Payment Methods

Podstack accepts payments through Razorpay:
- UPI
- Credit/Debit Cards
- Net Banking
- Wallets

## Getting Help

For billing questions:
- Check the [Support](/docs/support/) section
- Review transaction history in your wallet
- Contact support for disputes or issues

## Next Steps

- [Top up your wallet](/docs/billing/wallet/)
- [View invoices](/docs/billing/invoices/)
