import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function Page() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Reports", href: "/reports" },
				{ label: "Journal" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Jurnal Aktivitas</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Catatan kronologis aktivitas coding harian.
				</Text>
			</div>

			<div className="space-y-6">
				<div className="border-l-2 pl-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						17 Mei 2026
					</Text>
					<Text variant="md/normal">
						Melakukan 3 commit ke repository utama
					</Text>
				</div>
				<div className="border-l-2 pl-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						16 Mei 2026
					</Text>
					<Text variant="md/normal">Menyelesaikan fitur dashboard</Text>
				</div>
				<div className="border-l-2 pl-4">
					<Text variant="sm/medium" className="text-muted-foreground">
						15 Mei 2026
					</Text>
					<Text variant="md/normal">Memulai proyek baru</Text>
				</div>
			</div>

			<div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-muted/50 p-8 text-center">
				<Text variant="sm/medium" className="text-muted-foreground">
					Jurnal akan terisi setelah aktivitas codingmu
				</Text>
			</div>
		</AppShell>
	)
}
