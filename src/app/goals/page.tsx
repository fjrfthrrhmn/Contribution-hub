import Link from "next/link"

import { Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell breadcrumbs={[{ label: "Goals" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Goals</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Atur target coding harian dan mingguan.
				</Text>
			</div>

			<div className="mb-6 flex gap-2 rounded-lg bg-muted/50 p-2">
				<Text variant="sm/medium" className="text-muted-foreground">
					Daily Goals
				</Text>
				<Text variant="sm/medium" className="text-muted-foreground">
					Weekly Goals
				</Text>
			</div>

			<div className="flex flex-col items-center justify-center rounded-xl border bg-card p-8 text-center">
				<Target className="mb-4 h-12 w-12 text-muted-foreground" />
				<Title variant="4/semibold">Atur target coding harianmu</Title>
				<Button variant="default" asChild className="mt-4">
					<Link href="#">Buat Goal Baru</Link>
				</Button>
			</div>
		</AppShell>
	)
}
