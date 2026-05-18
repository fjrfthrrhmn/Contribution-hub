# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-18

### feat

- Product pivot: foundation project menjadi Contribution Hub (developer activity assistant)
- AppShell layout component + sidebar navigasi (collapsible, mobile drawer, keyboard shortcut)
- AuthForm reusable template (login/register dengan Field component)
- Typography SSOT (Title/Text components via `src/components/ui/typography.tsx`)
- Free-first/low-cost philosophy pada arsitektur dan deployment
- Design system tokens: color palette (#51f0a8 accent), spacing (0.27rem), shadow system (2xs-2xl), radius (1.5rem)

### docs

- Information architecture: sitemap, navigasi, user flows, URL design, page templates
- Roadmap upgrade: from feature checklist ke engineering roadmap + system evolution plan
  - Product evolution stages (Phase 0-4 dengan exit criteria per fase)
  - Engineering roadmap: frontend milestones, backend/API flow, data flow mapping, failure handling
  - System design thinking: architecture rationale, trade-off matrix, assumption boundaries
  - Feature breakdown by system: Auth, Repository, Commit Engine, Activity, UI Feedback
  - Engineering-oriented What's Next dengan prioritas teknis
- Product documentation: vision, definition, personas, 4 feature specs
- Feature specs detail aktivitas, habit, auto-documentation, github profile
- Product design system & UI/UX guidelines di roadmap
- Architecture documentation: system overview, folder structure, product architecture, information architecture
- Design documentation: product design vision, style guide (diperbarui dengan design tokens)
- ADR-001 (product pivot), ADR-002 (meaningful contribution philosophy)
- SEO strategy (.docs/seo/) untuk developer tooling
- AGENTS.md, README.md, CHANGELOG.md: alignment dengan Contribution Hub

### refactor

- Dashboard page: raw SidebarProvider -> AppShell wrapper
- globals.css: body font-family Arial -> var(--font-sans); oklch tokens -> hex tokens
- globals.css: shadow system + spacing + radius design tokens baru
- Font: Geist -> DM Sans (sans), Lora (serif), IBM Plex Mono (monospace)
- Sidebar components: root `src/components/` -> `src/components/layouts/`
- Login form: `src/components/root` -> `src/components/widgets/auth-form.tsx`
- Design docs: hardcoded typography tables -> reference ke typography.tsx
- Design docs: color palette oklch -> hex; font Geist -> DM Sans/Lora/IBM Plex Mono

## [0.1.0] - 2026-05-17

### feat

- Next.js 16 + TypeScript strict + Tailwind CSS v4
- Struktur folder Feature-Sliced Design (FSD)
- Shadcn UI + Radix UI + TanStack React Query + Zustand + Zod
- AppShell layout, Typography system (Title/Text), AuthForm template

### chore

- ESLint, Prettier, Husky, commitlint, lint-staged
- next-intl + Vitest + Testing Library + Playwright
- CI workflow (GitHub Actions)
- Dokumentasi engineering (.docs/) template + AGENTS.md

---

[Unreleased]: https://github.com/fjrfthrrhmn/contribution-hub/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/fjrfthrrhmn/contribution-hub/releases/tag/v0.1.0
