# Getting Started

> Panduan setup project dari awal hingga siap development.

---

## Prerequisites

| Tool    | Version Minimum | Cek              |
| ------- | --------------- | ---------------- |
| Node.js | 20.x+           | `node --version` |
| npm     | 10.x+           | `npm --version`  |
| Git     | 2.x+            | `git --version`  |

---

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

```bash
cp .env.example .env.local
```

Minimal env variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (jika ada)
DATABASE_URL=

# Auth (jika ada)
AUTH_SECRET=

# API Keys (jika perlu)
```

### 4. Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Quality Gates

```bash
# Type checking
npm run check-types

# Linting
npm run lint

# Testing
npm run test

# Production build
npm run build
```

Semua harus pass sebelum commit/push.

---

## Stack Installation Guide

### Core UI (shadcn/ui)

```bash
npx shadcn@latest init
npx shadcn@latest add button dialog form input toast table card
```

### Theme & Styling

```bash
npm install next-themes
```

### State Management

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand
```

### Forms & Validation

```bash
npm install react-hook-form @hookform/resolvers zod
```

### Internationalization

```bash
npm install next-intl
# Setup: https://next-intl.dev/docs/getting-started/app-router
```

### Utilities

```bash
npm install usehooks-ts date-fns
npm install lucide-react sonner
```

### Env Validation (Recommended)

```bash
npm install @t3-oss/env-nextjs
```

---

## Project Structure Quick Tour

```
src/
├── app/              # Pages & layouts (Next.js App Router)
├── components/       # Shared UI components
│   ├── ui/           # shadcn/ui components
│   ├── layouts/      # Header, footer, sidebar
│   ├── widgets/      # Cards, modals, tables
│   └── providers/    # React Query, Theme, Auth providers
├── config/           # App configuration
├── constants/        # Global constants
├── features/         # Feature-Sliced Design modules
├── hooks/            # Custom React hooks
├── i18n/             # Translations
├── lib/              # Third-party integrations
├── types/            # TypeScript types
├── utils/            # Pure utility functions
└── styles/           # Global CSS
```

---

## Daily Workflow

```bash
# 1. Pull latest
git pull origin main
npm install

# 2. Start development
npm run dev

# 3. Before commit
npm run check-types
npm run lint
npm run test

# 4. Commit (Conventional Commits)
git add .
git commit -m "feat(scope): deskripsi perubahan"

# 5. Push
git push
```

---

## Style Conventions

- **Components**: kebab-case filenames, PascalCase component names
- **Hooks**: `use-kebab-case.ts`
- **Utils**: `kebab-case.ts`
- **Constants**: `UPPER_CASE`
- **Imports**: Gunakan `@/` alias, jangan relative `../../`

---

## Troubleshooting

### Port already in use

```bash
npx kill-port 3000
npm run dev
```

### Type errors after install

```bash
npm run check-types
```

### Build errors

```bash
npm run build
# Check error messages for details
```

---

## Related Documents

- [Tech Stack](../technical/tech-stack.md)
- [Folder Structure](../architecture/folder-structure.md)
- [Engineering Principles](../engineering/engineering-principles.md)
