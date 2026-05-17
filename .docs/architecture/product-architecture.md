# Product Architecture -- Contribution Hub

> Bagaimana product direction Contribution Hub memetakan ke arsitektur sistem berbasis FSD.

---

## Domain Model

### Core Entities

```typescript
// Entitas inti dalam domain Contribution Hub
User        — Developer yang menggunakan platform
Activity    — Aktivitas coding (commit, PR, issue, review)
Repository  — Repository GitHub yang dilacak
Streak      — Data streak dan konsistensi
Goal        — Target harian/mingguan pengguna
Summary     — Daily/weekly activity summary
Badge       — Achievement badges
```

### Entity Relationships

```
User (1) ──── (N) Activity
User (1) ──── (N) Repository
User (1) ──── (1) Streak
User (1) ──── (N) Goal
User (1) ──── (N) Summary
User (1) ──── (N) Badge
Repository (1) ──── (N) Activity
```

---

## Feature Modules Mapping (FSD)

Setiap fitur Contribution Hub akan diimplementasikan sebagai FSD module di `src/features/`:

### Fase 1 Features

```
src/features/
├── auth/              # Better Auth integration (GitHub OAuth)
│   ├── api/           # auth API calls
│   ├── components/    # login button, auth guard
│   ├── hooks/         # use-session, use-auth
│   └── types/         # auth types
│
├── activity/          # GitHub Activity Tracking
│   ├── api/           # GitHub sync, activity CRUD
│   ├── components/    # activity timeline, activity card
│   ├── hooks/         # use-activity-feed, use-activity-stats
│   ├── stores/        # activity filter state
│   ├── types/         # activity types
│   └── utils/         # activity deduplication, categorization
│
├── dashboard/         # Personal Dashboard
│   ├── components/    # stats cards, charts, overview
│   ├── hooks/         # use-dashboard-data
│   └── types/         # dashboard types
│
├── habits/            # Developer Habit System
│   ├── api/           # streak API, goal CRUD
│   ├── components/    # streak display, goal tracker, progress bar
│   ├── hooks/         # use-streak, use-goals
│   ├── stores/        # habit config state
│   ├── types/         # streak, goal types
│   └── utils/         # streak calculation algorithm
│
├── documentation/     # Auto-Documentation
│   ├── api/           # summary CRUD, generation trigger
│   ├── components/    # daily summary card, weekly report
│   ├── hooks/         # use-summary, use-weekly-report
│   ├── types/         # summary types
│   └── utils/         # narrative generation, markdown builder
│
└── profile/           # GitHub Profile Enhancer
    ├── api/           # badge generation, profile deploy
    ├── components/    # badge display, profile preview
    ├── hooks/         # use-profile-config
    ├── stores/        # profile config state
    ├── types/         # badge, profile types
    └── utils/         # badge SVG generation

src/components/
├── ui/                # shadcn/ui components (shared)
├── layouts/           # App shell, sidebar, header
├── widgets/           # ActivityCard, StreakBadge, StatsCard
└── providers/         # QueryProvider, AuthProvider, ThemeProvider
```

---

## Data Flow Architecture

### Activity Sync Flow

```
GitHub API
    │ (polling setiap 15 menit)
    ▼
Background Job (api/cron/route.ts)
    │ Fetch events since last_sync
    │
    ▼
Activity Service (src/features/activity/api/)
    │ Deduplication logic
    │ Kategorisasi aktivitas
    │
    ├── Store di database (PostgreSQL)
    │
    ▼
Cache Invalidation
    │ React Query cache di-invalidate
    │
    ▼
UI Update (Real-time via React Query refetch)
```

### Streak Calculation Flow

```
Daily Cron (23:59)
    │
    ▼
Streak Service
    │ Ambil aktivitas hari ini
    │ Validasi qualifying activity
    │ Hitung streak dengan grace period
    │
    ├── Update streak data
    ├── Cek milestone achievement
    └── Generate notification jika streak berubah
```

