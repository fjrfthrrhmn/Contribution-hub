import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function BadgesPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Profile", href: "/profile" },
				{ label: "Badges" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Badges</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Kumpulkan dan kelola badge untuk profil GitHub.
				</Text>
			</div>

			<div className="mb-6 grid grid-cols-3 gap-4">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
					<div key={i} className="flex flex-col items-center gap-2">
						<div className="flex aspect-square items-center justify-center rounded-xl bg-muted/50">
							<Text variant="lg/medium" className="text-muted-foreground">
								?
							</Text>
						</div>
						<Text variant="xs/normal" className="text-muted-foreground">
							Coming Soon
						</Text>
					</div>
				))}
			</div>

			<Button variant="outline">Lihat Badge Tersedia</Button>
		</AppShell>
	)
}
