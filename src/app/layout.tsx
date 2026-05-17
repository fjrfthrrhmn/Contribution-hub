import { Toaster } from "sonner"

import { fontVariables, siteMetadata } from "@/config"

import "@/styles/globals.css"

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Providers } from "./providers"

export const metadata = siteMetadata

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="id"
			className={`${fontVariables} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="flex min-h-full flex-col">
				<Providers>
					<SpeedInsights />
					{children}
					<Toaster richColors closeButton position="top-right" />
				</Providers>
			</body>
		</html>
	)
}
