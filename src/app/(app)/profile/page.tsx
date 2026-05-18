import Link from "next/link"

import { Eye, Medal, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function ProfilePage() {
	return (
		<AppShell breadcrumbs={[{ label: "Profile" }]}>
			<div className="mb-6">
				<Title variant="2/semibold">Profile</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Kelola profil GitHub dan badge.
				</Text>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<Link
					href="/profile/preview"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<Eye className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Preview Profile</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Lihat pratinjau README
						</Text>
					</div>
				</Link>
				<Link
					href="/profile/preview"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<Settings className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Konfigurasi Profile</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Atur template dan section
						</Text>
					</div>
				</Link>
				<Link
					href="/profile/badges"
					className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:bg-accent"
				>
					<Medal className="h-8 w-8 text-muted-foreground" />
					<div>
						<Title variant="5/medium">Badges</Title>
						<Text variant="xs/normal" className="text-muted-foreground">
							Kumpulkan badge GitHub
						</Text>
					</div>
				</Link>
			</div>

			<div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center">
				<Title variant="5/medium" className="text-muted-foreground">
					Konfigurasi profile GitHub mu
				</Title>
			</div>
		</AppShell>
	)
}
