---
title: Projects
description: "Organize GPU cloud resources with projects. Team collaboration, role-based access control, and resource isolation for ML teams and organizations."
keywords:
  - GPU cloud team management
  - ML team collaboration
  - cloud resource organization
  - RBAC GPU cloud
  - multi-tenant GPU
  - AI team platform
---

# Projects

Projects are the primary way to organize resources on Podstack. They provide isolation, access control, and a way to collaborate with team members.

## What is a Project?

A project is a logical container that groups related resources together:

- **Pods** (containers)
- **Virtual Machines**
- **Storage buckets and volumes**
- **Templates**
- **Team members and permissions**

## Benefits of Projects

### Resource Organization
Keep related workloads together. For example, create separate projects for:
- Development vs. Production environments
- Different clients or applications
- Research experiments vs. deployed models

### Access Control
Control who can access resources with role-based permissions:
- **Project Admin** - Full control over project resources and members
- **Project User** - Customizable permissions (create, read, update, delete)

### Cost Tracking
View spending and resource usage on a per-project basis in the dashboard.

## In This Section

- **[Creating Projects](/docs/projects/creating-projects/)** - Set up new projects
- **[Team Management](/docs/projects/team-management/)** - Invite members and manage permissions

## Project Limits

Each user can create multiple projects. Resources within a project are isolated from other projects - team members only see resources in projects they have access to.

## Next Steps

Start by [Creating a Project](/docs/projects/creating-projects/) to organize your resources.
