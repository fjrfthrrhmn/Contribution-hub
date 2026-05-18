import { DM_Sans, IBM_Plex_Mono, Lora } from "next/font/google"

const dmSans = DM_Sans({
	variable: "--font-sans",
	subsets: ["latin"]
})

const lora = Lora({
	variable: "--font-serif",
	subsets: ["latin"]
})

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"]
})

export const fontVariables = `${dmSans.variable} ${lora.variable} ${ibmPlexMono.variable}`
