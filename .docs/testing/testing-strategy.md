# Testing Strategy

> Strategi testing, fokus pada async operations dan provider testing.

---

## Testing Pyramid

```
        /\
       /  \          E2E (Playwright) -- 5% kritis
      /    \
     /      \        Integration -- 20% interaksi fitur
    /        \
   /__________\      Unit (Vitest) -- 75% logic murni
```

---

## Unit Testing

### Pure Functions (Utils)

```tsx
import { describe, expect, it } from "vitest"

import { formatDate } from "./format-date"

describe("formatDate", () => {
	it("should format ISO date to Indonesian format", () => {
		expect(formatDate("2024-01-15")).toBe("15 Januari 2024")
	})

	it("should handle invalid dates", () => {
		expect(formatDate("invalid")).toBe("-")
	})

	it("should handle null/undefined", () => {
		expect(formatDate(null)).toBe("-")
		expect(formatDate(undefined)).toBe("-")
	})
})
```

### Hooks

```tsx
import { act, renderHook } from "@testing-library/react"

import { useDebounce } from "./use-debounce"

describe("useDebounce", () => {
	it("should debounce value changes", async () => {
		vi.useFakeTimers()

		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value, 500),
			{ initialProps: { value: "hello" } }
		)

		expect(result.current).toBe("hello")

		rerender({ value: "world" })
		expect(result.current).toBe("hello") // Belum berubah

		act(() => {
			vi.advanceTimersByTime(500)
		})
		expect(result.current).toBe("world") // Sudah debounce

		vi.useRealTimers()
	})
})
```

### Zustand Stores

```tsx
import { useAuthStore } from "./auth-store"

describe("authStore", () => {
	beforeEach(() => {
		useAuthStore.setState({ user: null, isAuthenticated: false })
	})

	it("should set user on login", () => {
		const user = { id: "1", name: "John" }
		act(() => useAuthStore.getState().login(user))

		expect(useAuthStore.getState().user).toEqual(user)
		expect(useAuthStore.getState().isAuthenticated).toBe(true)
	})

	it("should clear user on logout", () => {
		act(() => useAuthStore.getState().login({ id: "1", name: "John" }))
		act(() => useAuthStore.getState().logout())

		expect(useAuthStore.getState().user).toBeNull()
		expect(useAuthStore.getState().isAuthenticated).toBe(false)
	})
})
```

---

## Integration Testing

### React Query Components

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from "@testing-library/react"

import { UserList } from "./user-list"

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } }
	})

	return function Wrapper({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		)
	}
}

// Mock API
vi.mock("@/features/users/api/get-users", () => ({
	getUsers: vi.fn().mockResolvedValue([
		{ id: "1", name: "John" },
		{ id: "2", name: "Jane" }
	])
}))

describe("UserList", () => {
	it("should render list of users", async () => {
		render(<UserList />, { wrapper: createWrapper() })

		expect(screen.getByText(/loading/i)).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getByText("John")).toBeInTheDocument()
			expect(screen.getByText("Jane")).toBeInTheDocument()
		})
	})

	it("should handle error state", async () => {
		vi.mocked(getUsers).mockRejectedValueOnce(new Error("Failed"))

		render(<UserList />, { wrapper: createWrapper() })

		await waitFor(() => {
			expect(screen.getByText(/error/i)).toBeInTheDocument()
		})
	})
})
```

### Provider Testing

```tsx
import { useTheme } from "next-themes"

import { render, screen } from "@testing-library/react"

import { ThemeProvider } from "./theme-provider"

function TestComponent() {
	const { theme, setTheme } = useTheme()
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<button onClick={() => setTheme("dark")}>Dark</button>
		</div>
	)
}

describe("ThemeProvider", () => {
	it("should provide theme context", () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		)

		expect(screen.getByTestId("theme")).toHaveTextContent("light")
	})
})
```

---

## Async Testing Patterns

### Loading States

```tsx
it("should show loading state during fetch", () => {
	render(<DataComponent />, { wrapper })

	// Assert loading UI muncul
	expect(screen.getByRole("status")).toBeInTheDocument()
	expect(screen.getByText(/memuat/i)).toBeInTheDocument()
})
```

### Error States

```tsx
it("should show error state on failure", async () => {
	// Trigger error
	render(<DataComponent />, { wrapper })

	await waitFor(() => {
		expect(screen.getByRole("alert")).toBeInTheDocument()
		expect(screen.getByText(/gagal/i)).toBeInTheDocument()
	})
})
```

### Empty States

```tsx
it("should show empty state when no data", async () => {
	render(<DataComponent />, { wrapper })

	await waitFor(() => {
		expect(screen.getByText(/tidak ada data/i)).toBeInTheDocument()
	})
})
```

---

## Mocking Strategy

### API Calls

```tsx
// Global mock di setup
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"

export const handlers = [
	http.get("/api/users", () => {
		return HttpResponse.json([{ id: "1", name: "John" }])
	})
]

export const server = setupServer(...handlers)
```

### Modules

```tsx
vi.mock("@/lib/api-client", () => ({
	apiClient: {
		get: vi.fn(),
		post: vi.fn()
	}
}))
```

---

## Coverage Targets

| Layer                  | Target              |
| ---------------------- | ------------------- |
| Utils / Pure functions | 90%+                |
| Zustand stores         | 90%+                |
| Custom hooks           | 80%+                |
| Feature components     | 70%+                |
| API route handlers     | 80%+                |
| Page components        | 60%+                |
| shadcn/ui components   | Covered by upstream |

---

## Running Tests

```bash
# All tests
npm run test

# Watch mode
npm run test -- --watch

# Specific file
npm run test -- src/utils/format-date.test.ts

# Coverage
npm run test -- --coverage
```

---

## Related Documents

- [Engineering Principles](../engineering/engineering-principles.md)
- [API Guidelines](../api/api-guidelines.md)
