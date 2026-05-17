# src/features/ -- Feature Modules

## Fungsi

Feature modules mandiri berdasarkan Feature-Sliced Design (FSD). Setiap fitur adalah module lengkap dengan dependencies internal sendiri.

## Struktur Feature

```
src/features/awesome-feature/
├── api/         # API calls dan hooks untuk fitur ini
├── components/  # Komponen spesifik fitur
├── hooks/       # Hooks spesifik fitur
├── data/        # Data dan constants spesifik fitur
├── shared/      # Shared dalam satu fitur (components, hooks, utils)
├── stores/      # State management spesifik fitur
├── types/       # Type definitions spesifik fitur
├── utils/       # Utility functions spesifik fitur
└── index.ts     # Barrel export -- public API module
```

## Aturan Development

- Feature harus self-contained -- bisa berdiri sendiri
- Tidak boleh import dari feature lain secara langsung
- Gunakan shared/ layer untuk intra-feature sharing
- Public API via index.ts barrel export

## Convention

- Nama folder fitur: kebab-case (`auth`, `user-profile`, `movie-list`)
- Barrel export hanya dari index.ts
- Internal module tidak boleh di-import dari luar

## Dependency Boundaries

- Boleh import: shared/, features lain via @x pattern (jika di-allow)
- Tidak boleh: circular dependencies antar features
- Tidak boleh: import langsung dari internal file feature lain

## Best Practices

- Fitur kecil lebih baik dari fitur besar
- Satu fitur = satu tanggung jawab bisnis
- Feature bisa di-test secara independen

## AI Do's / Don'ts

- Boleh: membuat feature baru dengan struktur lengkap
- Tidak boleh: import langsung dari internal file feature lain
