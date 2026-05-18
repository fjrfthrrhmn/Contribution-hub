import Link from "next/link"

import { Bell, GitBranch, Palette, User } from "lucide-react"

import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function SettingsPage() {
	return (
		<AppShell breadcrumbs={[{ label: "Settings" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Pengaturan</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Kelola akun, notifikasi, repositori, dan preferensi.
				</Text>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Link
					href="/settings/account"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<User className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Akun</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Informasi profil dan akun
						</Text>
					</div>
				</Link>
				<Link
					href="/settings/notifications"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<Bell className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Notifikasi</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Preferensi notifikasi
						</Text>
					</div>
				</Link>
				<Link
					href="/settings/repositories"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<GitBranch className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Repositori</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Kelola repositori terhubung
						</Text>
					</div>
				</Link>
				<Link
					href="/settings/appearance"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<Palette className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Tampilan</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Tema dan bahasa
						</Text>
					</div>
				</Link>
			</div>
		</AppShell>
	)
}
