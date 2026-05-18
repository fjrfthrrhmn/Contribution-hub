# Engineering Roadmap -- Contribution Hub

> System evolution plan untuk GitHub commit automation platform.
> Dokumen ini bukan sekadar daftar fitur -- melainkan peta evolusi arsitektur, reliability, dan skalabilitas sistem.
> Timeline bersifat indikatif. Prioritas ditentukan oleh bottleneck teknis dan feedback loop pengguna.

---

## Engineering Constraints

Project ini dikerjakan oleh satu orang engineer di waktu luang. Setiap keputusan arsitektur tunduk pada kendala berikut:

- **Budget: $0** -- Tidak ada paid infra. PostgreSQL via Neon free tier, hosting via Vercel Hobby, background jobs via Vercel Cron atau node-cron di instance murah.
- **Time: Limited** -- Setiap fitur harus memberikan maksimum value per unit engineering effort. Tidak ada microservices, message queues, atau infrastruktur yang butuh operasional 24/7.
- **Scope: Laser-focused** -- Hanya satu job: membuat commit ke GitHub dari UI dan melacak aktivitasnya. Semua yang tidak mendukung core loop ini adalah noise.
- **Maintenance: Zero overhead** -- Sistem harus bisa jalan sendiri tanpa monitoring 24/7. Failure harus graceful, recovery harus otomatis.

---

## Product Evolution Stages

Roadmap dibagi menjadi 5 fase evolusi sistem. Setiap fase memiliki fokus arsitektur yang spesifik -- bukan sekadar "nambah fitur".

### Phase 0: Foundation (Selesai)

**Fokus arsitektur:** Build tooling, struktur kode, integrasi dependency.

Keputusan arsitektur yang sudah diambil:

| Layer            | Keputusan                         | Rationale                                         |
| ---------------- | --------------------------------- | ------------------------------------------------- |
| Framework        | Next.js 16 App Router + RSC       | SSR untuk landing, RCC untuk dashboard interaktif |
| Type System      | TypeScript strict + Zod runtime   | Zero tolerance type error, validasi di boundary   |
| Styling          | Tailwind CSS v4 + CSS variables   | Design tokens via CSS, zero runtime               |
| Component UI     | shadcn/ui + Radix primitives      | Accessible by default, headless, customizable     |
| Server State     | TanStack React Query              | Caching, deduplication, optimistic updates        |
| Client State     | Zustand                           | Minimal boilerplate, persist middleware           |
| Auth             | Better Auth + GitHub OAuth plugin | Session management, OTP, plugin ekosistem         |
| Folder Structure | Feature-Sliced Design (FSD)       | Module boundaries, self-contained features        |

**Status:** All foundation decisions are locked. No changes unless there's a critical compatibility issue.

---

### Phase 0.5: UI Scaffolding Layer (Sekarang -- Q3 2026)

**Fokus arsitektur:** UI-first scaffolding — setiap halaman dibangun sebagai pure UI shell tanpa business logic, data fetching, atau integration. Fokus pada layout, navigation, empty states, dan component hierarchy.

**Deskripsi:** Semua halaman dari Information Architecture di-rooting dan dibuat page.tsx-nya menggunakan AppShell dengan breadcrumbs, Typography, dan placeholder content. Tidak ada React Query, Zustand, service calls, GitHub API, atau business logic apapun di fase ini.

#### Pages yang Dibuat

| Grup          | Halaman                                                                                                                            | Prioritas |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Public        | Landing (`/`), Login (`/login`)                                                                                                    | P0        |
| Overview      | Dashboard (`/dashboard`)                                                                                                           | P0        |
| Monitoring    | Activities (`/activities`, `/activities/[activityId]`), Streaks (`/streaks`, `/streaks/insights`)                                  | P1        |
| Configuration | Settings (`/settings/*`: account, notifications, repositories, appearance)                                                         | P1        |
| Management    | Goals (`/goals`, `/goals/[goalId]`), Reports (`/reports`, `/reports/daily/[date]`, `/reports/weekly/[weekId]`, `/reports/journal`) | P2        |
| Output        | Profile (`/profile`, `/profile/preview`, `/profile/badges`)                                                                        | P3        |

#### Component Building Blocks

