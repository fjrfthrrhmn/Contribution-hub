import { NextResponse, type NextRequest } from "next/server"

import { auth } from "@/lib/auth"

// Halaman yang dilindungi (harus login) berdasarkan IA sitemap
const protectedPathPrefixes = [
	"/dashboard"
	// Fase 1: tambahkan prefix berikut saat halaman siap
	// "/activities",
	// "/goals",
	// "/profile",
	// "/reports",
	// "/settings",
	// "/streaks"
]

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Lewati API auth routes (Better Auth handler)
	if (pathname.startsWith("/api/auth")) {
		return NextResponse.next()
	}

	// Cek apakah path termasuk protected
	const isProtected = protectedPathPrefixes.some((prefix) =>
		pathname.startsWith(prefix)
	)

	if (isProtected) {
		const session = await auth.api.getSession({
			headers: request.headers
		})

		if (!session) {
			const loginUrl = new URL("/login", request.url)
			loginUrl.searchParams.set("redirect", pathname)
			return NextResponse.redirect(loginUrl)
		}
	}

	return NextResponse.next()
}

export const proxyConfig = {
	matcher: [
		// Skip static files, _next, dan favicon
		"/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"
	]
}
