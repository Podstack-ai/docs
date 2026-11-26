---
title: Install the Python SDK
weight: 20
description: "Install podstack 1.8.0 or newer from PyPI with pip install podstack."
keywords:
  - pip install podstack
  - podstack 1.8.0
---

# Install the Python SDK

> `pip install podstack` (>=1.8.0). [podstack 1.8.0 on PyPI](https://pypi.org/project/podstack/1.8.0/).

```bash
pip install podstack
python -c "import podstack; print(podstack.__version__)"
```

Python 3.9 or newer. The only runtime dependency is `httpx`. The printed version is 1.8.0 or newer. If an older copy is already installed, upgrade with `pip install -U podstack`.

The console command `podstack-mcp` and `python -m podstack.mcp` are the same MCP server. Both ship in this package.
