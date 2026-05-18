# Style Guide & Design Conventions

> Panduan penggunaan shadcn/ui, Tailwind CSS v4, dan design tokens.
> **Single source of truth untuk typography di `src/components/ui/typography.tsx`.**

---

## Typography System

Typography system di project ini menggunakan tiga font dari `next/font/google` yang dikonfigurasi melalui CSS variables:

| Variabel CSS   | Font              | Berat Tersedia      | Penggunaan                   |
| -------------- | ----------------- | ------------------- | ---------------------------- |
| `--font-sans`  | **DM Sans**       | Variable (100-1000) | Body text, heading, UI umum  |
| `--font-serif` | **Lora**          | Variable (400-700)  | Quotes, heading aksen        |
| `--font-mono`  | **IBM Plex Mono** | 400, 500, 600, 700  | Code, terminal, angka teknis |

**JANGAN gunakan font manual atau hardcode font-family** -- font sudah dikonfigurasi di `src/config/fonts.ts` dan di-inject di root layout.

### Komponen Typography

Seluruh typography menggunakan komponen terpusat di `src/components/ui/typography.tsx`. Jangan gunakan elemen HTML mentah (`<h1>`, `<p>`) tanpa komponen ini.

#### Title Component

Untuk heading, gunakan komponen `Title` dengan prop `variant` berformat `{level}/{weight}`:

```tsx
import Typography from "@/components/ui/typography"

const { Title, Text } = Typography

<Title variant="1/bold">       // <h1> text-4xl md:text-5xl font-bold
<Title variant="2/semibold">   // <h2> text-3xl md:text-4xl font-semibold
<Title variant="3/medium">     // <h3> text-2xl md:text-3xl font-medium
<Title variant="4/normal">     // <h4> text-xl md:text-2xl font-normal
<Title variant="5/light">      // <h5> text-lg md:text-xl
<Title variant="6/bold">       // <h6> text-base md:text-lg font-bold
```

**Level** yang tersedia: `1 | 2 | 3 | 4 | 5 | 6` (memetakan ke `<h1>` hingga `<h6>`)
**Weight** yang tersedia: `normal | medium | semibold | bold | extrabold | black`

#### Text Component

Untuk body text, gunakan komponen `Text` dengan prop `variant` berformat `{size}/{weight}`:

```tsx
<Text variant="xl/normal">     // text-2xl font-normal
<Text variant="lg/medium">     // text-xl font-medium
<Text variant="md/semibold">   // text-lg font-semibold (DEFAULT)
<Text variant="sm/bold">       // text-base font-bold
<Text variant="xs/normal">     // text-sm font-normal
```

**Size** yang tersedia: `xl | lg | md | sm | xs`
**Weight** yang tersedia: `normal | medium | semibold | bold | black`

Text component juga menerima prop `as` untuk mengubah elemen HTML:

```tsx
<Text as="code" variant="sm/medium">  // <code> dengan styling text
<Text as="span" variant="xs/normal">  // <span> dengan styling text
<Text as="kbd">                        // <kbd> untuk keyboard shortcut
```

### Aturan Penggunaan

```tsx
// ✅ WAJIB: Gunakan komponen Typography
<Title variant="1/bold">Dashboard</Title>
<Text variant="md/normal">Selamat datang kembali!</Text>
<Text variant="sm/normal" as="span">Detail aktivitas</Text>

// ❌ DILARANG: Hardcode heading dengan Tailwind manual
<h1 className="text-3xl font-bold">Dashboard</h1>

// ❌ DILARANG: Hardcode font-family
<p style={{ fontFamily: "Inter" }}>Teks</p>

// ❌ DILARANG: Mengubah font di komponen secara langsung
// Font sudah dikonfigurasi global di src/config/fonts.ts
```

### Pengecualian

Untuk komponen shadcn/ui yang sudah memiliki styling sendiri (Button, Input, Card, dll), gunakan styling default komponen tersebut. Jangan paksakan `<Text>` component di dalamnya.

---

## Design Tokens

### Warna

Semua warna didefinisikan di `src/styles/globals.css` sebagai CSS variables dan di-binding ke Tailwind `@theme inline` directive. Gunakan semantic tokens -- jangan hardcode hex values.

