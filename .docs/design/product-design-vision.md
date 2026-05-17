# Product Design Vision -- Contribution Hub

> Visi desain, design language, dan prinsip UI/UX untuk Contribution Hub.

---

## Design Philosophy

Contribution Hub adalah tools untuk developer, oleh developer. Desainnya harus mencerminkan:

1. **Developer-first** -- Efisien, keyboard-friendly, data-dense
2. **Clean & Focused** -- Tidak ada elemen yang tidak perlu
3. **Dark-mode native** -- Developer menghabiskan banyak waktu di terminal/IDE
4. **Data-rich** -- Informasi disajikan dengan visualisasi yang informatif
5. **Professional** -- Cocok untuk personal branding dan portofolio
6. **Cost-Conscious** -- Desain yang efisien secara resources, mendukung arsitektur free-first

## Design Principles

### 1. Less is More

Setiap elemen di layar harus punya tujuan. Jika sebuah elemen bisa dihapus tanpa mengurangi fungsi, hapus.

### 2. Information Hierarchy

Data aktivitas disajikan dengan hierarki yang jelas:

- **Overview** (angka besar, streak status) -- paling menonjol
- **Detail** (activity list, breakdown) -- bisa diakses dengan scroll/click
- **Insight** (pola, rekomendasi) -- supplemental, tidak mengganggu

### 3. Progressive Disclosure

Jangan membebani pengguna dengan semua informasi sekaligus:

- Dashboard: overview saja
- Klik untuk detail
- Navigasi ke halaman spesifik untuk analisis mendalam

### 4. Delightful but Not Distracting

Animasi dan interaksi harus:

- Memberikan feedback yang jelas (bukan hiasan)
- Meninggalkan kesan premium (smooth, responsive)
- Tidak menghalangi pengguna mencapai tujuannya

### 5. Mobile-Responsive

Developer tidak selalu di depan komputer. Dashboard harus bisa diakses dari smartphone untuk quick check.

## Color Palette

Palet warna menggunakan CSS variables yang didefinisikan di `src/styles/globals.css`. Gunakan semantic tokens (`bg-background`, `text-foreground`, `border-border`) -- jangan hardcode warna.

### Tokens Utama (dari globals.css)

| Token                | Dark Mode              | Light Mode             | Usage                   |
| -------------------- | ---------------------- | ---------------------- | ----------------------- |
| `--background`       | oklch(0.141 0.005 ...) | oklch(1 0 0)           | Main background         |
| `--foreground`       | oklch(0.985 0 0)       | oklch(0.141 0.005 ...) | Primary text            |
| `--card`             | oklch(0.141 0.005 ...) | oklch(1 0 0)           | Card/section background |
| `--muted-foreground` | oklch(0.705 0.015 ...) | oklch(0.552 0.016 ...) | Secondary text          |
| `--border`           | oklch(0.274 0.006 ...) | oklch(0.92 0.004 ...)  | Borders, dividers       |
| `--primary`          | oklch(0.985 0 0)       | oklch(0.21 0.006 ...)  | Primary accent, buttons |
| `--destructive`      | oklch(0.577 0.245 ...) | oklch(0.577 0.245 ...) | Error, negative metric  |

> **Jangan gunakan warna hardcode.** Semua warna diakses melalui semantic tokens. Palet warna hardcode yang tercantum di dokumen sebelumnya sudah obsolete -- gunakan globals.css sebagai single source of truth.

## Typography

**Single source of truth:** `src/components/ui/typography.tsx`

Project ini menggunakan font **Geist** (dari next/font/google) yang dikonfigurasi di `src/config/fonts.ts`. BUKAN Inter. Geist otomatis di-inject melalui CSS variables `--font-sans` dan `--font-mono` di root layout.

### Komponen Typography

Semua teks menggunakan komponen terpusat:

```tsx
import Typography from "@/components/ui/typography"

const { Title, Text } = Typography

// Heading: variant = "{level}/{weight}"
<Title variant="1/bold">        // h1, 2.5rem, bold
<Title variant="2/semibold">    // h2, 2.25rem, semibold
<Title variant="3/medium">      // h3, 1.875rem, medium

// Body: variant = "{size}/{weight}"
<Text variant="md/normal">      // 1.125rem, normal (default)
<Text variant="sm/bold">        // 1rem, bold
<Text variant="xs/normal">      // 0.875rem, normal

// Ubah elemen HTML dengan prop "as"
<Text as="code" variant="sm/medium">  // <code> element
<Text as="span" variant="xs/normal">  // <span> element
```

> **Referensi lengkap** tentang variant yang tersedia ada di `src/components/ui/typography.tsx` dan `.docs/design/guide-style.md`. Jangan menduplikasi informasi typography di dokumen ini.

### Aturan Penting

1. Jangan gunakan `<h1>`-`<h6>` atau `<p>` secara langsung. Gunakan `<Title>` dan `<Text>`.
2. Jangan hardcode font-family. Font dikelola oleh config.
3. Jangan hardcode ukuran font yang sudah ada di komponen typography.
4. Untuk komponen shadcn/ui (Button, Input, Card, dll), gunakan styling default mereka.

## Layout Structure

