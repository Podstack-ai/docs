---
title: Wallet

weight: 10
---
# Wallet Management

Your wallet is the central billing account for all Podstack resources. Manage your balance, add funds, and track spending.

## Viewing Your Wallet

Navigate to **Billing > Wallet** to see:

### Balance
Your current available funds displayed in your preferred currency (INR or USD). Toggle between currencies using the currency switch.

### Run Rate
Current spending projections:
- **Hourly cost**: Based on running resources
- **Daily projection**: Hourly rate × 24
- **Monthly projection**: Daily rate × 30

### Expenditure Breakdown
Spending by resource type:
- Pods/Containers
- NFS Storage
- Object Storage

## Account Types

Podstack supports two billing models:

### Prepaid (Default)
- Add funds to your wallet before using resources
- Resources deduct from wallet balance in real-time
- No invoices required - pay as you go

### Postpaid (Enterprise)
- Use resources and pay via monthly invoices
- Requires KYC verification and approval
- Auto-debit can be configured for automatic payments

## Adding Funds

### Top Up Process

1. Go to **Billing > Wallet**
2. Click **Top Up**
3. Enter the amount (minimum ₹100)
4. Select your payment method
5. Complete the payment
6. Funds appear immediately after successful payment

### Payment Methods

**Razorpay (India)**
- **UPI**: Instant payment via UPI apps (GPay, PhonePe, Paytm)
- **Cards**: Credit and debit cards (Visa, Mastercard, RuPay)
- **Net Banking**: Most Indian banks supported
- **Wallets**: Paytm, PhonePe, Mobikwik, etc.

**PayPal (International)**
- Available for international users
- Supports credit/debit cards via PayPal
- PayPal balance payments
- Automatic currency conversion (USD to INR)

**Cryptocurrency (via Binance Pay)**
- **USDT (TRC-20)**: Tether on TRON network
- **USDC (ERC-20/Polygon)**: USD Coin
- **Other supported tokens**: Check wallet page for current options
- Powered by Binance Pay for secure crypto transactions
- Crypto payments converted to INR/USD at current market rates
- Order status can be queried in real-time

### Saved Payment Methods

Manage your payment methods:
1. Go to **Wallet > Payment Methods**
2. View all saved cards and methods
3. Set a default payment method
4. Delete unused payment methods

**Adding a Payment Method:**
1. Complete any payment and choose to save
2. Or go to Payment Methods and click **Add**
3. Enter card details securely
4. Card is saved for future use

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

1. **New resources**: Cannot create new pods or storage
2. **Running resources**: May be suspended after grace period
3. **Action required**: Top up to restore service

### Force-Recharge Modal

When the wallet goes negative (e.g. after a renewal charge fails), a **force-recharge modal** blocks further portal actions until the balance is restored. Top up to dismiss the modal.

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

## Billing Model

### Anniversary-Based Monthly Cycles

Monthly subscriptions (bucket plans, NFS quotas, postpaid invoices) renew on the **anniversary** of the resource's creation date — not on the first of the calendar month. A bucket created on the 15th renews on the 15th of every subsequent month.

### Quota-Based NFS Billing

NFS volumes are billed on **provisioned quota**, not actual usage. If you provision a 500 GB volume and only use 50 GB, you still pay for 500 GB. Right-size your quota — expansion is online; shrinking requires support.

### Billing Owner per Project

Every project has a **billing owner** who is charged for the project's compute, storage, and managed services — regardless of which member created the resource. By default the project creator is the billing owner. Project members can use resources without being billed personally.

To transfer billing ownership, see [Project Settings](/docs/projects/creating-projects/#billing-ownership).

### No Pro-Rata Refunds

Committed billing periods are **not refunded pro-rata** when you delete a resource mid-cycle. If a bucket plan or NFS quota has already been charged for the month, you keep access for the rest of the month but no portion of the charge is returned. Plan your provisioning around this — prefer right-sizing at creation over short-lived overcommitment.

### Postpaid Upgrade (Admin-Only)

Switching an account from **prepaid** to **postpaid** is now an admin-controlled operation. To request a postpaid upgrade:

1. Complete [KYC verification](/docs/billing/kyc/)
2. Contact support with your account email and expected monthly spend
3. An admin reviews and enables postpaid

Self-service postpaid upgrade is no longer available from the portal.

## Refunds

### Eligibility

Refunds may be available for:
- Failed resource provisioning
- Service issues or outages
- Cancelled reservations (before provisioning starts)
- Billing errors

**Not eligible**: pro-rata refunds for committed billing periods on bucket plans, NFS quotas, or postpaid subscriptions — see "No Pro-Rata Refunds" above.

### Requesting a Refund

1. Go to **Billing > Wallet**
2. Click **Request Refund**
3. Check your refund eligibility
4. Select the transactions for refund
5. Choose refund reason from the list
6. Submit the request

### Refund Methods

Choose how to receive your refund:
- **Wallet Credit**: Instant credit to your Podstack wallet
- **Original Payment Method**: Refund to the card/UPI used
- **Bank Transfer**: Direct bank deposit (requires bank details)
- **PayPal**: For payments made via PayPal
- **Cryptocurrency**: For crypto payments (same token/network)

### Refund Timeline

| Method | Processing Time |
|--------|-----------------|
| Wallet Credit | Instant |
| UPI | 1-3 business days |
| Credit/Debit Card | 5-7 business days |
| Bank Transfer | 3-5 business days |
| PayPal | 3-5 business days |
| Cryptocurrency | 1-2 business days |

### Viewing Refund History

Track all your refunds:
1. Go to Wallet
2. Click **Refund History**
3. View status, amount, and method for each refund

## Best Practices

1. **Maintain buffer balance** - Keep extra funds for unexpected usage
2. **Set up auto-debit** - Avoid service interruption
3. **Monitor run rate** - Catch unexpected costs early
4. **Review transactions** - Understand where money goes
5. **Use budget alerts** - Stay within spending limits

## Next Steps

- [View and pay invoices](/docs/billing/invoices/)
- [Complete KYC](/docs/billing/kyc/) for postpaid options
