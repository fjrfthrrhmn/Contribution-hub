# design/ -- Dokumentasi Desain

> Design system, UI/UX guidelines, komponen, dan prinsip visual.

---

## Tujuan

Folder ini berisi dokumentasi desain yang mencakup:

- Design system dan design tokens
- Component library documentation
- UI/UX guidelines dan best practices
- Aksesibilitas (a11y) standards
- Layout dan spacing system
- Typography dan color palette
- Animasi dan transition patterns
- Responsive design guidelines

---

## Struktur yang Direkomendasikan

```txt
design/
├── README.md              # File ini -- panduan folder
├── design-tokens.md       # Warna, typography, spacing, shadow
├── component-patterns.md  # Pattern dan best practices komponen
├── accessibility.md       # Standar aksesibilitas
├── responsive.md          # Responsive design breakpoints
└── assets/                # Mockups, wireframes, screenshots
```

---

## Template Component Documentation

```markdown
# Component: [Nama Komponen]

## Usage

[Kapan dan bagaimana komponen ini digunakan]

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
|      |      |         |             |

## Variants

[Variant 1, Variant 2, ...]

## States

- Default
- Hover
- Active
- Disabled
- Error
- Loading

## Examples

[Kode contoh penggunaan]

## Accessibility

[ARIA attributes, keyboard navigation, screen reader notes]
```

---

## Design Principles

1. **Consistency** -- Gunakan design tokens, jangan hardcode values
2. **Accessibility first** -- Setiap komponen harus accessible by default
3. **Responsive** -- Mobile-first, semua komponen harus responsive
4. **Performance** -- Hindari layout shift, optimalkan animasi
5. **Progressive enhancement** -- Fungsi dasar tetap berjalan tanpa JS

---

## Integrasi dengan Kode

- Design tokens diimplementasikan di `tailwind.config`
- Komponen UI ada di `src/components/ui/`
- Layout patterns ada di `src/components/layouts/`
- Pastikan dokumentasi selalu sesuai dengan implementasi
