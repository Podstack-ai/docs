---
title: Files
weight: 90
description: "Upload dataset files to Podstack for fine-tuning with podstack files upload."
keywords:
  - upload dataset CLI
  - podstack files
  - fine-tune data
  - training file upload
---

# Files — `podstack files`

Upload dataset files that other Podstack features (notably [fine-tuning](/docs/cli/train/)) consume.

## Upload a dataset

```sh
podstack files upload ./data.jsonl --purpose fine-tune
```

The command prints a **file id** (e.g. `file_123`) — pass it to `podstack train create --training-file file_123`.

Run `podstack files upload --help` for accepted purposes and options.

## Related

- [Fine-tuning](/docs/cli/train/) — the main consumer of uploaded files.
- To move arbitrary files between machines (checkpoints, results), use [Send & receive](/docs/cli/send-receive/).
