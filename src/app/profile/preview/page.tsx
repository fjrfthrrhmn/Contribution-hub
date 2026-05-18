import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"
import { AppShell } from "@/components/layouts/app-shell"

const { Title, Text } = Typography

export default function ProfilePreviewPage() {
	return (
		<AppShell
			breadcrumbs={[
				{ label: "Profile", href: "/profile" },
				{ label: "Preview" }
			]}
		>
			<div className="mb-6">
				<Title variant="2/semibold">Preview Profile</Title>
				<Text variant="md/normal" className="text-muted-foreground">
					Pratinjau profile README GitHub.
				</Text>
			</div>

			<div className="flex min-h-[400px] items-center justify-center rounded-xl bg-muted/50 p-8">
				<Text variant="md/normal" className="text-muted-foreground">
					Profile preview akan tampil di sini
				</Text>
			</div>

			<div className="mt-6 flex gap-4">
				<Button variant="default">Deploy to GitHub</Button>
				<Button variant="ghost" asChild>
					<Link href="/profile">Kembali</Link>
				</Button>
			</div>
		</AppShell>
	)
}