| Layer      | Komponen                          | Fungsi                               |
| ---------- | --------------------------------- | ------------------------------------ |
| Layout     | AppShell, AppSidebar              | Sidebar + header + content structure |
| Typography | Title, Text                       | Semantic heading dan body text       |
| UI Kit     | Card, Button, Badge, Skeleton     | shadcn/ui primitives                 |
| Widgets    | PageHeader, FilterBar, EmptyState | Pattern komponen reusable            |

#### Exit Criteria

1. Semua route dari IA sitemap sudah memiliki page.tsx
2. Sidebar navigation sudah merefleksikan IA navigation structure
3. Setiap page menggunakan AppShell dengan breadcrumbs yang sesuai
4. Setiap page menampilkan empty state atau placeholder content
5. Zero business logic di semua page — murni UI shell
6. `bun check-types` passing tanpa error

#### Architecture Decisions

| Layer              | Keputusan                                    | Rationale                                        |
| ------------------ | -------------------------------------------- | ------------------------------------------------ |
| Route organization | App Router file-based routing per IA sitemap | Setiap route = folder + page.tsx                 |
| Page composition   | AppShell + inline placeholder content        | Layout reusable, content per-page                |
| Navigation data    | Update AppSidebar dengan IA nav items        | Ganti sample shadcn data dengan navigasi produk  |
| State handling     | Belum ada state management                   | Murni UI shell, state menyusul di Phase 1        |
| Page rendering     | Server Component sebagai default (RSC)       | AppShell adalah client component, page tetap RSC |

**Status:** Fase ini berjalan setelah Phase 0 selesai dan sebelum Phase 1 dimulai. Semua halaman harus siap sebagai UI shell sebelum business logic dan integration ditambahkan.

---

### Phase 1: Core Experience (Sekarang -- Q4 2026)

**Fokus arsitektur:** Core commit loop harus berfungsi end-to-end. Sistem harus bisa:

1. Authentikasi user via GitHub OAuth
2. Binding repository GitHub yang akan di-commit
3. Membuat commit ke repository via GitHub API dari UI
4. Melacak dan menampilkan aktivitas commit

**Exit criteria:** Seorang developer bisa login, pilih repo, tulis pesan commit, dan commit terkirim ke GitHub -- dengan feedback UI yang jelas di setiap langkah.

#### System Breakdown

##### Auth System

```
[OAuth Flow]
  User → GitHub OAuth → Callback → Better Auth session → Token tersimpan
                                                              │
                                                              ▼
[Token Lifecycle]                                         GitHub API
  ┌──────────────┐    ┌──────────────────┐    ┌─────────────────────┐
  │ Access Token  │───▶│ Refresh Strategy │───▶│ Re-auth on 401      │
  │ (short-lived) │    │ (automatic)      │    │ (degraded UX)       │
  └──────────────┘    └──────────────────┘    └─────────────────────┘
```

**Scoping:** Mulai dengan `public_repo` scope saja. Private repo scope adalah opsional Phase 2 -- GitHub OAuth membutuhkan review tambahan untuk scope sensitif.

##### Repository Management System

```
[Discovery]              [Selection]             [Validation]
  ┌──────────┐           ┌────────────┐          ┌──────────────┐
  │ GET /user │──────────▶│ UI multiselect│───────▶│ Verify push  │
  │ /repos   │           │ + search   │          │ access (200) │
  └──────────┘           └────────────┘          └──────────────┘
```

**Keputusan desain:**

- Hanya public repositori di Phase 1. Private membutuhkan scope `repo` yang sensitif.
- Cache daftar repositori (React Query) dengan TTL 5 menit. Jangan fetch setiap render.
- Validasi push access dilakukan sekali saat binding, disimpan di database.

##### Commit Engine System

```
[User Action]            [Service Layer]        [GitHub API]
  ┌──────────┐           ┌──────────────┐       ┌──────────────┐
  │ Form UI  │──────────▶│ CommitService│──────▶│ POST /repos/ │
  │ (message │           │              │       │ :owner/:repo │
  │ + file)  │           │ • Validasi   │       │ /git/commits │
  └──────────┘           │ • Build tree │       └──────────────┘
          │              │ • Author     │               │
          │              │ • Signature  │               ▼
          │              └──────────────┘       ┌──────────────┐
          │                                     │ POST /repos/ │
          └────────────────────────────────────▶│ :owner/:repo │
               (response langsung ke UI)        │ /git/refs   │
                                                └──────────────┘
```

