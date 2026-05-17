# API Guidelines

> Panduan API development, React Query strategy, dan endpoint design.

---

## API Architecture

### Routes

```
src/app/api/[resource]/route.ts    # REST API endpoints
src/app/api/[resource]/[id]/route.ts
```

### Data Fetching

```
src/lib/api-client.ts              # Centralized HTTP client
src/features/[feature]/api/        # Feature-specific API functions
```

---

## React Query Strategy

### Query Key Convention

```tsx
// Format: ['resource', ...identifiers, ...filters]
const keys = {
	posts: {
		all: ["posts"] as const,
		list: (filters?: PostFilters) => ["posts", "list", filters] as const,
		detail: (id: string) => ["posts", "detail", id] as const
	},
	users: {
		all: ["users"] as const,
		list: (filters?: UserFilters) => ["users", "list", filters] as const,
		detail: (id: string) => ["users", "detail", id] as const
	}
}
```

### Default Config

```tsx
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 menit
			gcTime: 1000 * 60 * 30, // 30 menit garbage collection
			retry: 1,
			refetchOnWindowFocus: false // Matikan untuk development
		}
	}
})
```

### Query Patterns

```tsx
// ✅ RSC Pattern (server component)
async function PostsPage() {
	const posts = await fetch("/api/posts").then((r) => r.json())
	return <PostList posts={posts} />
}

// ✅ Client Pattern dengan React Query
function usePosts(filters?: PostFilters) {
	return useQuery({
		queryKey: keys.posts.list(filters),
		queryFn: () => getPosts(filters),
		select: (data) => data.items // Transform response
	})
}

// ✅ Infinite Query untuk pagination
function useInfinitePosts() {
	return useInfiniteQuery({
		queryKey: keys.posts.all,
		queryFn: ({ pageParam }) => getPosts({ page: pageParam }),
		initialPageParam: 1,
		getNextPageParam: (last) => last.nextPage
	})
}
```

### Mutation Patterns

```tsx
// ✅ Standard mutation
function useCreatePost() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: keys.posts.all })
			toast.success("Post berhasil dibuat")
		},
		onError: (error) => {
			toast.error(error.message)
		}
	})
}

// ✅ Optimistic update
function useUpdatePost() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updatePost,
		onMutate: async (updated) => {
			await queryClient.cancelQueries({
				queryKey: keys.posts.detail(updated.id)
			})
			const previous = queryClient.getQueryData(keys.posts.detail(updated.id))
			queryClient.setQueryData(keys.posts.detail(updated.id), updated)
			return { previous }
		},
		onError: (err, vars, context) => {
			queryClient.setQueryData(keys.posts.detail(vars.id), context?.previous)
			toast.error("Gagal update")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: keys.posts.all })
		}
	})
}
```

---

## API Endpoint Design

### Standard Response Format

```tsx
// Success
{
  "data": T | T[],
  "meta"?: {
    "total": number,
    "page": number,
    "pageSize": number
  }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details"?: ZodError[]
  }
}
```

### Endpoint Structure

```tsx
// src/app/api/posts/route.ts
export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const schema = z.object({
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(10)
	})

	const parsed = schema.safeParse(Object.fromEntries(searchParams))
	if (!parsed.success) {
		return NextResponse.json(
			{
				error: {
					code: "VALIDATION_ERROR",
					message: "Invalid params",
					details: parsed.error
				}
			},
			{ status: 400 }
		)
	}

	const data = await getPosts(parsed.data)
	return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
	const body = await req.json()
	const schema = z.object({
		title: z.string().min(1).max(200),
		content: z.string().min(1)
	})

	const parsed = schema.safeParse(body)
	if (!parsed.success) {
		return NextResponse.json(
			{ error: { code: "VALIDATION_ERROR", message: "Invalid input" } },
			{ status: 400 }
		)
	}

	const post = await createPost(parsed.data)
	return NextResponse.json({ data: post }, { status: 201 })
}
```

---

## Server Actions

Untuk form submission, prioritaskan Server Actions:

```tsx
// ✅ Standard Server Action
"use server"

import { z } from "zod"

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

export async function login(prev: any, formData: FormData) {
	const parsed = schema.safeParse({
		email: formData.get("email"),
		password: formData.get("password")
	})

	if (!parsed.success) {
		return { error: "Input tidak valid", issues: parsed.error.issues }
	}

	try {
		await authService.login(parsed.data)
		return { success: true }
	} catch (error) {
		return { error: "Login gagal" }
	}
}
```

---

## API Security

- Validasi input dengan Zod di semua entry point
- Rate limiting untuk endpoint publik
- CORS configuration yang tepat
- Authentication check di setiap protected endpoint
- Jangan expose internal IDs ke client

---

## Related Documents

- [System Overview](../architecture/system-overview.md)
- [Engineering Principles](../engineering/engineering-principles.md)
- [Security Baseline](../security/security-baseline.md)
