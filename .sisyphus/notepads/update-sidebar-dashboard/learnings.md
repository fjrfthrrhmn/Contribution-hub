# Learnings

- `src/components/layouts/app-sidebar.tsx` depends on lucide-react icons, NavMain, NavUser, TeamSwitcher
- `nav-main.tsx` has a hardcoded `SidebarGroupLabel` ("Navigation") that was changed to "Menu Utama"
- `NavProjects` import and usage were removed entirely since the new sidebar data no longer includes a `projects` array
- Dashboard page now uses `Typography` component via `@/components/ui/typography` with `Title` and `Text` sub-components using `variant` prop
- Type checking passes (`tsc --noEmit` exits clean)
