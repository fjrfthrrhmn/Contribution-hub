# Style Guide & Design Conventions

> Panduan penggunaan shadcn/ui, Tailwind CSS v4, dan design tokens.

---

## shadcn/ui Usage Convention

### Installation

```bash
# Install per-component (jangan bulk install)
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
npx shadcn@latest add toast
```

### Kustomisasi

- **Jangan** edit file komponen shadcn secara langsung
- Kustomisasi via `className` prop
- Gunakan `cn()` utility untuk conditional classes
- Jika perlu variant baru, gunakan `cva` (class-variance-authority)

```tsx
// ✅ Kustomisasi via className
<Button className="w-full md:w-auto">
  Submit
</Button>

// ✅ Conditional classes dengan cn()
<Dialog className={cn(
  "max-w-md",
  isWide && "max-w-2xl"
)}>
```

### Component Pattern

```tsx
// Import dari @/components/ui/
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Gunakan langsung, jangan buat wrapper
function MyForm() {
	return (
		<form>
			<Input placeholder="Email" />
			<Button type="submit">Kirim</Button>
		</form>
	)
}
```

---

## Tailwind CSS v4 Convention

### Design Tokens (via CSS Variables)

```css
/* src/styles/globals.css */
:root {
	--color-primary: oklch(0.5 0.2 240);
	--color-surface: oklch(0.97 0 0);
	--spacing-page: 2rem;
	--radius-card: 0.75rem;
}
```

### Utility Classes

```tsx
// ✅ Utility-first approach
<div className="flex items-center gap-4 p-6 rounded-xl bg-surface shadow-sm">
  <h2 className="text-lg font-semibold">Title</h2>
</div>

// ❌ Hindari inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Responsive Pattern (Mobile-First)

```tsx
// Base = mobile, sm = tablet, md = desktop, lg = wide
<div className="
  grid grid-cols-1        /* Mobile: 1 column */
  sm:grid-cols-2          /* Tablet: 2 columns */
  lg:grid-cols-3          /* Desktop: 3 columns */
  gap-4
">
```

### Dark Mode

```tsx
// Gunakan dark: variant
<div className="
  bg-white
  dark:bg-gray-900
  text-gray-900
  dark:text-gray-100
">
```

---

## Component Hierarchy

```
UI Kit (shadcn/ui)          → Button, Input, Badge, Card
    ↓
Layouts                     → AppHeader, AppFooter, Sidebar, PageContainer
    ↓
Widgets                     → UserCard, DataTable, ConfirmModal, SearchBar
    ↓
Feature Components          → LoginForm, PostList, ProfileCard
```

---

## Spacing & Layout

| Token       | Value  | Usage           |
| ----------- | ------ | --------------- |
| `gap-2`     | 8px    | Dense elements  |
| `gap-4`     | 16px   | Default spacing |
| `gap-6`     | 24px   | Section spacing |
| `p-6`       | 24px   | Card padding    |
| `p-8`       | 32px   | Page padding    |
| `max-w-7xl` | 1280px | Page max width  |

---

## Typography

| Element | Class                               |
| ------- | ----------------------------------- |
| H1      | `text-3xl font-bold tracking-tight` |
| H2      | `text-2xl font-semibold`            |
| H3      | `text-xl font-semibold`             |
| Body    | `text-base`                         |
| Small   | `text-sm text-muted-foreground`     |

---

## Related Documents

- [Tech Stack](../technical/tech-stack.md)
- [Engineering Principles](../engineering/engineering-principles.md)
