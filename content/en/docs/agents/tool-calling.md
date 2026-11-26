---
title: OpenAI and Anthropic tool-calling loop
weight: 80
description: "Pass podstack.tools() into an OpenAI-style or Anthropic-style client and execute tools only with confirm after approval. Requires podstack 1.8.0."
keywords:
  - podstack.tools
  - execute_tool
  - confirm
---

# OpenAI and Anthropic tool-calling loop

**requires podstack>=1.8.0 (releasing soon).**

## Prompt to give the agent

```text
Load podstack.tools(). Show me the OpenAI function names and the Anthropic tool names. Run list_gpus. If you want create_instance, call it with dry_run true and stop. Add confirm true only after I approve that exact request. Do not call stop_instance.
```

## SDK code

```python
import json
import podstack
from podstack.tools import execute_tool

schemas = podstack.tools()
openai_tools = schemas["openai"]
anthropic_tools = schemas["anthropic"]
print(json.dumps([item["function"]["name"] for item in openai_tools], indent=2))
print(json.dumps([item["name"] for item in anthropic_tools], indent=2))

BILLABLE = {
    "create_instance", "terminate_instance", "submit_job", "cancel_job",
    "create_endpoint", "delete_endpoint",
}

def run_tool(client, name, arguments, user_approved):
    arguments = dict(arguments)
    if name in BILLABLE and not user_approved:
        arguments["dry_run"] = True
        arguments.pop("confirm", None)
    elif name in BILLABLE and user_approved:
        arguments["confirm"] = True
        arguments.pop("dry_run", None)
    return execute_tool(client, name, arguments)

with podstack.Podstack() as client:
    print(run_tool(client, "list_gpus", {}, user_approved=False))
    gpus = client.gpus.list()
    print(run_tool(
        client, "create_instance",
        {"gpu_type": gpus[0].gpu_type, "gpu_count": 1},
        user_approved=False,
    ).to_dict())
```

Pass `openai_tools` as the `tools` argument on an OpenAI-style chat request. Pass `anthropic_tools` as the `tools` argument on an Anthropic-style chat request. When the model returns a tool name and arguments, call `run_tool` and append the tool result to the next turn.

The loop is:

1. Send the user message plus the schema list.
2. If the model asks for a tool that is not billable, run it and send the result back.
3. If the tool is billable, run it with `user_approved=False`, show the dry run, and stop.
4. On the next user message that approves that dry run, call the same tool with `user_approved=True`.

## Expected output

Both name lists include `list_gpus`, `create_instance`, `submit_job`, `run_inference`, `stop_instance`, and the rest of the 23 tools. `list_gpus` returns catalogue rows. The `create_instance` call returns a dry run, not a running instance.

## Cost safety

`user_approved=True` is the only path that sets `confirm`. `run_inference` spends credits and is not in the billable set above because the MCP tool does not read `confirm`. Ask the user in the prompt before that tool. `stop_instance` returns not available. Leave it unused.
