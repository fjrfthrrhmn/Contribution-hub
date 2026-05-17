# src/components/widgets/ -- Composite Widgets

## Fungsi

Komponen komposit yang menggabungkan beberapa UI primitives menjadi satu unit fungsional: cards, modals, data tables, form groups, search bars.

## Aturan Development

- Widget bisa punya state internal sendiri (form state, open/close)
- Props harus explicit interface, jangan spread sembarangan
- Satu widget = satu tanggung jawab spesifik

## Convention

- Nama: `user-card.tsx`, `data-table.tsx`, `confirm-modal.tsx`
- Props type: `UserCardProps`, `DataTableProps`
- File type terpisah jika types kompleks: `data-table.types.ts`

## Dependency Boundaries

- Boleh import: ui/, layouts/, hooks, utils
- Tidak boleh: import dari features/ secara langsung

## Best Practices

- Widget boleh komposisi dari UI components
- Data fetching via props/passing, jangan langsung di widget
- Test dengan stories untuk visual regression (jika ada)

## AI Do's / Don'ts

- Boleh: membuat widget baru dari UI primitives
- Tidak boleh: fetch data langsung dari widget
