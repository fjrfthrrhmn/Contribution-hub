# Information Architecture -- Contribution Hub

> Struktur navigasi, hierarki halaman, dan pola organisasi konten untuk aplikasi.
> Dokumen ini menjadi pondasi untuk pengembangan rute dan navigasi aplikasi.

---

## 1. Tujuan & Ruang Lingkup

Dokumen ini mendefinisikan Information Architecture (IA) Contribution Hub -- bagaimana informasi diorganisir, bagaimana pengguna bernavigasi, dan bagaimana halaman-halaman berhubungan satu sama lain. IA ini menjadi acuan untuk:

- **Route design**: Hierarki URL dan struktur folder App Router
- **Navigation design**: Menu, sidebar, breadcrumb, link antar halaman
- **Content organization**: Kategorisasi data dan label yang konsisten
- **User flow design**: Jalur utama pengguna dalam mencapai tujuannya
- **Page template taxonomy**: Pola layout berulang yang bisa direuse

---

## 2. Sitemap / Route Hierarchy

### 2.1. Route Tree

```
/                                 # Landing page (public)
├── login                         # Login dengan GitHub OAuth (public)
├── dashboard                     # Personal dashboard (protected)
│
├── activities                    # Activity timeline (protected)
│   └── [activityId]              # Detail aktivitas spesifik (protected)
│
├── streaks                       # Streak & habit tracking (protected)
│   └── insights                  # Insight dan pola aktivitas (protected)
│
├── goals                         # Daily/weekly goals management (protected)
│   └── [goalId]                  # Detail goal spesifik (protected)
│
├── reports                       # Auto-documentation & reports (protected)
│   ├── daily                     # Daily summaries list (protected)
│   │   └── [date]                # Daily summary spesifik (protected)
│   ├── weekly                    # Weekly reports list (protected)
│   │   └── [weekId]              # Weekly report spesifik (protected)
│   └── journal                   # Activity journal kronologis (protected)
│
├── profile                       # GitHub profile enhancer (protected)
│   ├── preview                   # Preview profile README (protected)
│   └── badges                    # Badge management (protected)
│
└── settings                      # User settings (protected)
    ├── account                   # Account & profile settings
    ├── notifications             # Notification preferences
    ├── repositories              # Repository selection & management
    └── appearance                # Theme, language, display preferences
```

### 2.2. Grouping Fungsional

Halaman-halaman dikelompokkan berdasarkan fungsi dan prioritas akses pengguna:

| Grup            | Halaman                  | Frekuensi Akses | Prioritas |
| --------------- | ------------------------ | --------------- | --------- |
| **Public**      | Landing, Login           | Sekali          | P0        |
| **Overview**    | Dashboard                | Setiap hari     | P0        |
| **Monitoring**  | Activities, Streaks      | Harian          | P1        |
| **Manajemen**   | Goals, Reports, Journal  | Mingguan        | P2        |
| **Output**      | Profile, Badges, Preview | Bulanan         | P3        |
| **Konfigurasi** | Settings (semua sub)     | Jarang          | P1        |

### 2.3. Route State Matrix

Setiap route memiliki state yang harus ditangani:

| Route         | Loading          | Empty              | Error             | Edge Case                |
| ------------- | ---------------- | ------------------ | ----------------- | ------------------------ |
| `/`           | Skeleton hero    | N/A                | Fallback landing  | First visit vs returning |
| `/login`      | Spinner          | Redirect dashboard | OAuth error toast | Already logged in        |
| `/dashboard`  | Skeleton grid    | Onboarding prompt  | Sync error banner | First day (no data)      |
| `/activities` | Ghost timeline   | Empty state + CTA  | API error + retry | Filter no results        |
| `/streaks`    | Skeleton card    | "Mulai streak-mu!" | Calculation error | Grace period active      |
| `/goals`      | Skeleton form    | Default goals      | Save error        | Weekend vs weekday       |
| `/reports`    | Skeleton list    | "Belum ada report" | Generation error  | Mid-week (no report yet) |
| `/profile`    | Skeleton preview | Default template   | Deploy error      | No repository selected   |
| `/settings`   | Skeleton form    | Default values     | Save error        | Unsaved changes          |

---

## 3. Navigation Architecture

### 3.1. Primary Navigation (Sidebar)

