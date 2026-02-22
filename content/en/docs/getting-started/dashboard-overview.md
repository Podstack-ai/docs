---
title: Dashboard Overview
---

# Dashboard Overview

The Podstack dashboard is your central hub for managing cloud resources. This guide explains the main interface components and navigation.

## Main Dashboard

When you log in, the dashboard displays real-time information about your account and resources. The data refreshes automatically every 30 seconds.

### Wallet Summary
- **Current Balance** - Available funds in your wallet (toggle between INR and USD)
- **Held Balance** - Funds temporarily reserved for pending operations
- **Run Rate** - Current hourly spending based on running resources
- **Estimated Hours Remaining** - How long your balance will last at current usage
- **Service Status** - Indicator showing if services are available based on balance

### Run Rate Breakdown

The run rate shows your real-time hourly cost calculated from all active resources:
- **Pods** - GPU and compute costs for running containers
- **Virtual Machines** - VM hourly charges
- **NFS Storage** - Volume storage costs
- **Object Storage** - Bucket storage and transfer costs

Hover over the run rate to see a breakdown by resource type, with daily and monthly projections.

### Expenditure Summary

Track your spending across different time periods:
- **Current Period** - Accrued costs this billing period
- **Weekly Total** - Last 7 days expenditure with percentage change
- **Monthly Total** - Last 30 days expenditure
- **Last Month Comparison** - Month-over-month spending comparison

### Resource Counters

Quick view of your active resources:
- Active Pods/Containers
- Running VMs
- NFS Storage Volumes
- Object Storage Buckets

### Weekly Spending Trends

Interactive chart showing:
- Daily spending over the past 7 days
- Breakdown by resource type (Containers, VMs, NFS, Object Storage)
- Hover for detailed daily costs
- Percentage change vs. previous period

### Resource-Specific Breakdown

Monthly spending split by category:
- **Containers/Pods** - GPU and compute costs
- **Virtual Machines** - VM hourly charges
- **NFS Storage** - Volume storage costs
- **Object Storage** - Bucket storage and transfer costs

### Quick Actions

One-click shortcuts to common tasks:
- **Launch Pod** - Go directly to pod creation
- **Create Storage Bucket** - Create a new object storage bucket
- **Create Volume** - Create a new NFS volume
- **Top Up Wallet** - Add funds to your wallet

### Recent Projects

The dashboard shows your 5 most recent projects with quick navigation links to each project's resources.

### Low Balance Alerts

When your balance is low:
- Yellow indicator for warning threshold
- Red indicator for critical balance
- Estimated time until services may be affected
- Quick link to top up wallet

## Currency Toggle

Switch between INR and USD display across the entire platform:
- Click the currency toggle in the wallet summary or header
- All costs, balances, and rates update to your selected currency
- Exchange rates are tracked in real-time
- Original payment currency is preserved in transaction history

## Navigation Menu

The sidebar provides access to all platform features:

### Compute
- **Pods** - Container deployments with GPU support
- **Virtual Machines** - Full VMs with various OS options
- **GPU Marketplace** - Browse and reserve baremetal GPU instances

### Storage
- **Object Storage** - S3-compatible buckets for files
- **Volumes** - NFS persistent storage

### MLOps (if enabled)
- **Experiment Tracking** - Track ML experiments and runs
- **Model Registry** - Version and manage trained models

### Inference (if enabled)
- **Model Catalog** - Browse inference-ready models
- **Playground** - Test models interactively
- **API Keys** - Manage inference API keys

### Management
- **Projects** - Create and manage projects
- **Templates** - Saved pod and VM configurations
- **SSH Keys** - Manage SSH keys for access

### Billing
- **Wallet** - Balance, top-up, transactions
- **Invoices** - View and pay invoices
- **KYC** - Identity verification for compliance

### Account
- **Settings** - Profile, notifications, and appearance
- **API Tokens** - Tokens for programmatic access
- **Audit Logs** - Activity history

### Advanced Features
- **Serverless GPU** - Reactive notebooks with GPU access
- **AI Studio** - Model fine-tuning and deployment

## Header Bar

The top navigation includes:

- **Project Selector** - Switch between projects (persists across pages)
- **Currency Toggle** - Switch between INR and USD display
- **Theme Toggle** - Switch between light and dark mode
- **Notifications** - View alerts and updates with unread count
- **Account Menu** - Settings, profile, and logout

## Project Context

Most resources are organized within projects. The current project context is shown in the header, and you can switch projects using the project selector dropdown. All API requests automatically include the selected project context via the `X-Project-ID` header. Resource access, billing, and team permissions are tied to the selected project.

## Appearance Settings

Customize your dashboard experience:

### Theme
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Reduced eye strain for extended use
- Toggle via the header icon or in Settings > Appearance

### Compact Mode
- Reduce spacing for more information density
- Enable in Settings > Appearance

### Sidebar
- Collapsible sidebar for more workspace
- Your preference is saved automatically

## Live Chat Support

A Chatwoot chat widget is available on all pages (bottom-right corner) for real-time customer support. Use it to:
- Ask questions about the platform
- Report issues
- Get help with configuration
- Share files and screenshots

## Next Steps

Ready to deploy? Follow the [Quick Start Guide](/docs/getting-started/quick-start/) to launch your first container.
