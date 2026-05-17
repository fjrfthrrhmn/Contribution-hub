# AGENTS.md -- General Engineering Handbook

## Project Overview

**Nama Produk**: Contribution Hub -- Developer Activity Assistant
**Platform**: Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript (Strict)
**Arsitektur**: Feature-Sliced Design (FSD) -- modular, scalable, future-proof
**Target**: MVP web app yang memungkinkan developer melakukan commit ke GitHub repository mereka melalui tombol di website, dengan integrasi GitHub OAuth, trigger commit sederhana dari UI, serta pencatatan aktivitas commit ke repository user untuk menjaga konsistensi contribution graph GitHub.

Repositori ini adalah **MVP Contribution Hub** -- aplikasi web yang membantu developer menjaga konsistensi aktivitas coding, mendokumentasikan progress, dan meningkatkan personal branding di GitHub. Bukan template kosong dan bukan production app, tetapi fondasi yang siap dikembangkan lebih lanjut.

---

## Tech Stack & Justifikasi

| Teknologi                    | Fungsi                        | Alasan                                     |
| ---------------------------- | ----------------------------- | ------------------------------------------ |
| **Next.js 16** (App Router)  | Routing, SSR, RSC, API Routes | Standard industri React framework          |
| **TypeScript** (Strict)      | Type safety                   | Zero tolerance untuk `any`                 |
| **Tailwind CSS v4**          | Styling                       | Utility-first, performant                  |
| **Shadcn UI / Radix**        | Component primitives          | Accessible, customizable, headless         |
| **TanStack React Query**     | Server state                  | Caching, deduplication, optimistic updates |
| **Zustand**                  | Client state                  | Ringan, no boilerplate                     |
| **Zod**                      | Validation                    | Type-safe runtime validation               |
| **next-intl**                | i18n                          | Standard untuk Next.js internasionalisasi  |
| **Vitest + Testing Library** | Unit/integration test         | Fast, modern, React-friendly               |
| **Playwright**               | E2E test                      | Reliable browser automation                |
| **Motion**                   | Animasi                       | Declarative, performant                    |
| **Better Auth**              | Authentication                | GitHub OAuth, session management           |

---

## Product Documentation

Dokumentasi produk lengkap tersedia di `.docs/product/`:

| Dokumen         | Isi                                            |
| --------------- | ---------------------------------------------- |
| `vision.md`     | Visi, misi, core values, long-term goals       |
| `definition.md` | Problem statement, target audience, value prop |
| `roadmap.md`    | Fase pengembangan F0-F4 dengan milestones      |
| `personas.md`   | User personas (Rama, Sari, Dimas, Maya)        |
| `features/`     | Feature specs detail per fitur                 |

**PENTING**: Sebelum memulai task baru, baca dokumentasi produk yang relevan di `.docs/product/` dan `.docs/architecture/`.

---

## Architecture Principles

### 1. Feature-Based Modular

Setiap fitur adalah module mandiri di `src/features/`. Module punya dependency sendiri (api, hooks, types, components) dan tidak boleh saling import secara langsung.

### 2. Type-First Development

- Tulis type/interface sebelum implementasi
- Semua data yang masuk/keluar harus punya type
- Inferensi type lebih baik daripada explicit type di semua tempat

### 3. Separation of Concerns

- **UI layer**: Hanya rendering, tidak ada business logic
- **Logic layer**: Hooks, services, utils -- tidak ada JSX
- **State layer**: Zustand stores, React Query -- tidak ada UI
- **API layer**: fetch, axios -- tidak ada business logic

### 4. Barrel Export

Setiap folder publik memiliki `index.ts` sebagai barrel export. Internal module tidak boleh di-import langsung dari file深处.

### 5. No Circular Dependencies

Import graph harus tetap DAG (Directed Acyclic Graph). Tidak boleh ada:

- Component import dari feature lain secara langsung
- Store import dari component
- Lib import dari utils (atau sebaliknya)

---

## Coding Standards

### TypeScript

