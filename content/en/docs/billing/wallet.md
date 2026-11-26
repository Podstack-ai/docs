---
title: Wallet
description: "Add Podstack credits with Razorpay. Cards, UPI, and netbanking. Balance is shared by the project."
weight: 20
keywords:
  - wallet
  - Razorpay
  - top-up
---

# Wallet

Open [Billing](https://podstack.ai/app/billing). Everyone in the project draws from the same balance. The balance is stored in US cents and shown in INR or USD based on [Settings](/docs/account/settings/).

## Add money

Checkout is Razorpay. You can pay by card, UPI, or netbanking. You are charged in the currency on screen.

Presets:

- USD: 5, 10, 25, 50, 100
- INR: 500, 1,000, 2,500, 5,000, 10,000

You can type another amount. The minimum is shown next to the field. The default offer starts at $5.

The console guide states: the first top-up of $5 or more is doubled to $10, once per project. Visitors in India see those amounts in INR at the platform rate. If the offer on the Billing page differs, the page is the one that applies. The bonus line is hidden after the project has used it.

When Razorpay confirms payment, credits are added to the wallet. If you close the window, use **Check** on a pending top-up.

## Activity

Filter the last 7, 30, 90, or 365 days, and by service: GPU Cloud, Jobs, Inference, Endpoints, Functions, and Deploy. Inference requests are listed by model with input and output token counts. The balance is charged for inference a whole cent at a time. The request log shows the exact cost.

## When the balance runs out

A launch needs a balance that covers the first hour. Calls that the wallet cannot cover return an error asking you to add credits.

While something is running, Podstack emails owners and admins at about two hours of runway and again at about thirty minutes. When the balance cannot cover the work, running instances are terminated, jobs are cancelled, and endpoints are deleted. Disks on those instances are lost.
