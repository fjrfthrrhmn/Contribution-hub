# src/components/providers/ -- Provider Wrappers

## Fungsi

Wrapper komponen yang menyediakan context ke seluruh aplikasi: ThemeProvider, QueryProvider, AuthProvider, dll.

## Aturan Development

- Provider = komponen Client Component (perlu 'use client')
- Satu provider = satu file
- Provider bisa dikomposisi (nested) di root layout

## Convention

- Nama: `theme-provider.tsx`, `query-provider.tsx`, `auth-provider.tsx`
- Nama component: `ThemeProvider`, `QueryProvider`, `AuthProvider`
- Props minimal: `children: React.ReactNode`

## Dependency Boundaries

- Boleh import: lib/, config/, stores/
- Tidak boleh: import dari ui/, layouts/, widgets/, features/

## Best Practices

- Urutan nesting penting: Auth → Query → Theme → Router
- Provider harus pure wrapper -- no visual UI
- Lazy initialization untuk provider berat

## AI Do's / Don'ts

- Boleh: membuat provider baru, refactor provider logic
- Tidak boleh: menempatkan provider di tengah component tree
