# AI Collaboration Rules

> Aturan kolaborasi AI agent dengan codebase dan dependency usage.

---

## Sebelum Memulai Task

AI agent WAJIB membaca dokumentasi berikut (urutan prioritas):

1. `AGENTS.md` -- Engineering handbook root
2. `.docs/AGENTS.md` -- Documentation center guide
3. `.docs/architecture/system-overview.md` -- System architecture
4. `.docs/architecture/folder-structure.md` -- Folder structure
5. `.docs/technical/tech-stack.md` -- Tech stack & dependencies
6. `.docs/engineering/engineering-principles.md` -- Engineering rules
7. `.docs/ai/` -- AI collaboration guide (file ini)

---

## Dependency Usage Rules

### React Query

- Query keys: gunakan array `['resource', 'id']` convention
- Stale time: minimal 30s untuk data yang jarang berubah
- Gunakan `useSuspenseQuery` untuk data critical
- Mutation: selalu handle `onError` dengan toast

### Zustand

- Store per feature, jangan store global raksasa
- Slice pattern untuk store yang besar
- Jangan fetch data di store -- itu tugas React Query
- Store hanya untuk UI state dan client-only data

### shadcn/ui

- Install per-component, jangan bulk install
- Jangan modify komponen shadcn secara langsung
- Kustomisasi melalui `className` dan `cn()` utility
- Contoh: `npx shadcn@latest add button dialog form`

### React Hook Form

- Gunakan `@hookform/resolvers/zod` untuk validasi
- Form component terpisah dari page/logic
- `useFormContext` untuk nested form components

### next-intl

- Gunakan `useTranslations()` untuk client components
- Gunakan `getTranslations()` untuk server components
- Jangan hardcode string, selalu gunakan message keys

### next-themes

- Gunakan `useTheme()` untuk akses theme
- Theme toggle component di header/settings
- CSS variables untuk dark mode styling

---

## AI Agent Boundaries

### Boleh Dilakukan

- Mengimplementasikan fitur dengan pattern yang sudah ada
- Menambah komponen shadcn/ui baru
- Menambah query/mutation dengan React Query
- Membuat Zustand store untuk UI state
- Menambah form dengan React Hook Form + Zod
- Membuat provider wrapper baru
- Refactor kecil (rename, extract, type fix)
- Update dokumentasi

### Tidak Boleh Dilakukan Tanpa Approval

- Mengganti state management tool (React Query ke SWR, dll)
- Mengganti library inti (shadcn ke MUI, dll)
- Mengubah arsitektur provider
- Menghapus folder atau file existing
- Menambah dependencies baru tanpa dokumentasi
- Mengubah konfigurasi core (tsconfig, tailwind.config, next.config)

---

## Prompt Convention

```
Task: [Deskripsi singkat]
File: [Path file yang diubah]
Pattern: [Referensi pattern yang sudah ada]
Dependencies: [Package yang digunakan]
Scope: [Batasan perubahan]
Verify: [Command untuk verifikasi]
```

### Contoh

```
Task: Tambahkan form login
File: src/features/auth/components/login-form.tsx
Pattern: src/features/auth/components/register-form.tsx (existing)
Dependencies: react-hook-form, zod, @tanstack/react-query
Scope: Hanya file di src/features/auth/
Verify: bun check-types && bun test
```

---

## Review Checklist

Setiap perubahan (terutama yang menggunakan dependencies baru) harus di-review:

- [ ] Type error? (bun check-types)
- [ ] Pattern konsisten dengan existing code?
- [ ] Dependency digunakan dengan benar?
- [ ] Error handling lengkap?
- [ ] Loading/error states terhandle?
- [ ] i18n string (bukan hardcode)?
- [ ] Aksesibilitas terjaga?
- [ ] Test passing?

---

## Related Documents

- [Prompting Guidelines](./prompting-guidelines.md)
- [Engineering Principles](../engineering/engineering-principles.md)
