---
title: CLI skills
weight: 70
description: "The five Podstack skills installed by podstack agent connect. Each one confirms before spending and does not print secrets."
keywords:
  - podstack skills
  - agent connect
---

# Skills

`podstack agent connect` installs five skills. Each one tells the agent to confirm before spending and never to print secrets, API keys, or private keys.

| Skill | When the agent should use it |
| --- | --- |
| `podstack-cost-check` | The user asks what something costs or what the wallet holds. Read `list_rates`, `list_models`, and `balance`. Do not launch or delete anything. |
| `podstack-provision-gpu` | The user wants a machine. Read rates, preview `create_instance` with `dry_run: true`, then launch with `confirm: true` only after the user agrees. |
| `podstack-run-on-gpu` | The user wants a command or a script on a GPU. Use `exec_command` on a running instance, or `submit_job` after a dry run and a confirm. |
| `podstack-inference` | The user wants a hosted model or a dedicated endpoint. Chat spends wallet credits. Creating or deleting an endpoint needs `confirm: true`. |
| `podstack-fine-tune` | The user asks to train or fine-tune. There is no fine-tune API and no dataset upload. Submit the training script as a job after confirm. |

`podstack train` and `podstack files` are the commands that report not available. The fine-tune skill tells the agent not to call them.

Skill files land next to the agent. Paths are on [Connect an agent](/docs/cli/agents/).
