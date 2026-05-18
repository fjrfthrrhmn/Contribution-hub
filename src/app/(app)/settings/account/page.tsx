import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function AccountSettingsPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Settings", href: "/settings" },
				{ label: "Akun" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Pengaturan Akun</Title>
			</div>

			<div className="rounded-xl border border-border bg-card p-6">
				<div className="mb-6">
					<Text variant="sm/medium" className="mb-2 text-muted-foreground">
						Nama
					</Text>
					<div className="h-10 rounded-lg bg-muted/50" />
				</div>
				<div className="mb-6">
					<Text variant="sm/medium" className="mb-2 text-muted-foreground">
						Email
					</Text>
					<div className="h-10 rounded-lg bg-muted/50" />
				</div>
				<div className="mb-6">
					<Text variant="sm/medium" className="mb-2 text-muted-foreground">
						Username
					</Text>
					<div className="h-10 rounded-lg bg-muted/50" />
				</div>
				<Button variant="default">Simpan</Button>
			</div>
		</AppShell>
	)
}
