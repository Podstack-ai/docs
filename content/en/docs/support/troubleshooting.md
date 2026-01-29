---
title: Troubleshooting
---

# Troubleshooting

Solutions to common issues on Podstack.

## Login Issues

### Not Receiving OTP

**Problem**: OTP email not arriving

**Solutions**:
1. Check spam/junk folder
2. Wait 2-3 minutes (email delivery can be delayed)
3. Verify email address is correct
4. Click "Resend OTP" to request a new code
5. Try a different email provider if persistent

### OTP Expired

**Problem**: Code no longer valid

**Solution**: Request a new OTP. Codes expire after 10 minutes.

### Session Expired

**Problem**: Logged out unexpectedly

**Solution**: Log in again. Sessions expire after extended inactivity.

## Pod Issues

### Pod Stuck in Pending

**Problem**: Pod won't start, remains in Pending state

**Possible Causes**:
- Insufficient wallet balance
- Requested GPU not available
- Resource quota exceeded

**Solutions**:
1. Check wallet balance and top up if needed
2. Try a different GPU type
3. Reduce resource requirements
4. Wait and retry (GPUs may become available)

### Pod Stuck in Creating

**Problem**: Pod creation takes too long

**Possible Causes**:
- Large image being pulled
- Network issues
- Resource allocation delay

**Solutions**:
1. Wait longer for large images (can take 10+ minutes)
2. Try with a smaller base image
3. Contact support if exceeds 30 minutes

### Cannot Connect via SSH

**Problem**: SSH connection refused or times out

**Checklist**:
1. Verify pod is in **Running** status
2. Confirm SSH port (22) is exposed
3. Check you're using the correct SSH key
4. Verify the connection address is correct

**Commands to try**:
```bash
# Test with verbose output
ssh -v root@<pod-address>

# Specify key explicitly
ssh -i ~/.ssh/your_key root@<pod-address>
```

### Container Keeps Restarting

**Problem**: Pod restarts repeatedly

**Possible Causes**:
- Application crash
- Out of memory (OOM)
- Init command failing

**Solutions**:
1. Check logs for error messages
2. Increase memory allocation
3. Fix application errors
4. Verify init command is correct

### GPU Not Detected in Pod

**Problem**: `nvidia-smi` fails or shows no GPU

**Solutions**:
1. Verify pod was created with GPU allocation
2. Check image has CUDA support
3. Restart the pod
4. Contact support if GPU was allocated but not visible

## VM Issues

### VM Won't Start

**Problem**: VM stays in Stopped or fails to start

**Solutions**:
1. Check wallet balance
2. Verify no resource conflicts
3. Try stopping then starting again
4. Contact support with VM ID

### Cannot SSH to VM

**Problem**: SSH connection fails

**Checklist**:
1. VM must be in **Running** state
2. Note the correct public IP
3. Use correct SSH key
4. Port 22 must be accessible

**Debug**:
```bash
# Test connectivity
ping <vm-ip>

# Verbose SSH
ssh -v root@<vm-ip>
```

### VM Slow Performance

**Problem**: VM is unresponsive or slow

**Check**:
1. Resource utilization (CPU, memory)
2. Disk space availability
3. Network bandwidth usage
4. GPU memory (if applicable)

**Solutions**:
1. Stop unnecessary processes
2. Increase resource allocation
3. Check for runaway processes

## Storage Issues

### Bucket Creation Failed

**Problem**: Cannot create new bucket

**Solutions**:
1. Check wallet balance
2. Verify bucket name is unique and valid
3. Try a different name (no special characters)
4. Check storage quota

### Upload Failed

**Problem**: File upload doesn't complete

**Solutions**:
1. Check file size limits
2. Verify stable network connection
3. Try smaller files first
4. Use multipart upload for large files
5. Check bucket permissions

### NFS Mount Failed

**Problem**: Cannot mount NFS volume

**Check**:
1. Volume is in Available status
2. Mount path doesn't already exist
3. Network connectivity to NFS server

**Debug**:
```bash
# Test NFS server access
showmount -e <nfs-server>

# Manual mount with verbose
mount -v -t nfs <server>:<path> /mnt/data
```

### Permission Denied on NFS

**Problem**: Cannot read/write files on mounted NFS

**Solutions**:
```bash
# Check permissions
ls -la /mnt/data

# Fix ownership
sudo chown -R $(whoami):$(whoami) /mnt/data
```

## Payment Issues

### Payment Failed

**Problem**: Wallet top-up didn't complete

**Solutions**:
1. Check bank/card for declined transaction
2. Verify payment method has sufficient funds
3. Try a different payment method
4. Check for OTP verification requirements
5. Contact support with transaction reference

### Balance Not Updated

**Problem**: Payment succeeded but wallet shows old balance

**Solutions**:
1. Refresh the page
2. Wait 5 minutes and check again
3. Check transaction history for the credit
4. Contact support with payment receipt

### Resources Suspended

**Problem**: Resources stopped due to insufficient balance

**Solutions**:
1. Top up wallet immediately
2. Resources should resume automatically
3. Manually start resources if needed
4. Set up auto-debit to prevent future issues

## Network Issues

### Cannot Access Exposed Ports

**Problem**: Web service on pod not accessible

**Checklist**:
1. Service is running inside the container
2. Port is exposed in pod configuration
3. Correct port number being used
4. Service bound to 0.0.0.0 not just localhost

**Debug inside pod**:
```bash
# Check service is listening
netstat -tlnp

# Test locally
curl localhost:<port>
```

### Slow Network Performance

**Problem**: Downloads/uploads are slow

**Solutions**:
1. Check your local internet connection
2. Try during off-peak hours
3. Use compression for transfers
4. Use object storage for large files

## Getting More Help

If these solutions don't resolve your issue:

1. **Gather information**:
   - Resource IDs
   - Error messages
   - Screenshots
   - Steps to reproduce

2. **Check audit logs** for related events

3. **Contact support** with detailed information

4. **Include timestamps** when the issue occurred
