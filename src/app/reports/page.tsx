import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell breadcrumbs={[{ label: "Reports" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Reports</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Laporan otomatis aktivitas coding harian dan mingguan.
				</Text>
			</div>

			<div className="mb-6 flex gap-2">
				<Button variant="outline" asChild>
					<Link href="/reports/daily">Daily Summaries</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/reports/weekly">Weekly Reports</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/reports/journal">Journal</Link>
				</Button>
			</div>

			<div className="mb-6 flex flex-col items-center justify-center rounded-xl border bg-card p-8 text-center">
				<Title variant="4/semibold">
					Report akan muncul setelah aktivitasmu
				</Title>
				<Button variant="default" asChild className="mt-4">
					<Link href="/activities">Cek Aktivitas Hari Ini</Link>
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl bg-muted/50 p-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Ringkasan Harian
					</Text>
				</div>
				<div className="flex min-h-[120px] flex-col items-center justify-center rounded-xl bg-muted/50 p-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Ringkasan Mingguan
					</Text>
				</div>
			</div>
		</AppShell>
	)
}
