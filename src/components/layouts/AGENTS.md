# src/components/layouts/ -- Layout Components

## Fungsi

Komponen layout yang mendefinisikan struktur halaman: header, footer, sidebar, container, shell layout.

## Aturan Development

- Layout components hanya mengatur struktur, bukan konten
- Gunakan `children` prop / slot pattern untuk konten dinamis
- Responsive: mobile-first dengan breakpoints Tailwind

## Convention

- Nama: `app-header.tsx`, `app-footer.tsx`, `sidebar.tsx`, `page-container.tsx`
- Satu layout component = satu file

## Dependency Boundaries

- Boleh import: ui/ components, utils
- Tidak boleh: import dari features/, stores
- Tidak boleh: data fetching langsung

## Best Practices

- Layout harus tetap stabil saat navigasi (no re-mount)
- Hindari layout shift dengan dimensi eksplisit
- Gunakan CSS Grid atau Flexbox untuk struktur

## AI Do's / Don'ts

- Boleh: membuat layout baru, memperbaiki responsive layout
- Tidak boleh: menempatkan business logic di layout components
