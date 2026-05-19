"use client"

import { createContext, useContext, type ReactNode } from "react"

import { authClient } from "@/lib/auth-client"

type Session = typeof authClient.$Infer.Session

type AuthContextType = {
	session: Session | null
	isPending: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { data: session, isPending } = authClient.useSession()

	return (
		<AuthContext.Provider value={{ session, isPending }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
