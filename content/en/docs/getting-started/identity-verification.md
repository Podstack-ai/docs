---
title: Identity Verification (KYC)

weight: 15
description: "Complete KYC identity verification on PodStack — required before launching GPU compute, VMs, and storage. Global verification via Didit (ID + liveness) or India document verification (PAN/Aadhaar)."
keywords:
  - GPU cloud KYC verification
  - identity verification GPU cloud
  - Didit KYC
  - PAN Aadhaar verification
  - liveness check cloud
---
# Identity Verification (KYC)

Before you can launch paid GPU resources, PodStack asks you to verify your
identity. This is a one-time process that unlocks compute, storage, and wallet
funding on your account.

## When KYC is required

Identity verification is required before you can:

- Launch **GPU pods, VMs, sandboxes, and baremetal**
- Create **buckets, NFS shares, data volumes**, and other storage
- Add **SSH keys** and **fund your wallet**

You can still do these **without** KYC:

- Browse pricing, view your dashboard, wallet, and invoices
- Create projects and view your SSH key list
- Create **CPU-only** containers (allowed under a lighter check)

If you attempt a gated action before verifying, PodStack shows a
**"KYC required"** prompt that links you straight to verification.

## Prerequisites

- A signed-in account ([create one here](/docs/getting-started/creating-account/)).
- A valid government-issued ID. India users can verify with PAN/Aadhaar documents.

## Global verification (Didit)

For most users, verification runs through **Didit**, which performs **ID
verification, a liveness check, and a face match**.

1. Open the **KYC / Identity** page (or follow the "KYC required" prompt).
2. Choose **Start Verification** (or **Resume** if you began earlier).
3. A Didit-hosted tab opens. Follow the prompts to photograph your ID and complete the liveness/face check.
4. Return to PodStack. Your status refreshes automatically (about every 30 seconds while pending).

**Status flow:** `Not Started → In Progress → In Review → Approved`
(other outcomes: `Declined`, `Expired`, `Abandoned`).

> _Screenshot: KYC page with "Start Verification" and status badge._

## India document verification (QuickeKYC)

India-based users may complete document-based KYC instead. Enter and submit:

- **PAN** — format `AAAAA9999A` (5 letters, 4 digits, 1 letter)
- **Aadhaar** — 12 digits
- **GST** (if applicable)
- **PIN code** — 6 digits

Each field is validated before submission.

## Verify it worked

- Your KYC status reads **Verified / Approved**.
- The amber **KYC banner** on the dashboard disappears.
- Gated actions (launching pods, adding SSH keys, funding the wallet) are now available.

## Troubleshoot

| Status / message | What to do |
|------------------|-----------|
| **In Review** | Your submission is being checked — if it's stuck, email support@podstack.ai. |
| **Declined** | Retry with clear, valid documents and good lighting for the liveness step. |
| **Expired / Abandoned** | Start a new verification session. |
| "KYC required" on an action | Complete verification first, then retry the action. |

## Next steps

- [Create a project](/docs/projects/creating-projects/)
- [Fund your wallet](/docs/billing/wallet/) and [launch your first pod](/docs/getting-started/quick-start/)
