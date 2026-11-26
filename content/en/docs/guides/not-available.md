---
title: Not available yet
weight: 30
description: "Stop and start that keep a disk, instance logs and exec over HTTP, dataset upload, and the fine-tune API are not on the current Podstack API."
keywords:
  - not available yet
  - fine-tune
  - dataset upload
---

# Not available yet

These actions are named in the CLI or the SDK so an agent gets a clear error instead of a guessed success. Do not retry them. Do not invent a URL for them.

| Action | What you get | What to do instead |
| --- | --- | --- |
| Stop an instance and keep its disk | `podstack gpu instances stop` and MCP `stop_instance` say not available | `podstack gpu instances delete <id>`, or SDK `instances.terminate(confirm=True)`. The disk is deleted |
| Start a stopped instance | `podstack gpu instances start` and MCP `start_instance` say not available | `podstack gpu instances create` a new machine |
| Instance logs over HTTP | `podstack gpu instances logs` says not available | `podstack gpu instances ssh` or `exec`. Job logs are `podstack jobs logs` |
| Instance exec over HTTP | The SDK raises `NotAvailableYet` if you expected an HTTP exec API | `instances.exec` and `podstack gpu instances exec` run the local `ssh` binary using the SSH command on the instance |
| Dataset upload | `podstack files` and `podstack files upload` say not available | Put files where the job image can read them, or copy them with `gpu instances cp` after a machine exists |
| Fine-tune API | `podstack train` and its subcommands (`create`, `list`, `get`, `cancel`, `events`, `models`) say not available | Submit the training script with `podstack jobs submit` or `client.jobs.submit` |

Also not on the current API:

- `podstack sandbox` and its subcommands. Launch a GPU instance or a Deploy template.
- `podstack account keys`. Create and revoke keys at [API Keys](https://podstack.ai/app/api-keys).
- Function log streaming, and polling an async function call the API does not store. `logs` on a decorated function raises `NotAvailableYet`.
- Wallet routes on an API base that returns 404. `podstack billing` and `client.wallet.balance()` say not available. The balance is on [Billing](https://podstack.ai/app/billing).

`podstack gpu instances exec` and SDK `instances.exec` do exist. They are SSH, not an HTTP API.
