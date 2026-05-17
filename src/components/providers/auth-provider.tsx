"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
	id: string
	name: string
	email: string
} | null

type AuthContextType = {
	user: User
	isLoading: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
	children: ReactNode
}

/**
 * AuthProvider placeholder untuk integrasi Better Auth.
 *
 * TODO: Implementasi penuh setelah Better Auth dikonfigurasi:
 * - src/lib/auth.ts (server)
 * - src/lib/auth-client.ts (client)
 * - src/features/auth/api/
 */
export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>(null)
	const [isLoading] = useState(false)

	const login = async (_email: string, _password: string) => {
		// Placeholder: implementasi dengan Better Auth
		console.warn("AuthProvider: login belum diimplementasikan")
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
