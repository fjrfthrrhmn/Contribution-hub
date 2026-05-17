# src/types/ -- Global Type Definitions

## Fungsi

Type definitions global yang digunakan lintas fitur: shared interfaces, utility types, module augmentation, global type helpers.

## Aturan Development

- Feature-specific types → taruh di `src/features/<fitur>/types/`
- Global shared types → taruh di sini
- Gunakan `import type` untuk import type-only

## Convention

- Nama file: `index.ts`, `next.ts`, `utility.ts`, `global.d.ts`
- Interface: PascalCase (`ApiResponse`, `PaginatedResult`)
- Type utility: camelCase dengan Type suffix
- Module augmentation: `*.d.ts` files

## Dependency Boundaries

- Boleh import: constants/
- Tidak boleh: import dari app/, components/, features/, lib/

## Best Practices

- Prefer type over interface (kecuali untuk declaration merging)
- Gunakan utility types (Pick, Omit, Partial, Record)
- Hindari `any` -- gunakan `unknown` jika tipe tidak diketahui

## AI Do's / Don'ts

- Boleh: menambah global types, utility types
- Tidak boleh: menempatkan feature-specific types di sini
