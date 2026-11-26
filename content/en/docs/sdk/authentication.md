---
title: SDK authentication
weight: 30
description: "The Python client reads PODSTACK_API_KEY, the api_key argument, or the CLI credentials file. The base URL is https://podstack.ai/api/v1."
keywords:
  - PODSTACK_API_KEY
  - Podstack api_key
  - podstack.ai/api/v1
---

# SDK authentication

> Releasing soon: `pip install "podstack>=1.8.0"`

The client sends `Authorization: Bearer` to `https://podstack.ai/api/v1`.

It reads the key in this order:

1. `Podstack(api_key=...)`
2. `PODSTACK_API_KEY`
3. The CLI file `~/.config/podstack/credentials.json` (`XDG_CONFIG_HOME` is honored, and on Windows the file is `%USERPROFILE%\.config\podstack\credentials.json`)

Create the key at [API Keys](https://podstack.ai/app/api-keys). New keys start with `ps_live_`. A legacy `psk_` key is still accepted. Do not print the key. `repr` on the client redacts it.

```bash
export PODSTACK_API_KEY=ps_live_...
```

```python
from podstack import Podstack

with Podstack() as client:
    print(client.gpus.list())
```

Or pass the key only for this process:

```python
from podstack import Podstack

with Podstack(api_key="ps_live_...") as client:
    print(len(client.models.list()))
```

Override the base URL with `base_url=` or `PODSTACK_API_BASE`. The default is `https://podstack.ai/api/v1`. Do not point this client at `api.podstack.ai`.

`podstack auth login` writes the same credentials file, so a machine that is already signed in to the CLI does not need a second copy of the key.
