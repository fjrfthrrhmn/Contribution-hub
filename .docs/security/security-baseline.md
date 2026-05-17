# Security Baseline

> Kebijakan keamanan dasar, environment variables rules, dan secure coding practices.

---

## Environment Variables

### Rules

- **Jangan commit** `.env.local`, `.env.production` ke git
- **Jangan hardcode** secrets di kode
- Semua env variables validated di startup

### Naming Convention

```env
# Public (prefix NEXT_PUBLIC_)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=MyApp

# Private (server-side only)
DATABASE_URL=postgresql://...
AUTH_SECRET=your-secret-here
API_KEY=your-api-key
```

### Validation (dengan @t3-oss/env-nextjs)

```tsx
// src/config/env.ts
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		AUTH_SECRET: z.string().min(32)
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
		NEXT_PUBLIC_SITE_NAME: z.string().min(1)
	},
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
		// Server vars hanya diakses di server
		DATABASE_URL: process.env.DATABASE_URL,
		AUTH_SECRET: process.env.AUTH_SECRET
	}
})
```

---

## API Security

### CORS Configuration

```tsx
// next.config.ts
const nextConfig = {
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: process.env.NEXT_PUBLIC_APP_URL!
					},
					{ key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization"
					}
				]
			}
		]
	}
}
```

### Security Headers

```tsx
{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
  ],
}
```

---

## Secure Coding Practices

### Input Validation

```tsx
// ✅ Selalu validasi input dengan Zod
const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100)
})

// ❌ Jangan trust user input langsung
function unsafe(input: string) {
	db.query(`SELECT * FROM users WHERE id = ${input}`) // SQL injection!
}
```

### Output Encoding

- React secara otomatis handle XSS via JSX
- Jangan gunakan `dangerouslySetInnerHTML` tanpa sanitasi
- Untuk HTML dari server, gunakan DOMPurify

### Authentication

- Jangan simpan password plaintext
- Gunakan bcrypt/argon2 untuk hashing
- Session tokens dengan expiry
- Implement rate limiting untuk login attempts

---

## Data Protection

### PII Handling

- Jangan log PII (Personal Identifiable Information)
- Encrypt sensitive data di database
- Minimal data collection principle
- Hapus data user jika diminta

### Client-side

```tsx
// ✅ Aman: NEXT_PUBLIC_ prefix
const apiUrl = process.env.NEXT_PUBLIC_APP_URL

// ❌ Bahaya: server-only variable di client
const secret = process.env.AUTH_SECRET // undefined di client, tapi jangan!
```

---

## Dependency Security

### Checklist

- [ ] `npm audit` secara berkala
- [ ] Review major version updates
- [ ] Hindari dependencies dengan banyak transitive deps
- [ ] Prioritaskan libraries yang aktif maintained
- [ ] Gunakan lockfile (package-lock.json)

### Commands

```bash
# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Outdated packages
npm outdated
```

---

## Related Documents

- [API Guidelines](../api/api-guidelines.md)
- [Tech Stack](../technical/tech-stack.md)
