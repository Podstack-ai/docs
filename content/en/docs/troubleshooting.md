---
title: Troubleshooting
slug: troubleshooting
---

## Troubleshooting Guide

Common issues and solutions for PodStack.

### Installation Issues

#### npm install fails

**Problem:** `npm install` command fails with permission errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still failing, use sudo (not recommended)
sudo npm install -g
```

#### Node version mismatch

**Problem:** "Node version x.x.x not supported"

**Solution:**
Use nvm (Node Version Manager) to switch versions:

```bash
nvm list                    # List installed versions
nvm install 16              # Install specific version
nvm use 16                  # Switch to version 16
```

### Runtime Issues

#### Port already in use

**Problem:** Error: "listen EADDRINUSE: address already in use :::3000"

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000              # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>              # macOS/Linux
taskkill /PID <PID> /F     # Windows

# Or use a different port
PORT=3001 npm run dev
```

#### Database connection fails

**Problem:** "Cannot connect to database"

**Solution:**
1. Check if database is running:
```bash
# PostgreSQL
psql -U postgres -d podstack_db

# MySQL
mysql -u root -p podstack_db
```

2. Verify credentials in `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
```

3. Check firewall settings
4. Verify database exists

#### Memory issues

**Problem:** "JavaScript heap out of memory"

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm start

# Or add to .env
NODE_OPTIONS="--max-old-space-size=4096"
```

### Performance Issues

#### Slow API responses

**Checklist:**
- ✅ Check database query performance
- ✅ Enable query caching
- ✅ Add database indexes
- ✅ Check Redis/cache configuration
- ✅ Review server logs

#### High CPU usage

**Checklist:**
- ✅ Check for infinite loops
- ✅ Monitor active connections
- ✅ Review heavy computations
- ✅ Check memory leaks

### Debugging

#### Enable debug logging

```bash
DEBUG=* npm run dev
# Or specific module
DEBUG=podstack:* npm run dev
```

#### Check logs

```bash
# View application logs
tail -f logs/app.log

# Check error logs
tail -f logs/error.log

# Search for errors
grep "ERROR" logs/app.log
```

### Getting Help

If you can't find a solution:

1. **Check documentation** - Review relevant sections
2. **Search issues** - Browse GitHub issues
3. **Community forum** - Ask on our forum
4. **Contact support** - Email support@podstack.com
5. **File a bug report** - Include:
   - Error message
   - Steps to reproduce
   - System information
   - Relevant logs

---

**Still stuck?** Join our [Discord community](#) for real-time help! 💬
