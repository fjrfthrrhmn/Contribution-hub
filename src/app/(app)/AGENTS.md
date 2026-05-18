# src/app/(app)/ -- Protected App Routes

## Fungsi

Route group untuk halaman aplikasi yang memerlukan sesi aktif. Semua halaman menggunakan AppShell dengan sidebar navigasi.

## Struktur

```
(app)/
├── activities/       → /activities, /activities/[activityId]
├── dashboard/        → /dashboard
├── goals/            → /goals, /goals/[goalId]
├── profile/          → /profile, /profile/preview, /profile/badges
├── reports/          → /reports, reports/daily, /reports/weekly, /reports/journal
├── settings/         → /settings, /settings/account, /settings/notifications, dll
└── streaks/          → /streaks (placeholder, belum ada page.tsx)
```

## Aturan

- Setiap halaman wajib menggunakan `<AppShell>` dengan breadcrumbs
- Halaman harus handle 4 state: loading, empty, error, success (akan diimplementasi di Phase 1)
- Semua import menggunakan `@/` alias -- tidak perlu relative path
- Tidak ada business logic langsung di page.tsx -- delegate ke feature modules

## Pattern Wajib

```tsx
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell breadcrumbs={[{ label: "Page Title" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Page Title</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Deskripsi halaman.
				</Text>
			</div>
			{/* Konten halaman */}
		</AppShell>
	)
}
```

## AI Do's / Don'ts

- Boleh: membuat halaman baru di route group ini
- Tidak boleh: menghilangkan AppShell wrapper
- Tidak boleh: import dari route lain secara langsung
