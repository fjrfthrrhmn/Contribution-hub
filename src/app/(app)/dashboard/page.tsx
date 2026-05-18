import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell breadcrumbs={[{ label: "Dashboard" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Dashboard</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Selamat datang kembali, Rama!
				</Text>
			</div>

			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50 p-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Streak Hari Ini
					</Text>
					<Title variant="3/medium" className="mt-2 text-muted-foreground">
						Belum ada data
					</Title>
				</div>
				<div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50 p-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Total Commit
					</Text>
					<Title variant="3/medium" className="mt-2 text-muted-foreground">
						Belum ada data
					</Title>
				</div>
				<div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-muted/50 p-6">
					<Text variant="sm/medium" className="text-muted-foreground">
						Aktivitas
					</Text>
					<Title variant="3/medium" className="mt-2 text-muted-foreground">
						Belum ada data
					</Title>
				</div>
			</div>

			<div className="mt-6 flex min-h-[200px] flex-col items-center justify-center rounded-xl bg-muted/50 p-8">
				<Text variant="sm/medium" className="text-muted-foreground">
					Grafik Aktivitas Mingguan
				</Text>
			</div>

			<div className="mt-4 flex min-h-[150px] flex-col items-center justify-center rounded-xl bg-muted/50 p-8">
				<Text variant="sm/medium" className="text-muted-foreground">
					Aktivitas Terbaru
				</Text>
			</div>
		</AppShell>
	)
}
