---
title: Create an endpoint and call chat
weight: 70
description: "Create a dedicated endpoint after confirm, then send a chat completion and a streaming completion. Streaming requires the Python SDK 1.8.0."
keywords:
  - create_endpoint
  - chat.stream
---

# Create an endpoint and call chat

Creating an endpoint bills you while replicas exist. A chat completion spends wallet credits. Hosted models that you do not deploy are `run_inference` or `podstack infer chat`, and they also spend credits.

## Prompt to give the agent

```text
List models and GPU rates. Preview create_endpoint for model <model-id> on gpu <gpu_type> with min_replicas 0 and max_replicas 1. Wait for my approval before confirm. After it exists, show me the URL. For a one-shot chat, ask me before run_inference. For streaming, use the Python SDK and ask me before confirm=True. Delete the endpoint only after I approve, with confirm true.
```

## Tool calls

```json
{"name": "list_models", "arguments": {}}
```

```json
{"name": "create_endpoint", "arguments": {"name": "agent-example", "model": "<model-id>", "gpu_type": "<gpu_type>", "min_replicas": 0, "max_replicas": 1, "dry_run": true}}
```

After you approve:

```json
{"name": "create_endpoint", "arguments": {"name": "agent-example", "model": "<model-id>", "gpu_type": "<gpu_type>", "min_replicas": 0, "max_replicas": 1, "confirm": true}}
```

```json
{"name": "list_endpoints", "arguments": {}}
```

One-shot chat, after you say the credits are OK. This tool does not read `confirm`:

```json
{"name": "run_inference", "arguments": {"model": "<model-id>", "prompt": "Say hello in one sentence."}}
```

CLI one-shot, which also spends credits:

```sh
podstack infer chat --model <model-id> --prompt "Say hello in one sentence."
```

**requires podstack>=1.8.0 (releasing soon)** for streaming:

```python
stream = client.chat.stream(
    model="<model-id>",
    messages=[{"role": "user", "content": "Say hello in one sentence."}],
    dry_run=True,
)
# after the user approves:
stream = client.chat.stream(
    model="<model-id>",
    messages=[{"role": "user", "content": "Say hello in one sentence."}],
    confirm=True,
)
```

Delete after a second approval:

```json
{"name": "delete_endpoint", "arguments": {"id": "<id>", "confirm": true}}
```

## Expected output

The dry run describes the endpoint and does not return a live URL. After confirm, `list_endpoints` includes a URL and a status. `run_inference` returns a `text` field. Streaming prints chunks until the completion ends. Delete removes that id from `list_endpoints`.

## Cost safety

`create_endpoint` and `delete_endpoint` need `confirm: true` only after you approve. Ask before `run_inference` and before SDK `confirm=True`, because chat spends wallet credits even when the MCP tool has no confirm flag. `min_replicas` 0 lets the endpoint scale to zero. It can still bill while a replica is up.
