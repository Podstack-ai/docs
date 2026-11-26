---
title: CLI command reference
weight: 40
description: "Every podstack 1.2.0 command and subcommand, with flags and a copy-paste example."
keywords:
  - podstack commands
  - CLI reference
  - podstack gpu
---

# CLI command reference

These commands match podstack 1.2.0. A global flag applies to every command:

```sh
podstack --output json gpu types list
```

`--output` is `json` or `table`. A terminal defaults to a table. A pipe defaults to JSON.

Commands that spend money or delete something refuse to run without `--yes`, unless the page says the command asks in the terminal instead. `--dry-run` prints the request and does not call the API.

Commands that the current API does not implement print `not available yet`. Do not retry them with different flags. See [Not available yet](/docs/guides/not-available/).

## podstack version

Prints the version. No flags.

```sh
podstack version
```

## podstack auth

| Command | Flags | What it does |
| --- | --- | --- |
| `auth login` | `--key`, `--manual` | Store a credential. Browser sign-in by default. |
| `auth logout` | | Delete the credentials file. |
| `auth whoami` | | Print the email and user id. |

```sh
podstack auth login --key ps_live_...
podstack auth whoami
podstack auth logout
```

## podstack gpu

`gpu` with no subcommand prints help.

### gpu types list

No flags. Prints GPU type, VRAM, CPU, RAM, and disk from the catalogue.

```sh
podstack gpu types list
```

### gpu pricing

| Flag | Meaning |
| --- | --- |
| `--gpu-type` | Filter by GPU type |
| `--region` | Filter by region |
| `--tier` | Filter by tier, such as `spot` or `on_demand` |

`PRICE/HR` is `price_per_hour` from the API.

```sh
podstack gpu pricing --tier on_demand
```

### gpu templates

No flags. Lists Deploy template ids from the live catalog.

```sh
podstack gpu templates
```

### gpu environments

No flags. Lists launch environment ids.

```sh
podstack gpu environments
```

### gpu launch

Interactive picker. Needs a terminal. Flags only pre-filter the list: `--gpu-type`, `--region`, `--tier`, `--name`.

```sh
podstack gpu launch --tier on_demand
```

For a script, use `gpu instances create` instead.

### gpu keys

| Command | Flags |
| --- | --- |
| `keys list` | |
| `keys create --name <name>` | `--public-key-file`, `--force` |
| `keys delete <id>` | |

`keys create` generates an ed25519 key in `~/.ssh/podstack_<name>` and registers only the public key. `--public-key-file` registers a key you already have. `--force` overwrites a local key of the same name.

```sh
podstack gpu keys create --name laptop
podstack gpu keys list
podstack gpu keys delete <key-id>
```

### gpu instances list

`--status` filters the list.

```sh
podstack gpu instances list --status running
```

### gpu instances get

```sh
podstack gpu instances get <id>
```

Prints status, GPU, region, the API price, and the SSH command when the instance has one.

### gpu instances create

| Flag | Meaning |
| --- | --- |
| `--type` | GPU type from `gpu types list` |
| `--count` | GPU count. Default 1 |
| `--tier` | Default `on_demand` |
| `--name` | Instance name |
| `--region` | Region |
| `--offering-id` | Offering id from `gpu pricing` |
| `--environment` | Environment id from `gpu environments` |
| `--template` | Deploy template id from `gpu templates` |
| `--disk-gb` | Disk size when the offering allows it |
| `--ssh-key-id` | SSH key id. Repeat the flag for more than one |
| `--max-price` | Refuse if the API rate is above this hourly price |
| `--yes` | Launch the billed instance |
| `--dry-run` | Print the request and do not launch |

One of `--type`, `--offering-id`, or `--template` is required. Without `--yes` the command prints the request and stops.

```sh
podstack gpu instances create --type <gpu_type> --count 1 --tier on_demand --ssh-key-id <key-id> --dry-run
podstack gpu instances create --type <gpu_type> --count 1 --ssh-key-id <key-id> --yes
```

Replace `<gpu_type>` with a type from `podstack gpu pricing`. The instance is billed per second until you terminate it.

### gpu instances delete

Terminates the instance and its disk. Pass an id, or run it with no id in a terminal to pick one and confirm.

```sh
podstack gpu instances delete <id>
```

### gpu instances stop and start

Both print `not available yet`. Stopping does not keep the disk. Terminate with `delete`, or launch a new instance.

```sh
podstack gpu instances stop <id>
podstack gpu instances start <id>
```

### gpu instances ssh

| Flag | Meaning |
| --- | --- |
| `--print` | Print the ssh command instead of running it |
| `--no-banner` | Do not install the Podstack login banner |
| `--key` | Local private key `~/.ssh/podstack_<name>` |
| `--identity` | Path to a private key. Overrides `--key` |

