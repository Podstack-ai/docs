---
title: SSH Keys
---

# SSH Keys

SSH keys provide secure access to your pods and virtual machines. Manage your keys from the SSH Keys page.

## Why SSH Keys?

SSH keys are more secure than passwords:
- No password to intercept
- Unique per-device authentication
- Can be revoked without changing passwords
- Industry-standard security

## Viewing SSH Keys

Navigate to **SSH Keys** to see all your keys:

- **Name**: Key identifier
- **Type**: RSA or ED25519
- **Fingerprint**: Unique key identifier
- **Created**: When the key was added
- **Last Used**: Recent activity
- **Default**: Whether it's your default key

## Adding an Existing Key

If you already have an SSH key:

### Step 1: Find Your Public Key

```bash
# View your public key
cat ~/.ssh/id_rsa.pub
# or
cat ~/.ssh/id_ed25519.pub
```

### Step 2: Add to Podstack

1. Click **Add SSH Key**
2. Enter a descriptive name
3. Paste your public key (starts with `ssh-rsa` or `ssh-ed25519`)
4. Click **Add Key**

## Generating a New Key

Create a new key pair directly in Podstack:

### Step 1: Generate

1. Click **Generate New Key**
2. Choose key type:
   - **ED25519** (recommended): Faster, smaller, more secure
   - **RSA**: Wider compatibility, choose 4096-bit
3. Enter a name for the key
4. Click **Generate**

### Step 2: Download Private Key

**Important**: Download the private key immediately!

1. Click **Download Private Key**
2. Save securely to your computer
3. The private key is shown only once

### Step 3: Configure Local Machine

```bash
# Move to SSH directory
mv ~/Downloads/podstack_key ~/.ssh/

# Set correct permissions
chmod 600 ~/.ssh/podstack_key

# (Optional) Add to SSH agent
ssh-add ~/.ssh/podstack_key
```

## Setting a Default Key

The default key is automatically selected when creating pods/VMs:

1. Find the key in the list
2. Click **Set as Default**
3. Key is marked with a default badge

## Using SSH Keys

### When Creating Resources

1. During pod/VM creation
2. Select an SSH key from the dropdown
3. Key is automatically configured in the resource

### Connecting

```bash
# Using default SSH key
ssh root@<resource-address>

# Using specific key
ssh -i ~/.ssh/podstack_key root@<resource-address>
```

## Key Types

### ED25519 (Recommended)

```bash
# Generate locally
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Benefits:
- Faster authentication
- Smaller key size
- Strong security
- Modern standard

### RSA

```bash
# Generate locally (use 4096 bits)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Benefits:
- Universal compatibility
- Well-tested
- Works with older systems

## Managing Keys

### Viewing Key Details

Click on a key to see:
- Full public key
- Fingerprint
- Resources using this key
- Creation and usage dates

### Deleting a Key

1. Find the key in the list
2. Click **Delete**
3. Confirm deletion

**Warning**: Resources using this key will lose SSH access. Add a new key to those resources first.

## Security Best Practices

### Protect Private Keys

```bash
# Correct permissions
chmod 600 ~/.ssh/your_private_key

# Never share private keys
# Never commit to git
```

### Use Passphrases

Add a passphrase when generating keys:
```bash
ssh-keygen -t ed25519 -C "email@example.com"
# Enter passphrase when prompted
```

### Regular Rotation

- Rotate keys periodically (every 6-12 months)
- Revoke keys for departed team members
- Use different keys for different purposes

### SSH Agent

Use SSH agent to avoid typing passphrases:
```bash
# Start agent
eval "$(ssh-agent -s)"

# Add key
ssh-add ~/.ssh/podstack_key
```

## Troubleshooting

### Permission Denied

```bash
# Check key permissions
ls -la ~/.ssh/

# Fix permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_*
chmod 644 ~/.ssh/id_*.pub
```

### Wrong Key Used

```bash
# Specify key explicitly
ssh -i ~/.ssh/correct_key root@host

# Or configure in ~/.ssh/config
Host podstack
    HostName resource.cloud.podstack.ai
    User root
    IdentityFile ~/.ssh/podstack_key
```

### Key Not Working

1. Verify key is added to Podstack
2. Verify key is assigned to the resource
3. Check you're using the matching private key
4. Verify key type is supported

## SSH Config File

Simplify connections with SSH config:

```bash
# Edit ~/.ssh/config
Host my-pod
    HostName abc123.cloud.podstack.ai
    User root
    IdentityFile ~/.ssh/podstack_key

# Then connect simply with:
ssh my-pod
```

## Next Steps

- [Create API Tokens](/docs/account/api-tokens/) for programmatic access
- [Deploy a Pod](/docs/compute/pods/creating-pods/) using your SSH key
