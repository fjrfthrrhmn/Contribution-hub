import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Reports", href: "/reports" },
				{ label: "Daily Summaries" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Ringkasan Harian</Title>
			</div>

			<div className="space-y-4">
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						17 Mei 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						16 Mei 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						15 Mei 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
			</div>

			<div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-muted/50 p-8 text-center">
				<Text variant="sm/medium" className="text-muted-foreground">
					Belum ada ringkasan harian
				</Text>
			</div>
		</AppShell>
	)
}
