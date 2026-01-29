---
title: Billing
description: "Cheapest GPU cloud pricing - pay per minute, zero lock-in, no commitment. Transparent pricing for A100, H100, V100, L40S GPUs. Perfect for students and startups."
keywords:
  - cheapest GPU pricing
  - cheap GPU cloud cost
  - affordable GPU rental
  - budget GPU pricing
  - pocket friendly GPU
  - GPU cloud for students
  - student GPU pricing
  - pay per minute GPU
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

Podstack uses a prepaid wallet system for billing. Add funds to your wallet and resources are charged against your balance in real-time.

## How Billing Works

### Prepaid Model

1. **Add funds** to your wallet via Razorpay
2. **Deploy resources** (pods, VMs, storage)
3. **Charges deducted** automatically as you use resources
4. **Top up** when balance runs low

### Billing Cycle

- **Compute resources** (pods, VMs): Billed per second while running
- **Storage**: Billed hourly based on provisioned/used capacity
- **GPU instances**: Billed per hour

### Real-time Billing

Charges are calculated and deducted continuously:
- Balance updates in real-time on the dashboard
- Run rate shows current hourly/daily/monthly projections
- Insufficient balance prevents new resource creation

## Currency

All billing is in **Indian Rupees (INR)**. Prices displayed include applicable taxes.

## In This Section

- **[Wallet](/docs/billing/wallet/)** - Manage balance, top-up, transactions
- **[Invoices](/docs/billing/invoices/)** - View and download invoices
- **[KYC Verification](/docs/billing/kyc/)** - Identity verification for postpaid

## Billing Dashboard

The main dashboard shows:

### Wallet Balance
Current available funds in your account.

### Run Rate
Projected spending based on current resources:
- **Hourly**: Current cost per hour
- **Daily**: Projected daily cost
- **Monthly**: Projected monthly cost

### Expenditure Breakdown
Costs split by resource type:
- Pods/Containers
- Virtual Machines
- NFS Storage
- Object Storage (Buckets)

## Cost Optimization

### Stop Unused Resources
- **Stop pods** when not actively using them
- **Stop VMs** to pause CPU/GPU billing (storage charges continue)

### Right-Size Resources
- Don't over-allocate GPUs or memory
- Monitor actual usage vs. allocation
- Scale down if resources are underutilized

### Use Appropriate Resource Type
- Use pods for short-term, bursty workloads
- Use VMs for long-running services
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
