---
title: CLI troubleshooting
weight: 80
description: "Fix a missing podstack binary, a rejected API key, a refused launch, and an agent that cannot see the MCP server."
keywords:
  - podstack doctor
  - CLI troubleshooting
---

# CLI troubleshooting

Run the checks first:

```sh
podstack doctor
podstack --version
podstack auth whoami
```

`doctor` prints a check mark or a cross for the credential, the model list, and the local session database.

## `podstack` is not found

Open a new terminal so PATH is reloaded. On macOS and Linux the binary is `/usr/local/bin/podstack` or `~/.local/bin/podstack`. On Windows it is `%LOCALAPPDATA%\Podstack\bin\podstack.exe`. Install steps are on [Install](/docs/cli/install/).

If `--version` is not `1.2.0` and you need that release:

```sh
podstack upgrade --version v1.2.0
```

## Not authenticated

```text
not authenticated: set PODSTACK_API_KEY or run `podstack auth login`
```

Create a `ps_live_` key at [API Keys](https://podstack.ai/app/api-keys), then `podstack auth login --key ps_live_...`. If `PODSTACK_API_KEY` is set to an old value, it overrides the file. Unset it or replace it.

`auth login` saved the key but verification failed: the key was revoked, or it does not have access to this project. Create a new key and [rotate](/docs/cli/authentication/).

## Refusing to launch without `--yes`

That is the cost check. Run the same command with `--dry-run`, read the JSON, then add `--yes` only if you want the charge.

```sh
podstack gpu instances create --type <gpu_type> --dry-run
```

## SSH fails

`gpu instances ssh` needs a local private key. `gpu keys list` shows `LOCAL KEY`. `yes` means this machine has `~/.ssh/podstack_<name>`. A key created on another machine is not here. Pass `--identity` with the private key path, or create a key on this machine and launch again with `--ssh-key-id`.

`instance has no SSH connection yet` means the machine is still starting. `gpu instances get <id>` until status is running and an SSH line is present.

`Permission denied` with several local keys: pass `--key <name>`.

## Instance stop, logs, train, or files

Those commands print `not available yet` on purpose. [Not available yet](/docs/guides/not-available/) lists the replacements. Terminating is `podstack gpu instances delete <id>`. Job logs are `podstack jobs logs <id>`.

## Agent does not see Podstack

```sh
podstack agent status
podstack agent connect <agent>
```

Restart the agent after connect so it reloads MCP config. `--dry-run` shows the files it would write. `disconnect` restores `<file>.podstack.bak` if a connect edited the wrong file.

The MCP config must not contain the API key. Sign in with `podstack auth login`, then connect again.

## Wallet command says not available

`podstack billing` returns that when this API base has no wallet route. The balance is on [Billing](https://podstack.ai/app/billing).
