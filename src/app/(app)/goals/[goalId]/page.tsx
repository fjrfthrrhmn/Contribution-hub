import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default async function Page({
	params
}: {
	params: Promise<{ goalId: string }>
}) {
	const { goalId } = await params

	return (
		<AppShell
			breadcrumbs={[
				{ label: "Goals", href: "/goals" },
				{ label: "Detail Goal" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Detail Goal</Title>
			</div>

			<div className="rounded-xl border bg-card p-6">
				<div className="mb-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						Nama Goal
					</Text>
					<Text variant="md/normal">Goal #{goalId}</Text>
				</div>
				<div className="mb-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						Tipe
					</Text>
					<Text variant="md/normal">Harian</Text>
				</div>
				<div className="mb-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						Target
					</Text>
					<Text variant="md/normal">5 commits</Text>
				</div>
				<div className="mb-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						Progress
					</Text>
					<div className="mb-2 h-2 rounded-full bg-muted" />
					<Text variant="sm/medium" className="text-muted-foreground">
						0 / 5 selesai
					</Text>
				</div>
				<div className="mb-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Deadline
					</Text>
					<Text variant="md/normal">Hari ini</Text>
				</div>

				<div className="flex gap-2">
					<Button variant="outline">Edit</Button>
					<Button variant="destructive">Hapus</Button>
					<Button variant="ghost" asChild>
						<Link href="/goals">Kembali</Link>
					</Button>
				</div>
			</div>
		</AppShell>
	)
}
