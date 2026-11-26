---
title: SDK MCP server
weight: 120
description: "python -m podstack.mcp serves the same Podstack tools on stdio. stop_instance reports that it is not available."
keywords:
  - python -m podstack.mcp
  - podstack-mcp
---

# SDK MCP server

> Releasing soon: `pip install "podstack>=1.8.0"`

1.8.0 includes an MCP server that uses the same tool names as the CLI. It reads `PODSTACK_API_KEY` or the CLI credentials file.

```bash
export PODSTACK_API_KEY=ps_live_...
python -m podstack.mcp
```

`podstack-mcp` is the same entry point. The process speaks MCP on stdin and stdout. Wire that command into the agent yourself, or use [`podstack agent connect`](/docs/cli/agents/), which points agents at the CLI server instead.

A short local check that does not stay running:

```python
import json
import podstack
from podstack.mcp import Server

with podstack.Podstack() as client:
    server = Server(client)
    initialized = server.handle({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}})
    listed = server.handle({"jsonrpc": "2.0", "id": 2, "method": "tools/list"})
    print(json.dumps(initialized, indent=2))
    names = [tool["name"] for tool in listed["result"]["tools"]]
    print(", ".join(names))
    stopped = server.handle({
        "jsonrpc": "2.0",
        "id": 3,
        "method": "tools/call",
        "params": {"name": "stop_instance", "arguments": {"id": "example"}},
    })
    print(json.dumps(stopped, indent=2))
```

`stop_instance` returns a not-available error. That is the expected result. The tool list is the same 23 tools as [`podstack mcp serve`](/docs/cli/mcp/), and the billable ones still need `confirm: true`.
