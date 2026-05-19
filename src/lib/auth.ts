import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
	appName: "Contribution Hub",
	baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL,
	database: new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 1
	}),
	socialProviders: {
		github: {
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!
		}
	}
})