**Keputusan desain kritis:**

- **Gunakan Git Data API (`/git/blobs`, `/git/trees`, `/git/commits`, `/git/refs`)**, bukan Contents API. Ini memberi kontrol penuh atas tree object dan author metadata.
- **Author identity:** Gunakan `{name, email}` dari GitHub profile user. Jangan hardcode.
- **File operations:** Di Phase 1, commit hanya bisa membuat/mengupdate file individual. Delete dan rename menyusul.
- **Message validation:** Minimal 10 karakter. Deteksi pesan spam (hanya whitespace, karakter berulang).
- **Rate limit awareness:** Cek `X-RateLimit-Remaining` header. Jika < 10, blokir commit dan kasih tau user.

##### Activity Tracking System

```
[Read Path]                     [Write Path]
  ┌──────────────┐              ┌──────────────┐
  │ GitHub Events │             │ Internal      │
  │ API (polling) │             │ Activity Log  │
  └──────┬───────┘              └──────┬───────┘
         ▼                            ▼
  ┌──────────────┐              ┌──────────────┐
  │ Sync Service  │             │ Activity      │
  │ • Dedup logic │             │ Timeline UI   │
  │ • Kategorisasi│             │ • Filter      │
  │ • Rate limit  │             │ • Search      │
  └──────────────┘              └──────────────┘
```

**Keputusan desain:**

- **Polling, bukan webhooks.** GitHub Webhooks butuh server public endpoint dan setup per-repo. Polling dengan Vercel Cron (15 menit) cukup untuk MVP.
- **Deduplication key:** `(type, repo, timestamp)` -- commit yang sama tidak tercatat dua kali, bahkan setelah re-sync.
- **Activity kategorisasi:** Commit → "coding", PR review → "review", Issue → "management". Mapping sederhana, bisa diperbaiki nanti.

##### UI Feedback System

```
[State Machine per Page]
  Loading → Empty → Active → Error → Loading (retry/re-fetch)

[Feedback Layer]
  ┌─────────────────────────────────────────────────────┐
  │ 1. Optimistic UI → React Query onMutate            │
  │ 2. Toast (sonner) → success / error / warning       │
  │ 3. Inline validation → form field errors (Zod)      │
  │ 4. Error boundary → fallback per page section       │
  │ 5. Skeleton → ghost loading untuk setiap card       │
  └─────────────────────────────────────────────────────┘
```

**Keputusan desain:**

- Setiap page render harus handle 4 states: loading, empty, error, success.
- Optimistic update untuk commit submit -- UI langsung show success, rollback jika API error.
- Error message harus actionable: "Rate limit exceeded. Coba lagi dalam X menit" bukan "Terjadi kesalahan."

---

### Phase 2: Reliability Layer (Q1 2027)

**Fokus arsitektur:** Sistem harus bisa bertahan terhadap GitHub API failure tanpa data loss atau pengalaman user yang rusak.

#### Failure Mode Analysis

GitHub API memiliki failure mode yang harus di-handle secara eksplisit:

| Failure Mode                  | Dampak                          | Handling Strategy                                          |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------- |
| OAuth token expired           | Semua API request gagal (401)   | Auto-refresh via Better Auth, re-auth prompt jika gagal    |
| Rate limit tercapai           | API block sementara             | Queue commit, retry dengan exponential backoff, UI warning |
| Network timeout               | Request hang atau timeout       | Retry 3x dengan 1s/2s/4s interval, fail gracefully         |
| GitHub API down               | 5xx errors                      | Circuit breaker: stop sync setelah 5 error beruntun        |
| Repository tidak bisa di-push | Push access revoked             | Re-validasi binding, email user, fallback ke read-only     |
| Conflict (409)                | Commit rejected karena conflict | Fetch latest SHA, rebuild tree, retry commit               |
| Validation error (422)        | Invalid commit data             | Log detail untuk debugging, tampilkan error GitHub         |

