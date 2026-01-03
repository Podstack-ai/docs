---
title: Basic Configuration
---

## Configuration Guide

Learn how to configure PodStack for your specific needs.

### Environment Variables

PodStack uses environment variables for configuration. Create a `.env.local` file in your project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=podstack_db
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password

# API Keys
API_KEY=your_api_key
SECRET_KEY=your_secret_key

# External Services
REDIS_URL=redis://localhost:6379
```

### Configuration File

You can also use `podstack.config.js` for more complex configurations:

```javascript
module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: 'localhost',
  },
  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  cache: {
    type: 'redis',
    url: process.env.REDIS_URL,
    ttl: 3600,
  },
  logging: {
    level: 'info',
    format: 'json',
  },
}
```

### Configuration Options

#### Server Options
- `port` - Server port (default: 3000)
- `host` - Server host (default: localhost)
- `ssl` - Enable SSL/TLS

#### Database Options
- `dialect` - Database type (postgres, mysql, sqlite)
- `pool` - Connection pool settings
- `logging` - Enable SQL logging

#### Cache Options
- `type` - Cache backend (redis, memcached)
- `ttl` - Time to live in seconds
- `keyPrefix` - Prefix for cache keys

### Environment-Specific Configuration

Different configurations for different environments:

```
├── .env.development
├── .env.production
├── .env.test
└── .env.local (ignored by git)
```

---

**Tip:** Always keep sensitive information in `.env.local` or use a secrets manager in production.
