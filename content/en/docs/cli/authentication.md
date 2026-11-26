---
title: CLI authentication
weight: 30
description: "Sign in to the podstack CLI with a ps_live_ key, PODSTACK_API_KEY, or a stored credentials file, then log out or rotate the key."
keywords:
  - podstack auth login
  - PODSTACK_API_KEY
  - ps_live_
---

# CLI authentication

Create a key at [API Keys](https://podstack.ai/app/api-keys). New keys start with `ps_live_`. The same key is used by every `podstack` command and by [`podstack mcp serve`](/docs/cli/mcp/). Do not paste it into an agent config, a shell history you share, or a log.

Access levels are described on [API keys](/docs/account/api-tokens/).

## Sign in and store the key

On a terminal, this opens a browser sign-in and stores the returned credential:

```sh
podstack auth login
```

For a script or a machine without a browser, paste a `ps_live_` key:

```sh
podstack auth login --key ps_live_...
```

`--manual` prompts for the key with hidden input instead of opening a browser. The CLI warns if a pasted key does not start with `ps_live_`.

Check the login:

```sh
podstack auth whoami
```

That prints the email and user id for the key.

## Environment variable

`PODSTACK_API_KEY` overrides the file. Use it in CI. It is not written to disk.

```sh
export PODSTACK_API_KEY=ps_live_...
podstack auth whoami
```

On Windows PowerShell:

```powershell
$env:PODSTACK_API_KEY = "ps_live_..."
podstack auth whoami
```

## Where the key is stored

`podstack auth login` writes `credentials.json` with permissions `0600`.

| OS | Path |
| --- | --- |
| macOS and Linux | `~/.config/podstack/credentials.json` |
| macOS and Linux when `XDG_CONFIG_HOME` is set | `$XDG_CONFIG_HOME/podstack/credentials.json` |
| Windows | `%USERPROFILE%\.config\podstack\credentials.json` |

The file contains `api_key`. The API base defaults to `https://podstack.ai/api/v1`. Override it with `PODSTACK_API_BASE` only when you mean to point at a different Podstack API.

`podstack account keys` does not create or revoke keys. The console is the key manager. That command prints that key management is not available on the public API.

## Log out

```sh
podstack auth logout
```

This deletes the credentials file. It does not revoke the key. A shell that still has `PODSTACK_API_KEY` stays signed in.

## Rotate a key

1. Create a new key at [API Keys](https://podstack.ai/app/api-keys).
2. Store it:

```sh
podstack auth login --key ps_live_...
```

3. Run `podstack auth whoami` and confirm the email.
4. Revoke the old key on the API keys page.
5. Update any CI secret that held the old value. The MCP config does not contain the key, so reconnecting an agent is not required for a rotation.
