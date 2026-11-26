---
title: MCP server
weight: 60
description: "podstack mcp serve exposes 23 tools. Billable and destructive tools run only when confirm is true."
keywords:
  - podstack mcp serve
  - MCP tools
  - confirm
---

# MCP server

```sh
podstack mcp serve
```

That speaks MCP on stdin and stdout. The server uses `podstack auth login` or `PODSTACK_API_KEY`. It does not read a key from the MCP config.

Streamable HTTP, for a client that cannot use stdio:

```sh
podstack mcp serve --http 127.0.0.1:8787
```

The process listens on `POST /mcp`. Keep that address on localhost.

`initialize` includes the welcome guide in its instructions. `podstack agent welcome` prints the same text.

## The 23 tools

Read-only tools do not need `confirm`. They return catalogue rows, prices, and ids from the API. Do not invent a price if a field is missing.

| Tool | Role |
| --- | --- |
| `list_gpus` | GPU catalogue |
| `list_rates` | Live `price_per_hour` rows. Optional `gpu_type`, `region`, `tier` |
| `list_instances` | Instances. Optional `status` |
| `get_instance` | One instance, including its SSH command. Requires `id` |
| `exec_command` | One command over SSH. Requires `id` and `command`. The instance is already billed while it exists |
| `upload_file` | Copy a local file to the instance over SSH |
| `download_file` | Copy a file from the instance over SSH |
| `list_models` | Hosted models and the rates the API returns |
| `list_jobs` | Jobs. Optional `status` |
| `job_logs` | Log text for one job. Requires `id` |
| `list_functions` | Functions that have run. This tool does not create one |
| `list_endpoints` | Dedicated endpoints |
| `balance` | Wallet. If the route is missing, the tool says so |

These tools spend money or destroy something. The server runs them only when `confirm` is `true`. `dry_run: true` returns the request and does not spend.

| Tool | Required fields besides confirm |
| --- | --- |
| `create_instance` | `gpu_type`, `offering_id`, or `template_id`. Also `gpu_count`, `tier`, `region`, `name`, `ssh_key_ids`, `environment`, `disk_gb` |
| `terminate_instance` | `id`. Deletes the instance and its disk |
| `submit_job` | `name`, `gpu_type`, `script`. Optional `image` (default `pytorch/pytorch:latest`) and `timeout_seconds` (default 3600) |
| `cancel_job` | `id` |
| `create_endpoint` | `name`, `model`, `gpu_type`. Optional `min_replicas`, `max_replicas` |
| `delete_endpoint` | `id` |

`run_inference` and `chat` send a chat completion and spend wallet credits. They take `model` and `prompt`, and an optional `system`. They do not read `confirm`. Ask the user before you call them.

`stop_instance` and `start_instance` are in the tool list and return not available. Terminating is how you stop the per-second charge. Launch a new instance instead of starting a stopped one.

Preview, then spend:

```json
{"name": "create_instance", "arguments": {"gpu_type": "<gpu_type>", "gpu_count": 1, "dry_run": true}}
```

```json
{"name": "create_instance", "arguments": {"gpu_type": "<gpu_type>", "gpu_count": 1, "confirm": true}}
```

Use a `gpu_type` from `list_rates`. Do not pass `confirm: true` until the user has agreed to that spend.
