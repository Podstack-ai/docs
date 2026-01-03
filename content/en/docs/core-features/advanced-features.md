---
title: Advanced Features
---

## Advanced Features

Explore powerful features to take your application to the next level.

### Plugin System

Extend PodStack with custom plugins:

```javascript
// plugins/my-plugin.js
module.exports = {
  name: 'my-plugin',
  version: '1.0.0',
  install(app, options) {
    app.use((ctx, next) => {
      ctx.custom = options.data
      return next()
    })
  },
}
```

Register plugin in config:

```javascript
// podstack.config.js
module.exports = {
  plugins: [
    {
      plugin: require('./plugins/my-plugin'),
      options: { data: 'custom-value' }
    }
  ],
}
```

### Middleware

Create custom middleware:

```javascript
// middleware/auth.js
module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization?.split(' ')[1]
  
  if (!token) {
    ctx.status = 401
    ctx.body = { error: 'Unauthorized' }
    return
  }
  
  try {
    ctx.user = verifyToken(token)
    await next()
  } catch (err) {
    ctx.status = 403
    ctx.body = { error: 'Invalid token' }
  }
}
```

### Webhooks

Set up webhooks for real-time events:

```javascript
// Register webhook
app.post('/webhooks/user-created', (ctx) => {
  const { userId, email } = ctx.request.body
  
  // Process webhook event
  console.log(`New user created: ${email}`)
  
  ctx.status = 200
  ctx.body = { success: true }
})
```

Trigger webhook:

```javascript
async function triggerWebhook(event, data) {
  const webhooks = await Webhook.find({ event })
  
  for (const webhook of webhooks) {
    await fetch(webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }
}
```

### Caching Strategies

#### Query Caching

```javascript
async function getUser(id) {
  const cacheKey = `user:${id}`
  
  // Check cache first
  let user = await cache.get(cacheKey)
  if (user) return user
  
  // Fetch from database
  user = await User.findById(id)
  
  // Store in cache for 1 hour
  await cache.set(cacheKey, user, 3600)
  
  return user
}
```

#### Cache Invalidation

```javascript
async function updateUser(id, data) {
  // Update database
  const user = await User.update(id, data)
  
  // Invalidate cache
  await cache.delete(`user:${id}`)
  
  return user
}
```

### Background Jobs

Process long-running tasks asynchronously:

```javascript
// Define job
const sendEmailJob = {
  name: 'send-email',
  async handler({ userId, email, subject }) {
    await mailer.send({
      to: email,
      subject: subject,
      template: 'welcome',
    })
  },
}

// Queue job
queue.enqueue('send-email', {
  userId: 123,
  email: 'user@example.com',
  subject: 'Welcome!',
})
```

### Custom Validators

```javascript
// validators/email.js
module.exports = {
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },
  async isUniqueEmail(email) {
    const user = await User.findOne({ email })
    return !user
  },
}
```

Use validators:

```javascript
const validators = require('./validators')

app.post('/api/users', async (ctx) => {
  const { email } = ctx.request.body
  
  if (!validators.isValidEmail(email)) {
    ctx.status = 400
    ctx.body = { error: 'Invalid email' }
    return
  }
  
  if (!await validators.isUniqueEmail(email)) {
    ctx.status = 409
    ctx.body = { error: 'Email already exists' }
    return
  }
  
  // Create user...
})
```

---

**Pro Tip:** Combine these features for powerful, scalable applications! 🚀
