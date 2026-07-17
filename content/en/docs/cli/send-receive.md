---
title: Send & receive
weight: 110
description: "Move files, directories, or text between machines with resumable, parallel peer-to-peer transfers — podstack send and podstack receive."
keywords:
  - peer to peer file transfer
  - podstack send
  - podstack receive
  - resumable transfer
  - move model checkpoints
---

# Send & receive

Move files, directories, or text between any two machines with a short code phrase. Transfers are peer-to-peer, resumable, and split across parallel streams for speed — handy for shipping datasets, checkpoints, or results to and from a [GPU instance](/docs/cli/gpu/).

## Send

```sh
podstack send ./model.bin                       # send a file (prints a code phrase)
podstack send ./checkpoints/ ./config.yaml      # multiple paths
podstack send --text "training finished"        # send text instead of a file
podstack send --code my-shared-code ./big.zip   # choose the code phrase
podstack send --transfers 8 ./huge-dataset.tar  # more parallel streams
```

Key flags: `--code` (custom phrase, ≥6 chars), `--text` (send text), `--zip` (zip directories first), `--transfers N` (parallel TCP streams, default 4), `--no-compress`.

## Receive

On the other machine, run with the code phrase:

```sh
podstack receive my-shared-code                 # into the current directory
podstack receive my-shared-code --out ./downloads
podstack receive --yes my-shared-code           # auto-accept
```

## Resume & throughput

- **Resume:** if a transfer is interrupted, re-run the same command in the same directory — the partial file is detected by hash and the transfer continues where it left off.
- **Throughput:** bump `--transfers` for large files on fast links.

## Related

- [GPUs](/docs/cli/gpu/) — move data to and from an instance.
