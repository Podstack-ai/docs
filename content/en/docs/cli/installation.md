---
title: Installation
description: "Install Podstack CLI on macOS, Linux, and Windows. Manage GPU cloud resources from your terminal."
keywords:
  - Podstack CLI install
  - command line install
  - terminal GPU management
  - CLI setup
---

# Installation

Install the Podstack CLI to manage GPU cloud resources from your terminal.

## Quick Install

### macOS

Using Homebrew:

```bash
brew install podstack/tap/podstack-cli
```

Or using the install script:

```bash
curl -sSL https://get.podstack.ai/cli | bash
```

### Linux

Using the install script:

```bash
curl -sSL https://get.podstack.ai/cli | bash
```

Using apt (Debian/Ubuntu):

```bash
# Add repository
curl -fsSL https://apt.podstack.ai/gpg | sudo gpg --dearmor -o /usr/share/keyrings/podstack.gpg
echo "deb [signed-by=/usr/share/keyrings/podstack.gpg] https://apt.podstack.ai stable main" | sudo tee /etc/apt/sources.list.d/podstack.list

# Install
sudo apt update
sudo apt install podstack-cli
```

Using yum (RHEL/CentOS/Fedora):

```bash
# Add repository
sudo tee /etc/yum.repos.d/podstack.repo << 'EOF'
[podstack]
name=Podstack CLI
baseurl=https://yum.podstack.ai/stable
enabled=1
gpgcheck=1
gpgkey=https://yum.podstack.ai/gpg
EOF

# Install
sudo yum install podstack-cli
```

### Windows

Using winget:

```powershell
winget install podstack.cli
```

Using Scoop:

```powershell
scoop bucket add podstack https://github.com/podstack/scoop-bucket
scoop install podstack-cli
```

Using Chocolatey:

```powershell
choco install podstack-cli
```

### From Source

Requires Go 1.21+:

```bash
go install github.com/podstack/cli@latest
```

### Docker

```bash
docker run -it --rm podstack/cli --help
```

With credentials:

```bash
docker run -it --rm \
  -e PODSTACK_API_TOKEN=$PODSTACK_API_TOKEN \
  podstack/cli pod list
```

## Verify Installation

```bash
podstack version
```

Expected output:

```
Podstack CLI v1.2.3
Build: 2024-01-15
```

## Update CLI

### macOS (Homebrew)

```bash
brew upgrade podstack-cli
```

### Linux (apt)

```bash
sudo apt update && sudo apt upgrade podstack-cli
```

### All Platforms

```bash
podstack update
```

Check for updates:

```bash
podstack update --check
```

## Uninstall

### macOS (Homebrew)

```bash
brew uninstall podstack-cli
```

### Linux (apt)

```bash
sudo apt remove podstack-cli
```

### Windows (winget)

```powershell
winget uninstall podstack.cli
```

### Manual Removal

```bash
# Remove binary
sudo rm /usr/local/bin/podstack

# Remove config
rm -rf ~/.podstack
```

## Shell Completion

Enable tab completion for faster command entry.

### Bash

```bash
# Add to ~/.bashrc
eval "$(podstack completion bash)"

# Or install permanently
podstack completion bash | sudo tee /etc/bash_completion.d/podstack > /dev/null
```

### Zsh

```bash
# Add to ~/.zshrc
eval "$(podstack completion zsh)"

# Or install permanently
podstack completion zsh > "${fpath[1]}/_podstack"
```

### Fish

```bash
podstack completion fish > ~/.config/fish/completions/podstack.fish
```

### PowerShell

```powershell
# Add to $PROFILE
podstack completion powershell | Out-String | Invoke-Expression
```

## Troubleshooting

### Command Not Found

Add the install directory to your PATH:

```bash
# Linux/macOS
export PATH="$HOME/.podstack/bin:$PATH"

# Add to shell profile for persistence
echo 'export PATH="$HOME/.podstack/bin:$PATH"' >> ~/.bashrc
```

### Permission Denied

Make the binary executable:

```bash
chmod +x /usr/local/bin/podstack
```

### SSL Certificate Errors

Update CA certificates:

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install ca-certificates

# macOS
brew install ca-certificates
```

### Proxy Configuration

Set proxy environment variables:

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

## Next Steps

- [Authentication](/docs/cli/authentication/) - Configure CLI access
- [Quick Start](/docs/cli/quickstart/) - Create your first pod