```
┌─────────────────────────────────────────────┐
│  Header (Logo + Navigation + User Avatar)    │
├──────────────────┬──────────────────────────┤
│  Sidebar         │  Main Content             │
│  ─────────       │  ─────────────            │
│  • Dashboard     │  [Page Content]           │
│  • Activity      │                           │
│  • Streaks       │                           │
│  • Reports       │                           │
│  • Profile       │                           │
│  • Settings      │                           │
├──────────────────┴──────────────────────────┤
│  Footer (minimal)                            │
└─────────────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Layout                                 |
| ---------- | -------------------------------------- |
| < 768px    | Single column, sidebar jadi bottom nav |
| 768-1024px | Collapsible sidebar                    |
| max 1280px | Full sidebar + content                 |

## Key UI Components

### Activity Timeline

Activity timeline adalah komponen sentral. Desainnya harus:

- Setiap aktivitas memiliki ikon yang jelas (commit, PR, issue, review)
- Timeline vertikal dengan timestamp yang jelas
- Color-coded berdasarkan kategori
- Clickable untuk melihat detail
- Infinite scroll atau pagination

### Streak Display

Streak display harus menjadi focal point dashboard:

```
┌─────────────────────┐
│  Current Streak      │
│  🔥 14 days          │
│                      │
│  ┌─────────────────┐ │
│  │ Progress Bar     │ │
│  │ ████████░░░░ 60% │ │
│  │ menuju 30 days   │ │
│  └─────────────────┘ │
│                      │
│  Longest: 21 days    │
└─────────────────────┘
```

### Stats Cards

Setiap stat card memiliki:

- Ikon yang merepresentasikan metrik
- Angka besar (nilai utama)
- Label
- Trend indicator (naik/turun dari periode sebelumnya)

### Activity Graph

Heatmap style graph (seperti GitHub contribution graph) tapi:

- Bisa di-filter per kategori aktivitas
- Tooltip yang informatif (bukan hanya jumlah)
- Weekly breakdown yang lebih detail

## Micro-Interactions

### Streak Animation

Ketika streak bertambah:

- Angka streak "flip" seperti counter
- Animasi api/glow ringan
- Konfirmasi visual (ceklis atau pulse)

### Goal Completion

Ketika goal tercapai:

- Progress bar mengisi dengan animasi smooth
- Celebratory toast (sonner) yang subtle
- Sound effect (opsional, off by default)

### Dark/Light Mode Transition

Smooth transition dengan CSS `transition` pada CSS variables. Durasi 200ms ease.

## Dashboard Layout (Wireframe)

```
┌──────────────────────────────────────────────────┐
│  💻 Contribution Hub           👤 Profile  ⚙️   │
├────────┬─────────────────────────────────────────┤
│        │  Good morning, Rama!                     │
│ 📊     │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ Dash   │  │🔥 14 │ │📝 156│ │👁 23 │ │⭐ 87%│   │
│        │  │Streak│ │Commts│ │Review│ │Goals │   │
│ 📋     │  └──────┘ └──────┘ └──────┘ └──────┘   │
│ Activ  │                                          │
│        │  ┌────────────────────────────────────┐  │
│ 🔥     │  │ Weekly Activity Graph              │  │
│ Streak │  │  ▓▓▓░▓▓▓▓▓░▓▓░▓▓▓▓░▓░░▓▓▓▓░▓▓   │  │
│        │  │  M  T  W  T  F  S  S              │  │
│ 📋     │  └────────────────────────────────────┘  │
│ Report │                                          │
│        │  ┌────────────────────────────────────┐  │
│ 👤     │  │ Recent Activity                    │  │
│ Profile│  │ ┌──────────────────────────────┐   │  │
│        │  │ │🚀 Pushed to feature/auth     │   │  │
│        │  │ │📅 2 hours ago  • 3 commits   │   │  │
│        │  │ ├──────────────────────────────┤   │  │
│ ⚙️     │  │ │🔀 Opened PR #42: Add login  │   │  │
│ Sett   │  │ │📅 5 hours ago               │   │  │
│        │  │ └──────────────────────────────┘   │  │
│        │  └────────────────────────────────────┘  │
└────────┴──────────────────────────────────────────┘
```

## Accessibility

- Semantic HTML (nav, main, section, article)
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators yang jelas
- ARIA labels untuk ikon dan interactive elements
- Screen reader friendly untuk data chart/grafik
- Color contrast ratio minimal 4.5:1

## Component Patterns

### ActivityCard

```tsx
<ActivityCard
	type="commit"
	repository="user/project"
	description="Add authentication middleware"
	timestamp={new Date()}
	metadata={{ commits: 3, branch: "feat/auth" }}
/>
```

### StreakBadge

```tsx
<StreakBadge current={14} longest={21} type="coding" milestone={30} />
```

### StatsCard

```tsx
<StatsCard
	icon={GitCommit}
	value={156}
	label="Total Commits"
	trend={{ direction: "up", value: 12 }}
/>
```

---

## Related Documents

- [Style Guide](./guide-style.md)
- [Tech Stack](../technical/tech-stack.md)
- [Product Definition](../product/definition.md)
