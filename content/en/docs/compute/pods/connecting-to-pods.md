---
title: Connecting to Pods
---

# Connecting to Pods

Podstack provides multiple ways to access your running pods: SSH, web terminal, and Jupyter notebooks.

## SSH Access

### Connection Details

Each pod gets a unique subdomain for SSH access:
```
<pod-id>.cloud.podstack.ai
```

Find the exact connection string on the pod detail page.

### Connecting via SSH

Using your terminal:

```bash
ssh root@<pod-subdomain>.cloud.podstack.ai
```

Or with explicit key:
```bash
ssh -i ~/.ssh/your_private_key root@<pod-subdomain>.cloud.podstack.ai
```

### SSH Key Requirements

- Your SSH public key must be added to [SSH Keys](/docs/account/ssh-keys/)
- Select the key when creating the pod
- The key is automatically mounted in the container

### Custom SSH Port

If your pod exposes SSH on a non-standard port:
```bash
ssh -p <port> root@<pod-subdomain>.cloud.podstack.ai
```

## Web Terminal

Access a terminal directly in your browser without SSH configuration.

### Opening Web Terminal

1. Navigate to **Compute > Pods**
2. Find your running pod
3. Click the **Terminal** button
4. A new browser tab opens with the terminal

### Features

- Full terminal emulation
- Copy/paste support
- Works behind firewalls (no SSH port needed)
- No local SSH key required

### Limitations

- Requires active browser session
- May have slight latency compared to SSH
- Single terminal session at a time

## Jupyter Notebook

If you enabled notebook access when creating the pod:

### Accessing Jupyter

1. Go to pod details
2. Click the **Notebook** link
3. Enter the username and password you configured
4. JupyterLab opens in a new tab

### Notebook URL

The notebook URL follows this pattern:
```
https://<pod-subdomain>.cloud.podstack.ai:8888
```

### Pre-installed Features

Most GPU images include:
- JupyterLab interface
- Python kernel with GPU support
- Common ML libraries

### Installing Additional Packages

From a notebook cell:
```python
!pip install package_name
```

Or from the terminal within JupyterLab.

## File Transfer

### Using SCP

Copy files to your pod:
```bash
scp local_file.txt root@<pod-subdomain>.cloud.podstack.ai:/path/to/destination/
```

Copy files from your pod:
```bash
scp root@<pod-subdomain>.cloud.podstack.ai:/path/to/file.txt ./local_destination/
```

Copy directories:
```bash
scp -r local_folder root@<pod-subdomain>.cloud.podstack.ai:/path/to/destination/
```

### Using rsync

For large transfers with resume capability:
```bash
rsync -avz --progress local_folder/ root@<pod-subdomain>.cloud.podstack.ai:/destination/
```

### Using Jupyter Upload

In JupyterLab:
1. Click the upload button in the file browser
2. Select files from your computer
3. Files upload to the current directory

## Port Forwarding

Access services running on your pod locally:

### SSH Tunnel

Forward a remote port to localhost:
```bash
ssh -L 8080:localhost:8080 root@<pod-subdomain>.cloud.podstack.ai
```

Then access `http://localhost:8080` in your browser.

### Common Use Cases

| Service | Command |
|---------|---------|
| TensorBoard | `ssh -L 6006:localhost:6006 root@<pod>` |
| MLflow | `ssh -L 5000:localhost:5000 root@<pod>` |
| Streamlit | `ssh -L 8501:localhost:8501 root@<pod>` |

## Troubleshooting

### Connection Refused

- Verify pod is in **Running** status
- Check that SSH port is exposed
- Ensure your IP isn't blocked

### Permission Denied

- Verify your SSH key is added to the pod
- Check you're using the correct private key
- Ensure key permissions are correct (`chmod 600 ~/.ssh/id_rsa`)

### Host Key Verification Failed

If the pod was recreated:
```bash
ssh-keygen -R <pod-subdomain>.cloud.podstack.ai
```

### Notebook Not Loading

- Verify notebook access was enabled when creating the pod
- Check the pod is running
- Confirm port 8888 is exposed
- Try refreshing or clearing browser cache

## Next Steps

- Learn about [Virtual Machines](/docs/compute/virtual-machines/) for full OS control
- Explore [Storage options](/docs/storage/) for persistent data
