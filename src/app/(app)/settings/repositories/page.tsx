import { Badge } from "@/components/ui/badge"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function RepoSettingsPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Settings", href: "/settings" },
				{ label: "Repositori" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Pengaturan Repositori</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Kelola repositori GitHub yang terhubung.
				</Text>
			</div>

			<div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
				<Title variant="5/medium" className="text-muted-foreground">
					Belum ada repositori terhubung
				</Title>
			</div>
		</AppShell>
	)
}