- `strict: true` di tsconfig
- **Dilarang** menggunakan `as any`, `@ts-ignore`, `@ts-expect-error` tanpa alasan tertulis
- Gunakan `satisfies` operator untuk validasi object literal
- Utility types lebih baik daripada manual union types

### Naming Conventions

| Entitas           | Format                 | Contoh                                 |
| ----------------- | ---------------------- | -------------------------------------- |
| Component file    | `kebab-case.tsx`       | `button.tsx`, `user-card.tsx`          |
| Component widgets | `pascal-case.tsx`      | `Button.tsx`, `UserCard.tsx`           |
| Provider          | `pascal-case.tsx`      | `ThemeProvider.tsx`, `AuthContext.tsx` |
| Props type        | `XxxProps`             | `ButtonProps`, `UserCardProps`         |
| Type/Interface    | `XxxType` / PascalCase | `UserType`, `ApiResponse`              |
| Hook              | `use-kebab-case.ts`    | `use-debounce.ts`                      |
| Utility           | `kebab-case.ts`        | `format-date.ts`                       |
| Store             | `kebab-case.ts`        | `auth-store.ts`                        |
| API function      | `kebab-case.ts`        | `get-users.ts`                         |
| Constants         | `UPPER_CASE`           | `MAX_RETRY_COUNT`                      |

### Import Rules

- Gunakan `@/` alias, jangan relative path (`../../`) kecuali di baris terakhir grup `^[./]`
- Imports diurutkan otomatis oleh `@ianvs/prettier-plugin-sort-imports`
- Pisahkan import type dengan `import type { ... }`
- Setiap grup import dipisahkan baris kosong (`importOrderSeparation: true`)
- Barrel export hanya dari `index.ts`, jangan dari file lain

### Styling

- Tailwind CSS utility classes
- Hindari inline styles, CSS Modules, styled-components
- Gunakan `cn()` utility dari `@/utils/cn` untuk conditional classes
- Komponen Shadcn UI bisa di-customize via `className` prop

---

## AI Collaboration Rules

### Memberi Instruksi ke AI Agent

1. **Spesifik**: Sebutkan file path, function name, dan expected behavior
2. **Contexual**: Berikan referensi pattern yang sudah ada
3. **Boundary**: Jelaskan scope -- apa yang BOLEH dan TIDAK BOLEH diubah
4. **Verification**: Sebutkan cara memverifikasi hasil (test command, typecheck, dll)

### Prompt Convention

```
Task: [deskripsi singkat]
File: [path file yang diubah]
Pattern: [referensi pattern yang sudah ada]
Scope: [batasan perubahan]
Verify: [command untuk verifikasi]
```

### Review Process

- Setiap perubahan wajib di-review
- Ceklist review: type error?, logic error?, edge case terhandle?, test passing?
- Jangan deploy tanpa review

### AI Agent Boundaries

- Boleh: refactor, rename, extract function, add types, write tests
- Tidak boleh: ganti arsitektur tanpa approval, hapus folder existing, ubah konfigurasi inti

---

## Folder Ownership

| Folder                      | Pemilik              | Fungsi                                    |
| --------------------------- | -------------------- | ----------------------------------------- |
| `src/app/`                  | Routing & Layout     | Entry point, global layout, providers     |
| `src/components/ui/`        | UI Kit               | Atomic components (button, input, badge)  |
| `src/components/layouts/`   | Layout               | Header, footer, sidebar, container        |
| `src/components/widgets/`   | Widgets              | Composite components (card, modal, table) |
| `src/components/providers/` | Providers            | Theme, query, auth wrappers               |
| `src/config/`               | Configuration        | env, site config, paths                   |
| `src/constants/`            | Constants            | Global constants                          |
| `src/features/`             | Feature Module       | Self-contained feature module             |
| `src/lib/`                  | Integrations         | API client, third-party wrappers          |
| `src/hooks/`                | Shared Hooks         | Generic reusable hooks                    |
| `src/utils/`                | Utilities            | Pure functions, helpers                   |
| `src/types/`                | Global Types         | Shared type definitions                   |
| `src/data/`                 | Static Data          | Constants, enums, mock data               |
| `src/testing/`              | Test Setup           | Test utilities, mocks, setup              |
| `src/styles/`               | Styles               | Global CSS, CSS variables                 |
| `src/i18n/`                 | Internationalization | i18n config, routing, request             |
| `.docs/`                    | Engineering Docs     | Architecture, decisions, guides           |

