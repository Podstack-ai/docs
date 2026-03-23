---
title: Projects
weight: 50
description: "Podstack CLI project management commands. Set up and manage your working environments."
keywords:
  - CLI project management
  - podstack project
  - terminal projects
---

# Projects

Manage Podstack projects using CLI commands. Projects help you organize resources, isolate environments, and manage access.

## Create a Project

You can run this command in interactive mode without flags:

```bash
podstack project create
```

The CLI prompts for project name and description, then can optionally set the new project as your default.

```bash
# Basic creation
podstack project create --name my-project

# With description
podstack project create --name prod-env --desc "Production environment"
```

## List Projects

```bash
# List all your projects
podstack project list

# Output as JSON
podstack project list -o json
```

## Set Default Project Context

Set a specific project as your default. Future commands will use this project automatically if you don't supply a `--project` flag.

```bash
# By name
podstack project use my-project

# By ID
podstack project use 13056913-fe35-461c-ac9f-703fb1338ed2
```

## View Current Project Context

Check which project your CLI is currently scoped to.

```bash
# Check loaded project context
podstack project current

# JSON output
podstack project current -o json
```
