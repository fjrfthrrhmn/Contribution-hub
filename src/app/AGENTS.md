# src/app/ -- Routing & Layout Layer

## Fungsi

Entry point aplikasi, routing system (Next.js App Router), global layout, page components, dan providers.

## Aturan Development

- File-based routing: setiap folder = route segment
- `layout.tsx` untuk persistent UI (header, footer, sidebar)
- `page.tsx` untuk halaman spesifik
- `loading.tsx`, `error.tsx`, `not-found.tsx` untuk states

## Convention

- Segmen route menggunakan kebab-case
- API routes di `app/api/` dengan route.ts handlers
- Gunakan RSC (React Server Components) sebagai default

## Dependency Boundaries

- Boleh import dari: components, features, lib, hooks, utils
- Tidak boleh: import dari app/ folder lain secara langsung

## Best Practices

- Minimal logic di page.tsx -- delegate ke feature modules
- Gunakan generateMetadata untuk SEO
- Layout terluar di `app/layout.tsx` (root layout)

## AI Do's / Don'ts

- Boleh: membuat route baru, halaman baru, layout baru
- Tidak boleh: mengubah root layout tanpa approval
