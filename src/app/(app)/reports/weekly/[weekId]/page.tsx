import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default async function Page({
	params
}: {
	params: Promise<{ weekId: string }>
}) {
	const { weekId } = await params

	return (
		<AppShell
			breadcrumbs={[
				{ label: "Reports", href: "/reports" },
				{ label: "Weekly", href: "/reports/weekly" },
				{ label: "Detail" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Laporan Mingguan</Title>
				<Text variant="sm/medium" className="text-muted-foreground">
					Minggu ini
				</Text>
			</div>

			<div className="mb-4 rounded-xl bg-muted/50 p-6">
				<div className="h-16" />
			</div>
			<div className="mb-4 rounded-xl bg-muted/50 p-6">
				<div className="h-16" />
			</div>
			<div className="mb-4 rounded-xl bg-muted/50 p-6">
				<div className="h-16" />
			</div>
			<div className="mb-6 rounded-xl bg-muted/50 p-6">
				<div className="h-16" />
			</div>

			<div className="flex gap-2">
				<Button variant="outline">Export Markdown</Button>
				<Button variant="ghost" asChild>
					<Link href="/reports/weekly">Kembali</Link>
				</Button>
			</div>
		</AppShell>
	)
}
