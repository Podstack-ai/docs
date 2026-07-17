---
title: Models
weight: 120
description: "List the models available on Podstack Inference Cloud from the CLI with podstack models list."
keywords:
  - list models CLI
  - podstack models
  - inference models
  - available LLMs
---

# Models — `podstack models`

List the models available to your account on [Podstack Inference Cloud](/docs/inference/) — the same models that power [`podstack code`](/docs/cli/code/).

```sh
podstack models list
```

Pipe it for scripting (JSON when not a terminal):

```sh
podstack models list --output json | jq '.[].id'
```

Use a model id with the coding agent:

```sh
podstack code --model <model-id>
```

## Related

- [Inference](/docs/inference/) — call these models over an OpenAI-compatible API.
- [Coding agent](/docs/cli/code/) — pick the model that drives the agent.
