# Prompting Guidelines

> Panduan memberikan instruksi yang efektif ke AI agent.

---

## Prompt Structure

Setiap prompt ke AI agent harus mencakup 5 elemen:

```
Task: [Satu kalimat deskriptif]
File: [Exact path file yang diubah/dibuat]
Pattern: [Reference ke pattern existing yang harus diikuti]
Scope: [Batasan jelas -- file/folder mana saja]
Verify: [Command untuk memverifikasi hasil]
```

---

## Prompt Examples

### Example 1: Menambah fitur dengan React Query

```
Task: Tambahkan halaman daftar user dengan data fetching
File: src/features/users/page.tsx
Pattern: src/features/posts/page.tsx (useSuspenseQuery pattern)
Dependencies: @tanstack/react-query
Scope: src/features/users/
Exclude: Jangan ubah komponen existing di src/components/
Verify: bun check-types
```

### Example 2: Form dengan React Hook Form + Zod

```
Task: Buat form edit profil
File: src/features/profile/components/edit-form.tsx
Pattern: src/features/auth/components/login-form.tsx (RHF + Zod pattern)
Dependencies: react-hook-form, zod, @hookform/resolvers
Scope: src/features/profile/
Verify: bun check-types && bun test
```

### Example 3: Provider wrapper baru

```
Task: Buat AnalyticsProvider wrapper
File: src/components/providers/analytics-provider.tsx
Pattern: src/components/providers/theme-provider.tsx (provider pattern)
Scope: src/components/providers/ + update app/layout.tsx
Verify: bun check-types
```

---

## Anti-Patterns (Jangan Lakukan)

### ❌ Prompt terlalu abstrak

```
Buat fitur login.   // Terlalu abstrak, tidak ada detail implementasi
```

### ❌ Prompt tanpa referensi pattern

```
Buat form di halaman user.   // Agent tidak tahu pattern form yang dipakai
```

### ❌ Prompt tanpa scope

```
Tambahin state management.   // Tidak jelas store baru atau modifikasi existing
```

### ❌ Prompt tanpa verification

```
Benerin error di halaman.   // Tidak jelas cara memverifikasi perbaikan
```

---

## Prompt Templates

### New Feature

```
Task: Tambahkan [fitur] di halaman [page]
File: [path]
Pattern: [reference path]
Dependencies: [daftar package]
Scope: [batasan folder]
Verify: [bun check-types, bun test, dll]
```

### Bug Fix

```
Task: Fix [bug description]
File: [path where bug exists]
Root Cause: [analyzed root cause]
Pattern: [how similar bugs were fixed]
Scope: [files to modify]
Verify: [bun check-types, manual test scenario]
```

### Refactor

```
Task: Refactor [component/hook]
File: [path]
Goal: [what the refactor achieves]
Preserve: [behavior that must NOT change]
Pattern: [reference pattern]
Scope: [files affected]
Verify: [existing tests pass, no type errors]
```

---

## Provider & Refactor Guidelines

### Saat Membuat Provider Baru

1. Buat wrapper component di `src/components/providers/`
2. Gunakan `'use client'`
3. Props: minimal `{ children: React.ReactNode }`
4. Export dari `src/components/providers/index.ts`
5. Tambahkan di `app/providers.tsx` dengan urutan yang tepat

### Saat Refactor

1. Jangan ubah API interface yang sudah dipakai
2. Ekstrak logic ke custom hook, jangan simpan di komponen
3. Pastikan test tetap passing
4. Update barrel exports (index.ts) jika ada file baru
5. Update AGENTS.md dan dokumentasi jika perlu

---

## Context Files

Sebelum memulai task besar, baca file berikut:

| File                                          | Why                     |
| --------------------------------------------- | ----------------------- |
| `src/app/providers.tsx`                       | Provider nesting order  |
| `src/config/env.ts`                           | Environment variables   |
| `src/features/[x]/index.ts`                   | Public API feature      |
| `src/components/ui/index.ts`                  | Available UI components |
| `.docs/engineering/engineering-principles.md` | Engineering rules       |

---

## Related Documents

- [AI Collaboration Rules](./ai-collaboration.md)
- [Engineering Principles](../engineering/engineering-principles.md)