Extra arguments after the id are passed to ssh.

```sh
podstack gpu instances ssh <id> --print
podstack gpu instances ssh <id>
```

### gpu instances exec

Runs one command over the instance SSH connection. There is no logs or exec HTTP API. This uses the local `ssh` binary.

```sh
podstack gpu instances exec <id> -- nvidia-smi
```

### gpu instances logs

Prints `not available yet`. Use `ssh` or `exec` on an instance, or `podstack jobs logs` for a job.

```sh
podstack gpu instances logs <id>
```

### gpu instances cp

One side must be `<id>:<remote-path>`.

| Flag | Meaning |
| --- | --- |
| `--recursive`, `-r` | Copy a directory |
| `--key` | Podstack key name |
| `--identity` | Private key path |

```sh
podstack gpu instances cp ./data.tar <id>:/workspace/
podstack gpu instances cp <id>:/workspace/out.ckpt ./ -r
```

### gpu instances expose

Forwards an instance port to localhost over SSH. Nothing is opened to the internet. Stays up until Ctrl-C.

| Flag | Meaning |
| --- | --- |
| `--local` | Local port. Default is the same as the instance port |
| `--remote-host` | Host on the instance. Default `localhost` |
| `--key`, `--identity` | Private key, same as ssh |

```sh
podstack gpu instances expose <id> 8000 --local 8888
```

## podstack jobs

You pay for the time the job runs.

### jobs gpu-types

No flags. Prints GPU type, VRAM, availability, and `price_per_gpu_hour`.

```sh
podstack jobs gpu-types
```

### jobs list

`--status` is `queued`, `running`, `succeeded`, `failed`, or `cancelled`.

```sh
podstack jobs list --status running
```

### jobs submit

| Flag | Meaning |
| --- | --- |
| `--name` | Required |
| `--gpu-type` | Required. From `jobs gpu-types` |
| `--script` | Required. Shell script or command to run |
| `--image` | Container image. Default `pytorch/pytorch:latest` |
| `--timeout` | Seconds. Default 3600 |
| `--yes` | Submit the billed job |
| `--dry-run` | Print the request and do not submit |

```sh
podstack jobs submit --name train-v1 --gpu-type <gpu_type> --script ./train.py --dry-run
podstack jobs submit --name train-v1 --gpu-type <gpu_type> --script ./train.py --yes
```

### jobs logs

Prints the log text the API returns for that id. Run it again to see newer lines. There is no follow flag.

```sh
podstack jobs logs <id>
```

### jobs cancel

`--yes` is required.

```sh
podstack jobs cancel <id> --yes
```

## podstack endpoints

Dedicated GPUs. `min_replicas` 0 scales to zero. You are billed while replicas exist.

### endpoints list

```sh
podstack endpoints list
```

### endpoints create

| Flag | Meaning |
| --- | --- |
| `--name` | Required |
| `--model` | Required model id |
| `--gpu-type` | Required |
| `--min-replicas` | Default 0 |
| `--max-replicas` | Default 1 |
| `--yes` | Create the billed endpoint |
| `--dry-run` | Print the request and do not create |

```sh
podstack endpoints create --name my-model --model <model-id> --gpu-type <gpu_type> --min-replicas 0 --max-replicas 1 --dry-run
podstack endpoints create --name my-model --model <model-id> --gpu-type <gpu_type> --yes
```

### endpoints delete

`--yes` is required.

```sh
podstack endpoints delete <id> --yes
```

## podstack functions list

Lists functions that have already run. Creating a function is the [Python SDK](/docs/sdk/functions/), not this command.

```sh
podstack functions list
```

## podstack infer chat

Sends one chat completion. This spends wallet credits. There is no streaming flag.

| Flag | Meaning |
| --- | --- |
| `--model` | Model id from `podstack models list` |
| `--prompt` | User message |
| `--system` | Optional system message |

```sh
podstack infer chat --model <model-id> --prompt "Say hello in one sentence."
```

## podstack models list

Lists models the CLI can call, with name, context length, and id.

```sh
podstack models list
```

## podstack account

### account secrets

Project secrets a job can read. Values are write-only. This is not the local agent secret store (`podstack secrets`).

| Command | Flags |
| --- | --- |
| `account secrets list` | |
| `account secrets set` | `--name`, `--description`, `--value-file`, `--yes` |
| `account secrets delete <name>` | `--yes` |

The value is read from `--value-file` or from stdin. It is never printed.

```sh
podstack account secrets set --name HF_TOKEN --value-file ./token.txt --yes
podstack account secrets list
podstack account secrets delete HF_TOKEN --yes
```

### account keys

