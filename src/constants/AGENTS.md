# src/constants/ -- Global Constants

## Fungsi

Constants global yang digunakan di seluruh aplikasi: magic numbers, enum values, default values, regex patterns, limit constants.

## Aturan Development

- Semua constants menggunakan UPPER_CASE dengan underscore
- Group constants dalam object atau namespace
- Gunakan `as const` untuk literal type inference

## Convention

- Nama file: `index.ts`, `api.ts`, `limits.ts`, `regex.ts`
- Export: `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`, `EMAIL_REGEX`
- Gunakan `export const` untuk setiap constant

## Dependency Boundaries

- Tidak boleh import dari folder manapun (constants harus independent)
- Tidak boleh import React atau library eksternal

## Best Practices

- Eliminasi magic numbers -- semua angka misterius jadi constant
- Gunakan enum atau union type untuk finite values
- Constants yang sering berubah → pindahkan ke config/

## AI Do's / Don'ts

- Boleh: menambah constants baru, merefactor magic numbers
- Tidak boleh: menaruh business logic di constants
