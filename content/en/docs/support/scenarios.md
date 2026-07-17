---
title: Support Scenarios
weight: 40
description: "Step-by-step walkthroughs for the most common Podstack support situations — stuck KYC, understanding a charge, an unavailable GPU type, and losing account access."
keywords:
  - KYC stuck
  - understand GPU bill
  - GPU unavailable
  - lost account access
  - Podstack support walkthrough
---
# Support Scenarios

Concrete, start-to-finish walkthroughs for the situations users contact support about most. Each one lists what to try first and exactly what to send us if it doesn't resolve.

Before contacting support, have your **account email** and any relevant **resource or transaction IDs** ready — see [Getting Help](/docs/support/getting-help/) for what to include.

## My KYC is stuck or was rejected

**Symptoms:** KYC sits in **Pending** / **In Progress** longer than expected, shows **Rejected**, or the session shows **Expired**.

**Try this first:**

1. Open **Billing > KYC** and read the **status and any rejection reason** shown per method.
2. Match the expected time to your method:
   - **Didit** — seconds to a few minutes (automated). If it's stuck, your session may have expired — click **Resume Verification** or restart.
   - **Government ID** — manual review, typically within 24 hours.
   - **WhatsApp** — minutes once you complete the chat flow.
3. If rejected, the usual causes are a data/document mismatch, an expired document, a blurry image, or a failed liveness check. Correct the detail and **resubmit**, or **switch to a different method** — you can change methods any time before approval.

**If it's still stuck**, contact support with:

- Your account email and KYC type (individual or business).
- The verification method you used and the exact status/rejection message.
- Whether it's blocking resource creation (KYC enforcement).

Reference: [KYC Verification](/docs/billing/kyc/).

## I was charged and want to understand my bill

**Symptoms:** The wallet balance dropped more than expected, or you see a charge you don't recognize.

**Try this first:**

1. Open **Billing > Wallet** and read the **run rate** — it shows the current hourly/daily/monthly projection from everything running right now. A forgotten running pod or provisioned storage is the most common surprise.
2. Check the **expenditure breakdown** to see which resource type (pods, NFS storage, object storage, inference) is driving the cost.
3. Scroll to **Transaction History** — every debit has a description and the balance after it. **Export** the range to CSV if you want to reconcile.
4. Remember the billing rules that catch people out:
   - **NFS** bills on **provisioned quota**, not usage — a 500 GB volume costs 500 GB even if you store 50 GB.
   - Monthly plans renew on the **anniversary** of creation, not the 1st of the month.
   - Deleting a resource mid-cycle gives **no pro-rata refund** for the committed period.
5. Stop anything you're not using to halt further charges.

**If a charge is still unexplained or looks wrong**, contact support (or, for a formal invoice, do **not** pay a disputed invoice). Include:

- The transaction date/time and amount, or the invoice number.
- What you expected and why.

Reference: [Wallet](/docs/billing/wallet/) · [Invoices](/docs/billing/invoices/).

## A GPU type I want is unavailable

**Symptoms:** The GPU you want isn't listed in the marketplace, or a pod stays in **Pending** because the requested GPU isn't available.

**Try this first:**

1. Availability varies by GPU type and region. Check the [GPU Marketplace](/docs/compute/gpu-marketplace/) for what's currently on offer and its price.
2. If your pod is stuck **Pending**, confirm your **wallet balance** is sufficient and you haven't hit a **quota** — both can block scheduling. See [Pod stuck in pending](/docs/support/troubleshooting/#pod-stuck-in-pending).
3. Try an **alternative that fits the workload** — a different GPU tier or a different region often has capacity immediately.
4. Retry after a short wait; capacity is released continuously as other users stop instances.

**If you specifically need a type that isn't available**, contact support to request access or register interest. Include:

- The exact GPU model and quantity you need.
- Your region preference and rough timeline / expected duration.
- Whether an alternative GPU would work in the meantime.

For terminal-first provisioning across available GPUs, see [TrainPods](/docs/trainpod/) and the [CLI](/docs/cli/gpu/).

## I lost access to my account

**Symptoms:** You can't receive the sign-in code, lost access to the email on the account, or a session ended unexpectedly.

**Try this first:**

1. Podstack is **passwordless** — there's no password to reset. Sign-in uses a 6-digit email code (single-use, expires in 10 minutes) or a social login.
2. **Code not arriving?** Check spam/junk, wait 2-3 minutes for delivery, confirm the email is spelled correctly, then click **Resend**. See [Not receiving OTP](/docs/support/troubleshooting/#not-receiving-otp).
3. **Signed out unexpectedly?** Sessions expire after extended inactivity — just sign in again. You can review and revoke sessions in [Account Settings](/docs/account/settings/).
4. If you normally use a **social login** (Google/GitHub/SSO), make sure you're choosing the same provider you originally signed up with.

**If you've genuinely lost access to the account email**, contact support from an address you control and include:

- The email address on the Podstack account.
- Any details that help prove ownership — recent resource IDs, invoice numbers, or the approximate signup date.

For security, account-recovery requests may require additional verification before access is restored. Reference: [Account Settings](/docs/account/settings/) · [Creating an account](/docs/getting-started/creating-account/).

## Still need help?

If none of these match your situation, see [Getting Help](/docs/support/getting-help/) for how to reach support, or the [FAQs](/docs/support/faqs/) and [Troubleshooting](/docs/support/troubleshooting/) pages.