Sidebar adalah navigasi utama yang muncul di semua halaman setelah login.

```
┌─────────────────────┐
│ [Logo] Contribution │
│ Hub                 │
├─────────────────────┤
│ [Grid] Dashboard    │ ← icon + label
│ [GitCommit] Aktifitas│
│ [Flame] Streaks     │
│ [Target] Goals      │
│ [FileText] Reports  │
│ [User] Profile      │
│ [Settings] Settings  │
├─────────────────────┤
│ [Collapse] ◀        │
└─────────────────────┘
```

**Aturan:**

- Icon + label untuk setiap item
- Active state: primary color (#51f0a8) pada icon dan text
- Collapsible ke icon-only mode (Tooltip untuk label)
- Section divider jika perlu (antara utama dan konfigurasi)
- Grup "Lainnya" di bagian bawah: Profile, Settings

### 3.2. Secondary Navigation (Header)

Header muncul di semua halaman setelah login, berisi:

| Komponen              | Fungsi                                |
| --------------------- | ------------------------------------- |
| Breadcrumb            | Navigasi hierarki halaman saat ini    |
| Search (Command+K)    | Pencarian global (commit, repo)       |
| Sync status indicator | Indikator sync GitHub activity        |
| Streak mini-badge     | Streak hari ini (quick overview)      |
| Theme toggle          | Dark/light mode switch                |
| Avatar + dropdown     | User menu (profile, settings, logout) |

### 3.3. Tertiary Navigation (Contextual)

Navigasi kontekstual muncul di dalam halaman spesifik:

| Halaman       | Navigasi Kontekstual                                                   |
| ------------- | ---------------------------------------------------------------------- |
| `/activities` | Filter bar: type dropdown, date range, repository filter, search input |
| `/streaks`    | Tab: Coding, Review, Learning, Overall; Time range: 7d, 30d, 90d, 1y   |
| `/goals`      | Tab: Daily Goals, Weekly Goals; Day selector                           |
| `/reports`    | Tab: Daily Summaries, Weekly Reports, Journal                          |
| `/profile`    | Tab: Preview, Config, Badges                                           |
| `/settings`   | Sub-nav: Account, Notifications, Repositories, Appearance              |

### 3.4. Utility Navigation

| Elemen            | Lokasi  | Fungsi                                            |
| ----------------- | ------- | ------------------------------------------------- |
| Keyboard shortcut | Global  | Cmd+K (search), Cmd+B (sidebar), / (filter focus) |
| Back button       | Detail  | Kembali ke list dari halaman detail               |
| Skip link         | Hidden  | Skip to main content (a11y)                       |
| Footer links      | Landing | Privacy, Terms, GitHub repo                       |

### 3.5. Navigation Rules

1. **Login redirect**: Setelah login, redirect ke `/dashboard`, bukan landing page
2. **Auth guard**: Halaman protected redirect ke `/login` jika tidak ada session
3. **Deep linking**: Setiap halaman bisa diakses langsung via URL (bookmarkable)
4. **Active state**: Sidebar item aktif sesuai halaman saat ini (gunakan `usePathname()`)
5. **Breadcrumb**: Setiap halaman depth > 1 harus punya breadcrumb
6. **404 handling**: Halaman tidak ditemukan → custom 404 dengan link ke dashboard

---

## 4. User Flows

### 4.1. Flow Login + Onboarding

```
Landing Page (/)
    │ Klik "Login with GitHub"
    ▼
GitHub OAuth (/login)
    │ Authorize aplikasi
    ▼
Callback → Buat session
    │
    ├── First time user?
    │       │
    │       ▼
    │   Onboarding (/welcome)
    │   │ Pilih repository untuk dilacak
    │   │ Set daily goals awal
    │   │ Konfigurasi notifikasi
    │       │
    │       ▼
    │   Dashboard (/dashboard)
    │
    └── Returning user?
            │
            ▼
        Dashboard (/dashboard)
```

**Catatan**: `/welcome` adalah flow satu kali, bukan halaman permanen. Bisa berupa modal multi-step di atas dashboard.

### 4.2. Flow Daily Commit

```
Dashboard (/dashboard)
    │ Lihat overview aktivitas hari ini
    ▼
    ├── Belum ada aktivitas?
    │       │
    │       ▼
    │   Klik "Buat Commit" → Modal/Sheet
    │   │ Pilih repository
    │   │ Tulis commit message (min 10 karakter)
    │   │ (Optional) Pilih file yang diubah
    │       │
    │       ▼
    │   Submit → GitHub API → Activity tercatat
    │       │ Streak update
    │       │ Toast konfirmasi
    │       ▼
    │   Dashboard (data ter-refresh)
    │
    └── Sudah ada aktivitas?
            │
            ▼
        Dashboard (streak berjalan, progress bar terisi)
```

### 4.3. Flow Weekly Review

```
Reports (/reports)
    │
    ├── Tab: Weekly Reports
    │       │
    │       ▼
    │   List weekly reports (kronologis)
    │   │ Klik minggu terbaru
    │       │
    │       ▼
    │   Detail weekly report
    │   │ Overview aktivitas
    │   │ Streak status
    │   │ Goals achievement
    │   │ Kategori breakdown
    │       │
    │       ├── Export ke Markdown
    │       └── Share link (copy)
    │
    └── Tab: Daily Summaries
            │
            ▼
        Calendar picker / date list
            │ Pilih tanggal
            ▼
        Daily summary detail
            │ Edit summary jika perlu
```

### 4.4. Flow Profile Setup & Deploy

```
Profile (/profile)
    │
    ├── Tab: Preview
    │   │ Lihat preview README
    │   │ Switch template
    │   │ Toggle sections
    │
    ├── Tab: Config
    │   │ Pilih template (minimal, detailed, creative)
    │   │ Pilih section yang ditampilkan
    │   │ Auto-update frequency
    │
    └── Tab: Badges
        │ Pilih badge type
        │ Copy badge URL/Markdown
        │
        ▼
    Deploy ke GitHub Profile
        │ Click "Deploy to Profile"
        │ GitHub Actions workflow trigger
        ▼
    Profile README terupdate
```

### 4.5. Flow Multi-Halaman (Common Paths)

| Tujuan Pengguna              | Jalur Halaman                                  |
| ---------------------------- | ---------------------------------------------- |
| "Cek aktivitas hari ini"     | `/dashboard`                                   |
| "Lihat detail commit"        | `/dashboard` → `/activities/[id]`              |
| "Cek streak coding"          | `/streaks` (tab: Coding)                       |
| "Atur target harian"         | `/goals`                                       |
| "Baca daily summary kemarin" | `/reports/daily/2026-05-16`                    |
| "Export weekly report"       | `/reports/weekly/[id]` → Export button         |
| "Update profile README"      | `/profile/preview` → `/profile/config`         |
| "Ganti tema ke dark mode"    | Theme toggle di header (dari halaman mana pun) |

---

## 5. URL Design Convention

### 5.1. URL Pattern

| Pola                  | Contoh                       | Keterangan            |
| --------------------- | ---------------------------- | --------------------- |
| `/[feature]`          | `/activities`                | Halaman list feature  |
| `/[feature]/[id]`     | `/activities/a1b2c3`         | Detail item           |
| `/[feature]/[date]`   | `/reports/daily/2026-05-16`  | Item berbasis tanggal |
| `/[feature]/[action]` | `/goals`, `/profile/preview` | Sub-halaman feature   |
| `/[feature]/[n]/[n]`  | `/reports/daily/2026-05-16`  | Nested detail         |

### 5.2. Query Parameter Convention

| Parameter | Tipe   | Contoh Penggunaan                |
| --------- | ------ | -------------------------------- |
| `?page=`  | number | `/activities?page=2`             |
| `?limit=` | number | `/activities?limit=20`           |
| `?q=`     | string | `/activities?q=feat+auth`        |
| `?type=`  | enum   | `/activities?type=commit`        |
| `?repo=`  | string | `/activities?repo=user/project`  |
| `?from=`  | date   | `/activities?from=2026-05-01`    |
| `?to=`    | date   | `/activities?to=2026-05-16`      |
| `?sort=`  | string | `/goals?sort=priority`           |
| `?tab=`   | string | `/streaks?tab=coding`            |
| `?week=`  | string | `/reports/weekly?week=2026-W20`  |
| `?date=`  | date   | `/reports/daily?date=2026-05-16` |

**Aturan:**

- Parameter opsional — halaman harus bisa diakses tanpa query params
- Gunakan default values jika parameter tidak ada
- Parameter tidak valid → fallback ke default, bukan error
- Simpan filter state di URL agar bisa share link

### 5.3. Reserved Route Names

Berikut nama route yang tidak boleh digunakan sebagai nama feature:

```
login, logout, signup, callback
api, auth
settings, profile, account
welcome, onboarding
_custom, _error, _not-found (Next.js private)
```

---

## 6. Page Template Taxonomy

### 6.1. Landing Page Template

**Digunakan di:** `/`

```
┌─────────────────────────────────────────────┐
│  Header: Logo + Navigation + CTA Button     │
├─────────────────────────────────────────────┤
│  Hero Section                                │
│  ┌───────────────────────────────────────┐  │
│  │  Headline + Subheadline + CTA        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Features Section                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐     │
│  │Card 1│ │Card 2│ │Card 3│ │Card 4│     │
│  └──────┘ └──────┘ └──────┘ └──────┘     │
│                                             │
│  Testimonial / Stats Section                │
│                                             │
│  Footer: Links + Social + Copyright         │
└─────────────────────────────────────────────┘
```

**Komponen yang digunakan:** `Button`, `Card`, `Typography`, layout custom.

### 6.2. Dashboard Template

**Digunakan di:** `/dashboard`

```
┌─────────────────────────────────────────────┐
│  Header (breadcrumb + search + avatar)       │
├──────────┬──────────────────────────────────┤
│ Sidebar  │  Page Title + Subtitle           │
│ (primary)│                                  │
│          │  ┌──────┐ ┌──────┐ ┌──────┐    │
│          │  │Card 1│ │Card 2│ │Card 3│    │
│          │  └──────┘ └──────┘ └──────┘    │
│          │                                  │
│          │  ┌────────────────────────────┐  │
│          │  │ Activity Graph / Heatmap   │  │
│          │  └────────────────────────────┘  │
│          │                                  │
│          │  ┌────────────────────────────┐  │
│          │  │ Recent Activity Feed       │  │
│          │  └────────────────────────────┘  │
└──────────┴──────────────────────────────────┘
```

**Komponen:** `AppShell`, `StatsCard`, `StreakBadge`, `ActivityTimeline`, `Typography`.

### 6.3. List / Feed Template

**Digunakan di:** `/activities`, `/reports/daily`, `/reports/weekly`, `/reports/journal`

```
┌─────────────────────────────────────────────┐
│  Header (breadcrumb + search + avatar)       │
├──────────┬──────────────────────────────────┤
│ Sidebar  │  Page Title                       │
│ (primary)│  Filter Bar (type, date, search)  │
│          │                                   │
│          │  ┌─────────────────────────────┐  │
│          │  │ List Item 1                 │  │
│          │  ├─────────────────────────────┤  │
│          │  │ List Item 2                 │  │
│          │  ├─────────────────────────────┤  │
│          │  │ List Item 3                 │  │
│          │  └─────────────────────────────┘  │
│          │                                   │
│          │  Pagination / Infinite Scroll      │
└──────────┴──────────────────────────────────┘
```

**Komponen:** `AppShell`, `FilterBar`, list item cards/shared components, `Pagination`.

### 6.4. Detail Page Template

**Digunakan di:** `/activities/[id]`, `/streaks/[id]`, `/goals/[id]`, `/reports/daily/[date]`

```
┌─────────────────────────────────────────────┐
│  Header (breadcrumb + search + avatar)       │
├──────────┬──────────────────────────────────┤
│ Sidebar  │  Back link ← Kembali             │
│ (primary)│                                   │
│          │  Title (aktivitas/goal/report)    │
│          │  Metadata (date, status, tipe)    │
│          │                                   │
│          │  ┌─────────────────────────────┐  │
│          │  │ Content Area                │  │
│          │  │ - Description               │  │
│          │  │ - Detail data               │  │
│          │  │ - Related items             │  │
│          │  └─────────────────────────────┘  │
│          │                                   │
│          │  Action Bar (edit, delete, export) │
└──────────┴──────────────────────────────────┘
```

**Komponen:** `AppShell`, `BackButton`, `Typography`, `Card`, `Button`.

### 6.5. Form / Config Template

**Digunakan di:** `/goals`, `/settings/*`, `/profile/config`

```
┌─────────────────────────────────────────────┐
│  Header (breadcrumb + search + avatar)       │
├──────────┬──────────────────────────────────┤
│ Sidebar  │  Page Title + Description         │
│ (primary)│                                   │
│          │  ┌─────────────────────────────┐  │
│          │  │ Form Section 1             │  │
│          │  │ [Input] [Input] [Toggle]   │  │
│          │  ├─────────────────────────────┤  │
│          │  │ Form Section 2             │  │
│          │  │ [Dropdown] [Input] [Radio] │  │
│          │  ├─────────────────────────────┤  │
│          │  │ [Save] [Cancel]            │  │
│          │  └─────────────────────────────┘  │
└──────────┴──────────────────────────────────┘
```

**Komponen:** `AppShell`, `Form` (shadcn), `Input`, `Select`, `Switch`, `Button`.

### 6.6. Settings Template

**Digunakan di:** `/settings/*`

```
┌─────────────────────────────────────────────┐
│  Header (breadcrumb + search + avatar)       │
├──────────┬──────────────────────────────────┤
│ Sidebar  │  Sub-nav Settings                 │
│ (primary)│  ├ Account                        │
│          │  ├ Notifications                  │
│          │  ├ Repositories                   │
│          │  └ Appearance                     │
│          │                                   │
│          │  ┌─────────────────────────────┐  │
│          │  │ Content sesuai sub-nav      │  │
│          │  │ (form/config layout)        │  │
│          │  └─────────────────────────────┘  │
└──────────┴──────────────────────────────────┘
```

**Komponen:** `AppShell`, sub-navigation (Tabs atau secondary sidebar), form components.

---

## 7. Content & Data Organization

### 7.1. Entity-to-Page Mapping

Setiap data entity ditampilkan dan dikelola di halaman tertentu:

| Entity        | List Page          | Detail Page             | Create/Edit Page    |
| ------------- | ------------------ | ----------------------- | ------------------- |
| Activity      | `/activities`      | `/activities/[id]`      | N/A (auto dari API) |
| Repository    | `/settings/repos`  | N/A                     | `/settings/repos`   |
| Streak        | `/streaks`         | `/streaks` (inline)     | N/A (auto)          |
| Goal          | `/goals`           | `/goals/[id]`           | `/goals/new`        |
| DailySummary  | `/reports/daily`   | `/reports/daily/[date]` | N/A (auto + edit)   |
| WeeklyReport  | `/reports/weekly`  | `/reports/weekly/[id]`  | N/A (auto)          |
| JournalEntry  | `/reports/journal` | N/A (inline)            | N/A (auto)          |
| Badge         | `/profile/badges`  | N/A                     | N/A (auto)          |
| ProfileConfig | N/A                | `/profile/preview`      | `/profile/config`   |
| UserSettings  | N/A                | `/settings`             | `/settings/*`       |

### 7.2. Label Convention

Konsistensi label di seluruh aplikasi:

| Entity    | Label (ID) | Label (EN) | Icon            |
| --------- | ---------- | ---------- | --------------- |
| Activity  | Aktivitas  | Activity   | GitCommit       |
| Dashboard | Dashboard  | Dashboard  | LayoutDashboard |
| Streak    | Streaks    | Streaks    | Flame           |
| Goal      | Goals      | Goals      | Target          |
| Report    | Reports    | Reports    | FileText        |
| Journal   | Jurnal     | Journal    | BookOpen        |
| Profile   | Profil     | Profile    | User            |
| Settings  | Pengaturan | Settings   | Settings        |

**Aturan:**

- Gunakan label yang sama di navigation, page title, breadcrumb, dan dokumentasi
- Icon harus konsisten — satu entity = satu icon
- Label pendek (1-2 kata) untuk navigasi utama

### 7.3. Empty State Messaging

| Halaman       | Pesan Empty State (ID)                   | CTA Action             |
| ------------- | ---------------------------------------- | ---------------------- |
| `/activities` | "Belum ada aktivitas. Mulai coding!"     | Kembali ke dashboard   |
| `/streaks`    | "Mulai streak pertamamu dengan commit!"  | Buka dashboard         |
| `/goals`      | "Atur target coding harianmu"            | Buat goal baru         |
| `/reports`    | "Report akan muncul setelah aktivitasmu" | Cek aktivitas hari ini |
| `/profile`    | "Konfigurasi profile GitHub mu"          | Mulai konfigurasi      |

---

## 8. Navigation Component Inventory

### 8.1. Existing Components

| Komponen       | Lokasi                      | Fungsi IA                                   |
| -------------- | --------------------------- | ------------------------------------------- |
| `AppShell`     | `layouts/app-shell.tsx`     | Layout utama: sidebar + header + main       |
| `AppSidebar`   | `layouts/app-sidebar.tsx`   | Sidebar komponen (primary navigation)       |
| `NavMain`      | `layouts/nav-main.tsx`      | Menu navigasi utama dengan collapsible      |
| `NavUser`      | `layouts/nav-user.tsx`      | User menu dropdown (avatar, profil, logout) |
| `TeamSwitcher` | `layouts/team-switcher.tsx` | Switcher antar konteks                      |
| `NavProjects`  | `layouts/nav-projects.tsx`  | Projects list di sidebar                    |

### 8.2. Komponen yang Perlu Dibuat

| Komponen        | Fungsi IA                                       | Target Folder |
| --------------- | ----------------------------------------------- | ------------- |
| `FilterBar`     | Filter kontekstual (type, date, search, sort)   | `widgets/`    |
| `Breadcrumb`    | Breadcrumb navigasi hierarki halaman            | `widgets/`    |
| `PageHeader`    | Title + subtitle + actions untuk setiap halaman | `widgets/`    |
| `EmptyState`    | Empty state dengan ilustrasi + CTA              | `widgets/`    |
| `SearchCommand` | Global search (Cmd+K)                           | `widgets/`    |
| `SettingsNav`   | Sub-navigation untuk halaman settings           | `widgets/`    |
| `TabNav`        | Tab navigasi kontekstual                        | `ui/`         |
| `Pagination`    | Pagination controls untuk list pages            | `ui/`         |
| `BackButton`    | Navigasi kembali ke parent page                 | `ui/`         |

---

## 9. Future Considerations

### 9.1. Routes yang Akan Datang (Fase 2+)

```
/team           # Team/Organization overview (Fase 2)
/team/[id]      # Team detail
/team/[id]/members
/team/[id]/activity

/integrations   # GitLab, Bitbucket (Fase 2)
/api-keys       # API key management
/export         # Data export page
/analytics      # Advanced analytics (Fase 2)

/[username]     # Public profile page (Fase 3)
```

### 9.2. Potensi Masalah Skalabilitas

| Masalah                           | Solusi                                              |
| --------------------------------- | --------------------------------------------------- |
| Terlalu banyak item sidebar       | Group menu, prioritaskan yang paling sering dipakai |
| Navigasi terlalu dalam (>3 level) | Hindari nested routing >3 level sedalam mungkin     |
| Filter state hilang saat navigasi | Simpan filter di URL query params                   |
| Breadcrumb terlalu panjang        | Truncate dengan "..." di tengah                     |
| Konflik nama route                | Gunakan prefix untuk route generik (contoh: `r/`)   |

### 9.3. Prinsip IA yang Harus Dipertahankan

1. **Tiga klik rule**: Informasi penting tidak boleh lebih dari 3 klik dari dashboard
2. **Consistency**: Entity yang sama punya URL, label, icon yang sama di mana pun
3. **Predictability**: URL pattern bisa ditebak dari konten
4. **Forgiveness**: Navigasi salah harus mudah dikembalikan (back button, breadcrumb)
5. **Mobile-first**: Navigasi harus berfungsi di layar kecil tanpa info hilang

---

## 10. Related Documents

- [Folder Structure](./folder-structure.md) — Struktur folder FSD dan dependency flow
- [Product Architecture](./product-architecture.md) — Domain model, API endpoints, data flow
- [System Overview](./system-overview.md) — Provider architecture, state management
- [Execution Roadmap](../../ROADMAP.md) — Prioritas fitur dan task
- [Engineering Roadmap](./engineering-roadmap.md) — Detail arsitektur dan fase engineering
- [Feature Specs](../product/features/) — Detail setiap fitur
- [Product Design Vision](../design/product-design-vision.md) — Layout structure, responsive breakpoints
- [Style Guide](../design/guide-style.md) — Navigation component patterns
