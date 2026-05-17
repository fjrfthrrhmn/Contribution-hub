# Next App

Foundation project Next.js 16 dengan arsitektur Feature-Sliced Design (FSD),
TypeScript strict, Tailwind CSS v4, dan tooling modern.

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
| **next-intl**                | Internasionalisasi            |
| **Motion**                   | Animasi                       |
| **Vitest + Testing Library** | Unit / integration test       |
| **Playwright**               | E2E test                      |

## Struktur Folder

```
src/
├── app/            # Routing & layout (App Router)
├── components/     # Shared components (ui/, layouts/, widgets/, providers/)
├── config/         # App configuration
├── constants/      # Global constants
├── data/           # Static data & mock
├── features/       # Feature modules (FSD)
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

## Setup Development

```bash
# 1. Clone repository
git clone https://github.com/fjrfthrrhmn/next-app.git
cd next-app

# 2. Install dependencies
bun install

# 3. Copy environment variables
cp .env.example .env
# Edit .env sesuai kebutuhan

# 4. Jalankan development server
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

## Quality Gates

Sebelum push, pastikan semua lolos:

```bash
bun check-types  # Type checking
bun lint         # ESLint
bun format       # Prettier
bun test:run     # Unit & integration tests
bun build        # Production build
```

Git hooks (Husky) akan menjalankan lint-staged otomatis di pre-commit
dan typecheck + test di pre-push.

## Dokumentasi

Seluruh dokumentasi engineering tersedia di `.docs/`:

| Sub-folder      | Isi                                  |
| --------------- | ------------------------------------ |
| `architecture/` | System architecture, data flow       |
| `technical/`    | Tech stack, dependencies, setup      |
| `engineering/`  | Coding standards, code review        |
| `adr/`          | Architecture Decision Records        |
| `api/`          | API documentation                    |
| `testing/`      | Testing strategy & coverage goals    |
| `deployment/`   | Deployment pipeline & environments   |
| `security/`     | Auth, authorization, data protection |
| `ai/`           | AI collaboration guide               |
| `product/`      | Product vision & roadmap             |
| `design/`       | Design system & UI/UX guidelines     |
| `glossary/`     | Project terminology                  |
| `onboarding/`   | Developer onboarding guide           |

## Lisensi

Distributed under the MIT License. Lihat `LICENSE` untuk informasi lebih lanjut.
