---
title: API Reference
slug: core-features/api-reference
---

## API Reference

Complete API documentation for PodStack.

### Authentication

All API requests require authentication using an API key:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.podstack.com/v1/users
```

### Endpoints

#### Users

**Get all users**
```
GET /api/v1/users
```

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)
- `sort` - Sort field (default: created_at)

Response:
```json
{
  "data": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Get user by ID**
```
GET /api/v1/users/:id
```

**Create user**
```
POST /api/v1/users
```

Request Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secure_password"
}
```

**Update user**
```
PUT /api/v1/users/:id
```

**Delete user**
```
DELETE /api/v1/users/:id
```

#### Projects

**Get all projects**
```
GET /api/v1/projects
```

**Create project**
```
POST /api/v1/projects
```

Request Body:
```json
{
  "name": "My Project",
  "description": "Project description",
  "visibility": "public"
}
```

### Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Rate Limiting

API requests are rate limited:
- 1000 requests per hour for authenticated users
- 100 requests per hour for unauthenticated requests

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1642345200
```

---

**For more help**, visit our [support page](#) or contact support@podstack.com
