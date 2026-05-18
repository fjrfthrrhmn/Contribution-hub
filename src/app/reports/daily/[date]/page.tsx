import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default async function Page({
	params
}: {
	params: Promise<{ date: string }>
}) {
	const { date } = await params

	return (
		<AppShell
			breadcrumbs={[
				{ label: "Reports", href: "/reports" },
				{ label: "Daily", href: "/reports/daily" },
				{ label: "Detail" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Ringkasan Harian</Title>
				<Text variant="sm/medium" className="text-muted-foreground">
					{date}
				</Text>
			</div>

			<div className="mb-6 grid grid-cols-3 gap-4">
				<div className="flex flex-col items-center justify-center rounded-xl bg-muted/50 p-4 text-center">
					<Text variant="sm/medium" className="text-muted-foreground">
						Commit
					</Text>
				</div>
				<div className="flex flex-col items-center justify-center rounded-xl bg-muted/50 p-4 text-center">
					<Text variant="sm/medium" className="text-muted-foreground">
						Streak
					</Text>
				</div>
				<div className="flex flex-col items-center justify-center rounded-xl bg-muted/50 p-4 text-center">
					<Text variant="sm/medium" className="text-muted-foreground">
						Goals
					</Text>
				</div>
			</div>

			<div className="mb-6 flex min-h-[100px] items-center justify-center rounded-xl bg-muted/50 p-8">
				<Text variant="sm/medium" className="text-muted-foreground">
					Daftar aktivitas
				</Text>
			</div>

			<div className="flex gap-2">
				<Button variant="outline">Edit</Button>
				<Button variant="ghost" asChild>
					<Link href="/reports/daily">Kembali</Link>
				</Button>
			</div>
		</AppShell>
	)
}