### `.docs/` -- Engineering Documentation Center

Pusat dokumentasi internal engineering dengan struktur sebagai berikut:

| Sub-folder      | Isi                                                      |
| --------------- | -------------------------------------------------------- |
| `product/`      | Visi produk, roadmap, user stories, feature specs        |
| `design/`       | Design system, UI/UX guidelines, component patterns      |
| `technical/`    | Tech stack, dependencies, konfigurasi, development setup |
| `engineering/`  | Engineering practices, code review, coding standards     |
| `architecture/` | System architecture, data flow, module boundaries        |
| `adr/`          | Architecture Decision Records -- keputusan arsitektur    |
| `api/`          | API documentation, endpoint specs, request/response      |
| `testing/`      | Testing strategy, test types, coverage goals             |
| `deployment/`   | Deployment pipeline, environments, infrastructure        |
| `security/`     | Security policies, auth, authorization, data protection  |
| `ai/`           | AI agent collaboration guide, prompt conventions         |
| `onboarding/`   | New developer onboarding, setup guide                    |
| `glossary/`     | Project terminology, abbreviations, definitions          |

Setiap sub-folder memiliki `README.md` dengan template dan panduan pengisian. Dokumentasi bersifat **living document** -- update seiring perkembangan project.

## Features Structure

### Feature Structure

Each feature should be self-contained:

```
src/features/awesome-feature/
├── api/         # API calls and hooks for this feature
├── components/  # Feature-specific components
├── hooks/       # Feature-specific hooks
├── data/        # Feature-specific data
├── shared/      # Feature-specific shared components/hooks/utils
├── stores/      # Feature-specific state
├── types/       # Feature-specific types
└── utils/       # Feature-specific utilities
```

### Feature Modules (Contribution Hub)

```
src/features/
├── auth/              # GitHub OAuth, session management (Better Auth)
├── activity/          # GitHub activity tracking, sync, categorization
├── dashboard/         # Personal dashboard overview, stats, charts
├── habits/            # Streak system, daily goals, milestones
├── documentation/     # Auto-generated daily/weekly summaries
└── profile/           # GitHub profile enhancer, badges
```

---

## Documentation Rules

1. **Semua dokumentasi WAJIB Bahasa Indonesia**
2. **AGENTS.md** di setiap folder penting -- menjelaskan fungsi folder, aturan, boundary
3. **`.docs/`** untuk engineering documentation -- architecture decision records, design docs, technical guides
4. **README.md** untuk onboarding -- cara setup, develop, build, deploy
5. **CHANGELOG.md** untuk catatan perubahan -- format Keep a Changelog
6. Jangan gunakan emoji di dokumentasi teknis
7. Tone: professional, clean, practical, engineering-focused

---

## Development Workflow

### Daily Development

```bash
# Setup
bun install          # Install dependencies
bun dev              # Start development server

# Quality Gates
bun check-types      # TypeScript type checking
bun lint             # ESLint
bun format           # Prettier
bun test             # Vitest (unit + integration)

# Build
bun build            # Production build
```

### Git Hooks (Husky)

- **Pre-commit**: lint-staged (ESLint + Prettier)
- **Pre-push**: typecheck + test

Semua harus lolos sebelum push.

### Branch Strategy

- `main` -- production-ready
- `feat/*` -- fitur baru
- `fix/*` -- bug fix
- `refactor/*` -- refactoring
- `docs/*` -- dokumentasi

---

## Commit Convention

Gunakan **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Type