```tsx
// ✅ Gunakan semantic tokens
<div className="bg-background text-foreground">
<div className="border border-border rounded-xl">

// ❌ Jangan hardcode warna
<div className="bg-white text-black">
```

### Radius

Default radius `1.5rem` memberikan tampilan pill-like pada UI. Variasi:

| Token          | Value              | Penggunaan              |
| -------------- | ------------------ | ----------------------- |
| `rounded-sm`   | calc(1.5rem - 4px) | Badge, tag kecil        |
| `rounded-md`   | calc(1.5rem - 2px) | Button, input           |
| `rounded-lg`   | 1.5rem             | Card, dialog, container |
| `rounded-xl`   | calc(1.5rem + 4px) | Modal besar, page       |
| `rounded-full` | 9999px             | Avatar, pill            |

### Shadow

Shadow menggunakan HSL dengan opacity yang berbeda antara light dan dark mode. Gunakan semantic shadow utilities:

```tsx
// ✅ Gunakan shadow utilities
<div className="shadow-sm">        <!-- card subtle -->
<div className="shadow-md">        <!-- dropdown, popover -->
<div className="shadow-lg">        <!-- modal, dialog -->

// ❌ Jangan hardcode shadow values
<div style="box-shadow: 0 2px 5px rgba(0,0,0,0.07)">
```

### Spacing

Base spacing unit: `0.27rem`. Spacing scale mengikuti multiplikasi dari base unit ini. Tailwind spacing utilities (`p-1`, `gap-2`, `m-4`, dll) sudah menggunakan scale ini.

| Tailwind    | Value              | Penggunaan      |
| ----------- | ------------------ | --------------- |
| `gap-2`     | ~8px (2 x 0.27rem) | Dense elements  |
| `gap-4`     | ~16px              | Default spacing |
| `gap-6`     | ~24px              | Section spacing |
| `p-6`       | ~24px              | Card padding    |
| `p-8`       | ~32px              | Page padding    |
| `max-w-7xl` | 1280px             | Page max width  |

---

## shadcn/ui Usage Convention

### Installation

```bash
# Install per-component (jangan bulk install)
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add table
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

Design tokens didefinisikan di `src/styles/globals.css` menggunakan CSS variables dengan prefix `--color-*`, `--radius-*`, `--shadow-*`. Semua token di-binding ke Tailwind `@theme inline` directive:

```css
/* src/styles/globals.css -- jangan duplikasi di file lain */
@theme inline {
	--color-background: var(--background);
	--color-primary: var(--primary);
	--radius-lg: var(--radius);
	--shadow-md: var(--shadow-md);
}
```

Gunakan token ini di komponen:

```tsx
// ✅ Gunakan semantic tokens
<div className="bg-background text-foreground rounded-xl shadow-sm">
<div className="border border-border">
```

### Utility Classes

```tsx
// ✅ Utility-first approach
<div className="flex items-center gap-4 p-6 rounded-xl bg-card shadow-sm">
  <Title variant="2/semibold">Title</Title>
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
  bg-background
  dark:bg-card
  text-foreground
  dark:text-muted-foreground
">
```

---

## Component Hierarchy

```
UI Kit (shadcn/ui)          -> Button, Input, Badge, Card
    |
Layouts                     -> AppShell (sidebar), PageContainer
    |
Widgets                     -> StatsCard, ActivityTimeline, StreakBadge
    |
Feature Components          -> LoginForm, ActivityList, DashboardGrid
```

---

## Form Convention

Form menggunakan **React Hook Form + Zod** dengan komponen form dari shadcn/ui.

Lihat template form di `src/components/widgets/auth-form.tsx` untuk contoh implementasi.

### Pattern Dasar

```tsx
"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z.string().min(8, "Minimal 8 karakter")
})

function LoginForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "", password: "" }
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Handle submission
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
```

---

## Related Documents

- [Typography Component Source](../../src/components/ui/typography.tsx) -- Single source of truth
- [Product Design Vision](./product-design-vision.md)
- [Tech Stack](../technical/tech-stack.md)
- [Engineering Principles](../engineering/engineering-principles.md)
