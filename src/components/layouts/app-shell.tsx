"use client"

import type { ReactNode } from "react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layouts/app-sidebar"

type BreadcrumbItem = {
	label: string
	href?: string
}

type AppShellProps = {
	children: ReactNode
	breadcrumbs?: BreadcrumbItem[]
	defaultOpen?: boolean
}

/**
 * AppShell — reusable application shell layout.
 *
 * Wraps content in a sidebar + header + main content structure.
 * - Mobile: sidebar becomes a Sheet drawer
 * - Desktop: sidebar with collapsed/expanded state via keyboard shortcut (Cmd+B)
 *
 * @example
 * ```tsx
 * <AppShell breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Activity" }]}>
 *   <YourPageContent />
 * </AppShell>
 * ```
 */
export function AppShell({
	children,
	breadcrumbs,
	defaultOpen = true
}: AppShellProps) {
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				{breadcrumbs && breadcrumbs.length > 0 && (
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
							<Separator
								orientation="vertical"
								className="mr-2 data-[orientation=vertical]:h-4"
							/>
							<Breadcrumb>
								<BreadcrumbList>
									{breadcrumbs.map((item, index) => {
										const isLast = index === breadcrumbs.length - 1
										return (
											<BreadcrumbItem
												key={item.label}
												className={index > 0 ? "" : "hidden md:block"}
											>
												{index > 0 && (
													<BreadcrumbSeparator className="hidden md:block" />
												)}
												{isLast || !item.href ? (
													<BreadcrumbPage>{item.label}</BreadcrumbPage>
												) : (
													<BreadcrumbLink href={item.href}>
														{item.label}
													</BreadcrumbLink>
												)}
											</BreadcrumbItem>
										)
									})}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
				)}
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
