import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function AppearanceSettingsPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Settings", href: "/settings" },
				{ label: "Tampilan" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Pengaturan Tampilan</Title>
			</div>

			<div className="mb-6 grid grid-cols-2 gap-4">
				<div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6">
					<Sun className="h-8 w-8" />
					<Text variant="md/medium">Light</Text>
				</div>
				<div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6">
					<Moon className="h-8 w-8" />
					<Text variant="md/medium">Dark</Text>
				</div>
			</div>

			<div className="mb-6 rounded-lg bg-muted/50 p-3">
				<Text variant="md/normal">Bahasa: Indonesia</Text>
			</div>

			<Button variant="default">Simpan</Button>
		</AppShell>
	)
}
