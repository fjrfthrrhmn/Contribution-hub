# Tech Stack

> Dokumentasi teknologi utama yang digunakan dalam project ini.

---

## Core Framework

| Teknologi            | Versi | Fungsi                        | Justifikasi                                |
| -------------------- | ----- | ----------------------------- | ------------------------------------------ |
| Next.js (App Router) | ^16   | Routing, SSR, RSC, API Routes | Standard industri, RSC, file-based routing |
| React                | ^19   | UI library                    | Ecosystem terbesar, RSC support            |
| TypeScript           | ^5    | Type safety                   | Strict mode, zero tolerance untuk any      |
| Tailwind CSS         | ^4    | Styling                       | Utility-first, JIT compiler, performant    |

---

## UI & Design System

| Package      | Fungsi                         | Priority    |
| ------------ | ------------------------------ | ----------- |
| shadcn/ui    | Reusable accessible components | WAJIB       |
| next-themes  | Dark mode & theme switching    | WAJIB       |
| lucide-react | Consistent icon system         | RECOMMENDED |
| sonner       | Toast notifications            | RECOMMENDED |
| motion       | UI animations                  | OPTIONAL    |
| cmdk         | Command palette                | OPTIONAL    |

### shadcn/ui Convention

- Install component per-component: `npx shadcn@latest add button`
- Customize via className prop, jangan modify source
- Gunakan `cn()` utility untuk conditional classes
- Jangan buat wrapper component untuk shadcn -- langsung import dari `@/components/ui/`

---

## State Management

| Package                    | Fungsi                                      | Priority |
| -------------------------- | ------------------------------------------- | -------- |
| @tanstack/react-query      | Server state, caching, optimistic updates   | WAJIB    |
| zustand                    | Client state (UI preferences, global state) | WAJIB    |
| next/router + searchParams | URL state                                   | BUILT-IN |

### State Boundaries

| State Type  | Tool            | Examples                           |
| ----------- | --------------- | ---------------------------------- |
| Server data | React Query     | User list, posts, API responses    |
| UI state    | Zustand         | Sidebar open, modal state, filters |
| URL state   | Next.js Router  | Page, sort, search query           |
| Form state  | React Hook Form | Form fields, validation errors     |
| Theme state | next-themes     | Dark/light mode                    |
| i18n locale | next-intl       | Current language, translations     |

---

## Forms & Validation

| Package             | Fungsi                | Priority |
| ------------------- | --------------------- | -------- |
| react-hook-form     | Form state management | WAJIB    |
| @hookform/resolvers | Zod integration       | WAJIB    |
| zod                 | Schema validation     | WAJIB    |

### Data Flow

```
Zod Schema (type + validation)
    → React Hook Form (form state)
        → Server Action / React Query (submission)
            → Response
```

---

## Internationalization

| Package   | Fungsi                              | Priority |
| --------- | ----------------------------------- | -------- |
| next-intl | i18n: routing, messages, formatting | WAJIB    |

### i18n Rules

- Default locale: `id` (Indonesia)
- Messages per locale: `src/i18n/messages/id.json`, `en.json`
- Gunakan ICU message syntax untuk pluralization
- Namespace messages per feature jika besar
- Jangan hardcode user-facing strings

---

## Utilities

| Package            | Fungsi                         | Priority    |
| ------------------ | ------------------------------ | ----------- |
| usehooks-ts        | Reusable React hooks           | RECOMMENDED |
| date-fns           | Date formatting & manipulation | RECOMMENDED |
| hotkeys-js         | Keyboard shortcuts             | OPTIONAL    |
| @t3-oss/env-nextjs | Typed env validation           | RECOMMENDED |

---

## Development Tools

| Tool                | Fungsi                       |
| ------------------- | ---------------------------- |
| ESLint              | Code linting & consistency   |
| Prettier            | Code formatting (via ESLint) |
| TypeScript strict   | Static type checking         |
| Husky + lint-staged | Pre-commit hooks             |
| Vitest              | Unit & integration testing   |
| Testing Library     | React component testing      |
| Playwright          | E2E browser testing          |

---

## Related Documents

- [System Overview](../architecture/system-overview.md)
- [Installation Guide](../onboarding/getting-started.md)
