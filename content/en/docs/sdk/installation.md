---
title: Installation
description: "Install the Podstack Python SDK for programmatic GPU cloud management. Supports Python 3.8+ with pip installation."
keywords:
  - Podstack SDK install
  - Python GPU SDK
  - pip install podstack
  - SDK setup
---

# Installation

Install the Podstack Python SDK to programmatically manage your GPU cloud resources.

## Requirements

- Python 3.8 or higher
- pip package manager
- API token from your Podstack account

## Install via pip

```bash
pip install podstack
```

### Install with Optional Dependencies

```bash
# With async support
pip install podstack[async]

# With all extras
pip install podstack[all]
```

## Verify Installation

```python
import podstack
print(podstack.__version__)
```

Or from the command line:

```bash
python -c "import podstack; print(podstack.__version__)"
```

## Virtual Environment (Recommended)

We recommend using a virtual environment to avoid dependency conflicts:

```bash
# Create virtual environment
python -m venv podstack-env

# Activate (Linux/macOS)
source podstack-env/bin/activate

# Activate (Windows)
podstack-env\Scripts\activate

# Install SDK
pip install podstack
```

## Development Installation

For contributing or development:

```bash
git clone https://github.com/podstack/python-sdk.git
cd python-sdk
pip install -e ".[dev]"
```

## Upgrading

```bash
pip install --upgrade podstack
```

## Troubleshooting

### Import Error

If you get an import error, ensure you're using the correct Python environment:

```bash
which python
pip show podstack
```

### SSL Certificate Errors

On some systems, you may need to update certificates:

```bash
pip install --upgrade certifi
```

### Proxy Configuration

For corporate networks with proxy:

```bash
pip install podstack --proxy http://proxy.example.com:8080
```

## Next Steps

- [Authentication](/docs/sdk/authentication/) - Configure API access
- [Quick Start](/docs/sdk/quickstart/) - Create your first pod
