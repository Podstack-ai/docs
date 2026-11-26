---
title: Account and billing
description: "Support notes for Podstack sign-in and the prepaid wallet."
weight: 20
keywords:
  - billing support
  - Razorpay
---

# Account and billing

**I cannot sign in.** Use [podstack.ai/auth](https://podstack.ai/auth) and the same Google, Microsoft, or GitHub account you used before. Customer accounts are not created with a password.

**Where did the charge come from?** Open [Billing](https://podstack.ai/app/billing) and read Activity. Each row is a service and a resource. Inference rows list the model and token counts.

**The payment went through but the balance did not move.** On Billing, open the pending top-up and click **Check**. Razorpay confirmation can land a moment after the window closes.

**Everything stopped.** The wallet could not cover the running machines. Instances are terminated, jobs are cancelled, and endpoints are deleted. Add credits and launch again. Disks that were on those instances are gone.

Details: [Wallet](/docs/billing/wallet/).
