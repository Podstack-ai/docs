---
title: GPUs & Templates
weight: 60
description: "Check GPU availability and view environment templates via the Podstack CLI."
keywords:
  - CLI GPU availability
  - terminal GPU check
  - pod templates
---

# GPUs & Templates

Check real-time GPU availability and view available compute templates before deploying resources.

## Check GPU Availability

Verify which GPUs are currently available in the system alongside cluster usage limits.

```bash
# Check general availability map
podstack gpu availability

# Retrieve as JSON for automation or scripting checks
podstack gpu availability -o json
```

This returns a detailed table summarizing global fleet state:
```text
GPU TYPE   AVAILABLE   TOTAL   USAGE    AVAILABLE MEMORY
A100       12.0        16.0    25.0%    40.00 GB (Yes)
H100       2.0         10.0    80.0%    80.00 GB (Yes)
```

## View Global Templates

List all available project, pod, or VM templates that you can base your resources on.

```bash
# List all templates
podstack templates

# Filter by resource type (e.g. pods or vms)
podstack templates --type pod

# Output as JSON
podstack templates -o json
```
