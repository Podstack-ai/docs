---
title: Account & Billing Help
weight: 30
description: "A support-focused guide to your Podstack account, wallet, payments, and KYC verification — what works today and where to go for the full reference."
keywords:
  - Podstack account help
  - GPU cloud billing support
  - wallet top-up help
  - KYC verification support
  - prepaid wallet
---
# Account & Billing Help

Most support requests are about **access** (getting into your account) or **money** (the wallet, a charge, an invoice, or KYC). This page is a fast, support-oriented map of how those work today. It does not duplicate the full guides — each section links to the detailed reference under [Account](/docs/account/) and [Billing](/docs/billing/).

## Your account

Podstack is **passwordless**. You sign in with a 6-digit email code or a social login — there is no password or 2FA to reset.

- Codes are single-use and expire after **10 minutes**. If one doesn't arrive, check spam, wait 2-3 minutes, then use **Resend**.
- Manage your profile and active sessions under [Account Settings](/docs/account/settings/). Prices follow the location you set there: INR in India, USD elsewhere.
- If you think you have lost access, see the [Lost account access](/docs/support/scenarios/#i-lost-access-to-my-account) scenario.

Related credentials and access controls:

- [SSH Keys](/docs/account/ssh-keys/) — connect to pods and VMs.
- [API Tokens](/docs/account/api-tokens/) — the `ps_live_...` keys used by the `podstack` [CLI](/docs/cli/) and the [Inference API](/docs/inference/).
- [Audit Logs](/docs/account/audit-logs/) — review account and project activity.

## The wallet

Billing runs on a **prepaid wallet**. You add funds, deploy resources, and charges are deducted in real time against your balance.

- Compute is billed per second from the hourly rate, from boot until you terminate it. Jobs are billed only while running. Inference is billed per token. Extra disk is billed per GB-hour.
- There is no monthly or annual subscription.
- Amounts display in **INR** for India and **USD** elsewhere. Set the location in [Account Settings](/docs/account/settings/).

Full details: [Wallet](/docs/billing/wallet/).

### Adding funds

Top up from **Billing > Wallet > Top Up**. The page shows the minimum amount. Supported payment methods:

- **Razorpay** (India) — UPI, cards, net banking, wallets.
- **PayPal** (international) — cards and PayPal balance, converted to your currency.
- **Cryptocurrency via Binance Pay** — USDT/USDC and other supported tokens.

Funds appear as soon as the payment succeeds. If a payment was taken but the balance didn't update, see [Balance not updated](/docs/support/troubleshooting/#balance-not-updated).

### Low balance & suspension

When your balance runs low, Podstack warns you on the dashboard and by email. If it reaches zero:

- New pods and storage can't be created.
- Running resources may be suspended after a short grace period.
- A **force-recharge modal** blocks portal actions if the wallet goes negative — top up to clear it.

Consider **auto-debit** (a mandate that tops up automatically below a trigger balance) to avoid interruption. See [Wallet](/docs/billing/wallet/#auto-debit-mandate).

## Invoices & GST

Invoices are under **Billing > Invoices** — filter, download PDFs, or generate a custom invoice for any date range. Business accounts with a verified GSTIN get GST details on their invoices.

If a charge looks wrong, **do not pay a disputed invoice** — contact support with the invoice number and what you expected. See [Invoices](/docs/billing/invoices/) and the [Understand my bill](/docs/support/scenarios/#i-was-charged-and-want-to-understand-my-bill) scenario.

## KYC verification

KYC (Know Your Customer) is identity verification some accounts are asked to complete. It does not enable a monthly or annual subscription. Usage stays on the prepaid wallet. See [KYC Verification](/docs/billing/kyc/).

Three methods are available; pick the one that fits your documents:

- **Didit** — automated ID scan with a liveness check; usually completes in seconds to minutes.
- **Government ID** — upload a government ID for manual review; typically within 24 hours.
- **WhatsApp** — verify through a WhatsApp flow tied to your phone number.

Start from **Billing > KYC** (or the dashboard KYC banner). Full walkthrough, statuses, and rejection reasons: [KYC Verification](/docs/billing/kyc/). If your KYC is stuck or rejected, see the [KYC stuck](/docs/support/scenarios/#my-kyc-is-stuck-or-was-rejected) scenario.

## Refunds

Refunds may apply to failed provisioning, billing errors, or service issues. There is no unused monthly or annual plan to refund, because those plans are not sold. See [Wallet](/docs/billing/wallet/).

## When to contact support

Reach out when the portal can't resolve it on its own:

- KYC is stuck in review beyond the expected time or repeatedly rejected.
- A payment was charged but not credited, or a charge is unexplained.
- You've lost access to your sign-in email.

How to reach us and what to include: [Getting Help](/docs/support/getting-help/).
