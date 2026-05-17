"use client"

import { type ReactNode } from "react"

import { TooltipProvider } from "@/components/ui"
import {
	AuthProvider,
	I18nProvider,
	QueryProvider,
	ThemeProvider
} from "@/components/providers"

type ProvidersProps = {
	children: ReactNode
}

/**
 * Composed providers wrapping the entire application.
 *
 * Nesting order:
 *   1. QueryProvider    — server state (React Query)
 *   2. ThemeProvider    — dark/light mode (next-themes)
 *   3. TooltipProvider  — tooltip primitives (Radix UI)
 *   4. I18nProvider     — internationalization (next-intl)
 *   5. AuthProvider     — authentication (Better Auth)
 */
export function Providers({ children }: ProvidersProps) {
	return (
		<QueryProvider>
			<ThemeProvider>
				<TooltipProvider>
					<I18nProvider>
						<AuthProvider>{children}</AuthProvider>
					</I18nProvider>
				</TooltipProvider>
			</ThemeProvider>
		</QueryProvider>
	)
}
