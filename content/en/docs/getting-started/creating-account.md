---
title: Creating Your Account

weight: 10
description: "Create a PodStack account with passwordless email-code sign-in or Google, GitHub, or Microsoft login. No password required — your first sign-in creates the account automatically."
keywords:
  - PodStack sign up
  - passwordless login GPU cloud
  - email OTP login
  - Google login GPU cloud
  - create GPU cloud account
---
# Creating Your Account

PodStack uses **passwordless authentication**. There's no separate sign-up form
and no password to remember — your **first sign-in creates your account
automatically**. You can sign in with a one-time email code or with a social
login.

## What you'll accomplish

Sign in to PodStack for the first time and land on your dashboard.

## Prerequisites

- A valid, **permanent** email address. Disposable/temporary email addresses are rejected.
- A modern web browser.

## Sign in with an email code (primary method)

1. Open the PodStack portal and go to the sign-in page.
2. Enter your email address and choose **Continue with Email**.
3. Check your inbox for a **6-digit code**. The code **expires in 10 minutes** and can be used **once**.
4. Enter the 6 digits and choose **Verify & Sign In**.

Your account is created on first verification, and your session stays valid for
**7 days** on that device.

> _Screenshot: email entry → 6-digit code screen._

## Sign in with a social account

If enabled for your workspace, you can skip the email code entirely:

- **Continue with Google**
- **Continue with GitHub**
- **Continue with Microsoft**

These are one-click and land you on the same dashboard. (Which providers appear
depends on how your PodStack instance is configured.)

## Choosing your currency

Your preferred billing currency (**INR** or **USD**) is set later in
**Settings → Profile**, not during sign-in. See
[Settings](/docs/account/settings/).

## Verify it worked

- You're redirected to the **dashboard**.
- Your email appears in the profile menu (top-right).

## Sign out

Use **Log out** in the profile menu. This ends the session immediately on that
device. You can also review and revoke sessions from
[Settings → Security](/docs/account/settings/).

## Troubleshoot

| Problem | Fix |
|---------|-----|
| "Please use a permanent email address" | Disposable/temporary domains are blocked — use a real personal or work email. |
| Didn't receive the code | Check spam/junk, confirm the address, wait a minute, and request a new code. |
| "Invalid or expired code" | Codes last 10 minutes and are single-use — request a fresh one. |
| Social login button missing | That provider isn't enabled on your instance — use the email code instead. |

## Next steps

- [Verify your identity (KYC)](/docs/getting-started/identity-verification/) — required before launching GPU compute.
- [Dashboard Overview](/docs/getting-started/dashboard-overview/)
