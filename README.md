# Contribution Hub -- Developer Activity Assistant

MVP web app yang membantu developer menjaga konsistensi aktivitas coding, mendokumentasikan progress, dan meningkatkan personal branding di GitHub -- melalui integrasi GitHub OAuth, trigger commit dari UI, dan pencatatan aktivitas commit ke repository user.

Dibangun dengan Next.js 16, TypeScript strict, Tailwind CSS v4, dan arsitektur Feature-Sliced Design (FSD).

## Tech Stack

| Teknologi                    | Fungsi                        |
| ---------------------------- | ----------------------------- |
| **Next.js 16** (App Router)  | Routing, SSR, RSC, API Routes |
| **TypeScript** (Strict)      | Type safety                   |
| **Tailwind CSS v4**          | Styling utility-first         |
| **Shadcn UI / Radix**        | Component primitives          |
| **TanStack React Query**     | Server state management       |
| **Zustand**                  | Client state management       |
| **Zod**                      | Runtime validation            |
| **Better Auth**              | GitHub OAuth, session         |
| **next-intl**                | Internasionalisasi            |
| **Motion**                   | Animasi                       |
| **Vitest + Testing Library** | Unit / integration test       |
| **Playwright**               | E2E test                      |

## Fitur Utama (MVP)

- **GitHub OAuth Login** -- Login dengan akun GitHub via Better Auth
- **Dashboard Pribadi** -- Overview aktivitas coding, streak, dan statistik
- **Commit Trigger** -- Buat commit ke repository GitHub langsung dari UI
- **Activity Tracker** -- Lacak aktivitas commit, PR, issue secara otomatis
- **Habit System** -- Streak tracking, daily goals, progress report
- **Auto-Dokumentasi** -- Daily summary dan weekly report otomatis

## Struktur Folder

```
src/
├── app/            # Routing & layout (App Router)
├── components/     # Shared components (ui/, layouts/, widgets/, providers/)
├── config/         # App configuration
├── constants/      # Global constants
├── data/           # Static data & mock
├── features/       # Feature modules (FSD)
│   ├── auth/       # GitHub OAuth, session
│   ├── activity/   # Activity tracking & sync
│   ├── dashboard/  # Personal dashboard
│   ├── habits/     # Streak & goals
│   ├── documentation/  # Auto-generated summaries
│   └── profile/    # GitHub profile enhancer
├── hooks/          # Shared hooks
├── i18n/           # Internationalization
├── lib/            # Third-party integrations
├── styles/         # Global styles
├── testing/        # Test utilities & setup
├── types/          # Global type definitions
└── utils/          # Pure utility functions
```

## Prasyarat

- [Bun](https://bun.sh) >= 1.2 (atau Node.js >= 20)
- Git
- Akun GitHub (untuk OAuth integration)

## Setup Development

```bash
# 1. Clone repository
git clone https://github.com/fjrfthrrhmn/contribution-hub.git
cd contribution-hub

# 2. Install dependencies
bun install

# 3. Copy environment variables
cp .env.example .env
# Edit .env dengan konfigurasi:
#   - AUTH_SECRET (generate dengan: bunx better-auth generate-secret)
#   - GITHUB_CLIENT_ID dan GITHUB_CLIENT_SECRET (dari GitHub OAuth Apps)
#   - DATABASE_URL (jika menggunakan database)

# 4. Setup database
bun db:push          # Push schema ke database
bun db:generate      # Generate migration

# 5. Jalankan development server
bun dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Scripts

| Perintah          | Deskripsi                |
| ----------------- | ------------------------ |
| `bun dev`         | Start development server |
| `bun build`       | Production build         |
| `bun start`       | Start production server  |
| `bun lint`        | ESLint check             |
| `bun format`      | Prettier check           |
| `bun format:fix`  | Prettier format          |
| `bun check-types` | TypeScript type checking |
| `bun test`        | Vitest (watch mode)      |
| `bun test:run`    | Vitest (single run)      |
| `bun db:push`     | Push database schema     |
| `bun db:generate` | Generate migration       |
| `bun db:seed`     | Seed database            |

## Quality Gates

Sebelum push, pastikan semua lolos:

```bash
bun check-types  # Type checking
bun lint         # ESLint
bun format       # Prettier
bun test:run     # Unit & integration tests
bun build        # Production build
```

Git hooks (Husky) akan menjalankan lint-staged otomatis di pre-commit dan typecheck + test di pre-push.

## Dokumentasi

Seluruh dokumentasi engineering tersedia di `.docs/`:

| Sub-folder      | Isi                                  |
| --------------- | ------------------------------------ |
| `product/`      | Visi produk, roadmap, feature specs  |
| `architecture/` | System architecture, data flow       |
| `technical/`    | Tech stack, dependencies, setup      |
| `engineering/`  | Coding standards, code review        |
| `adr/`          | Architecture Decision Records        |
| `api/`          | API documentation                    |
| `design/`       | Design system & UI/UX guidelines     |
| `testing/`      | Testing strategy & coverage goals    |
| `deployment/`   | Deployment pipeline & environments   |
| `security/`     | Auth, authorization, data protection |
| `ai/`           | AI collaboration guide               |
| `onboarding/`   | Developer onboarding guide           |
| `glossary/`     | Project terminology                  |
| `seo/`          | SEO strategy                         |

## Product Vision

Contribution Hub bertujuan menjadi **platform developer activity assistant** yang membantu setiap developer di dunia membangun kebiasaan coding yang konsisten, meaningful, dan terdokumentasi dengan baik.

Baca selengkapnya di [Product Vision](.docs/product/vision.md) dan [Execution Roadmap](../ROADMAP.md).

## Lisensi

Distributed under the MIT License. Lihat `LICENSE` untuk informasi lebih lanjut.