#### Reliability Patterns

```
[Commit Flow dengan Retry]
  Form Submit
      │
      ▼
  Optimistic UI (commit pending)
      │
      ▼
  ┌──────────────────────────────────┐
  │  Attempt 1: POST /git/commits    │ ← Jika 409 → FETCH latest SHA → RETRY
  │  ├── Success → UI success        │
  │  ├── 401 → refresh token → retry │
  │  ├── 422 → UI validation error   │
  │  ├── 5xx → retry (1s delay)      │
  │  └── Timeout → retry (2s delay)  │
  │                                  │
  │  Attempt 2: retry                 │ ← Jika masih gagal → retry (4s)
  │  Attempt 3: retry                 │ ← Jika masih gagal → UI error
  └──────────────────────────────────┘
```

**Commit Queue:** Jika rate limit tercapai, commit tidak hilang. Masuk ke queue lokal (Zustand persist + IndexedDB) dan auto-retry ketika rate limit reset.

#### Token Lifecycle Management

```
  ┌──────────────┐          ┌──────────────────┐
  │ OAuth Login   │─────────▶│ Better Auth       │
  │ (GitHub)      │          │ Session + Token   │
  └──────────────┘          └────────┬─────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │                               │
                     ▼                               ▼
              ┌──────────────┐              ┌──────────────┐
              │ GitHub API   │              │ Token Refresh │
              │ (octokit)    │◀─────────────│ (auto, silent)│
              └──────────────┘              └──────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ Token Valid?  │
              │ ┌─── Ya ───▶ │ Lanjut request
              │ └─── Tidak ▶ │ Trigger refresh → retry request
              └──────────────┘
```

**Store token encrypted di database (Better Auth handle this). Jangan pernah expose token ke client.**

---

### Phase 3: Optimization (Q2 2027)

**Fokus arsitektur:** UX speed dan efisiensi sistem tanpa mengubah perilaku fungsional.

#### Performance Targets

| Metrik              | Baseline (Phase 1) | Target (Phase 3) |
| ------------------- | ------------------ | ---------------- |
| Commit UI → GitHub  | 2-4 detik          | < 1.5 detik      |
| Dashboard render    | 1-2 detik          | < 500ms          |
| Activity sync delay | 15 menit           | < 5 menit        |
| Cache hit rate      | 0% (no cache)      | > 70%            |

#### Optimization Vectors

1. **React Query cache strategy**
   - Stale time: Dashboard 30s, Activity 60s, Repo list 5 menit
   - Prefetch: Dashboard prefetch activity data
   - Optimistic updates: Commit sukses → langsung update streak + activity list

2. **Bundle size**
   - Dynamic import untuk komponen berat (chart, heatmap)
   - next/dynamic untuk page-level code splitting
   - Tree-shake unused icon imports (lucide-react)

3. **GitHub API optimization**
   - Conditional fetching: Jangan fetch activity jika user belum pernah sync
   - Incremental sync: `since` parameter, bukan full re-sync
   - Batch activity write: Insert banyak row dalam satu transaksi

4. **Server response time**
   - React Query SSR (initialData) untuk dashboard
   - Parallel query execution untuk dashboard (jangan waterfall)
   - Edge functions untuk API routes yang ringan

---

### Phase 4: Scale Readiness (Q3-Q4 2027)

**Fokus arsitektur:** Sistem siap untuk multi-repo, analytics meaningful, dan extensibility tanpa rewrite.

**Ini bukan tentang menambah pengguna sebanyak-banyaknya, melainkan memastikan single-user experience tetap solid ketika sistem dipakai lebih intensif.**

#### Multi-Repository Support

```
[Current: Single repo binding]
  User ───▶ 1 Repo ───▶ Commit ───▶ Activity

[Phase 4: Multi-repo]
  User ───▶ Repo A ───▶ Commit ───▶ Activity (aggregated)
          ├── Repo B ───▶ Commit ───▶ Per-repo timeline
          └── Repo C ───▶ Commit ───▶ Cross-repo stats
```

**Perubahan arsitektur:**

- `repository_id` di setiap aktivitas → query bisa filter per repo atau aggregate semua
- Activity timeline → group by repository atau flat timeline
- Dashboard → overview cross-repo + breakdown per repo
- Commit form → repository selector (dropdown/combobox)

