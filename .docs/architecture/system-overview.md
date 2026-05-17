# System Overview

> Arsitektur sistem, provider architecture, dan application flow.

---

## High-Level Architecture

```
Client (Browser)
    │
    ▼
Next.js App Router (RSC + RCC)
    │
    ├── Providers Layer
    │   ├── ThemeProvider (next-themes)
    │   ├── QueryProvider (React Query)
    │   ├── AuthProvider (auth context)
    │   └── I18nProvider (next-intl)
    │
    ├── Feature Modules (FSD)
    │   ├── features/auth/
    │   ├── features/profile/
    │   └── features/content/
    │
    ├── Shared Layer
    │   ├── components/ui/  (shadcn)
    │   ├── components/layouts/
    │   ├── components/widgets/
    │   ├── hooks/
    │   └── utils/
    │
    └── API Layer
        ├── Server Actions
        ├── Route Handlers (app/api/)
        └── External Services (src/lib/)
```

---

## Provider Architecture

Provider nesting order (dari root layout):

```tsx
// src/app/providers.tsx
<QueryProvider>
	{" "}
	// 1. Server state (React Query)
	<ThemeProvider>
		{" "}
		// 2. Theme (next-themes)
		<I18nProvider>
			{" "}
			// 3. i18n (next-intl)
			<AuthProvider>
				{" "}
				// 4. Auth (kustom)
				{children}
			</AuthProvider>
		</I18nProvider>
	</ThemeProvider>
</QueryProvider>
```

### Provider Responsibilities

| Provider      | Package               | Responsibility                                          |
| ------------- | --------------------- | ------------------------------------------------------- |
| QueryProvider | @tanstack/react-query | Server state caching, deduplication, optimistic updates |
| ThemeProvider | next-themes           | Dark/light mode, system preference, persistence         |
| I18nProvider  | next-intl             | Locale detection, translations, formatting              |
| AuthProvider  | kustom (Better Auth)  | Session management, user context                        |

### Rules

- Provider tidak boleh mengandung business logic
- Provider tidak boleh render UI visual
- Provider harus pure wrapper component
- Setiap provider harus registered di root layout

---

## Application Flow

### Data Flow Pattern

```
User Action
    → Client Component (event handler)
        → React Query / Server Action
            → API Route / External Service
                → Response
            ← Cache update
        ← UI re-render
    ← User sees result
```

### State Management Strategy

| State Type   | Tool            | Scope                                 |
| ------------ | --------------- | ------------------------------------- |
| Server state | React Query     | Data dari API, cache, pagination      |
| Client state | Zustand         | UI state, preferences, form data      |
| URL state    | Next.js Router  | Query params, pathname, search params |
| Form state   | React Hook Form | Form fields, validation, submission   |
| Theme state  | next-themes     | Dark/light mode                       |

---

## Key Architecture Decisions

1. **RSC by default** -- Gunakan Server Components kecuali butuh interaktivitas
2. **Client boundary** -- 'use client' di leaf components, bukan di layout
3. **Data fetching** -- React Query untuk client-side, Server Actions untuk mutations
4. **Form handling** -- React Hook Form + Zod untuk validasi
5. **i18n** -- next-intl dengan locale detection otomatis

---

## Related Documents

- [Folder Structure](./folder-structure.md)
- [Tech Stack](../technical/tech-stack.md)
- [State Management Rules](../engineering/engineering-principles.md)