### Documentation Generation Flow

```
Daily Summary Cron (23:59)
    │
    ▼
Summary Generator
    │ Aggregate aktivitas harian
    │ Parse commit messages
    │ Generate narrative
    │
    ├── Simpan daily summary
    │
    ▼
User Notification (opsional)
    │ Toast / Email digest
```

---

## Shared Layer Dependencies

### Shared Hooks (`src/hooks/`)

| Hook              | Fungsi                 | Feature Consumers   |
| ----------------- | ---------------------- | ------------------- |
| use-debounce      | Debounce value         | activity, dashboard |
| use-media-query   | Responsive breakpoints | dashboard, habits   |
| use-local-storage | Persisted client state | habits, profile     |
| use-interval      | Polling interval       | activity            |

### Shared Utils (`src/utils/`)

| Util             | Fungsi                  | Feature Consumers   |
| ---------------- | ----------------------- | ------------------- |
| format-date      | Date formatting         | Semua feature       |
| cn               | Tailwind class merging  | Semua feature       |
| activity-helpers | Activity categorization | activity, dashboard |
| streak-calc      | Streak algorithm        | habits              |

### Shared Types (`src/types/`)

| Type       | Description             |
| ---------- | ----------------------- |
| Activity   | Base activity type      |
| Repository | Repository type         |
| Streak     | Streak data type        |
| Goal       | Goal configuration type |

---

## State Management Strategy

| State Type           | Tool              | Scope                              |
| -------------------- | ----------------- | ---------------------------------- |
| GitHub Activity Data | React Query       | Server state (cache sync results)  |
| Streak & Goal Data   | React Query       | Server state (read mostly)         |
| Dashboard Stats      | React Query       | Server state (aggregated)          |
| Filter/Sort State    | Zustand           | UI state (activity filters)        |
| Habit Config         | Zustand + persist | Client state (user preferences)    |
| Profile Config       | Zustand + persist | Client state (display preferences) |
| URL State            | Next.js Router    | Page params, search params         |

---

## API Architecture

### External Integrations

| Service      | Integration                | Authentication |
| ------------ | -------------------------- | -------------- |
| GitHub API   | REST API via @octokit/rest | OAuth token    |
| GitHub OAuth | Better Auth plugin         | OAuth flow     |

### Internal API Routes

| Endpoint                 | Method    | Feature       |
| ------------------------ | --------- | ------------- |
| /api/activities          | GET, POST | activity      |
| /api/activities/sync     | POST      | activity      |
| /api/activities/stats    | GET       | dashboard     |
| /api/streaks             | GET       | habits        |
| /api/goals               | GET, PUT  | habits        |
| /api/summaries/daily     | GET, PUT  | documentation |
| /api/summaries/weekly    | GET       | documentation |
| /api/profile/config      | GET, PUT  | profile       |
| /api/profile/badge/:type | GET       | profile       |

---

## Background Jobs

| Job                      | Schedule             | Service                 |
| ------------------------ | -------------------- | ----------------------- |
| GitHub Activity Sync     | Every 15 min         | Vercel Cron / node-cron |
| Daily Streak Update      | 23:59 daily          | node-cron               |
| Daily Summary Generation | 23:59 daily          | node-cron               |
| Weekly Report Generation | Sunday 23:59         | node-cron               |
| Profile README Update    | Daily (configurable) | GitHub Actions          |

---

## Security Considerations

- GitHub OAuth tokens disimpan encrypted
- Tidak menyimpan data repository private secara permanen
- Rate limiting untuk API endpoints
- Data ekspor hanya dengan izin pengguna
- Privacy-first: pengguna bisa delete semua data kapan saja

---

## Related Documents

- [System Overview](./system-overview.md)
- [Folder Structure](./folder-structure.md)
- [Tech Stack](../technical/tech-stack.md)
- [Product Definition](../product/definition.md)
- [ADR-001: Product Pivot](../adr/adr-001-product-pivot-contribution-hub.md)