#### Activity Analytics

Bukan sekadar "jumlah commit." Analytics meaningful:

- **Commit velocity:** Rata-rata commit per hari/minggu, tren naik/turun
- **Category distribution:** Coding vs review vs docs vs management
- **Active hours:** Distribusi commit per jam (pagi/siang/malam)
- **Repository diversity:** Berapa banyak repo aktif dalam sebulan
- **Meaningful score:** Rasio commit dengan pesan deskriptif vs tidak

#### Extensibility Hooks

Tanpa over-engineering di Phase 1-3, kita siapkan extension points:

```
[Commit Engine]
  beforeCommit(ctx) → validate message, enrich metadata
  afterCommit(ctx) → update streak, notify UI, log activity
  onError(ctx) → classify error, retry strategy, user notification

[Sync Engine]
  beforeSync(ctx) → check rate limit, last sync timestamp
  onActivity(ctx) → categorize, deduplicate, store
  onSyncComplete(ctx) → invalidate cache, notify UI
```

Hook ini bisa diisi oleh internal system (streak, notification) dan kelak oleh plugin eksternal.

---

## Feature Breakdown by System

Feature tidak dikelompokkan per "fase" melainkan per system. Satu system bisa dimulai di Phase 1 dan matang di Phase 4.

### Auth System

| Capability                         | Phase | Notes                              |
| ---------------------------------- | ----- | ---------------------------------- |
| GitHub OAuth login (public_repo)   | 1     | Better Auth plugin, callback route |
| Session management + refresh token | 1     | Better Auth built-in               |
| Token encryption di database       | 1     | Better Auth handle ini             |
| Private repo scope (`repo`)        | 2     | Butuh GitHub OAuth review tambahan |
| Re-auth flow on token death        | 2     | Degraded UX: redirect ke GitHub    |
| Session expiry warning             | 2     | Toast 5 menit sebelum expiry       |

### Repository Management System

| Capability                       | Phase | Notes                                |
| -------------------------------- | ----- | ------------------------------------ |
| Fetch user repos dari GitHub API | 1     | GET /user/reports with cache         |
| Single repo binding + validation | 1     | Verify push access before persist    |
| Repo search + filter UI          | 1     | Client-side filter dari cached list  |
| Multi-repo binding               | 4     | Allowlist beberapa repo sekaligus    |
| Repo sync status indicator       | 4     | Tampilkan last sync per repo         |
| Repo exclusion list              | 4     | User bisa exclude repo dari tracking |

### Commit Engine System (Core)

| Capability                          | Phase | Notes                                     |
| ----------------------------------- | ----- | ----------------------------------------- |
| Commit via Git Data API (blob/tree) | 1     | Buat object tree, commit, update ref      |
| File create + update                | 1     | Single file operation                     |
| Commit message validation           | 1     | Zod schema: min 10 chars, no spam pattern |
| Author identity dari GitHub profile | 1     | `{name, email}` dari GitHub user          |
| Optimistic UI + rollback            | 1     | Zustand + React Query optimistic update   |
| Commit queue + auto-retry           | 2     | IndexedDB queue, retry dengan backoff     |
| Exponential backoff on failure      | 2     | 1s → 2s → 4s → UI error                   |
| File delete operation               | 3     | Delete blob dari tree                     |
| File rename operation               | 3     | Delete + create dalam satu commit         |
| Multi-file commit                   | 3     | Modify multiple files dalam satu commit   |
| Commit template (custom message)    | 3     | User bisa set template prefix             |
| Branch selection                    | 3     | Pilih branch, validasi exist              |
| Commit history preview in form      | 4     | Lihat recent commits sebelum commit baru  |

### Activity Tracking System

