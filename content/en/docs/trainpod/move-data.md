---
title: Move Data
weight: 40
description: "Move datasets and results in and out of a Podstack TrainPod GPU instance — SCP transfers with podstack gpu instances cp, and fast, resumable, relay-based transfers with podstack send and podstack receive."
keywords:
  - upload dataset to GPU
  - download model from GPU
  - scp to GPU instance
  - podstack gpu instances cp
  - podstack send receive
  - transfer large dataset GPU
  - resumable file transfer
  - move data GPU cloud
  - copy files GPU pod
  - parallel file transfer
---

# Move Data

Training needs data in, and produces checkpoints and results you want out. Podstack gives you two mechanisms:

- **`podstack gpu instances cp`** — SCP-based copy directly to/from an instance. Best for straightforward uploads and downloads when you have the instance id.
- **`podstack send` / `podstack receive`** — a fast, **resumable**, relay-based transfer that works between any two machines. Best for very large files, flaky connections, or moving data between your laptop and a box without wiring up SCP.

> **Instance disk is ephemeral.** When you terminate an instance its local disk is wiped. Always pull results off the box before running `podstack gpu instances delete`.

---

## Copy files with `cp` (SCP)

`podstack gpu instances cp <src> <dst>` copies between your machine and an instance. Exactly one of the two paths must be **remote**, written as `<instance-id>:<path>`.

### Upload (local → instance)

```bash
# a single file into /workspace/
podstack gpu instances cp ./data.jsonl gpu-abc123:/workspace/

# a whole directory (recursive)
podstack gpu instances cp ./dataset/ gpu-abc123:/workspace/dataset -r
```

### Download (instance → local)

```bash
# pull a checkpoint back to the current directory
podstack gpu instances cp gpu-abc123:/workspace/out.ckpt ./

# pull a results directory recursively
podstack gpu instances cp gpu-abc123:/workspace/results ./results -r
```

### Flags

| Flag | What it does |
|------|--------------|
| `-r`, `--recursive` | Copy directories recursively |
| `--identity <path>` | Use an explicit private key path |
| `--key <name>` | Use the local private key for a named Podstack key |

`cp` picks your SSH identity the same way `ssh` does (see [SSH access](/docs/trainpod/ssh-access/#choosing-which-private-key-to-use)) and connects as `root`.

> **Only one side may be remote.** Both a local path and a remote path are required; `cp` errors if you give two locals or two remotes.

---

## Big or flaky transfers: `send` / `receive`

For large datasets and results, `podstack send` and `podstack receive` move data over a relay using a short **code phrase**. Transfers are compressed, split across parallel TCP streams, and **resumable** — if a transfer drops, re-run the same command and it continues from where it left off (detected by the partial file's hash).

This is ideal when you want to push a dataset from your laptop and pull it on the instance (or vice versa) without managing SCP paths and keys.

### Send

On the machine that has the files:

```bash
# send a file (a code phrase is generated and printed)
podstack send ./huge-dataset.tar

# send multiple paths
podstack send ./checkpoints/ ./config.yaml

# choose your own code phrase (>= 6 chars)
podstack send --code my-shared-code ./big.zip

# more parallel streams for big files on fast links (default 4)
podstack send --transfers 8 ./huge-dataset.tar

# zip a directory before sending
podstack send --zip ./dataset/

# send a short text message instead of a file
podstack send --text "training finished, model.bin coming next"
```

`send` prints a code phrase. Share it with the receiving side.

### Receive

On the machine that should get the files (for example, inside the instance over SSH), run `receive` with the code:

```bash
podstack receive my-shared-code

# write into a specific directory
podstack receive my-shared-code --out ./downloads

# auto-accept the incoming transfer (no prompt)
podstack receive --yes my-shared-code
```

### Flags

| Command | Flag | What it does |
|---------|------|--------------|
| `send` | `--code <phrase>` | Custom code phrase (≥6 chars; auto-generated if empty) |
| `send` | `--transfers <n>` | Number of parallel TCP streams (default `4`) |
| `send` | `--zip` | Zip directories before sending |
| `send` | `--no-compress` | Disable compression |
| `send` | `--text <string>` | Send text instead of a file |
| `receive` | `--out <dir>` | Output directory (default: current directory) |
| `receive` | `--yes` | Auto-accept the incoming transfer |
| both | `--relay <host[:port]>` | Use a specific relay (overrides the default) |
| both | `--relay-default` | Use the upstream public relay instead of the Podstack one |

**Resuming:** if a `send` or `receive` is interrupted, re-run the exact same command in the same directory. The partial file is detected by hash and the transfer picks up where it left off.

> By default, transfers use the Podstack relay. `--relay-default` switches to the upstream public relay, and `--relay host:port` points at a specific one.

---

## Which should I use?

| Situation | Use |
|-----------|-----|
| Upload a dataset you have locally, you know the instance id | `podstack gpu instances cp` |
| Pull a checkpoint/results directory back | `podstack gpu instances cp ... -r` |
| Very large file, slow or unreliable connection | `podstack send` / `podstack receive` (resumable) |
| Move data between two machines without SCP setup | `podstack send` / `podstack receive` |
| Push a whole directory as one archive | `podstack send --zip` |

---

## Scenario — Move a 50 GB dataset in and results out

```bash
# --- On your laptop: push the dataset via relay (resumable) ---
podstack send --code my-dataset --transfers 8 ./dataset-50gb.tar

# --- On the instance (over SSH): receive it ---
podstack gpu instances ssh gpu-abc123
#   (inside the instance)
podstack receive my-dataset --out /workspace --yes
tar -xf /workspace/dataset-50gb.tar -C /workspace
#   ...run training, producing /workspace/results...
exit

# --- Back on your laptop: pull the results directory back ---
podstack gpu instances cp gpu-abc123:/workspace/results ./results -r

# --- Stop billing ---
podstack gpu instances delete gpu-abc123
```

> To use `podstack send`/`receive` from inside the instance, the CLI must be installed there. See [CLI installation](/docs/cli/installation/), or use `podstack gpu instances cp` from your laptop instead — it needs nothing extra on the box.

## FAQs

**Do transfers cost extra?**
Data movement uses your GPU time while the instance runs, but there's no separate per-GB transfer charge. See [Pricing & billing](/docs/trainpod/pricing-and-billing/).

**Where should I put files on the instance?**
`/workspace` is the conventional working directory in the examples, but any path the `root` user can write to works.

**My upload got interrupted — do I start over?**
No. With `podstack send`/`receive`, re-run the same command and it resumes from the last completed chunk. With `cp`, re-running restarts the file.

**Can I send a directory as a single file?**
Yes — `podstack send --zip ./dir/` zips it first. Otherwise the directory is sent as-is.

**How do I move data between two of my own machines (no instance)?**
`podstack send` on one and `podstack receive <code>` on the other. It's a general machine-to-machine transfer, not limited to GPU instances.

**Is the relay private?**
Transfers use a code phrase that both sides must share. Use a strong custom `--code` for sensitive data, or run against a specific `--relay`.

## Next steps

- [Fine-tuning](/docs/trainpod/fine-tuning/) — hand a dataset to a managed training job instead of managing the box.
- [SSH access](/docs/trainpod/ssh-access/) — connect to the instance.
- [Troubleshooting](/docs/trainpod/troubleshooting/) — transfer and connection fixes.
