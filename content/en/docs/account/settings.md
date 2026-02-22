---
title: Settings
---

# Account Settings

Configure your account preferences and manage your profile.

## Accessing Settings

Click your profile icon in the header and select **Settings**, or navigate to the Settings page from the sidebar.

## Profile Information

### Viewing Profile

Your profile displays:
- Display name
- Email address (used for login)
- Phone number (optional)
- Timezone setting
- Account creation date
- Current plan/status
- Profile photo

### Updating Profile

1. Go to **Settings > Profile**
2. Edit the following fields:
   - **Display Name**: Your name shown across the platform
   - **Phone Number**: For account recovery and notifications
   - **Timezone**: For accurate time display
3. Click **Save Changes**

### Profile Photo

- Click your avatar to upload a new photo
- Supported formats: JPG, PNG, GIF
- Maximum size: 5MB
- Click **Remove** to delete your photo

### Email Address

Your email address is:
- Used for OTP authentication
- Used for notifications and alerts
- Cannot be changed directly (contact support for changes)

## Appearance Settings

Customize how the portal looks:

### Theme

Switch between light and dark modes:
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easier on eyes for extended use
- Toggle via the header icon or in Settings > Appearance

### Preferred Currency

Choose your display currency:
- **INR (₹)**: Indian Rupees
- **USD ($)**: US Dollars

All costs, balances, run rates, and pricing across the platform update to your selected currency. Exchange rates are tracked in real-time. Your original payment currency is always preserved in transaction history.

### Product Tour

Toggle the product tour on/off:
- Enable **Show Product Tour** to see guided walkthroughs when visiting features for the first time
- Disable to skip onboarding tooltips

### Compact Mode

Enable for more information density:
- Reduced spacing between elements
- More content visible on screen
- Ideal for power users

### Sidebar Behavior

- **Expanded**: Full sidebar with labels
- **Collapsed**: Icon-only sidebar for more workspace
- Your preference persists across sessions

## Notification Preferences

Configure exactly which notifications you receive:

### Resource Notifications

| Notification | Description |
|--------------|-------------|
| Pod/Container Status | When pods start, stop, or fail |
| VM Status | When VMs change state |
| Resource Limit Warnings | Approaching quota limits |

### Billing Notifications

| Notification | Description |
|--------------|-------------|
| Low Balance Alerts | When wallet balance is low |
| Payment Success | Confirmation of successful payments |
| Payment Failed | Alert when payments fail |
| Invoice Generated | New invoices available |

### Security Notifications

| Notification | Description |
|--------------|-------------|
| Login Notifications | New login from device/location |
| Password Changes | Account password was changed |
| API Token Alerts | New tokens created or revoked |

### Other Notifications

| Notification | Description |
|--------------|-------------|
| Team Invitations | Invited to join a project |
| Feature Announcements | New platform features |
| Maintenance Notifications | Scheduled maintenance alerts |

### Managing Preferences

1. Go to **Settings > Notifications**
2. Toggle each notification type on/off
3. Changes save automatically

## Security Settings

Manage your account security:

### Active Sessions

View all devices/browsers currently logged in:
- Device type and browser
- IP address
- Location (approximate)
- Last activity time

### Session Management

- **Revoke Session**: Log out a specific session
- **Revoke All Others**: Log out all sessions except current
- Useful if you suspect unauthorized access

### Session History

View recent login history:
- Login timestamps
- Device information
- IP addresses
- Login success/failure status

## API Tokens

Manage API tokens from the Settings page. See [API Tokens](/docs/account/api-tokens/) for details.

### Quick Token Management

From Settings:
- View existing tokens
- Create new tokens
- Revoke tokens

## Connected Services

View integrations and connected services:
- Saved payment methods
- Auto-debit mandates
- Third-party integrations

## Data Export

Request export of your data:
1. Go to Settings
2. Click **Export Data**
3. Select data types
4. Download when ready

Available exports:
- Account information
- Transaction history
- Resource usage logs

## Account Deletion

To delete your account:

1. Delete all resources (pods, VMs, storage)
2. Ensure no outstanding balance
3. Go to Settings
4. Click **Delete Account**
5. Confirm deletion

**Warning**: Account deletion is permanent and cannot be undone.

## Security Recommendations

1. **Use unique email** - Dedicated email for Podstack
2. **Monitor activity** - Review audit logs regularly
3. **Manage tokens** - Revoke unused API tokens
4. **Keep SSH keys secure** - Protect private keys

## Getting Help

For account issues:
- Check [Support](/docs/support/) documentation
- Contact support with your account email

## Next Steps

- [Manage SSH Keys](/docs/account/ssh-keys/)
- [Create API Tokens](/docs/account/api-tokens/)
- [Review Audit Logs](/docs/account/audit-logs/)