| Capability                         | Phase | Notes                                     |
| ---------------------------------- | ----- | ----------------------------------------- |
| Polling GitHub Events API          | 1     | Vercel Cron setiap 15 menit               |
| Deduplication by (type, timestamp) | 1     | Cegah duplikat dari re-sync               |
| Activity log timeline              | 1     | Infinite scroll, kronologis               |
| Activity categorization            | 1     | Commit → coding, PR → collaboration, etc. |
| Filter by type, repo, date         | 2     | Query params di URL                       |
| Search within activity             | 2     | Client-side search dari cached data       |
| Incremental sync (since param)     | 2     | Hanya fetch event baru, bukan full resync |
| Activity stats aggregation         | 3     | Commits/day, active days/week             |
| Manual activity entry              | 3     | User bisa catat aktivitas manual          |
| Real-time sync (webhooks)          | 4     | Optional webhook endpoint                 |
| Activity export (JSON/MD)          | 4     | Download activity log                     |

### UI Feedback System

| Capability                                      | Phase | Notes                                            |
| ----------------------------------------------- | ----- | ------------------------------------------------ |
| 4-state rendering (loading/empty/error/success) | 1     | Setiap page harus handle semua state             |
| Skeleton loading untuk semua card               | 1     | Ghost loading, jangan spinner                    |
| Toast notification (sonner)                     | 1     | Commit success/error, sync status                |
| Inline form validation (Zod)                    | 1     | Field-level error dengan FormMessage             |
| Optimistic commit UI                            | 1     | Langsung tampil di timeline, rollback jika gagal |
| Error boundary per page section                 | 2     | Isolate error, jangan collapse halaman           |
| Rate limit warning banner                       | 2     | Banner sticky ketika rate limit mendekati        |
| Keyboard shortcut (Cmd+Enter)                   | 2     | Submit form dengan keyboard                      |
| Offline detection + queue indicator             | 3     | Indikator offline, commit masuk queue            |
| Undo commit (within 5 detik)                    | 4     | Revert commit via GitHub API                     |

---

## Engineering Roadmap

### Frontend Architecture Milestones

| Milestone             | Phase | Deskripsi                                          |
| --------------------- | ----- | -------------------------------------------------- |
| Basic page structure  | 1     | Login, Dashboard, Commit form, Activity list       |
| Component composition | 1     | Layout system (AppShell), form pattern (Field)     |
| State management flow | 1     | React Query + Zustand, optimistic updates          |
| Error boundary tree   | 2     | Per-section boundary, jangan cascading error       |
| Route transitions     | 2     | Loading state antar route, jangan flash of loading |
| Performance audit     | 3     | Bundle analysis, Core Web Vitals, Lighthouse       |
| Component testing     | 3     | Vitest + Testing Library untuk kritis komponen     |
| E2E commit flow       | 3     | Playwright: login → pilih repo → commit → verify   |

### Backend / API Flow

```
[Request Path]
  Browser
    │ (Next.js App Router)
    ▼
  Server Action / API Route
    │ Zon validation
    ▼
  Service Layer (CommitService, ActivityService)
    │ Business logic, error classification
    ▼
  GitHub API (via @octokit/rest)
    │ OAuth token dari session
    ▼
  Response
    │ Parsing + error handling
    ▼
  Browser (via React Query cache update)
```

**Service abstraction layers:**

```
src/features/commit/
├── api/                     # Network calls ke GitHub API
│   ├── create-blob.ts       # POST /git/blobs
│   ├── create-tree.ts       # POST /git/trees
│   ├── create-commit.ts     # POST /git/commits
│   ├── update-ref.ts        # POST /git/refs
│   └── get-latest-sha.ts    # GET /git/ref/heads/{branch}
│
├── services/                # Business logic, orchestrasi multi-step
│   ├── commit-service.ts    # Orchestrasi: blob → tree → commit → ref
│   └── commit-validator.ts  # Validasi message, file path, branch
│
├── components/              # UI komponen commit form
│   ├── commit-form.tsx      # Form utama
│   ├── file-picker.tsx      # Pilih file untuk commit
│   └── commit-status.tsx    # Status bar progress commit
│
├── hooks/                   # React hooks
│   ├── use-commit.ts        # useMutation wrapper
│   └── use-commit-queue.ts  # Queue handling ketika offline
│
└── types/                   # Type definitions
    ├── commit-types.ts
    └── git-object-types.ts
```

### Data Flow: Complete Request/Response Cycle

