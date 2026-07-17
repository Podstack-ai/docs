---
title: API Tokens

weight: 30
description: "Create PodStack API tokens (psk_ keys) for the podstack CLI and the REST/OpenAI-compatible API. Set an expiry, copy once, use up to 5 tokens, and revoke instantly."
keywords:
  - PodStack API token
  - psk key
  - podstack CLI auth
  - API key GPU cloud
  - programmatic access cloud
---
# API Tokens

API tokens give scripts, CI/CD, the `podstack` CLI, and the REST/OpenAI-compatible
API access to your account without an interactive sign-in.

## What you'll accomplish

Create an API token and use it to authenticate the `podstack` CLI.

## Prerequisites

- A signed-in account.

## Create a token

1. Go to **Settings → Tokens**.
2. Choose **Create**.
3. Enter a **name** and pick an **expiry**: 7, 30, 90, 180, or 365 days, or **never** (default is 30 days).
4. **Copy the token now** — it starts with `psk_` and is shown **only once**.

You can hold up to **5 tokens** at a time.

> _Screenshot: Tokens tab with the create dialog and one-time token reveal._

## Use it with the CLI

```bash
# Interactive: paste the key when prompted (input is hidden)
podstack auth login

# Or via environment variable (overrides the stored key)
export PODSTACK_API_KEY=psk_xxxxxxxxxxxxxxxxxxxx

# Confirm who you are
podstack auth whoami
```

The key is stored at `~/.config/podstack/credentials.json` (mode `0600`,
honoring `XDG_CONFIG_HOME`). The same token authenticates every CLI command —
`code`, `models`, `gpu`, `train`, `send`/`receive`. See the
[CLI Authentication](/docs/cli/authentication/) guide.

## Use it with the API

Send the token as a bearer credential:

```bash
curl https://cloud.podstack.ai/infer/v1/models \
  -H "Authorization: Bearer psk_xxxxxxxxxxxxxxxxxxxx"
```

## Verify it worked

- `podstack auth whoami` prints your user id and email.
- The token appears in **Settings → Tokens** with its name and expiry.

## Revoke a token

Delete a token from **Settings → Tokens** to invalidate it immediately. Any CLI
or script using it will stop working on the next request.

## Troubleshoot

| Problem | Fix |
|---------|-----|
| Lost the token value | You can't re-view it — delete it and create a new one. |
| "Maximum tokens reached" | You can hold 5 tokens; delete an unused one first. |
| CLI says unauthorized | The token may be expired or revoked — create a fresh one. |

## Related

- [CLI Authentication](/docs/cli/authentication/)
- [Settings](/docs/account/settings/)
