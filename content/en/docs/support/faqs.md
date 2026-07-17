---
title: FAQs
weight: 50
description: "Frequently asked questions about Podstack support — billing and currency, KYC, account access, security and ISO 27001, refunds, data handling, and GPU availability."
keywords:
  - Podstack FAQ
  - GPU cloud billing FAQ
  - KYC FAQ
  - Podstack security ISO 27001
  - refund policy GPU cloud
---
# Frequently Asked Questions

General questions about accounts, billing, KYC, security, and support. For product-specific questions, see the FAQ page inside each section: [CLI](/docs/cli/faqs/) and [Inference](/docs/inference/faqs/).

## Billing & payments

**How does billing work?**
Podstack uses a **prepaid wallet**. You add funds, deploy resources, and charges are deducted in real time — compute per second, storage on provisioned quota, inference per token. See [Billing](/docs/billing/).

**Which currency am I billed in?**
All charges settle in INR; amounts are **displayed** in your preferred currency — INR or USD — which you set in [Account Settings](/docs/account/settings/). Payments via PayPal and crypto are converted at the current rate. See [Wallet](/docs/billing/wallet/).

**What payment methods can I use?**
Razorpay (UPI, cards, net banking, wallets) for India, PayPal for international users, and cryptocurrency via Binance Pay (USDT/USDC and other supported tokens). See [Wallet](/docs/billing/wallet/#adding-funds).

**Can I get a refund?**
Refunds may apply to failed provisioning, billing errors, service issues, or reservations cancelled before provisioning. Committed billing periods (bucket plans, NFS quota, postpaid) are **not** refunded pro-rata. Request one from **Billing > Wallet > Request Refund**. See [Refunds](/docs/billing/wallet/#refunds).

**Do I get GST invoices?**
Yes. Business accounts with a verified GSTIN get GST details on their invoices. Complete [KYC](/docs/billing/kyc/) and add your GSTIN, then see [Invoices](/docs/billing/invoices/).

**How do I move from prepaid to postpaid?**
Postpaid is admin-controlled. Complete [KYC verification](/docs/billing/kyc/), then contact support with your account email and expected monthly spend for review. Self-service postpaid upgrade is not available from the portal.

## KYC

**Is KYC mandatory?**
It depends on platform configuration. When KYC enforcement is enabled, KYC is required before creating resources; otherwise it's needed only for postpaid billing and higher limits. See [KYC Verification](/docs/billing/kyc/).

**How long does KYC take?**
Didit is usually instant to a few minutes (automated), WhatsApp is a few minutes once you finish the chat, and Government ID is manual review — typically within 24 hours.

**My KYC was rejected. What now?**
Read the rejection reason on the KYC page, fix the mismatched detail or re-upload a clearer document, and resubmit — or switch to a different method. See the [KYC stuck](/docs/support/scenarios/#my-kyc-is-stuck-or-was-rejected) scenario.

## Account & access

**I didn't get my sign-in code / I'm locked out.**
Podstack is passwordless — there's no password to reset. Codes are single-use and expire in 10 minutes; check spam, wait a couple of minutes, and use **Resend**. If you've lost access to the account email, follow the [Lost account access](/docs/support/scenarios/#i-lost-access-to-my-account) scenario.

**How do I get an API key or SSH key?**
Create `psk_…` API tokens in [Account > API Tokens](/docs/account/api-tokens/) and manage connection keys in [Account > SSH Keys](/docs/account/ssh-keys/).

## Security & data

**Is Podstack secure? Are you certified?**
The platform is **ISO 27001-certified**. See [Getting Started](/docs/getting-started/) for the platform overview.

**How is my KYC and personal data handled?**
KYC information is encrypted at rest and in transit, used only for verification, and not shared with third parties except as required by law. Didit verifications are processed via Didit's secure infrastructure; Government ID and WhatsApp are handled directly by Podstack. See [Privacy and Security](/docs/billing/kyc/#privacy-and-security).

**Who is billed for a shared project's resources?**
Each project has a **billing owner** (the creator by default) who is charged for that project's resources, regardless of which member created them. See [Wallet](/docs/billing/wallet/#billing-model) and [Projects](/docs/projects/).

## GPUs & availability

**The GPU I want isn't available. How do I get access?**
Availability varies by type and region — check the [GPU Marketplace](/docs/compute/gpu-marketplace/), try an alternative or region, and retry as capacity is released continuously. If you specifically need an unavailable type, contact support with the model, quantity, region, and timeline. See the [GPU unavailable](/docs/support/scenarios/#a-gpu-type-i-want-is-unavailable) scenario.

## Getting help

**How do I contact support and how fast will I hear back?**
Email [support@podstack.ai](mailto:support@podstack.ai) with your account email and relevant IDs; the target response time is within 24 hours. See [Getting Help](/docs/support/getting-help/) for what to include.