Prints `not available yet`. Create and revoke keys at [API Keys](https://podstack.ai/app/api-keys).

```sh
podstack account keys
```

### account billing

Same wallet view as `podstack billing`.

```sh
podstack account billing
```

## podstack billing

Prints the balance and currency the API returns. `billing balance` is the same command.

```sh
podstack billing
podstack billing balance
```

If this API base has no wallet route, the command says billing is not available and points you at [Billing](https://podstack.ai/app/billing).

## podstack projects

The chosen project id is sent as `X-Project-ID` and saved in `~/.podstack/config.json`. Override one run with `PODSTACK_PROJECT_ID`.

| Command | Flags |
| --- | --- |
| `projects` | Lists projects. Same as `projects list` |
| `projects list` | |
| `projects use <id-or-name>` | |
| `projects create <name>` | `--description` |

```sh
podstack projects list
podstack projects use my-project
podstack projects create lab --description "experiments"
```

## podstack code

Terminal coding agent. macOS and Linux. It asks before it runs a command or writes a file, unless you opt in below.

| Flag | Meaning |
| --- | --- |
| `--prompt`, `-p` | One prompt, then exit |
| `--model` | Model id. Also `PODSTACK_MODEL` or `model` in `~/.podstack/config.json` |
| `--output-format` | `text` or `json` for a headless run |
| `--quiet` | Hide progress notices |
| `--allow-tools` | Tools to allow without a prompt, comma-separated, or `all` |
| `--dangerously-allow-all` | Allow every tool for this headless run |
| `--yolo` | Start with auto-approve. Deny rules still apply |
| `--resume`, `-r` | Resume a session by id or prefix |
| `--continue`, `-c` | Resume the latest session in this directory |
| `--max-turns` | Cap agent turns |

Headless exit codes: `0` success, `1` error, `3` a tool was denied, `130` interrupted.

```sh
podstack code
podstack code -p "explain this repository" --output-format json
podstack code --continue
```

### code sessions

```sh
podstack code sessions list
podstack code sessions delete <id>
```

## podstack init

Creates `.podstack/PODSTACK.md` and `.podstack/plans/` in the current directory. Existing `PODSTACK.md` is left as it is.

```sh
podstack init
```

## podstack doctor

Checks the credential, model listing, session database, and whether this directory is a git repo. No flags.

```sh
podstack doctor
```

## podstack secrets

Local names in `~/.podstack/secrets.json` for the coding agent. Values are not sent to the model. This is separate from `podstack account secrets`.

```sh
printf '%s' 'value' | podstack secrets set HF_TOKEN
podstack secrets list
podstack secrets rm HF_TOKEN
```

## podstack upgrade

| Flag | Meaning |
| --- | --- |
| `--version` | Install that tag, for example `v1.2.0` |

```sh
podstack upgrade
podstack upgrade --version v1.2.0
```

Set `PODSTACK_DISABLE_UPDATE_CHECK=1` to hide the daily upgrade reminder.

## podstack agent

Documented with examples on [Connect an agent](/docs/cli/agents/).

```sh
podstack agent connect cursor --dry-run
podstack agent status
podstack agent welcome
podstack agent disconnect cursor
```

## podstack mcp serve

Documented on [MCP server](/docs/cli/mcp/).

```sh
podstack mcp serve
podstack mcp serve --http 127.0.0.1:8787
```

## podstack send and receive

Copy a file to another machine that also runs `podstack`. The sender prints a code phrase. The receiver uses that phrase.

| `send` flag | Meaning |
| --- | --- |
| `--text` | Send a message instead of files |
| `--code` | Code phrase of at least 6 characters |
| `--transfers` | Parallel TCP streams. Default 4 |
| `--zip` | Zip directories before sending |
| `--no-compress` | Do not compress |

| `receive` flag | Meaning |
| --- | --- |
| `--out` | Output directory. Default is the current directory |
| `--yes` | Accept the transfer without a prompt |

```sh
podstack send ./model.bin
podstack send --text "training finished"
podstack receive --out ./downloads <code-phrase>
podstack receive --yes <code-phrase>
```

Run the same `podstack receive` again in the same directory to resume an interrupted file.

## podstack train and podstack files

Not available. There is no fine-tune API and no dataset upload. `train` and `train create`, `list`, `get`, `cancel`, `events`, and `models` all say so. `files` and `files upload` say so. Run a training script with `podstack jobs submit`.

```sh
podstack train
podstack files upload ./data.jsonl
```

## podstack sandbox

Not available on the current podstack.ai API. `sandbox`, `sandbox run`, `sandbox list`, `sandbox close`, `sandbox renew`, `sandbox logs`, and `sandbox cost` report that there is no sandbox service. Launch a GPU instance or a Deploy template instead.

`sandbox run` flags, unused while the API reports not available: `--image`, `--port`, `--setup`, `--cpu`, `--mem`, `--gpu`, `--ttl`. `sandbox close` has `--all`. `sandbox renew` has `--ttl`. `sandbox logs` has `--lines`.
