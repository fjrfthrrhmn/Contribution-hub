# src/data/ -- Static Data

## Fungsi

Data statis dan lookup tables: array of options, enum values sebagai data, default data, seed data, mapping objects.

## Aturan Development

- Data immutable: gunakan `as const` atau Object.freeze
- Pisahkan antara data dan logic
- Data besar → file terpisah, import selective

## Convention

- Nama file: `countries.ts`, `categories.ts`, `status-options.ts`
- Data array of objects dengan type explicit
- Barrel export dari index.ts

## Dependency Boundaries

- Boleh import: types/, constants/
- Tidak boleh: import dari app/, components/, features/, lib/
- Tidak boleh: React, hooks, atau side effects

## Best Practices

- Bedakan dengan constants/: constants = project config, data = domain data
- Gunakan Zod untuk validasi data statis yang complex
- Jangan taruh data user-specific atau dynamic di sini

## AI Do's / Don'ts

- Boleh: menambah data statis baru, menambah lookup tables
- Tidak boleh: menaruh data yang berasal dari API di sini
