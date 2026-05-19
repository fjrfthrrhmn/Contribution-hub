# ROADMAP -- Contribution Hub

> Roadmap eksekusi untuk pengembangan Contribution Hub. Dokumen ini adalah sumber kebenaran utama untuk perencanaan fitur dan prioritas pekerjaan. Lihat [Engineering Roadmap](.docs/architecture/engineering-roadmap.md) untuk detail arsitektur dan fase engineering.

---

## Progress Summary

| Domain               | Priority | Status         | Progress |
| -------------------- | -------- | -------------- | -------- |
| Foundation           | P0       | 🟢 Done        | 12/12    |
| Scaffolding          | P0       | 🟢 Done        | 7/7      |
| Auth                 | P0       | 🟡 In Progress | 5/7      |
| Commit Engine        | P0       | ⚪ Not Started | 0/9      |
| Activity Tracking    | P1       | ⚪ Not Started | 0/8      |
| Dashboard            | P1       | ⚪ Not Started | 0/6      |
| Habit System         | P2       | ⚪ Not Started | 0/7      |
| Auto-Documentation   | P2       | ⚪ Not Started | 0/6      |
| GitHub Profile       | P3       | ⚪ Not Started | 0/5      |
| Testing & QA         | P0       | 🟡 In Progress | 1/6      |
| Polish & Performance | P3       | ⚪ Not Started | 0/4      |

---

## Foundation

Setup dan tooling proyek. Fondasi arsitektur yang sudah selesai dan tidak perlu diubah kecuali ada kompatibilitas kritis.

### Tasks

- [x] Inisialisasi Next.js 16 + TypeScript strict
- [x] Struktur folder Feature-Sliced Design (FSD)
- [x] Konfigurasi ESLint, Prettier, Husky, commitlint
- [x] Integrasi Tailwind CSS v4 + Shadcn UI
- [x] Setup TanStack React Query + Zustand + Zod
- [x] Setup next-intl untuk internasionalisasi
- [x] Setup Vitest + Testing Library + Playwright
- [x] Dokumentasi engineering (.docs/)
- [x] AGENTS.md untuk AI collaboration
- [x] Lisensi (MIT), Changelog, Roadmap
- [x] CI workflow (GitHub Actions)
- [x] Konfigurasi path alias (`@/`)

---

## Scaffolding

Route groups, AppShell layout, middleware, dan template pages untuk semua domain fitur. Infrastructure lintas-domain yang mendasari seluruh halaman aplikasi.

### Tasks

- [x] Route groups: `(public)` untuk landing/login, `(app)` untuk halaman terautentikasi
- [x] AppShell component dengan sidebar navigasi collapsible
- [x] Middleware (proxy.ts) untuk route protection
- [x] Template page: Dashboard (AppShell, cards, chart placeholder)
- [x] Template page: Activities (list, filter bar, empty state)
- [x] Template page: Goals, Profile, Reports, Settings
- [x] Provider composition (Auth, Query, Theme, i18n)

---

## Auth

GitHub OAuth authentication via Better Auth. Meliputi login flow, session management, token lifecycle, dan error handling untuk expired/revoked tokens.

### Tasks

- [x] Daftarkan GitHub OAuth App (dev environment)
- [x] Install dan konfigurasi Better Auth + GitHub OAuth plugin
- [x] Implementasi callback route OAuth
- [x] Setup session management + token refresh
- [x] Buat halaman login dan komponen auth UI
- [ ] Handle error states: token expired, akses revoked
- [ ] Uji token lifecycle: login, token usage, refresh, re-auth

---

## Commit Engine

Inti produk: membuat commit ke GitHub dari UI. Meliputi repository management, Git Data API integration, commit form, dan error handling.

### Tasks

- [ ] Setup struktur feature `commit/` (api, services, components, hooks, types)
- [ ] Implementasi service layer: blob, tree, commit, ref
- [ ] Fetch dan cache daftar repository user dari GitHub API
- [ ] Binding repository + validasi push access
- [ ] Buat form commit dengan validasi (Zod: min 10 chars, no spam)
- [ ] Implementasi optimistic UI + rollback on failure
- [ ] Handle error taxonomy: 401, 409, 422, 429, 5xx
- [ ] Rate limit awareness: cek header, blokir jika threshold tercapai
- [ ] Integrasi author identity dari GitHub profile

