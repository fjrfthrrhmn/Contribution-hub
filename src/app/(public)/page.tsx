import Link from "next/link"

import {
	ArrowRight,
	Code2,
	GalleryVerticalEnd,
	GitCommit,
	LineChart
} from "lucide-react"

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from "@/components/ui"
import Typography from "@/components/ui/typography"
import { AnimatedThemeToggler } from "@/components/widgets"

const { Title, Text } = Typography

const features = [
	{
		icon: GitCommit,
		title: "Commit dari UI",
		description:
			"Buat commit ke repository GitHub langsung dari dashboard tanpa perlu membuka terminal."
	},
	{
		icon: LineChart,
		title: "Pantau Aktivitas",
		description:
			"Lacak streak, commit, dan progress coding secara otomatis dalam satu tampilan."
	},
	{
		icon: Code2,
		title: "Dokumentasi Otomatis",
		description:
			"Daily dan weekly report dihasilkan otomatis dari aktivitas coding kamu."
	}
] as const

export default function HomePage() {
	return (
		<div className="flex flex-1 flex-col">
			<header className="flex items-center justify-between px-6 py-4 md:px-10">
				<Link href="/" className="flex items-center gap-2 font-medium">
					<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					Contribution Hub
				</Link>
				<div className="flex items-center gap-4">
					<AnimatedThemeToggler />
					<div className="h-6 w-px border border-border" />
					<Button variant="outline" size="sm" asChild>
						<Link href="/login">Masuk</Link>
					</Button>
				</div>
			</header>

			<section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center md:px-10">
				<Title variant="1/bold" className="max-w-2xl">
					Bangun Kebiasaan Coding yang Konsisten
				</Title>
				<Text
					variant="lg/normal"
					className="mt-4 max-w-lg text-muted-foreground"
				>
					Contribution Hub membantu developer mendokumentasikan progress coding,
					menjaga streak, dan meningkatkan personal branding di GitHub.
				</Text>

				<div className="mt-8 flex flex-col gap-4 sm:flex-row">
					<Button size="lg" asChild>
						<Link href="/login">
							Mulai Sekarang
							<ArrowRight className="size-4" />
						</Link>
					</Button>
					<Button variant="outline" size="lg" asChild>
						<Link href="#features">Pelajari Lebih Lanjut</Link>
					</Button>
				</div>
			</section>

			<section id="features" className="border-t px-6 py-20 md:px-10">
				<div className="mx-auto max-w-5xl">
					<div className="mb-12 text-center">
						<Title variant="2/semibold">Kenapa Contribution Hub?</Title>
						<Text variant="md/normal" className="mt-2 text-muted-foreground">
							Tools yang dirancang untuk membantu developer tetap konsisten dan
							terdokumentasi.
						</Text>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						{features.map((feature) => (
							<Card key={feature.title}>
								<CardHeader>
									<div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10">
										<feature.icon className="size-6 text-primary" />
									</div>
									<CardTitle>{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<Text variant="sm/normal" className="text-muted-foreground">
										{feature.description}
									</Text>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="border-t bg-muted/30 px-6 py-20 text-center md:px-10">
				<div className="mx-auto max-w-lg">
					<Title variant="2/semibold">Siap Memulai?</Title>
					<Text variant="md/normal" className="mt-3 text-muted-foreground">
						Hubungkan akun GitHub kamu dan mulai bangun kebiasaan coding yang
						konsisten hanya dalam beberapa klik.
					</Text>
					<Button size="lg" className="mt-8" asChild>
						<Link href="/login">
							Hubungkan GitHub
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>
			</section>

			<footer className="border-t px-6 py-8 text-center md:px-10">
				<Text variant="xs/normal" className="text-muted-foreground">
					&copy; {new Date().getFullYear()} Contribution Hub. Dibangun untuk
					developer.
				</Text>
			</footer>
		</div>
	)
}
