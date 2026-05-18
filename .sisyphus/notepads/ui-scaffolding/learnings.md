# Learnings — UI Scaffolding Layer

## Current State (2026-05-17)

- App structure: Next.js 16 App Router with existing layout, providers, AppShell
- Existing pages: `/` (boilerplate landing), `/login` (auth form), `/dashboard` (basic AppShell shell)
- Existing components: AppShell, AppSidebar, NavMain, NavUser, TeamSwitcher, NavProjects
- UI kit: shadcn/ui components (25+ components)
- IA defined in `.docs/architecture/information-architecture.md` with full route tree
- Design tokens in `src/styles/globals.css`, typography system in `src/components/ui/typography.tsx`
- Sidebar nav currently uses shadcn sample data, needs update to match IA navigation structure
