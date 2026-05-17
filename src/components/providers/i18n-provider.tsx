import type { ReactNode } from "react"

type I18nProviderProps = {
	children: ReactNode
}

/**
 * I18nProvider placeholder untuk next-intl.
 *
 * TODO: Implementasi penuh setelah next-intl routing dikonfigurasi:
 * - src/i18n/routing.ts
 * - src/i18n/request.ts
 * - app/[locale]/ layout
 *
 * Referensi: https://next-intl.dev/docs/getting-started/app-router
 */
export function I18nProvider({ children }: I18nProviderProps) {
	return <>{children}</>
}
