import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

const notificationItems = [
	{ label: "Notifikasi Commit" },
	{ label: "Notifikasi Streak" },
	{ label: "Notifikasi Report" }
]

export default function NotificationSettingsPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Settings", href: "/settings" },
				{ label: "Notifikasi" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Pengaturan Notifikasi</Title>
			</div>

			<div className="rounded-xl border border-border bg-card">
				{notificationItems.map((item) => (
					<div
						key={item.label}
						className="flex items-center justify-between border-b border-border p-4 last:border-b-0"
					>
						<Text variant="md/normal">{item.label}</Text>
						<div className="h-6 w-10 rounded-full bg-muted/50" />
					</div>
				))}
			</div>
		</AppShell>
	)
}
