---
title: Troubleshooting
description: "What to check when a Podstack job stays queued, fails, or shows no logs."
weight: 40
keywords:
  - job troubleshooting
---

# Troubleshooting

**Queued for a long time.** The GPU you picked may be out of stock. Check GPU Cloud for the same type, or submit again with another type from the list.

**Failed immediately.** Open **Logs**. A bad image name or a script that exits non-zero shows up there.

**No output yet.** Logs can be empty until the machine has booted and the script has printed something.

**Cancelled on its own.** The timeout elapsed, or the project ran out of credits. Raise the timeout or [add credits](/docs/billing/wallet/).

**Secret missing in the script.** Reference the secret by the name you stored. Names use letters, numbers, and underscores.
