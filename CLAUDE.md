# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PodStack documentation website built with Hugo static site generator. It's a technical documentation site for PodStack's GPU Cloud Platform.

## Build Commands

```bash
# Development server with hot reload
hugo server

# Production build (minified, fingerprinted)
hugo --minify --environment production

# Clean build
hugo clean && hugo --minify
```

## Architecture

### Three-Column Layout
- **Left sidebar** (280px): Recursive navigation from `data/en/docs/sidebar.yml`
- **Center**: Main content with breadcrumbs and prev/next navigation
- **Right sidebar** (250px, desktop only): Table of contents

### Key Directories
- `content/en/docs/` - Markdown documentation with TOML frontmatter (`+++` delimiters)
- `layouts/` - Hugo templates; `partials/sidebar-item.html` handles recursive navigation
- `assets/css/` - Modular CSS with CSS custom properties for theming
- `assets/js/` - Vanilla JS modules using IIFE pattern
- `data/en/docs/sidebar.yml` - Navigation structure (supports unlimited nesting)
- `i18n/en.yaml` - UI translation strings

### URL Structure
Files in `content/en/docs/` map directly to URLs:
- `content/en/docs/installation/overview.md` → `/docs/installation/overview/`
- `_index.md` files create section pages

### Theming
CSS custom properties defined in `assets/css/theme.css`. Light/dark mode controlled via `data-color` attribute on root element, managed by `assets/js/color-preference.js`.

### Search
JSON index auto-generated from `layouts/_default/index.json` template. Search requires minimum 2 characters.

## Adding Content

1. Create `.md` file in appropriate `content/en/docs/` subdirectory
2. Add frontmatter: `+++`, `title`, `date`, `draft = false`, `+++`
3. Update `data/en/docs/sidebar.yml` to include in navigation

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:
- Build on push to development/pre-production/main branches
- Separate deployment jobs per environment
- Production deploys to GitHub Pages
