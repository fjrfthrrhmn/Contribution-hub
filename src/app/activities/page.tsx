import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function ActivitiesPage() {
	return (
		<AppShell breadcrumbs={[{ label: "Aktivitas" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Aktivitas</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Riwayat aktivitas coding dan kontribusi GitHub kamu.
				</Text>
			</div>

			<div className="mb-6 flex gap-2 rounded-lg bg-muted/50 p-3">
				<Text variant="sm/medium" className="text-muted-foreground">
					Filter: [Type] [Date Range]
				</Text>
			</div>

			<div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
				<Title variant="5/medium" className="text-muted-foreground">
					Belum ada aktivitas. Mulai coding!
				</Title>
				<Button variant="default" className="mt-4" asChild>
					<Link href="/dashboard">Ke Dashboard</Link>
				</Button>
			</div>
		</AppShell>
	)
}
