---
title: Provision, exec, and terminate
weight: 40
description: "Launch a GPU instance after confirm, run a command over SSH, download the result, and terminate the instance."
keywords:
  - create_instance
  - exec_command
  - terminate_instance
---

# Provision, exec, and terminate

This spends money from the moment the instance exists until terminate. There is no stop that keeps the disk.

## Prompt to give the agent

```text
Using the GPU we picked, preview create_instance with dry_run true. Show me the request and the price_per_hour you already fetched. Wait. After I approve, call create_instance with confirm true, wait until get_instance shows an SSH command, exec nvidia-smi, download /workspace/result.txt if it exists, then preview terminate and wait again. Terminate only after I approve, with confirm true.
```

## Tool calls

Preview:

```json
{"name": "create_instance", "arguments": {"gpu_type": "<gpu_type>", "gpu_count": 1, "tier": "on_demand", "name": "agent-example", "dry_run": true}}
```

After you approve:

```json
{"name": "create_instance", "arguments": {"gpu_type": "<gpu_type>", "gpu_count": 1, "tier": "on_demand", "name": "agent-example", "confirm": true}}
```

```json
{"name": "get_instance", "arguments": {"id": "<id>"}}
```

```json
{"name": "exec_command", "arguments": {"id": "<id>", "command": "nvidia-smi"}}
```

```json
{"name": "download_file", "arguments": {"id": "<id>", "remote_path": "/workspace/result.txt", "local_path": "./result.txt"}}
```

```json
{"name": "terminate_instance", "arguments": {"id": "<id>", "dry_run": true}}
```

After you approve deletion:

```json
{"name": "terminate_instance", "arguments": {"id": "<id>", "confirm": true}}
```

CLI equivalents:

```sh
podstack gpu instances create --type <gpu_type> --count 1 --name agent-example --dry-run
podstack gpu instances create --type <gpu_type> --count 1 --name agent-example --yes
podstack gpu instances get <id>
podstack gpu instances exec <id> -- nvidia-smi
podstack gpu instances cp <id>:/workspace/result.txt ./result.txt
podstack gpu instances delete <id>
```

**requires podstack>=1.8.0** for the same sequence in Python: `instances.create(..., dry_run=True)`, then `confirm=True`, `instances.exec`, `instances.download`, `instances.terminate(..., confirm=True)`.

## Expected output

The dry run is JSON and does not include a new instance id that is running. After confirm, `get_instance` eventually includes an SSH command. `exec_command` returns the `nvidia-smi` text. Terminate returns a delete operation. `list_instances` no longer shows that id as running.

If exec says the SSH command is missing, the instance is still starting. Poll `get_instance`. Do not call `stop_instance`.

## Cost safety

`confirm: true` and `--yes` only after you approve the dry run, and again before terminate. `exec_command` does not take confirm because the instance is already billed. Do not upload credential files.
