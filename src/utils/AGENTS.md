# src/utils/ -- Utility Functions

## Fungsi

Pure functions yang dapat di-test secara unit: formatters (date, number, currency), validators, string utils, array utils, cn() helper.

## Aturan Development

- Pure function = same input always = same output
- No side effects, no React imports, no browser APIs
- Setiap function minimal 1 unit test (target coverage 90%+)

## Convention

- Nama file: `format-date.ts`, `cn.ts`, `validate-email.ts`, `string-utils.ts`
- Satu file = satu kategori fungsi
- Function names: camelCase, deskriptif

## Dependency Boundaries

- Boleh import: types/, constants/
- Tidak boleh: import dari app/, components/, features/, lib/, hooks/
- Tidak boleh: import React atau browser-specific APIs

## Best Practices

- Gunakan default parameter, jangan mutasi arguments
- Error handling via return value, jangan throw untuk expected cases
- Tree-shakeable exports (named exports, jangan default export object)

## AI Do's / Don'ts

- Boleh: menambah utility functions, unit test
- Tidak boleh: menaruh side effects atau API calls di utils
