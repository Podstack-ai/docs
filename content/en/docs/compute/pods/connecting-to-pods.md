---
title: Connecting to Pods
---

# Connecting to Pods

Podstack provides multiple ways to access your running pods: SSH, web terminal, Jupyter notebooks, and exposed port URLs.

## SSH Access

### Connection Details

Each pod gets a unique subdomain for SSH access:
```
ssh-<subdomain>.cloud.podstack.ai
```

Find the exact connection string on the pod detail page under the **SSH** section.

### Connecting via SSH

Using your terminal:

```bash
ssh root@ssh-<subdomain>.cloud.podstack.ai
```

Or with an explicit key:
```bash
ssh -i ~/.ssh/your_private_key root@ssh-<subdomain>.cloud.podstack.ai
```

### SSH Key Requirements

- Your SSH public key must be added to [SSH Keys](/docs/account/ssh-keys/)
- Select the key when creating the pod
- The key is automatically mounted in the container

### Custom SSH Port

If your pod exposes SSH on a non-standard port:
```bash
ssh -p <port> root@ssh-<subdomain>.cloud.podstack.ai
```

## Web Terminal

Access a terminal directly in your browser without SSH configuration.

### Opening Web Terminal

1. Navigate to **Compute > Pods**
2. Find your running pod
3. Click the **Terminal** button
4. Terminal opens in a new browser window

### Features

- Full terminal emulation (xterm.js)
- Copy/paste support
- Works behind firewalls (no SSH port needed)
- No local SSH key or client required
- Opens in dedicated window for focused work
- Persistent connection during session
- Auto-reconnects on connection drop

### When to Use Web Terminal vs SSH

| Feature | Web Terminal | SSH |
|---------|------------|-----|
| Setup required | None | SSH key + client |
| Works behind firewalls | Yes | Depends |
| File transfer | No | SCP/rsync |
| Port forwarding | No | Yes |
| Performance | Good | Best |
| Persistent sessions | Browser session | tmux/screen |

## SSH Configuration Helper

The portal provides OS-specific SSH connection instructions:

### Viewing SSH Configuration

1. Go to pod details
2. Click **SSH Config** or the info icon near SSH details
3. A modal shows connection instructions for your OS

### Instructions by OS

**macOS:**
```bash
# Copy the SSH command shown in the modal
ssh root@ssh-<subdomain>.cloud.podstack.ai
```

**Linux:**
```bash
ssh root@ssh-<subdomain>.cloud.podstack.ai
```

**Windows (PowerShell):**
```powershell
ssh root@ssh-<subdomain>.cloud.podstack.ai
```

**Windows (Git Bash):**
```bash
ssh root@ssh-<subdomain>.cloud.podstack.ai
```

**Windows (PuTTY):**
- Host: `ssh-<subdomain>.cloud.podstack.ai`
- Port: 22
- Connection type: SSH
- Load your private key in Connection > SSH > Auth

The modal provides copy-to-clipboard functionality for easy setup, including OpenSSL installation instructions where needed.

## Jupyter Notebook

If you enabled notebook access when creating the pod:

### Accessing Jupyter

1. Go to pod details
2. Click the **Notebook** link
3. Enter the username and password shown in the pod details (auto-generated credentials)
4. JupyterLab opens in a new tab

### Notebook URL

The notebook is accessible via subdomain:
```
https://<subdomain>-8888.cloud.podstack.ai
```

### Auto-Generated Credentials

When notebook access is enabled during pod creation, Podstack auto-generates:
- **Username** - displayed on the pod detail page
- **Password** - displayed on the pod detail page

Copy these from the pod details before connecting.

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

## Exposed Ports and HTTPS URLs

Every exposed port on your pod gets an auto-generated HTTPS URL.

### URL Pattern

```
https://<subdomain>-<port>.cloud.podstack.ai
```

For example, if your pod subdomain is `abc123` and you expose port 8080:
```
https://abc123-8080.cloud.podstack.ai
```

### Common Service URLs

| Service | Port | Example URL |
|---------|------|-------------|
| Jupyter | 8888 | `https://<subdomain>-8888.cloud.podstack.ai` |
| HTTP Server | 8080 | `https://<subdomain>-8080.cloud.podstack.ai` |
| TensorBoard | 6006 | `https://<subdomain>-6006.cloud.podstack.ai` |
| Streamlit | 8501 | `https://<subdomain>-8501.cloud.podstack.ai` |
| MLflow | 5000 | `https://<subdomain>-5000.cloud.podstack.ai` |
| Gradio | 7860 | `https://<subdomain>-7860.cloud.podstack.ai` |

### Managing Exposed Ports

You can add or remove ports dynamically on a running pod:

1. Go to pod details
2. Navigate to the **Exposed Ports** section
3. Click **Add Port** to expose a new port
4. Enter the container port number
5. An HTTPS endpoint is automatically generated

To remove a port, click the delete icon next to it. Port 22 (SSH) has special handling and uses the `ssh-<subdomain>` format.

## File Transfer

### Using SCP

Copy files to your pod:
```bash
scp local_file.txt root@ssh-<subdomain>.cloud.podstack.ai:/path/to/destination/
```

Copy files from your pod:
```bash
scp root@ssh-<subdomain>.cloud.podstack.ai:/path/to/file.txt ./local_destination/
```

Copy directories:
```bash
scp -r local_folder root@ssh-<subdomain>.cloud.podstack.ai:/path/to/destination/
```

### Using rsync

For large transfers with resume capability:
```bash
rsync -avz --progress local_folder/ root@ssh-<subdomain>.cloud.podstack.ai:/destination/
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
ssh -L 8080:localhost:8080 root@ssh-<subdomain>.cloud.podstack.ai
```

Then access `http://localhost:8080` in your browser.

### Common Use Cases

| Service | Command |
|---------|---------|
| TensorBoard | `ssh -L 6006:localhost:6006 root@ssh-<subdomain>.cloud.podstack.ai` |
| MLflow | `ssh -L 5000:localhost:5000 root@ssh-<subdomain>.cloud.podstack.ai` |
| Streamlit | `ssh -L 8501:localhost:8501 root@ssh-<subdomain>.cloud.podstack.ai` |

**Note:** Port forwarding via SSH is an alternative to using the auto-generated HTTPS URLs. Use HTTPS URLs when you want to share access with others, and SSH tunnels when you need local-only access.

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
ssh-keygen -R ssh-<subdomain>.cloud.podstack.ai
```

### Notebook Not Loading

- Verify notebook access was enabled when creating the pod
- Check the pod is running
- Confirm port 8888 is exposed
- Try refreshing or clearing browser cache
- Verify credentials from the pod detail page

### Exposed Port Not Accessible

- Ensure the service inside the container is listening on `0.0.0.0`, not just `localhost`
- Verify the port is added in the Exposed Ports section
- Check the service is actually running inside the container
- Try accessing via the auto-generated HTTPS URL

## Next Steps

- Learn about [Virtual Machines](/docs/compute/virtual-machines/) for full OS control
- Explore [Storage options](/docs/storage/) for persistent data
