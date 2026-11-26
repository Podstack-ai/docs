---
title: Clean up what the agent created
weight: 100
description: "List instances, jobs, and endpoints the agent created, then terminate, cancel, and delete only after a separate approval."
keywords:
  - terminate_instance
  - cancel_job
  - delete_endpoint
---

# Clean up what the agent created

Terminate deletes the instance and its disk. Cancel stops a job. Delete removes an endpoint. Each one needs its own approval.

## Prompt to give the agent

```text
List instances, jobs, and endpoints. Show only the ones you created in this session (names agent-example, train-v1, sdk-example). For each, show a dry run of terminate, cancel, or delete. Wait. After I approve the list, send confirm true for each one I named. Do not stop instances. Do not call podstack train or podstack files.
```

## Tool calls

```json
{"name": "list_instances", "arguments": {}}
```

```json
{"name": "list_jobs", "arguments": {}}
```

```json
{"name": "list_endpoints", "arguments": {}}
```

```json
{"name": "list_functions", "arguments": {}}
```

Dry runs:

```json
{"name": "terminate_instance", "arguments": {"id": "<id>", "dry_run": true}}
```

```json
{"name": "cancel_job", "arguments": {"id": "<id>", "dry_run": true}}
```

```json
{"name": "delete_endpoint", "arguments": {"id": "<id>", "dry_run": true}}
```

After you approve each id:

```json
{"name": "terminate_instance", "arguments": {"id": "<id>", "confirm": true}}
```

```json
{"name": "cancel_job", "arguments": {"id": "<id>", "confirm": true}}
```

```json
{"name": "delete_endpoint", "arguments": {"id": "<id>", "confirm": true}}
```

CLI:

```sh
podstack gpu instances list
podstack gpu instances delete <id>
podstack jobs list
podstack jobs cancel <id> --yes
podstack endpoints list
podstack endpoints delete <id> --yes
podstack functions list
```

**requires podstack>=1.8.0 (releasing soon)** to delete a function. The CLI cannot delete one.

```python
device_name.delete(confirm=True)
```

Call that only after you approve the function name. `list_functions` does not delete.

## Expected output

The lists show ids and names. Dry runs do not change status. After confirm, the instance is gone from the running list, the job is `cancelled` or no longer running, and the endpoint is absent. A second `list_instances` is the check.

## Cost safety

One confirm per id. Do not pass `--all` or delete every resource in the project. `stop_instance` is not a cleanup. There is nothing to stop. Skip dataset delete and fine-tune cancel. Those APIs are not available.
