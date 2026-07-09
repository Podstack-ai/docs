---
title: SSH Keys

weight: 20
description: "Add or generate SSH keys on PodStack to access pods and VMs. Generate ed25519/RSA keys in-platform (private key shown once), upload existing keys, set a default, and understand prepaid (1) vs postpaid (20) key limits."
keywords:
  - PodStack SSH keys
  - GPU pod SSH access
  - generate ssh key cloud
  - ed25519 rsa key
  - ssh key limit prepaid postpaid
---
# SSH Keys

SSH keys are how you connect to your pods and VMs. You can generate a key pair
inside PodStack or upload one you already have.

## What you'll accomplish

Add an SSH key to your account and set it as the default used when launching
resources.

## Prerequisites

- A signed-in account. **Adding** a key requires [KYC verification](/docs/getting-started/identity-verification/) when enforcement is on; **viewing** keys works before KYC.

## Generate a key in PodStack

1. Go to **SSH Keys** and choose **Generate New Key**.
2. Enter a **name**.
3. Choose a **type**:
   - **ED25519** (recommended) — fast, small, modern.
   - **RSA** — 2048–4096 bits (default 4096) for maximum compatibility.
4. Choose **Generate**, then **download the private key immediately** — it is shown **only once**.

You can re-download the PEM for **platform-generated** keys later from the key's
detail view. Uploaded keys never expose a private key (PodStack only holds the
public half).

### Configure your local machine

```bash
# Move the downloaded key into place
mv ~/Downloads/podstack_key ~/.ssh/

# Lock down permissions
chmod 600 ~/.ssh/podstack_key

# (Optional) load it into your agent
ssh-add ~/.ssh/podstack_key
```

## Upload an existing key

1. Find your public key locally:
   ```bash
   cat ~/.ssh/id_ed25519.pub   # or ~/.ssh/id_rsa.pub
   ```
2. In **SSH Keys**, choose **Add SSH Key**.
3. Enter a **name** and paste the **public key** (starts with `ssh-ed25519` or `ssh-rsa`).
4. Choose **Add Key**.

Your first key automatically becomes the **default**. Set a different default
any time with **Set as Default**.

## Account limits

The number of keys you can store depends on your account type:

| Account type | Max SSH keys |
|--------------|--------------|
| **Prepaid** (new accounts) | **1** |
| **Postpaid** (KYC-verified, upgraded) | **20** |

New accounts start **prepaid**, so you get **one** key until you complete
[KYC](/docs/getting-started/identity-verification/) and upgrade to postpaid.
Hitting the limit shows an **upgrade prompt** rather than adding the key.

## Verify it worked

- The key appears in your **SSH Keys** list with its fingerprint.
- One key shows the **default** badge.

## Connect using your key

```bash
# Using your default key
ssh root@<pod-address>

# Using a specific key
ssh -i ~/.ssh/podstack_key root@<pod-address>
```

Simplify repeat connections with `~/.ssh/config`:

```
Host my-pod
    HostName abc123.cloud.podstack.ai
    User root
    IdentityFile ~/.ssh/podstack_key
```

Then just `ssh my-pod`. For a full walkthrough (including Windows), see
[Connecting to Pods](/docs/compute/pods/connecting-to-pods/).

## Troubleshoot

| Problem | Cause / fix |
|---------|-------------|
| SSH key limit reached | Prepaid accounts allow 1 key — complete KYC and upgrade to postpaid for up to 20. |
| "Invalid SSH public key format" | Paste the full public key line, starting with `ssh-ed25519`/`ssh-rsa`. |
| Duplicate name / fingerprint | Choose a unique name; the same key can't be added twice. |
| Can't delete a key | It may be in use by a running/stopped pod — reassign that pod first. |
| Permission denied (publickey) | `chmod 600` your private key and confirm you're using the matching key. |

## Next steps

- [Create API tokens](/docs/account/api-tokens/) for the CLI and API.
- [Launch a pod](/docs/getting-started/quick-start/) and connect over SSH.
