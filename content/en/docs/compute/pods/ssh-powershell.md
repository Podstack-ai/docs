---
title: SSH from Windows PowerShell (Video Tutorial)
weight: 36
description: "Step-by-step guide to SSH into a Podstack GPU pod from Windows PowerShell — install OpenSSL, write the SSH proxy configuration automatically, and connect to your pod. Includes a video walkthrough."
keywords:
  - SSH from PowerShell
  - Windows PowerShell SSH GPU
  - Podstack SSH Windows
  - OpenSSL Windows SSH proxy
  - ProxyCommand OpenSSL s_client
  - FireDaemon OpenSSL winget
  - connect to GPU pod Windows
  - SSH config PowerShell
  - Windows SSH GPU cloud
  - openssl.exe not found PATH
  - Podstack pod Windows terminal
  - ssh-bphbp cloud podstack
tags:
  - SSH
  - Pods
  - Tutorial
  - Video
  - Windows
  - PowerShell
  - GPU Cloud
og_image: https://img.youtube.com/vi/uT7DahW1l3I/maxresdefault.jpg
---

# SSH into Pods from Windows PowerShell

The standard [SSH instructions](/docs/compute/pods/connecting-to-pods/#ssh-access) work as-is on **Linux**, **macOS**, and **Git Bash** on Windows. **Windows PowerShell** needs a little extra setup: it routes the connection through Podstack's SSH proxy using **OpenSSL**, which isn't installed on Windows by default.

This guide configures PowerShell to recognize Podstack's SSH proxy so you can connect with a normal `ssh` command. The whole process is a one-time setup.

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5rem 0; border-radius: 8px; background: #000;">
  <iframe
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    src="https://www.youtube.com/embed/uT7DahW1l3I?rel=0&modestbranding=1"
    title="How to SSH into Podstack Pods from Windows PowerShell"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen>
  </iframe>
</div>

## Prerequisites

- An active [Podstack account](https://cloud.podstack.ai) with a running pod that has `ENABLE_SSH=true`
- Your SSH **public key** uploaded in [SSH Keys](/docs/account/ssh-keys/) and selected on the pod
- Your SSH **private key** file saved locally (for example in `C:\Users\<username>\.ssh\`)
- Windows 10 or 11 with PowerShell

---

## Step 1 — Add the SSH Configuration

Open **PowerShell** and run the script below. It locates your OpenSSL install automatically — if you don't have OpenSSL yet, do [Step 2](#step-2--install-openssl-if-not-installed) first, then come back and run this.

The script writes your SSH config to:

```
C:\Users\<username>\.ssh\config
```

```powershell
$sshDir = "$env:USERPROFILE\.ssh"
if (-not (Test-Path $sshDir)) { New-Item -ItemType Directory -Path $sshDir -Force | Out-Null }
$openssl = Get-ChildItem -Path "C:\Program Files","C:\Program Files (x86)","$env:LOCALAPPDATA\Microsoft\WinGet" -Recurse -Filter openssl.exe -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
if (-not $openssl) {
    Write-Error "openssl.exe still not found anywhere - reinstall: winget install FireDaemon.OpenSSL"
} else {
    $config = "# Podstack SSH Configuration`r`nHost *.cloud.podstack.ai`r`n    ProxyCommand `"$openssl`" s_client -quiet -servername %h -connect %h:443`r`n    StrictHostKeyChecking no`r`n    UserKnownHostsFile /dev/null"
    Set-Content -Path "$sshDir\config" -Encoding ascii -Value $config
    Write-Host "Wrote config using $openssl"
}
```

When it succeeds you'll see `Wrote config using ...` printed with the path to the OpenSSL executable it found. If you see the `openssl.exe still not found` error instead, complete Step 2 and run this script again.

---

## Step 2 — Install OpenSSL (if not installed)

OpenSSL provides the `s_client` proxy that tunnels your SSH connection through port 443. Install it **before Step 1**, then confirm the executable exists.

```powershell
# Install FireDaemon OpenSSL (Windows 10/11)
winget install FireDaemon.OpenSSL
```

`winget` does **not** add OpenSSL to your `PATH`, so the install location has to be discovered. The script in Step 1 does this automatically, but you can verify it yourself:

```powershell
# Locate the executable (Step 1's script picks this path up automatically)
Get-ChildItem "C:\Program Files\FireDaemon*" -Recurse -Filter openssl.exe -ErrorAction SilentlyContinue | Select-Object FullName
```

Once OpenSSL is installed, return to [Step 1](#step-1--add-the-ssh-configuration) and run the configuration script.

---

## Step 3 — Connect to Your Pod

After the configuration is written, connect using the command below. Replace `<key_name>` with your private key filename (for example `id_rsa` or `id_ed25519`), and use the SSH host shown on your pod's detail page.

```powershell
ssh -i ~/.ssh/<key_name> podstack@ssh-<subdomain>.cloud.podstack.ai
```

For example, a pod with the subdomain `bphbp` would be:

```powershell
ssh -i ~/.ssh/id_ed25519 podstack@ssh-bphbp.cloud.podstack.ai
```

- `podstack` is the default username for all Podstack templates.
- `ssh-<subdomain>.cloud.podstack.ai` is unique per pod — copy it from the **SSH Access** section on the pod detail page.

> **Important:** Your private key file must have restricted permissions. Run this before connecting:
>
> ```powershell
> chmod 400 ~/.ssh/<key_name>
> ```

> **Note:** Make sure you've uploaded your SSH **public** key in the [SSH Keys](/docs/account/ssh-keys/) section and selected it on the pod before connecting.

---

## Quick Reference

| Action | Command |
|--------|---------|
| Install OpenSSL | `winget install FireDaemon.OpenSSL` |
| Find openssl.exe | `Get-ChildItem "C:\Program Files\FireDaemon*" -Recurse -Filter openssl.exe -ErrorAction SilentlyContinue \| Select-Object FullName` |
| Fix key permissions | `chmod 400 ~/.ssh/<key_name>` |
| Connect to pod | `ssh -i ~/.ssh/<key_name> podstack@ssh-<subdomain>.cloud.podstack.ai` |

## Common Issues

**`openssl.exe still not found anywhere`**
- OpenSSL isn't installed, or `winget` placed it somewhere the script didn't scan. Run `winget install FireDaemon.OpenSSL`, then re-run the Step 1 script.

**Permission denied (publickey)**
- The private key you're passing with `-i` doesn't match the public key selected on the pod. Confirm the key in [SSH Keys](/docs/account/ssh-keys/) and your local filename.
- Fix overly-open key permissions: `chmod 400 ~/.ssh/<key_name>`.

**Connection refused**
- The pod isn't fully running yet — wait for status **Running**.
- Verify `ENABLE_SSH=true` was set in environment variables when launching the pod.

**Host key verification failed**
- Happens when a pod is recreated and reuses the same subdomain. The config above already sets `StrictHostKeyChecking no` and `UserKnownHostsFile /dev/null`, which avoids this — if you customized the config, clear the cached host key with `ssh-keygen -R ssh-<subdomain>.cloud.podstack.ai`.

For more troubleshooting, see [Connecting to Pods](/docs/compute/pods/connecting-to-pods/#troubleshooting).

## Next Steps

- New to SSH on Podstack? Watch the full [SSH Tutorial (Video)](/docs/compute/pods/ssh-tutorial/) for macOS, Linux, and Git Bash.
- Explore [Connecting to Pods](/docs/compute/pods/connecting-to-pods/) for Jupyter, web terminal, exposed ports, and file transfer.
- Set up additional [SSH Keys](/docs/account/ssh-keys/) for teammates.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to SSH into Podstack Pods from Windows PowerShell",
  "description": "Step-by-step video showing how to SSH into a Podstack GPU pod from Windows PowerShell — install FireDaemon OpenSSL, write the SSH proxy configuration automatically, and connect to your pod.",
  "thumbnailUrl": [
    "https://img.youtube.com/vi/uT7DahW1l3I/maxresdefault.jpg",
    "https://img.youtube.com/vi/uT7DahW1l3I/hqdefault.jpg"
  ],
  "uploadDate": "2026-06-08",
  "contentUrl": "https://www.youtube.com/watch?v=uT7DahW1l3I",
  "embedUrl": "https://www.youtube.com/embed/uT7DahW1l3I",
  "publisher": {
    "@type": "Organization",
    "name": "Podstack",
    "logo": {
      "@type": "ImageObject",
      "url": "https://docs.podstack.ai/images/logo.png"
    }
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to SSH into a Podstack GPU Pod from Windows PowerShell",
  "description": "Install OpenSSL, write the SSH proxy configuration, and connect to a Podstack GPU pod from Windows PowerShell.",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [
    { "@type": "HowToSupply", "name": "Podstack account with a running pod (ENABLE_SSH=true)" },
    { "@type": "HowToSupply", "name": "SSH key pair" }
  ],
  "tool": [
    { "@type": "HowToTool", "name": "Windows PowerShell" },
    { "@type": "HowToTool", "name": "FireDaemon OpenSSL" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Add the SSH Configuration",
      "text": "In PowerShell, run the provided script to auto-locate openssl.exe and write a Podstack ProxyCommand entry to C:\\Users\\<username>\\.ssh\\config.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-powershell/#step-1--add-the-ssh-configuration"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Install OpenSSL",
      "text": "If OpenSSL is not installed, run 'winget install FireDaemon.OpenSSL', then re-run the Step 1 configuration script.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-powershell/#step-2--install-openssl-if-not-installed"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Connect to Your Pod",
      "text": "Set key permissions with chmod 400, then connect: ssh -i ~/.ssh/<key_name> podstack@ssh-<subdomain>.cloud.podstack.ai.",
      "url": "https://docs.podstack.ai/docs/compute/pods/ssh-powershell/#step-3--connect-to-your-pod"
    }
  ]
}
</script>
