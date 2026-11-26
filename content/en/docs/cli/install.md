---
title: Install the CLI
weight: 20
description: "Install podstack 1.2.0 on macOS, Linux, WSL, and Windows, including checksums, Homebrew, Scoop, and PATH."
keywords:
  - install podstack
  - podstack CLI
  - checksums
---

# Install the CLI

The public binaries are on [podstack-cli-releases](https://github.com/Podstack-ai/podstack-cli-releases/releases/tag/v1.2.0). The installers pick the archive for your OS and CPU, check the sha256, and put `podstack` on your PATH.

Check the result with:

```sh
podstack --version
```

It prints `1.2.0`.

## macOS, Linux, and WSL

Intel and Apple Silicon, glibc and musl, and WSL all use this installer.

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh
```

The binary goes to `/usr/local/bin` when that directory is writable. Otherwise it goes to `~/.local/bin`, and the installer adds that directory to your shell startup file. Open a new terminal if `podstack` is not found.

Pin 1.2.0 by replacing `latest` with `download/v1.2.0` in the URL.

Install and connect an agent in the same command. Replace `claude` with `claude-desktop`, `codex`, `cursor`, `gemini`, `grok`, or `all`.

```sh
curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh -s -- --connect claude
```

## Windows PowerShell

```powershell
irm https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.ps1 | iex
```

This installs `podstack.exe` to `%LOCALAPPDATA%\Podstack\bin` and adds that folder to your user PATH. Open a new PowerShell window, then run `podstack --version`.

Install and connect an agent:

```powershell
$env:PODSTACK_CONNECT='claude'; irm https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.ps1 | iex
```

Replace `claude` with `claude-desktop`, `codex`, `cursor`, `gemini`, `grok`, or `all`.

## Direct downloads

| OS | CPU | Archive |
| --- | --- | --- |
| macOS Intel | amd64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_darwin_amd64.tar.gz |
| macOS Apple Silicon | arm64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_darwin_arm64.tar.gz |
| Linux, Alpine, WSL | amd64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_linux_amd64.tar.gz |
| Linux, Alpine, WSL | arm64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_linux_arm64.tar.gz |
| Windows | amd64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_windows_amd64.zip |
| Windows | arm64 | https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/podstack_windows_arm64.zip |

Each Windows zip contains `podstack.exe`. Put that folder on PATH yourself if you did not use the PowerShell installer.

Checksums for every archive:

https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/checksums.txt

On macOS or Linux, download the archive and the checksum file into the same directory, then:

```sh
shasum -a 256 -c checksums.txt
```

`OK` on your archive means the file matches the release. Ignore lines for archives you did not download, or pass only your filename.

On Windows PowerShell:

```powershell
Get-FileHash .\podstack_windows_amd64.zip -Algorithm SHA256
```

Compare the hash with the matching line in `checksums.txt`.

To pin v1.2.0, replace `releases/latest/download` with `releases/download/v1.2.0` in any of these URLs.

## Homebrew and Scoop

These formula files live in the releases repo. They are not in the Homebrew or Scoop registries.

```sh
brew install --formula https://raw.githubusercontent.com/Podstack-ai/podstack-cli-releases/main/Formula/podstack.rb
```

```powershell
scoop install https://raw.githubusercontent.com/Podstack-ai/podstack-cli-releases/main/bucket/podstack.json
```

## PATH

| OS | Where the binary lands |
| --- | --- |
| macOS and Linux, writable `/usr/local/bin` | `/usr/local/bin/podstack` |
| macOS and Linux, otherwise | `~/.local/bin/podstack` |
| Windows | `%LOCALAPPDATA%\Podstack\bin\podstack.exe` |

If the shell says the command is not found, open a new terminal so the startup file or user PATH is loaded. On Windows the command is `podstack.exe` once that directory is on PATH.

Upgrade later with `podstack upgrade`. Pin a tag with `podstack upgrade --version v1.2.0`.
