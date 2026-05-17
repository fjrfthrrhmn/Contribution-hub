# Folder Structure

> Struktur folder project berdasarkan Feature-Sliced Design (FSD).

---

## Root Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
├── components/             # Shared components
│   ├── ui/                 # shadcn/ui atomic components
│   ├── layouts/            # Header, footer, sidebar, container
│   ├── widgets/            # Cards, modals, data tables
│   └── providers/          # Theme, Query, Auth providers
├── config/                 # Env, site config, navigation
├── constants/              # Global constants, magic numbers
├── data/                   # Static data, lookup tables
├── features/               # Feature-Sliced Design modules
│   └── [feature]/
│       ├── api/            # API calls + hooks untuk fitur
│       ├── components/     # Komponen spesifik fitur
│       ├── hooks/          # Hooks spesifik fitur
│       ├── stores/         # Zustand stores spesifik fitur
│       ├── types/          # Types spesifik fitur
│       └── utils/          # Utilities spesifik fitur
├── hooks/                  # Generic reusable hooks
├── i18n/                   # next-intl config & messages
├── lib/                    # Third-party integrations
├── styles/                 # Global CSS, variables
├── testing/                # Test setup & utilities
├── types/                  # Global type definitions
└── utils/                  # Pure utility functions
```

---

## Provider Structure

```
src/components/providers/
├── query-provider.tsx      # React Query provider
├── theme-provider.tsx      # next-themes provider
├── i18n-provider.tsx       # next-intl provider
├── auth-provider.tsx       # Auth session provider
└── index.ts               # Composed providers export
```

Nesting order di `app/layout.tsx`:

```tsx
<QueryProvider>
	<ThemeProvider>
		<I18nProvider>
			<AuthProvider>{children}</AuthProvider>
		</I18nProvider>
	</ThemeProvider>
</QueryProvider>
```

---

## Hooks Structure

```
src/hooks/
├── use-debounce.ts         # Debounce value
├── use-media-query.ts      # Responsive breakpoint
├── use-local-storage.ts    # Persisted state
├── use-intersection-observer.ts # Scroll detection
└── index.ts
```

Feature-specific hooks → `src/features/[feature]/hooks/`

---

## Store Structure (Zustand)

```
src/features/[feature]/stores/
├── [feature]-store.ts      # Zustand store
└── index.ts
```

Global stores jika ada → `src/stores/`

---

## Dependency Flow

```
app/ (routing, layout)
    │
    ▼
components/ (UI, layout, widgets, providers)
    │
    ├──▶ features/ (FSD modules)
    │        │
    │        └──▶ api/, hooks/, stores/, types/, utils/
    │
    ├──▶ hooks/ (generic)
    ├──▶ utils/ (pure functions)
    ├──▶ lib/ (integrations)
    ├──▶ config/ + constants/ + data/
    └──▶ types/ (global)
```

**Rules:**

- features/ tidak boleh import features/ lain secara langsung
- app/ hanya import komponen, bukan implementasi detail
- utils/ harus pure -- tidak boleh import dari folder lain kecuali types/constants
- hooks/ tidak boleh import dari features/ atau components/

---

## Related Documents

- [System Overview](./system-overview.md)
- [Tech Stack](../technical/tech-stack.md)
