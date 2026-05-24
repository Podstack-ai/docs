---
title: KYC Verification

weight: 30
---
# KYC Verification

Know Your Customer (KYC) verification is required for certain billing features, particularly postpaid billing and higher usage limits. Podstack offers three verification methods — pick whichever fits the documents you have.

## Why KYC?

KYC verification:
- Enables postpaid billing options
- Increases account limits (SSH keys, resources)
- Enables auto-pay setup
- Unlocks higher credit limits
- Required for business accounts that need GST invoicing
- Compliance with financial regulations

## Verification Methods

### Didit

Full automated ID verification with liveness detection.

- Accepted documents: **Passport**, **National ID**, **Driver's License**
- Includes **liveness check** (real-time face verification against the document photo)
- Automated document scanning — usually completes in seconds to a few minutes
- Session-based: if you abandon the flow, you can resume from where you left off

Best for: most individual users, fastest path to verified status.

### Government ID

Verify by uploading a clear scan or photo of a government-issued identity document.

- Accepted documents: any current, valid government-issued ID with photo, name, and date of birth
- No liveness check — manual review by the verification team
- Used when Didit isn't available in your region or for your document type

Best for: regions where Didit doesn't support your document, or when you'd rather not do a live face check.

### WhatsApp Verification

Verify your identity through a WhatsApp-based flow tied to your phone number.

- Confirms ownership of the phone number on file
- Submits identity documents and confirmations through WhatsApp
- Useful for users without easy access to a webcam or scanner

Best for: mobile-first users and regions where WhatsApp is the preferred verification channel.

## KYC Types

### Individual KYC

For personal accounts. Required information:

- Full legal name
- Date of birth
- Address (line 1, line 2, city, state, PIN/ZIP code)
- One verified ID via Didit, Government ID, or WhatsApp

### Business KYC

For company / organization accounts. Required information:

- Business name and registered address
- Authorized signatory details (verified through one of the three methods above)
- GST registration number (for Indian businesses that need GST invoicing)
- CIN — Company Identification Number (for incorporated entities, where applicable)

## Completing KYC

### 1. Navigate to KYC

Go to **Billing > KYC**, or click the KYC banner on the dashboard.

### 2. Pick a Verification Method

If multiple methods are available for your account, you'll see a **Choose Verification Method** selector. Pick Didit, Government ID, or WhatsApp.

### 3. Complete the Flow

**Didit:**
1. Click **Start Verification** — a Didit session opens in a new tab
2. Upload or scan your ID document
3. Complete the liveness check
4. Wait for automated verification
5. You can resume an abandoned session later from the KYC page

**Government ID:**
1. Upload a clear photo or scan of your ID
2. Enter the document number and your details exactly as they appear on the ID
3. Submit for manual review

**WhatsApp:**
1. Confirm the phone number on file (or update it)
2. Open the WhatsApp link / receive the message
3. Follow the in-WhatsApp flow to submit your details
4. The platform receives the verification result and updates your status

### 4. Submit Your Address

For all methods, enter your address:
- Address Line 1 (required)
- Address Line 2 (optional)
- City, State, PIN / ZIP (required)

## Verification Status

| Status | Description |
|--------|-------------|
| **Not Started** | KYC not initiated |
| **Pending** | Submitted, awaiting review |
| **In Progress** | Verification processing |
| **Verified** | Successfully verified |
| **Rejected** | Verification failed |
| **Expired** | Session expired, needs restart |

Open **Billing > KYC** to see your current status, per-method progress, and any rejection reason.

## If KYC is Rejected

Common reasons:
- Information mismatch between submitted data and the document
- Invalid or expired document
- Poor quality image (Didit / Government ID)
- Liveness check failed (Didit)
- Phone number couldn't be verified (WhatsApp)

To resolve:
1. Read the rejection reason on the KYC page
2. Correct the data or re-upload a clearer document
3. Resubmit — or switch to a different verification method
4. Contact support if the issue persists

## KYC Enforcement

When KYC enforcement is enabled on the platform:
- A KYC banner appears on the dashboard
- Resource creation (pods, storage) is blocked until KYC is complete
- Modal prompts guide you to complete verification
- Existing resources continue running

## Benefits of Verified KYC

**Individual accounts:**
- Up to 20 SSH keys (vs. 1 for unverified)
- Postpaid billing option
- Auto-pay setup
- Higher resource limits

**Business accounts:**
- GST invoicing
- Higher credit limits
- Postpaid billing
- Consolidated billing
- Purchase orders support

## Privacy and Security

Your KYC information is:
- Encrypted at rest and in transit
- Used only for verification purposes
- Not shared with third parties except as required by law
- Stored in compliance with data protection regulations
- Processed via Didit's secure verification infrastructure (for Didit) or directly by Podstack (for Government ID and WhatsApp)

## Frequently Asked Questions

**Is KYC mandatory?**
Depends on platform configuration. When KYC enforcement is enabled, KYC is required before creating resources. Otherwise it's required only for postpaid billing and higher limits.

**How long does verification take?**
- **Didit**: usually instant to a few minutes (automated)
- **Government ID**: typically within 24 hours (manual review)
- **WhatsApp**: instant to a few minutes once you complete the chat flow

**Can I resume an abandoned Didit session?**
Yes. Return to the KYC page and click **Resume Verification**.

**What if my documents don't match across providers?**
Use current, valid documents. Names and dates must match exactly. Contact support for legitimate discrepancies (e.g. legal name change).

**Can I switch methods after starting?**
Yes — until your KYC is approved you can abandon one method and start another from the KYC page.

## Next Steps

After KYC verification:
- [Set up postpaid billing](/docs/billing/wallet/)
- [View invoices](/docs/billing/invoices/) with correct tax details
- [Manage SSH keys](/docs/account/ssh-keys/) with increased limits
