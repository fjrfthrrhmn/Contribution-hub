# src/components/ui/ -- UI Kit

## Fungsi

Atomic UI components -- building block terkecil dari sistem desain. Berbasis shadcn/ui + Radix UI primitives.

## Aturan Development

- Satu komponen = satu file
- Aksesible by default (ARIA, keyboard nav, focus management)
- Menggunakan Tailwind utility classes, NO inline styles
- Props selalu extends dari HTMLAttributes atau specific interface

## Convention

- Nama file: kebab-case (button.tsx, input.tsx, badge.tsx)
- Nama component: PascalCase (Button, Input, Badge)
- Props type: `ButtonProps`, `InputProps`

## Dependency Boundaries

- Boleh import: utils (cn), hooks (use-id)
- Tidak boleh: import dari features/, stores, lib
- Tidak boleh: business logic, API calls

## Best Practices

- Forward ref dengan `forwardRef`
- Spread props pattern untuk flexibility
- Gunakan `cva` (class-variance-authority) untuk variants

## AI Do's / Don'ts

- Boleh: menambah variant, memperbaiki aksesibilitas
- Tidak boleh: menambah business logic di komponen UI