```
[User writes commit message + selects file]
    │
    ▼
1. Form submit → Zod validation (client)
    │ └── Error → Inline validation message
    │
    ▼
2. React Query mutation (useCommit)
    │ └── Optimistic update: tampilkan di timeline sebagai "pending"
    │
    ▼
3. Server Action call
    │ └── Zod validation (server) -- double validation, defense in depth
    │
    ▼
4. CommitService.execute()
    │
    ├── 4a. GET latest SHA dari branch target
    │       └── Error → 404 (branch not found) → UI error
    │
    ├── 4b. POST /git/blobs (buat blob dari konten file)
    │       └── Error → 422 → validasi konten file
    │
    ├── 4c. POST /git/trees (buat tree dari base tree + new blob)
    │       └── Error → 409 → fetch latest tree → retry
    │
    ├── 4d. POST /git/commits (buat commit object)
    │       └── Error → validasi author/committer identity
    │
    ├── 4e. POST /git/refs (update branch reference)
    │       └── Error → 409 (non-fast-forward) → fetch latest → retry
    │
    ▼
5. Response → React Query cache update
    │
    ├── Success → Timeline update, toast success, streak check
    │
    └── Error → Rollback optimistic update, toast error dengan detail
```

### Failure Handling Strategy

```
[Error Taxonomy]
  ┌─────────────────────────────────────────┐
  │  Client Error (4xx)                     │
  │  ├── 401 → Token expired → refresh      │
  │  ├── 403 → No access → warn user        │
  │  ├── 404 → Not found → check URL        │
  │  ├── 409 → Conflict → retry tree        │
  │  ├── 422 → Validation → tampilkan detail│
  │  └── 429 → Rate limit → queue + backoff │
  │                                         │
  │  Server Error (5xx)                     │
  │  ├── 500 → Internal error → retry       │
  │  ├── 502 → Bad gateway → retry          │
  │  └── 503 → Service unavailable → retry  │
  │                                         │
  │  Network Error                          │
  │  ├── Timeout → retry with backoff       │
  │  └── Offline → queue + sync later       │
  └─────────────────────────────────────────┘
```

---

## System Design Thinking

### Why Architecture Is Structured This Way

**Service abstraction layer (CommitService, ActivityService) dipisahkan dari API calls** karena:

1. **Testability** -- Kita bisa mock GitHub API response dan test business logic secara independen
2. **Resilience** -- Error handling dan retry logic terpusat di service, bukan tersebar di komponen
3. **Evolvability** -- Migrasi dari REST API octokit ke GraphQL atau tools lain hanya perlu ganti satu layer

**Git Data API dipilih dibanding Contents API** karena memberikan kontrol atas tree object. Contents API hanya bisa create/update satu file per request tanpa kontrol author metadata. Git Data API memungkinkan multi-file commit (Phase 3) tanpa perubahan arsitektur.

### Trade-off Decisions

| Decision                     | Simplicity Cost                    | Extensibility Gain                              |
| ---------------------------- | ---------------------------------- | ----------------------------------------------- |
| Polling vs Webhooks          | Delay 15 menit, extra API calls    | Zero infra, no webhook setup per repo           |
| Git Data API vs Contents API | More API calls (4 vs 1 per commit) | Kontrol penuh atas tree, multi-file support     |
| Octokit vs fetch             | Extra dependency (20KB)            | Pagination, retry, auth middleware built-in     |
| Single repo vs Multi-repo    | User terbatas 1 repo               | Arsitektur simpler, migrasi ke multi-repo jelas |
| React Query vs Zustand       | Strict reactivity model            | Built-in caching, deduplication, refetch        |
| Better Auth vs Custom auth   | Dependency on third-party auth     | Session management, OTP, plugin ekosistem       |

### Assumption Boundaries

Asumsi berikut harus divalidasi sebelum Phase 4:

1. **Single-repo cukup untuk validasi product-market fit.** Jika user demand menunjukkan multi-repo adalah kebutuhan primer, prioritaskan lebih awal.
2. **Polling 15 menit acceptable untuk MVP.** Jika user komplain tentang delay, turunkan ke 5 menit (Vercel Cron Hobby: 1 menit minimum).
3. **GitHub API rate limit cukup.** Free tier: 5000 requests/jam. Jika dengan polling + commit aktif mencapai > 1000/jam, perlu optimization.
4. **Browser storage untuk pending commit cukup.** IndexedDB bisa simpan ratusan KB. Jika commit queue > 50 item, perlu reconsider strategy.
5. **Single author binding.** Commit selalu sebagai user yang login. Tidak ada impersonation atau org-level commit di MVP.

