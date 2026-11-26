---
title: Install the Python SDK
weight: 20
description: "podstack 1.8.0 is releasing soon. PyPI still has 1.7.0, which is the old notebook API."
keywords:
  - pip install podstack
  - podstack 1.8.0
---

# Install the Python SDK

> Releasing soon: `pip install "podstack>=1.8.0"`
>
> PyPI currently has podstack 1.7.0, the old notebook API. That package does not have the client, decorator, or tools on these pages. Wait for 1.8.0, or the install below will not match this documentation.

When 1.8.0 is published:

```bash
python -m pip install "podstack>=1.8.0"
python -c "import podstack; print(podstack.__version__)"
```

Python 3.9 or newer. The only runtime dependency is `httpx`.

The console command `podstack-mcp` and `python -m podstack.mcp` are the same MCP server. They are part of 1.8.0, not of 1.7.0.

Check the version before you run a snippet. If it prints `1.7.0`, stop. That is the notebook API these pages replace.
