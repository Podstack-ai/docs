---
title: SDK tool calling
weight: 110
description: "podstack.tools() returns OpenAI and Anthropic tool schemas. Pass confirm true only after the user approves a billable call."
keywords:
  - podstack.tools
  - execute_tool
  - confirm
---

# SDK tool calling

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/).

`podstack.tools()` returns three schema lists: `openai`, `anthropic`, and `mcp`. Names match the [CLI MCP tools](/docs/cli/mcp/). `execute_tool` runs one of them against a `Podstack` client.

```python
import json
import podstack
from podstack.tools import execute_tool

schemas = podstack.tools()
print(json.dumps([item["function"]["name"] for item in schemas["openai"]], indent=2))
print(json.dumps([item["name"] for item in schemas["anthropic"]], indent=2))

with podstack.Podstack() as client:
    gpus = execute_tool(client, "list_gpus", {})
    preview = execute_tool(
        client,
        "create_instance",
        {"gpu_type": gpus[0].gpu_type, "dry_run": True},
    )
    print(preview.to_dict())
```

Pass `schemas["openai"]` as the `tools` argument of an OpenAI-style chat client. Pass `schemas["anthropic"]` as the `tools` argument of an Anthropic-style chat client. When the model returns a tool call, run `execute_tool` and send the result back.

Billable tools still need an explicit confirm. Keep `dry_run: true` until the user approves that exact request, then call again with `confirm: true`.

```python
def run_tool(client, name, arguments, user_approved):
    billable = name in {
        "create_instance", "terminate_instance", "submit_job", "cancel_job",
        "create_endpoint", "delete_endpoint",
    }
    if billable and not user_approved:
        arguments = {**arguments, "dry_run": True}
        arguments.pop("confirm", None)
    elif billable and user_approved:
        arguments = {**arguments, "confirm": True}
        arguments.pop("dry_run", None)
    return execute_tool(client, name, arguments)
```

`stop_instance` and `start_instance` are in the schema list and report that the platform does not keep a stopped machine. Do not replace them with a guessed HTTP call.

Chat through `run_inference` spends wallet credits. Ask the user before that tool call even though the MCP schema does not require `confirm`.