### What We Deliberately Don't Build (Phase 1-3)

- **Webhook receiver** -- Butuh server public endpoint, setup per repo, auth verification. Tidak sebanding untuk MVP.
- **Multi-user / team** -- Session management untuk tim butuh org-level OAuth, invite system, permission model. Skip.
- **Real-time collaboration** -- WebSocket atau SSE untuk aktivitas real-time. Polling cukup.
- **CLI tool** -- Produk terpisah. Fokus di web UI dulu.
- **Public API** -- Butuh API key management, rate limiting per key, documentation. Skip sampai Phase 4.
- **Mobile app** -- Native app atau React Native. Web mobile responsive cukup.

---

## What's Next (Engineering-Oriented)

### Immediate bottleneck: Auth + Commit Engine integration

Sebelum menulis komponen UI yang indah, pastikan **auth flow** dan **commit engine** sudah berfungsi end-to-end:

1. **Set up Better Auth + GitHub OAuth plugin**
   - Register GitHub OAuth App (dev environment)
   - Implement callback route
   - Test token lifecycle: login → token → refresh → re-auth

2. **Implement CommitService skeleton**
   - Buat service yang bisa membuat blob → tree → commit → ref
   - Test dengan repository test (bukan repo real user)
   - Handle error cases: invalid repo, bad token, rate limit

3. **Commit form minimal**
   - Text area untuk commit message
   - Dropdown untuk repository (dari cached list)
   - Submit button dengan loading state
   - Output: SHA dari commit yang berhasil

4. **Activity read path**
   - Fetch events dari GitHub API
   - Simpan di database (deduplicated)
   - Tampilkan di timeline sederhana

### Prioritas teknis selanjutnya

| Priority | Item                            | Rationale                                          |
| -------- | ------------------------------- | -------------------------------------------------- |
| P0       | Auth flow + token lifecycle     | Tanpa ini, tidak ada yang bisa commit              |
| P0       | Commit engine (create + verify) | Core value proposition, harus berfungsi            |
| P1       | Activity sync + timeline UI     | User butuh lihat hasil commit mereka               |
| P1       | Error handling + retry          | GitHub API tidak reliable, sistem harus siap       |
| P2       | Dashboard overview              | Aggregate data, streak tracker, stats              |
| P2       | Commit history di form          | Biar user lihat recent commits sebelum commit baru |
| P3       | Commit queue (offline)          | Rate limit handling, network error recovery        |
| P3       | UI polish (skeleton, toast)     | UX refinement setelah core loop stabil             |
| P4       | Multi-repo                      | Setelah single-repo flow mature                    |
| P4       | Analytics                       | Setelah data terkumpul cukup (min 1 bulan)         |

### Teknikal debt yang harus dihindari

1. **Jangan hardcode token di client.** Token GitHub ada di server (Better Auth session). Client hanya pegang session ID.
2. **Jangan blocking UI selama API call.** Gunakan React Query mutation dengan optimistic update.
3. **Jangan skip error handling di service layer.** Setiap API call ke GitHub harus handle 4xx dan 5xx.
4. **Jangan simpan activity data tanpa dedup key.** Re-sync akan bikin duplikat.
5. **Jangan gunakan magic number.** Rate limit threshold, retry delay, polling interval -- semua sebagai constant.

---

## Related Documents

- [Product Definition](./definition.md) -- Product scope, target audience
- [Product Vision](./vision.md) -- Long-term product vision
- [Information Architecture](../architecture/information-architecture.md) -- Sitemap, navigation, user flows
- [Product Architecture](../architecture/product-architecture.md) -- Domain model, data flow, API routes
- [System Overview](../architecture/system-overview.md) -- Provider architecture, state management
- [ADR-001: Product Pivot](../adr/adr-001-product-pivot-contribution-hub.md)
- [ADR-002: Meaningful Contribution](../adr/adr-002-meaningful-contribution-philosophy.md)
