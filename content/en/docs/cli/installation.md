---
title: Installation
weight: 10
description: "Install and upgrade the Podstack CLI on macOS, Linux, and Windows with a single command."
keywords:
  - Podstack CLI install
  - install podstack
  - podstack upgrade
  - CLI setup macOS Linux Windows
---

# Installation

## One-line install (macOS & Linux)

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh
```

The installer detects your OS (`Darwin`/`Linux`) and CPU architecture (`amd64`/`arm64`), downloads the matching build, verifies its SHA-256, and installs `podstack` to `/usr/local/bin` (or `~/.local/bin` if that isn't writable).

Verify:

```sh
podstack version      # e.g. v0.9.3
```

If `~/.local/bin` isn't on your `PATH`, add it:

```sh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc   # or ~/.bashrc
```

## Windows

Download the latest `podstack_windows_amd64.zip` from the [releases page](https://github.com/Podstack-ai/podstack-cli-releases/releases), extract `podstack.exe`, and place it on your `PATH`. PowerShell and cmd are both supported (Git Bash is recommended if you use the coding agent's bash tool).

## Manual / binary download

Grab a build for your platform from the [releases page](https://github.com/Podstack-ai/podstack-cli-releases/releases) and put the `podstack` binary on your `PATH`.

## Upgrade

```sh
podstack upgrade                   # to the latest release
podstack upgrade --version v0.9.3  # pin a specific version
```

The CLI also nudges you when a newer release is available.

## Uninstall

Remove the binary and (optionally) its config:

```sh
rm "$(command -v podstack)"
rm -rf ~/.podstack ~/.config/podstack   # optional: settings + credentials
```

## Next steps

- [Authentication](/docs/cli/authentication/) — sign in.
- [Quick Start](/docs/cli/quickstart/) — your first commands.
