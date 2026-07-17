---
title: Secrets
weight: 100
description: "Store secrets locally that the Podstack coding agent can use without ever seeing their values — podstack secrets set/list/rm."
keywords:
  - CLI secrets
  - podstack secrets
  - blind secret injection
  - agent credentials
  - secret redaction
---

# Secrets — `podstack secrets`

Store named secrets **locally** that the [coding agent](/docs/cli/code/) can use without ever seeing their values. Secrets live in `~/.podstack/secrets.json` (mode `0600`) and are never sent to the model.

## How it works

- You store a secret under a name.
- In prompts and files, you reference it as `{{secret:NAME}}`.
- The value is injected only when a tool actually executes, and it's scrubbed from everything sent to the model — redacted output shows `[secret:NAME]` where a value would have appeared.

## Commands

```sh
podstack secrets set OPENAI_API_KEY      # value read from stdin or a hidden prompt
podstack secrets list                    # names only — never values
podstack secrets rm OPENAI_API_KEY       # delete a secret
```

Set from stdin (e.g. from a password manager) without it hitting your shell history:

```sh
printf '%s' "$MY_KEY" | podstack secrets set MY_KEY
```

## Use it in the agent

```
> Call the API at https://api.example.com with header "Authorization: Bearer {{secret:MY_KEY}}"
```

The agent passes `{{secret:MY_KEY}}` through verbatim; the real value is injected only at execution time. Never transform or split a placeholder (no base64/cut/rev) — transformed values can't be redacted.

Inside a session, `/secrets` lists your stored secret names.

## Related

- [Coding agent](/docs/cli/code/) — the consumer of secrets.
