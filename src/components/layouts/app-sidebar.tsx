"use client"

import * as React from "react"

import {
	FileText,
	Flame,
	GalleryVerticalEnd,
	GitCommit,
	LayoutDashboard,
	Settings,
	Target,
	User
} from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/layouts/nav-main"
import { NavUser } from "@/components/layouts/nav-user"
import { TeamSwitcher } from "@/components/layouts/team-switcher"

const data = {
	user: {
		name: "Rama Developer",
		email: "rama@example.com",
		avatar: ""
	},
	teams: [
		{
			name: "Contribution Hub",
			logo: GalleryVerticalEnd,
			plan: "MVP"
		}
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: LayoutDashboard,
			isActive: true
		},
		{
			title: "Aktivitas",
			url: "/activities",
			icon: GitCommit
		},
		{
			title: "Streaks",
			url: "/streaks",
			icon: Flame
		},
		{
			title: "Goals",
			url: "/goals",
			icon: Target
		},
		{
			title: "Reports",
			url: "/reports",
			icon: FileText
		},
		{
			title: "Profile",
			url: "/profile",
			icon: User
		},
		{
			title: "Settings",
			url: "/settings",
			icon: Settings
		}
	]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