- `feat`: Fitur baru
- `fix`: Bug fix
- `refactor`: Refactoring (bukan fitur/fix)
- `docs`: Dokumentasi
- `chore`: Build, config, tooling
- `style`: Formatting (bukan logic change)
- `test`: Test (tambah/ubah)
- `perf`: Performance improvement

### Scope

- `ui`: component, styling
- `api`: api integration
- `hooks`: custom hooks
- `store`: state management
- `config`: configuration
- `i18n`: internationalization
- `types`: type definitions

### Contoh

```bash
feat(auth): add GitHub OAuth login
feat(activity): implement commit trigger from dashboard
fix(ui): resolve sidebar overflow on mobile
refactor(activity): extract sync logic to service
docs(product): update roadmap for Q3 2026
```

---

## Quality Standards

### Testing

- **Unit test**: Setiap utility function, hook, dan komponen murni
- **Integration test**: Alur utama aplikasi (GitHub OAuth, commit trigger, activity sync)
- **E2E test**: Critical path dengan Playwright
- Coverage minimal: 70% (unit + integration)

### Accessibility

- Setiap komponen HTML semantic (button, nav, main, section)
- Keyboard navigasi berfungsi
- Focus trap untuk modal/dialog
- Screen reader friendly (aria-label, role)

### Performance

- Gambar pakai `next/image`
- Dynamic import untuk komponen berat
- React.memo untuk list items
- Debounce/throttle untuk event berat (scroll, resize, search)

### Error Handling

- Setiap API call punya error boundary
- User-facing error messages harus informatif
- Global error boundary di layout
- Sentry atau error tracking (opsional)

---

## Expansion Strategy

### Cara Nambah Feature Baru

1. Buat folder di `src/features/<nama-feature>/`
2. Struktur: `api/`, `components/`, `hooks/`, `stores/`, `types/`, `utils/`
3. Tambah route di `src/app/` (App Router)
4. Export dari `index.ts`
5. Test feature secara independen

### Cara Nambah Halaman

1. Buat folder di `src/app/<route>/`
2. Buat `page.tsx`, `layout.tsx` jika perlu
3. Gunakan komponen dari feature modules

### Cara Nambah Komponen UI

1. Komponen atomik -> `src/components/ui/`
2. Komponen komposit -> `src/components/widgets/`
3. Komponen spesifik feature -> `src/features/<feature>/components/`

### Cara Nambah API Route

1. Buat file di `src/app/api/<route>/route.ts`
2. Export GET, POST, PUT, PATCH, DELETE handler
3. Validasi input dengan Zod

---

## Refactor Rules

### Kapan Refactor Dilakukan

- Duplikasi kode > 3 kali
- Function terlalu panjang (> 50 baris)
- Component terlalu banyak responsibility
- Import graph mulai complex
- Test sulit ditulis karena coupling

### Batasan Refactor

- Jangan ubah API interface yang sudah dipakai
- Jangan ubah struktur folder tanpa approval
- Jangan hapus file existing -- deprecate dulu
- Satu refactor = satu PR

### Dokumentasi Perubahan

- Update AGENTS.md yang terdampak
- Update CHANGELOG.md
- Beri komentar di kode jika ada breaking change
- Pastikan semua test tetap passing

---

## Scalability Principles

1. **Module independence**: Setiap feature bisa di-develop, di-test, di-deploy secara independen
2. **Lazy by default**: Import berat pakai `next/dynamic`, query besar pakai pagination
3. **Caching strategy**: React Query untuk server state, Zustand persist untuk client state
4. **API abstraction**: Semua external API lewat `src/lib/`, bukan langsung di komponen
5. **Type safety**: Zod untuk runtime validation, TypeScript untuk compile-time safety
6. **Monitoring**: Error boundary di setiap layer, logging terstruktur
7. **Free-first**: Prioritaskan solusi tanpa biaya hosting, tanpa vendor lock-in, self-hostable

---

_Handbook ini hidup -- update jika ada keputusan arsitektur baru._
