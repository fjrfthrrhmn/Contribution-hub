# src/i18n/ -- Internationalization

## Fungsi

Internationalization setup: next-intl configuration, locale routing, message files, date/number formatting, RSC/RCC i18n patterns.

## Aturan Development

- Messages di folder per locale: `en.json`, `id.json`
- Gunakan ICU message syntax untuk pluralization
- Server Components: i18n via `next-intl/server`
- Client Components: i18n via `next-intl/client`

## Convention

- Nama file: `routing.ts`, `request.ts`, `config.ts`
- Translation keys: nested object dengan dot notation
- Namespace messages per feature jika besar

## Dependency Boundaries

- Boleh import: config/, types/
- Tidak boleh: import dari app/, components/, features/ secara langsung

## Best Practices

- Default locale = id (Indonesia)
- Fallback locale untuk key yang belum di-translate
- Gunakan namespace untuk messages yang besar
- Hindari HTML di translation strings

## AI Do's / Don'ts

- Boleh: menambah locale baru, memperbaiki translation
- Tidak boleh: hardcode user-facing strings di komponen