---

## Activity Tracking

Pelacakan otomatis aktivitas GitHub user. Meliputi polling GitHub Events API, deduplication, kategorisasi, dan timeline UI.

### Tasks

- [ ] Setup background job untuk polling GitHub Events API (15 menit)
- [ ] Implementasi deduplication key `(type, repo, timestamp)`
- [ ] Buat activity log timeline (infinite scroll, kronologis)
- [ ] Implementasi kategorisasi aktivitas (coding, review, management)
- [ ] Tambah filter aktivitas (tipe, repository, tanggal)
- [ ] Implementasi incremental sync dengan `since` parameter
- [ ] Aggregasi statistik aktivitas (commits/day, active days/week)
- [ ] Dukungan aktivitas manual (user bisa catat sendiri)

---

## Dashboard

Halaman utama personal dashboard. Meliputi overview aktivitas, weekly chart, streak tracker, dan recent activity feed.

### Tasks

- [ ] Buat layout dashboard dengan grid system
- [ ] Implementasi overview statistik (hari ini, minggu ini)
- [ ] Build weekly activity chart
- [ ] Integrasi recent activity feed
- [ ] Tambah streak tracker card
- [ ] Handle 4 states: loading, empty, error, success

---

## Habit System

Sistem pembangun kebiasaan coding. Meliputi multiple streak types, daily goals, milestone achievements, dan insight motivasional.

### Tasks

- [ ] Implementasi streak calculation algorithm
- [ ] Dukungan multi-type streak: coding, review, learning, overall
- [ ] Konfigurasi daily goals (min commit, review, aktivitas)
- [ ] Progress tracking UI terhadap goals harian
- [ ] Grace period (1 hari/minggu) + streak freeze (3 hari/bulan)
- [ ] Milestone achievements: 7, 14, 30, 60, 100, 365 hari
- [ ] Insight sistem: pola aktivitas, rekomendasi

---

## Auto-Documentation

Dokumentasi aktivitas coding otomatis. Meliputi daily summary, weekly report, activity journal, dan changelog generator.

### Tasks

- [ ] Generator daily activity summary (cron 23:59)
- [ ] Generator weekly progress report (cron Minggu 23:59)
- [ ] Implementasi activity journal dengan tagging system
- [ ] Edit capability untuk daily summary sebelum disimpan
- [ ] Export summary ke format Markdown
- [ ] Generator changelog dari commit messages per repository

---

## GitHub Profile

Enhancer profil GitHub. Meliputi profile README generator, dynamic badges, multiple layout templates, dan auto-update workflow.

### Tasks

- [ ] Generator profile README dengan metrics meaningful
- [ ] Dynamic badges (streak, kontribusi, kategori) via shields.io
- [ ] Multiple layout templates (minimal, detailed, creative)
- [ ] Preview profile sebelum deploy
- [ ] GitHub Actions workflow untuk auto-update daily

---

## Testing & QA

Jaminan kualitas melalui automated testing, error boundaries, dan accessibility.

### Tasks

- [ ] Unit test: streak calculation algorithm
- [ ] Unit test: commit service (blob/tree/commit/ref)
- [ ] Integration test: auth flow + commit flow
- [ ] E2E test: login, pilih repo, commit, verify (Playwright)
- [ ] Error boundary per page section
- [ ] Coverage minimal 70% (unit + integration)

---

## Polish & Performance

Optimasi UX, bundle size, caching strategy, dan accessibility setelah core loop stabil.

### Tasks

- [ ] Skeleton loading untuk semua card dan list
- [ ] Implementasi dynamic import untuk komponen berat (chart)
- [ ] React Query cache strategy: stale time, prefetch, optimistic update
- [ ] Keyboard navigasi + screen reader support

---

> Dokumen ini adalah living document. Update ketika ada perubahan prioritas atau keputusan arsitektur baru.
