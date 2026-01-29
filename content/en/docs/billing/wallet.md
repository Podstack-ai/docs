---
title: Wallet
---

# Wallet Management

Your wallet is the central billing account for all Podstack resources. Manage your balance, add funds, and track spending.

## Viewing Your Wallet

Navigate to **Billing > Wallet** to see:

### Balance
Your current available funds in INR.

### Run Rate
Current spending projections:
- **Hourly cost**: Based on running resources
- **Daily projection**: Hourly rate × 24
- **Monthly projection**: Daily rate × 30

### Expenditure Breakdown
Spending by resource type:
- Pods/Containers
- Virtual Machines
- NFS Storage
- Object Storage

## Adding Funds

### Top Up Process

1. Go to **Billing > Wallet**
2. Click **Top Up**
3. Enter the amount (minimum varies)
4. Click **Proceed to Payment**
5. Complete payment via Razorpay
6. Funds appear immediately after successful payment

### Payment Methods

Razorpay supports:
- **UPI**: Instant payment via UPI apps
- **Cards**: Credit and debit cards
- **Net Banking**: Most Indian banks
- **Wallets**: Paytm, PhonePe, etc.

### Saved Payment Methods

Save cards for faster future payments:
1. Complete a payment
2. Choose to save the card
3. Use saved cards for subsequent top-ups

## Applying Coupons

If you have a promotional code:

1. During top-up, click **Have a coupon?**
2. Enter the coupon code
3. Click **Apply**
4. Discount is shown before payment

Coupon types:
- **Percentage discount**: Reduces payment amount
- **Fixed discount**: Flat reduction
- **Credit bonus**: Extra credits added to wallet

## Transaction History

View all wallet transactions:

1. Go to **Billing > Wallet**
2. Scroll to **Transaction History**
3. See all credits and debits

Each transaction shows:
- **Date/Time**: When it occurred
- **Type**: Credit (top-up) or Debit (usage)
- **Amount**: Transaction value
- **Description**: What the charge was for
- **Balance**: Wallet balance after transaction

### Export Transactions

Download transaction history:
1. Click **Export**
2. Select date range
3. Download CSV file

Useful for accounting and expense tracking.

## Auto-Debit (Mandate)

Set up automatic payments to avoid service interruption:

### Enable Auto-Debit

1. Go to Wallet settings
2. Click **Set Up Auto-Debit**
3. Configure:
   - Trigger balance (e.g., when below ₹500)
   - Top-up amount
4. Authorize the mandate via your bank
5. Auto-debit activates

### How It Works

When your balance falls below the trigger:
1. Automatic charge to saved payment method
2. Wallet topped up by configured amount
3. Email notification sent

### Manage Mandate

- View mandate status in Wallet settings
- Cancel mandate anytime
- Update trigger amount or top-up value

## Low Balance Warnings

Podstack warns you when balance is running low:

### Dashboard Alert
Yellow/red indicator on wallet balance when low.

### Email Notifications
Receive emails when:
- Balance drops below threshold
- Resource creation blocked due to insufficient funds

## Insufficient Balance

When wallet balance reaches zero:

1. **New resources**: Cannot create new pods, VMs, or storage
2. **Running resources**: May be suspended after grace period
3. **Action required**: Top up to restore service

### Grace Period

Resources aren't immediately terminated:
1. Warning notification sent
2. Short grace period before suspension
3. Top up during grace period to prevent interruption

### Restoring Service

1. Add funds to wallet
2. Suspended resources become available
3. Start resources if they were stopped

## Budget Management

Track and control spending:

### Set Budget Alerts

Configure notifications when spending reaches thresholds:
1. Go to Wallet settings
2. Set monthly budget
3. Configure alert at 50%, 80%, 100%
4. Receive email when thresholds reached

### Monitor Spending

- Check daily run rate on dashboard
- Review weekly spending trends
- Export transactions for analysis

## Refunds

Refunds may be processed for:
- Failed provisioning
- Service issues
- Cancelled reservations (before provisioning)

Refunds appear as credits in your wallet.

## Best Practices

1. **Maintain buffer balance** - Keep extra funds for unexpected usage
2. **Set up auto-debit** - Avoid service interruption
3. **Monitor run rate** - Catch unexpected costs early
4. **Review transactions** - Understand where money goes
5. **Use budget alerts** - Stay within spending limits

## Next Steps

- [View and pay invoices](/docs/billing/invoices/)
- [Complete KYC](/docs/billing/kyc/) for postpaid options
