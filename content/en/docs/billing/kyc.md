---
title: KYC Verification
---

# KYC Verification

Know Your Customer (KYC) verification is required for certain billing features, particularly postpaid billing and higher usage limits. Podstack supports multiple verification providers based on your region.

## Why KYC?

KYC verification:
- Enables postpaid billing options
- Increases account limits (SSH keys, resources)
- Required for business accounts with GST
- Enables auto-pay setup
- Higher credit limits
- Compliance with financial regulations

## Verification Providers

Podstack uses different KYC providers based on your region and document type:

### Didit (Global)

For international users and global ID verification:
- **Passport** verification
- **National ID** card verification
- **Driver's License** verification
- Includes **liveness detection** (real-time face verification)
- Automated document scanning
- Session management with ability to resume abandoned sessions

### QuickeKYC (India)

For Indian users with Indian documents:
- **PAN Card** verification
- **Aadhaar Card** verification
- **GST Certificate** verification
- **CIN** (Company Identification Number) verification

## KYC Types

### Individual KYC

For personal accounts:

**Required Documents (India)**
- PAN Card
- Aadhaar Card

**Required Documents (International)**
- Passport, National ID, or Driver's License (via Didit)

**Information Needed**
- Full legal name
- Date of birth
- Address details (line 1, line 2, city, state, PIN code)

### Business KYC

For company/organization accounts:

**Required Documents**
- GST Certificate
- CIN (Company Identification Number) - for companies

**Information Needed**
- Business name
- GST registration number
- CIN (if applicable)
- Registered business address
- Authorized signatory details

## Completing KYC

### Step 1: Navigate to KYC

1. Go to **Billing > KYC** or click the KYC banner on the dashboard
2. Select KYC type (Individual or Business)

### Step 2: Choose Verification Method

**For India (QuickeKYC):**
1. Enter PAN number
2. Click **Verify PAN**
3. Confirm name matches
4. Enter Aadhaar number
5. Complete Aadhaar verification
6. Fill in address details

**For International (Didit):**
1. Click **Start Verification**
2. A verification session is created
3. Follow the on-screen instructions:
   - Upload or scan your ID document
   - Complete liveness check (face verification)
4. Wait for automated verification
5. If you leave mid-session, you can resume later

**For Business:**
1. Enter GST number
2. Click **Verify GST**
3. Confirm business details
4. Enter CIN if applicable
5. Complete verification
6. Fill in organization address

### Step 3: Address Verification

For all KYC types, provide your address:
- Address Line 1 (required)
- Address Line 2 (optional)
- City (required)
- State (required)
- PIN/ZIP Code (required)

### Step 4: Submit for Review

1. Review all entered information
2. Confirm accuracy
3. Submit KYC application
4. Wait for verification

## Verification Status

### Status Types

| Status | Description |
|--------|-------------|
| **Not Started** | KYC not initiated |
| **Pending** | Submitted, awaiting review |
| **In Progress** | Verification processing |
| **Verified** | Successfully verified |
| **Rejected** | Verification failed |
| **Expired** | Session expired, needs restart |

### Checking Status

View your KYC status:
1. Go to **Billing > KYC**
2. See current verification status
3. View per-document verification status
4. See any rejection reasons

### Document-Level Status

Each submitted document shows its own verification status:
- PAN: Verified/Pending/Rejected
- Aadhaar: Verified/Pending/Rejected
- GST: Verified/Pending/Rejected
- ID Document (Didit): Verified/Pending/Rejected

## If KYC is Rejected

Common reasons for rejection:
- Information mismatch between documents
- Invalid document numbers
- Incomplete information
- Poor quality document images (Didit)
- Liveness check failed (Didit)

### Resolving Rejection

1. Review the rejection reason
2. Correct the information
3. Resubmit KYC
4. Contact support if issues persist

## KYC Enforcement

When KYC enforcement is enabled on the platform:
- A KYC banner appears on the dashboard
- Resource creation (pods, VMs, storage) is blocked until KYC is complete
- Modal prompts guide you to complete verification
- Existing resources continue running

## Benefits of Verified KYC

### For Individual Accounts
- Up to 20 SSH keys (vs. 1 for unverified)
- Postpaid billing option
- Auto-pay setup
- Higher resource limits

### For Business Accounts
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
- Processed via secure verification providers (Didit, QuickeKYC)

## Frequently Asked Questions

**Is KYC mandatory?**
Depends on platform configuration. When KYC enforcement is enabled, it's required before creating resources. Otherwise, it's required only for postpaid billing and higher limits.

**How long does verification take?**
- Didit (automated): Usually instant to a few minutes
- QuickeKYC (PAN/Aadhaar): Usually instant
- Business KYC (GST/CIN): May take up to 24 hours

**Can I resume an abandoned Didit session?**
Yes. If you leave the Didit verification flow, you can resume from where you left off by returning to the KYC page.

**What if my documents don't match?**
Ensure you're using current, valid documents. Contact support if there are legitimate discrepancies.

## Next Steps

After KYC verification:
- [Set up postpaid billing](/docs/billing/wallet/)
- [View invoices](/docs/billing/invoices/) with correct tax details
- [Manage SSH keys](/docs/account/ssh-keys/) with increased limits
