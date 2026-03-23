---
title: Wallet & Pricing
weight: 100
description: "Manage billing, check wallet balance, and view GPU resource pricing via the Podstack CLI."
keywords:
  - CLI wallet
  - billing CLI
  - GPU pricing
  - wallet balance
---

# Wallet & Pricing

Monitor your account usage, check credit balances, and review resource pricing.

## Wallet Balance

Check your current available USD balance inside your Podstack wallet:

```bash
# Basic output
podstack wallet balance

# JSON output
podstack wallet balance -o json
```

## View Expenditure

Track costs over time and monitor your account expenditure:

```bash
# View recent expenditure
podstack wallet expenditure

# JSON output
podstack wallet expenditure -o json
```

## Resource Pricing

Display the current pricing information for compute resources and various GPU types:

```bash
# View rates table
podstack pricing

# Get pricing as JSON (useful for automation cost calculations)
podstack pricing -o json
```
