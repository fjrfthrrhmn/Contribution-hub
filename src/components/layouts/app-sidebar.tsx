"use client"

import * as React from "react"

import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal
} from "lucide-react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/layouts/nav-main"
import { NavProjects } from "@/components/layouts/nav-projects"
import { NavUser } from "@/components/layouts/nav-user"
import { TeamSwitcher } from "@/components/layouts/team-switcher"

// Sample data — replace with real data from auth/session
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg"
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise"
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup"
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free"
		}
	],
	navMain: [
		{
			title: "Dashboard",
			url: "/dashboard",
			icon: SquareTerminal,
			isActive: true
		},
		{
			title: "Activity",
			url: "/activity",
			icon: Bot,
			items: [
				{ title: "Timeline", url: "/activity" },
				{ title: "Stats", url: "/activity/stats" },
				{ title: "Settings", url: "/activity/settings" }
			]
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{ title: "Daily Reports", url: "#" },
				{ title: "Weekly Reports", url: "#" },
				{ title: "Changelog", url: "#" }
			]
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{ title: "General", url: "#" },
				{ title: "Profile", url: "#" },
				{ title: "Integrations", url: "#" }
			]
		}
	],
	projects: [
		{
			name: "contribution-hub",
			url: "#",
			icon: Frame
		},
		{
			name: "Personal Website",
			url: "#",
			icon: PieChart
		},
		{
			name: "Open Source",
			url: "#",
			icon: Map
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
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
