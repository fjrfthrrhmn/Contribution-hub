# Deployment Pipeline -- Contribution Hub

> Pipeline deployment, environment strategy, dan infrastructure configuration.

---

## Deployment Platform

**Primary: Vercel** (Next.js optimization, edge functions, analytics)

**Secondary: GitHub Pages** (documentation site)

## Pipeline Overview

```
Push ke main branch
    │
    ▼
GitHub Actions: Quality Gates
    ├── TypeScript check (tsc --noEmit)
    ├── ESLint
    ├── Prettier format check
    ├── Unit test (vitest run)
    └── Build check (next build)
    │
    ▼ (semua passing)
Vercel Deployment
    ├── Production: main branch
    ├── Preview: every PR
    └── Development: feature branches
```

## GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: TypeScript check
        run: bun check-types

      - name: Lint
        run: bun lint

      - name: Format check
        run: bun format

      - name: Run tests
        run: bun test:run

      - name: Build
        run: bun build
```

## Environment Strategy

### Environments

| Environment | Domain                           | Deployment Trigger | Database      | Purpose                     |
| ----------- | -------------------------------- | ------------------ | ------------- | --------------------------- |
| Development | localhost:3000                   | Manual `bun dev`   | Local/Seed    | Daily development           |
| Preview     | {pr}.contribution-hub.vercel.app | PR creation        | Preview DB    | Integration testing, review |
| Staging     | staging.contribution-hub.dev     | Push ke develop    | Staging DB    | Pre-production validation   |
| Production  | contribution-hub.dev             | Push ke main       | Production DB | Live                        |

### Environment Variables

```env
# Shared
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SITE_NAME=Contribution Hub

# Database (Production)
DATABASE_URL=
DIRECT_URL=

# Auth
AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GitHub API
GITHUB_ACCESS_TOKEN=

# Analytics
NEXT_PUBLIC_GA_ID=

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=
```

## Database Migration Strategy

```bash
# Generate migration
bun db:generate

# Apply migration
bun db:push        # Development
bun db:migrate     # Production (via CI)

# Seed data
bun db:seed
```

## Monitoring & Observability

### Production Monitoring

| Tool             | Purpose                                |
| ---------------- | -------------------------------------- |
| Vercel Analytics | Page views, web vitals, audience       |
| Sentry           | Error tracking, performance monitoring |
| Cronitor         | Background job monitoring              |
| Uptime Robot     | Uptime monitoring                      |

### Alerts

| Event                  | Channel          | Severity |
| ---------------------- | ---------------- | -------- |
| Build failure          | GitHub + Email   | High     |
| Error rate > 1%        | Sentry + Discord | High     |
| Background job failure | Discord          | Medium   |
| Database connection    | Discord          | Critical |
| Uptime < 99.9%         | PagerDuty        | Critical |

## Rollback Procedure

```bash
# Vercel: Rollback via dashboard
1. Buka Vercel dashboard
2. Pilih deployment yang stabil
3. Klik "Promote to Production"

# Database: Migration rollback
1. Identifikasi migration yang bermasalah
2. bun db:rollback
3. Deploy ulang kode sebelum migration
```

## Domain & DNS

| Record                   | Type  | Value                |
| ------------------------ | ----- | -------------------- |
| contribution-hub.dev     | A     | 76.76.21.21 (Vercel) |
| www.contribution-hub.dev | CNAME | cname.vercel-dns.com |
| api.contribution-hub.dev | CNAME | cname.vercel-dns.com |
| \*.contribution-hub.dev  | CNAME | cname.vercel-dns.com |

## Backup Strategy

- Database: Daily automated backup (RDS / Neon)
- File storage: Not applicable (serverless)
- Source code: GitHub (redundant)

## Related Documents

- [Deployment README](./README.md)
- [Technical Stack](../technical/tech-stack.md)
- [CI Workflow](../../.github/workflows/ci.yml)
