import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Reports", href: "/reports" },
				{ label: "Weekly Reports" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Laporan Mingguan</Title>
			</div>

			<div className="space-y-4">
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						Minggu 20, 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						Minggu 19, 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
				<div className="flex items-center rounded-xl border p-4">
					<Text variant="md/normal" className="flex-1">
						Minggu 18, 2026
					</Text>
					<Text variant="sm/medium" className="text-muted-foreground">
						Lihat detail
					</Text>
				</div>
			</div>

			<div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-muted/50 p-8 text-center">
				<Text variant="sm/medium" className="text-muted-foreground">
					Belum ada laporan mingguan
				</Text>
			</div>
		</AppShell>
	)
}
