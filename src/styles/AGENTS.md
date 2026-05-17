# src/styles/ -- Global Styles

## Fungsi

Global styles, Tailwind CSS configuration extensions, CSS custom properties, font definitions, animation keyframes.

## Aturan Development

- Component-specific styles → inline Tailwind di component file
- Global styles hanya untuk: CSS variables, font faces, base resets
- Tailwind config extensions di file terpisah

## Convention

- Nama file: `globals.css`, `variables.css`, `fonts.css`, `animations.css`
- Naming CSS variables: `--color-*`, `--spacing-*`, `--radius-*`
- CSS classes: kebab-case

## Dependency Boundaries

- Tidak boleh import dari folder project manapun
- CSS imports hanya dari node_modules atau file css lain

## Best Practices

- Hindari !important -- gunakan specificity yang tepat
- CSS variables untuk design tokens yang reused
- Test dark mode dengan Tailwind `dark:` variant

## AI Do's / Don'ts

- Boleh: menambah CSS variables, global styles
- Tidak boleh: menaruh component styles di global CSS
