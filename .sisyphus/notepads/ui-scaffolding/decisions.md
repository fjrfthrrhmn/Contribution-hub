# Decisions — UI Scaffolding Layer

## Key Decisions

1. **Phase placement**: Phase 0.5 inserted between Phase 0 (Foundation) and Phase 1 (Core Experience) because UI scaffolding must exist before business logic integration.

2. **Page shell pattern**: Every protected page uses AppShell with breadcrumbs. Public pages (landing, login) use standalone layout.

3. **No business logic**: Page shells contain zero data fetching, zero service calls, zero feature imports. Pure JSX structure with placeholder/empty states.

4. **Sidebar navigation**: Update AppSidebar to match IA section 3.1 route labels and icons. Remove shadcn sample data.

5. **Page template taxonomy**: Use the 6 templates from IA section 6 (Landing, Dashboard, List/Feed, Detail, Form/Config, Settings).

6. **Empty states**: Every list/detail page shows an empty state with the message from IA section 7.3.
