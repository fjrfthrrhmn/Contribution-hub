# src/components/ -- Shared Components

## Fungsi

Pusat komponen shared yang digunakan di seluruh aplikasi. Dibagi menjadi 4 sub-folder berdasarkan tingkat kompleksitas.

## Struktur

```
components/
├── ui/         # Atomic UI kit (button, input, badge)
├── layouts/    # Layout components (header, footer, sidebar)
├── widgets/    # Composite widgets (card, modal, table)
└── providers/  # Provider wrappers (theme, query, auth)
```

## Aturan Development

- Komponen spesifik fitur → `src/features/<fitur>/components/`
- Komponen yang dipakai 2+ fitur → shared components
- Gunakan `cn()` utility untuk conditional classes

## Convention

- Naming: kebab-case.tsx untuk file, PascalCase untuk component
- Setiap komponen bisa punya `*.types.ts` untuk props

## Dependency Boundaries

- Boleh import: dari sesama components (ui → layouts), utils, hooks
- Tidak boleh: import dari features/, app/

## AI Do's / Don'ts

- Boleh: membuat komponen UI baru sesuai pattern yang ada
- Tidak boleh: menambah dependencies baru untuk komponen
