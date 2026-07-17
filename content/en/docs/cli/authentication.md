---
title: Authentication
weight: 20
description: "Sign in to the Podstack CLI with a single browser sign-in (Google, GitHub, or SSO) — no API key to copy. Plus API keys for CI."
keywords:
  - CLI authentication
  - podstack auth login
  - browser SSO login
  - Google GitHub sign in
  - PODSTACK_API_KEY CI
---

# Authentication — `podstack auth`

## Sign in (browser)

```sh
podstack auth login
```

This opens your browser to sign in with **Google, GitHub, or SSO**. After you sign in, the CLI receives a token, stores it, verifies it, and selects your default project — nothing to copy or paste.

```
Opening your browser to sign in…
Logged in as you@example.com. Key stored at ~/.config/podstack/credentials.json
✓ using project my-project (…)
```

If the browser can't open (a remote/SSH shell), the CLI prints the URL to open manually.

## Confirm who you are

```sh
podstack auth whoami
```

## Sign out

```sh
podstack auth logout
```

Removes the stored credentials.

## Headless / CI

For CI and scripts, skip the browser:

- **`--key`** — pass a `psk_` API key directly (mint one in the dashboard):
  ```sh
  podstack auth login --key psk_xxx
  ```
- **`--manual`** — paste a key at a hidden prompt instead of opening a browser.
- **`PODSTACK_API_KEY`** — set the key in the environment; no `login` needed at all:
  ```sh
  export PODSTACK_API_KEY=psk_xxx        # macOS/Linux
  $env:PODSTACK_API_KEY = "psk_xxx"      # Windows PowerShell
  ```

Example GitHub Actions step:

```yaml
- name: Install & use Podstack CLI
  env:
    PODSTACK_API_KEY: ${{ secrets.PODSTACK_API_KEY }}
  run: |
    curl -fsSL https://github.com/Podstack-ai/podstack-cli-releases/releases/latest/download/install.sh | sh
    podstack projects list
```

## Where credentials live

- Credentials: `~/.config/podstack/credentials.json` (mode `0600`).
- Default project and settings: `~/.podstack/config.json`. See [Configuration](/docs/cli/configuration/).

The token is sent as `Authorization: Bearer` on every API call.

## Security tips

- Prefer a scoped API key (not a personal token) in CI, and store it as a CI secret — never commit it.
- Run `podstack auth logout` on shared machines.

## Next

- [Choose your project](/docs/cli/projects/)
- [Quick Start](/docs/cli/quickstart/)
