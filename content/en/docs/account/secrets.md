---
title: Secrets
description: "Store encrypted values on Podstack and pass them to jobs by name."
weight: 40
aliases:
  - /docs/cli/secrets/
keywords:
  - secrets
---

# Secrets

[Secrets](https://podstack.ai/app/secrets) are encrypted values, such as `HF_TOKEN`, that a job can use. The value is not shown again after you save it.

Names start with a letter or underscore and then use letters, numbers, and underscores, 61 characters at most.

Reference secrets by name when you submit a job. On a job that has a command or a script, and on an instance launched with its own entrypoint, each secret is available as an environment variable of that name.

A launch that uses a Deploy template keeps the template's own variables. It does not take an arbitrary env map.

You need a wallet balance above zero to create a function or endpoint, not to store a secret. A jobs-scoped API key can also manage secrets.
