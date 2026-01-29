---
title: Error Handling
description: "Handle errors and exceptions in Podstack Python SDK. Learn about error types, retry strategies, and best practices."
keywords:
  - SDK error handling
  - Python exceptions
  - API error handling
  - retry strategies
---

# Error Handling

Handle errors gracefully when using the Podstack SDK.

## Exception Hierarchy

```python
from podstack.exceptions import (
    PodstackError,           # Base exception
    AuthenticationError,     # Invalid/expired token
    PermissionError,         # Access denied
    ResourceNotFoundError,   # Resource doesn't exist
    ValidationError,         # Invalid parameters
    InsufficientBalanceError,# Wallet balance too low
    QuotaExceededError,      # Resource quota exceeded
    RateLimitError,          # Too many requests
    ServerError,             # Server-side error
    NetworkError,            # Connection issues
)
```

## Basic Error Handling

```python
from podstack import Client
from podstack.exceptions import PodstackError

client = Client()

try:
    pod = client.pods.create(
        name="my-pod",
        image="pytorch/pytorch:latest",
        gpu_type="A100"
    )
except PodstackError as e:
    print(f"Error: {e.message}")
    print(f"Code: {e.code}")
```

## Specific Exceptions

### Authentication Errors

```python
from podstack.exceptions import AuthenticationError

try:
    client = Client(api_token="invalid_token")
    pods = client.pods.list()
except AuthenticationError as e:
    print("Invalid or expired API token")
    print("Please generate a new token from the dashboard")
```

### Permission Errors

```python
from podstack.exceptions import PermissionError

try:
    pod = client.pods.get("pod-id")
except PermissionError as e:
    print(f"Access denied: {e.message}")
    print("Check if you have access to this resource")
```

### Resource Not Found

```python
from podstack.exceptions import ResourceNotFoundError

try:
    pod = client.pods.get("nonexistent-pod")
except ResourceNotFoundError as e:
    print(f"Resource not found: {e.resource_type} {e.resource_id}")
```

### Validation Errors

```python
from podstack.exceptions import ValidationError

try:
    pod = client.pods.create(
        name="",  # Invalid: empty name
        image="pytorch/pytorch:latest",
        gpu_type="INVALID_GPU"
    )
except ValidationError as e:
    print(f"Validation failed: {e.message}")
    for field, errors in e.field_errors.items():
        print(f"  {field}: {', '.join(errors)}")
```

### Insufficient Balance

```python
from podstack.exceptions import InsufficientBalanceError

try:
    pod = client.pods.create(
        name="expensive-pod",
        image="pytorch/pytorch:latest",
        gpu_type="H100",
        gpu_count=8
    )
except InsufficientBalanceError as e:
    print(f"Insufficient balance: {e.message}")
    print(f"Required: ${e.required_amount:.2f}")
    print(f"Available: ${e.available_amount:.2f}")
    print("Please top up your wallet")
```

### Quota Exceeded

```python
from podstack.exceptions import QuotaExceededError

try:
    pod = client.pods.create(
        name="another-pod",
        image="pytorch/pytorch:latest",
        gpu_type="A100"
    )
except QuotaExceededError as e:
    print(f"Quota exceeded: {e.message}")
    print(f"Resource: {e.resource_type}")
    print(f"Limit: {e.limit}")
    print(f"Current: {e.current}")
```

### Rate Limiting

```python
from podstack.exceptions import RateLimitError
import time

try:
    for i in range(1000):
        client.pods.list()
except RateLimitError as e:
    print(f"Rate limited: {e.message}")
    print(f"Retry after: {e.retry_after} seconds")
    time.sleep(e.retry_after)
```

### Server Errors

```python
from podstack.exceptions import ServerError

try:
    pod = client.pods.create(...)
except ServerError as e:
    print(f"Server error: {e.message}")
    print(f"Request ID: {e.request_id}")
    print("Please try again later or contact support")
```

### Network Errors

```python
from podstack.exceptions import NetworkError

try:
    pods = client.pods.list()
except NetworkError as e:
    print(f"Network error: {e.message}")
    print("Check your internet connection")
```

## Retry Strategies

### Simple Retry

```python
import time
from podstack.exceptions import ServerError, RateLimitError, NetworkError

def create_pod_with_retry(client, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return client.pods.create(**kwargs)
        except (ServerError, NetworkError) as e:
            if attempt == max_retries - 1:
                raise
            wait_time = 2 ** attempt  # Exponential backoff
            print(f"Attempt {attempt + 1} failed, retrying in {wait_time}s...")
            time.sleep(wait_time)
        except RateLimitError as e:
            time.sleep(e.retry_after)
```

### Using tenacity Library

```python
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type
)
from podstack.exceptions import ServerError, NetworkError

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    retry=retry_if_exception_type((ServerError, NetworkError))
)
def create_pod_reliable(client, **kwargs):
    return client.pods.create(**kwargs)
```

### Built-in Retry

```python
from podstack import Client

# Configure automatic retries
client = Client(
    retry_config={
        "max_retries": 3,
        "backoff_factor": 2,
        "retry_on": ["server_error", "rate_limit", "network_error"]
    }
)
```

## Error Context

All exceptions include context information:

```python
from podstack.exceptions import PodstackError

try:
    pod = client.pods.create(...)
except PodstackError as e:
    print(f"Message: {e.message}")
    print(f"Code: {e.code}")
    print(f"Request ID: {e.request_id}")
    print(f"HTTP Status: {e.status_code}")
    print(f"Details: {e.details}")
```

## Logging Errors

```python
import logging
from podstack import Client
from podstack.exceptions import PodstackError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = Client()

try:
    pod = client.pods.create(...)
except PodstackError as e:
    logger.error(
        "Pod creation failed",
        extra={
            "error_code": e.code,
            "error_message": e.message,
            "request_id": e.request_id
        }
    )
    raise
```

## Best Practices

1. **Catch specific exceptions** before general ones
2. **Log request IDs** for debugging with support
3. **Implement retries** for transient errors
4. **Handle rate limits** gracefully
5. **Check wallet balance** before creating resources
6. **Validate inputs** before API calls

```python
from podstack import Client
from podstack.exceptions import (
    InsufficientBalanceError,
    QuotaExceededError,
    ValidationError,
    PodstackError
)

def safe_create_pod(client, **kwargs):
    # Pre-check balance
    wallet = client.wallet.balance()
    if wallet.balance < 10:  # Minimum recommended
        raise ValueError("Low balance, please top up")

    try:
        return client.pods.create(**kwargs)
    except ValidationError as e:
        print(f"Invalid parameters: {e.field_errors}")
        raise
    except InsufficientBalanceError:
        print("Insufficient funds")
        raise
    except QuotaExceededError:
        print("Resource quota exceeded")
        raise
    except PodstackError as e:
        print(f"API error: {e.message} (Request ID: {e.request_id})")
        raise
```

## Next Steps

- [Quick Start](/docs/sdk/quickstart/) - Get started guide
- [Pods](/docs/sdk/pods/) - Pod management
- [Support](/docs/support/) - Get help
