import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
	variable: "--font-sans",
	subsets: ["latin"]
})

const geistSerif = Geist({
	variable: "--font-serif",
	subsets: ["latin"]
})

const geistMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"]
})

export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${geistSerif.variable}`
