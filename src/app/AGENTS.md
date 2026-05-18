# src/app/ -- Routing & Layout Layer

## Fungsi

Entry point aplikasi, routing system (Next.js App Router), global layout, page components, dan providers.

## Struktur Route Groups

```
src/app/
├── (public)/           # Public pages -- tidak memerlukan autentikasi
│   ├── login/
│   │   └── page.tsx    → /login
│   └── page.tsx        → /
├── (app)/              # Protected pages -- memerlukan sesi aktif
│   ├── activities/
│   │   ├── [activityId]/
│   │   │   └── page.tsx
│   │   └── page.tsx    → /activities
│   ├── dashboard/
│   │   └── page.tsx    → /dashboard
│   ├── goals/
│   │   ├── [goalId]/
│   │   │   └── page.tsx
│   │   └── page.tsx    → /goals
│   ├── profile/
│   │   ├── badges/
│   │   │   └── page.tsx
│   │   ├── preview/
│   │   │   └── page.tsx
│   │   └── page.tsx    → /profile
│   ├── reports/
│   │   ├── daily/
│   │   │   ├── [date]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── journal/
│   │   │   └── page.tsx
│   │   ├── weekly/
│   │   │   ├── [weekId]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx    → /reports
│   ├── settings/
│   │   ├── account/
│   │   │   └── page.tsx
│   │   ├── appearance/
│   │   │   └── page.tsx
│   │   ├── notifications/
│   │   │   └── page.tsx
│   │   ├── repositories/
│   │   │   └── page.tsx
│   │   └── page.tsx    → /settings
│   └── streaks/
│       └── insights/   → /streaks/insights (placeholder)
├── layout.tsx           → Root layout
├── providers.tsx        → Client providers composition
├── favicon.ico
└── AGENTS.md
```

Route groups menggunakan parenthes `(group)` -- tidak memengaruhi URL path. Fungsinya hanya untuk organisasi dan isolasi layout.

## Aturan Route Groups

- **`(public)`**: Halaman yang bisa diakses tanpa autentikasi. Tidak menggunakan AppShell.
- **`(app)`**: Halaman yang membutuhkan sesi aktif. Menggunakan AppShell dengan sidebar navigasi.

### Menambahkan Halaman Baru

1. Tentukan apakah halaman termasuk **public** atau **app** (protected)
2. Buat folder + `page.tsx` di route group yang sesuai
3. Jika halaman protected, gunakan `<AppShell>` wrapper dengan breadcrumbs
4. Jika halaman public, gunakan layout full-bleed tanpa AppShell

## Convention

- Segmen route menggunakan kebab-case
- Dynamic segments: `[param]` untuk single, `[...slug]` untuk catch-all
- Route groups `(group)` untuk isolasi layout dan organisasi
- API routes di `src/app/api/` dengan `route.ts` handlers
- Gunakan RSC (React Server Components) sebagai default

## Dependency Boundaries

- Boleh import dari: components, features, lib, hooks, utils
- Tidak boleh: import dari app/ folder lain secara langsung

## Best Practices

- Minimal logic di page.tsx -- delegate ke feature modules
- Gunakan `generateMetadata` untuk SEO
- Layout terluar di `app/layout.tsx` (root layout)
- Halaman di `(app)` selalu pakai AppShell untuk navigasi konsisten

## AI Do's / Don'ts

- Boleh: membuat route baru, halaman baru, layout baru dalam route group
- Tidak boleh: mengubah root layout tanpa approval
- Tidak boleh: menempatkan halaman protected di `(public)` group
