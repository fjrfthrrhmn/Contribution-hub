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

> **Single source of truth untuk warna:** `src/styles/globals.css` -- semua perubahan warna hanya di file ini.

### Tokens Utama

| Token                | Dark Mode | Light Mode | Usage                   |
| -------------------- | --------- | ---------- | ----------------------- |
| `--background`       | `#0a0b0c` | `#fdfdfd`  | Main background         |
| `--foreground`       | `#e1e3e6` | `#1a1c1e`  | Primary text            |
| `--card`             | `#131416` | `#ffffff`  | Card/section background |
| `--muted-foreground` | `#8a9098` | `#6e737a`  | Secondary text          |
| `--border`           | `#2e3035` | `#d4d6da`  | Borders, dividers       |
| `--primary`          | `#51f0a8` | `#51f0a8`  | Primary accent, buttons |
| `--destructive`      | `#e74c3c` | `#e74c3c`  | Error, negative metric  |
| `--ring`             | `#51f0a8` | `#51f0a8`  | Focus ring              |

### Primary Color: Mint Green (#51f0a8)

Warna hijau mint (`#51f0a8`) digunakan untuk elemen-elemen berikut:

- Tombol aksi utama (primary button)
- Focus ring pada input dan interactive elements
- Highlight pada aktivitas coding/commit
- Progress indicator (streak, goals)
- Active state pada navigasi

### Palet Lengkap

Referensi ke `src/styles/globals.css` untuk palet chart (`--chart-1` hingga `--chart-5`) dan warna lainnya. Jangan menduplikasi nilai warna di dokumen ini.

> **Jangan gunakan warna hardcode.** Semua warna diakses melalui semantic tokens.

## Typography

**Single source of truth:** `src/components/ui/typography.tsx`

Project ini menggunakan tiga jenis font:

| Variabel CSS   | Font              | Jenis                 |
| -------------- | ----------------- | --------------------- |
| `--font-sans`  | **DM Sans**       | Sans-serif (default)  |
| `--font-serif` | **Lora**          | Serif (quote/heading) |
| `--font-mono`  | **IBM Plex Mono** | Monospace (code)      |

Font di-load melalui `next/font/google` di `src/config/fonts.ts` dan di-inject via CSS variables di root layout.

### Komponen Typography

Semua teks menggunakan komponen terpusat:

```tsx
import Typography from "@/components/ui/typography"

const { Title, Text } = Typography

// Heading: variant = "{level}/{weight}"
<Title variant="1/bold">        // h1, 2.5rem, bold
<Title variant="2/semibold">    // h2, 2.25rem, semibold
<Title variant="3/medium">      // h3, 1.875rem, medium
<Title variant="4/medium">
<Title variant="5/medium">
<Title variant="6/medium">

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

## Spacing & Radius

Project ini menggunakan base spacing unit `0.27rem` dan radius `1.5rem` untuk konsistensi visual:

| Token       | Value     | Keterangan                             |
| ----------- | --------- | -------------------------------------- |
| `--spacing` | `0.27rem` | Base spacing unit untuk scale Tailwind |
| `--radius`  | `1.5rem`  | Border radius default (rounded-xl)     |

Radius `1.5rem` memberikan tampilan yang soft, pill-like pada card, button, dan container. Untuk variasi radius, gunakan semantic tokens:

- `--radius-sm`: calc(1.5rem - 4px) -- elemen kecil (badge, tag)
- `--radius-md`: calc(1.5rem - 2px) -- button, input
- `--radius-lg`: 1.5rem -- card, dialog (default)
- `--radius-xl`: calc(1.5rem + 4px) -- container besar, modal

## Shadow System

Shadow menggunakan HSL dengan opacity yang bervariasi antara light dan dark mode:

| Token          | Light Opacity | Dark Opacity | Elevasi       |
| -------------- | ------------- | ------------ | ------------- |
| `--shadow-2xs` | 0.05          | 0.25         | Paling rendah |
| `--shadow-xs`  | 0.06          | 0.26         | Sangat rendah |
| `--shadow-sm`  | 0.07          | 0.27         | Rendah        |
| `--shadow-md`  | 0.08          | 0.28         | Sedang        |
| `--shadow-lg`  | 0.09          | 0.29         | Tinggi        |
| `--shadow-xl`  | 0.10          | 0.30         | Sangat tinggi |
| `--shadow-2xl` | 0.11          | 0.31         | Paling tinggi |

Dark mode memiliki opacity shadow yang lebih tinggi untuk mempertahankan depth perception pada background gelap.

## Layout Structure

```
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|  Header (Logo + Navigation + User Avatar)           |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|  Sidebar         |  Main Content                     |
|  --+--+--+--     |  --+--+--+--+--+--+--+--+--+--   |
|  . Dashboard     |  [Page Content]                   |
|  . Activity      |                                   |
|  . Streaks       |                                   |
|  . Reports       |                                   |
|  . Profile       |                                   |
|  . Settings      |                                   |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|  Footer (minimal)                                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
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
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|  Current Streak                                      |
|  [flame] 14 days                                     |
|                                                      |
|  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+ |
|  | Progress Bar     ████████░░░░ 60%                | |
|  | menuju 30 days                                    | |
|  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+ |
|                                                      |
|  Longest: 21 days                                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
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
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|  Contribution Hub                         Profile  Settings        |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|        |  Good morning, Rama!                                     |
|        |  +------+ +------+ +------+ +------+                     |
| Stats  |  | 14   | | 156  | |  23  | | 87%  |                     |
|        |  |Streak| |Commts| |Review| |Goals |                     |
|        |  +------+ +------+ +------+ +------+                     |
| Activ  |                                                          |
|        |  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |
| Streak |  | Weekly Activity Graph                                |  |
|        |  |  [][][]...[][][][]...[][][]...[][][][]...[][][]...   |  |
| Report |  |  M  T  W  T  F  S  S                                |  |
|        |  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |
| Profile|                                                          |
|        |  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |
| Sett   |  | Recent Activity                                      |  |
|        |  | +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |  |
|        |  | | Pushed to feature/auth                             |  |
|        |  | | 2 hours ago  . 3 commits                           |  |
|        |  | +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |  |
|        |  | +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |  |
|        |  | | Opened PR #42: Add login                          |  |
|        |  | | 5 hours ago                                       |  |
|        |  | +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |  |
|        |  +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+  |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
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
