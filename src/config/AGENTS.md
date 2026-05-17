# src/config/ -- Application Configuration

## Fungsi

Konfigurasi aplikasi: environment variables, site config, navigation config, API base URLs, feature flags.

## Aturan Development

- Semua config bersifat read-only setelah inisialisasi
- Gunakan Zod untuk validasi env variables di runtime
- Prefix NEXT*PUBLIC* untuk client-side env vars

## Convention

- Nama file: `site.ts`, `env.ts`, `nav.ts`, `api.ts`, `features.ts`
- Export named constants, jangan export default
- Group config berdasarkan domain

## Dependency Boundaries

- Boleh import: constants/
- Tidak boleh: import dari app/, components/, features/, hooks/
- Tidak boleh: import React atau JSX

## Best Practices

- Jangan hardcode secrets -- gunakan env variables
- Config object immutable (gunakan `as const` atau `Object.freeze`)
- Validasi env di startup, jangan di runtime

## AI Do's / Don'ts

- Boleh: menambah config baru, validasi env
- Tidak boleh: menyimpan secrets di kode
