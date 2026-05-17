# src/lib/ -- Integrations & Library Code

## Fungsi

Integrasi dengan pihak ketiga: API client initialization, database clients, third-party service wrappers, utility libraries.

## Aturan Development

- Setiap integration = satu file atau satu folder
- Wrapper pattern: abstraction di atas library eksternal
- Error handling yang robust di setiap integration point

## Convention

- Nama file: `api-client.ts`, `db.ts`, `auth.ts`, `email.ts`
- Instance singleton pattern untuk client (api, db)
- Config via parameter, jangan hardcode

## Dependency Boundaries

- Boleh import: config/, types/, constants/
- Tidak boleh: import dari app/, components/, features/
- Tidak boleh: React atau JSX

## Best Practices

- Jangan expose library internal ke luar lib/
- Retry logic untuk network calls
- Timeout handling untuk semua external calls

## AI Do's / Don'ts

- Boleh: menambah integration baru, refactor client code
- Tidak boleh: bypass abstraction dan panggil library langsung
