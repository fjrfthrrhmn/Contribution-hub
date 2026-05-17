# Engineering Principles

> Prinsip engineering, state management rules, dan async operation guidelines.

---

## Core Principles

### 1. RSC by Default

- Gunakan Server Components (RSC) secara default
- Tambahkan `'use client'` hanya jika komponen butuh interaktivitas
- Client boundary di leaf components, bukan di layout/page

### 2. Data Fetching Strategy

```tsx
// ✅ RSC: Langsung async component
async function Page() {
	const data = await fetchData()
	return <List data={data} />
}

// ✅ React Query: Client-side dengan caching
function usePosts() {
	return useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
		staleTime: 5 * 60 * 1000
	})
}

// ❌ Jangan fetch di komponen tanpa caching strategy
function Bad() {
	const [data, setData] = useState(null)
	useEffect(() => {
		fetch("/api/data").then(setData)
	}, [])
}
```

### 3. State Management Rules

| State Type  | Tool            | Rules                                   |
| ----------- | --------------- | --------------------------------------- |
| Server data | React Query     | Query key convention, staleTime, gcTime |
| UI state    | Zustand         | Store per feature, slice pattern        |
| URL state   | Router          | Gunakan searchParams, jangan duplikasi  |
| Form state  | React Hook Form | Zod resolver, controlled components     |

### 4. Async Operation Rules

- **Mutations**: React Query `useMutation` atau Server Actions
- **Loading states**: Gunakan `isPending` dari React Query, jangan manual
- **Error handling**: Error boundary + toast notification (sonner)
- **Optimistic updates**: React Query `onMutate` untuk instant UI

```tsx
// ✅ Standard mutation pattern
const mutation = useMutation({
	mutationFn: updatePost,
	onMutate: async (newPost) => {
		await queryClient.cancelQueries({ queryKey: ["posts"] })
		const previous = queryClient.getQueryData(["posts"])
		queryClient.setQueryData(["posts"], (old) => [...old, newPost])
		return { previous }
	},
	onError: (err, newPost, context) => {
		queryClient.setQueryData(["posts"], context.previous)
		toast.error("Gagal menyimpan")
	}
})
```

---

## Component Principles

### UI Component Rules

- **shadcn/ui**: Install per-component, kustomisasi via className
- **Stateful logic**: Ekstrak ke custom hook, jangan di komponen
- **Props**: Explicit interface, jangan spread sembarangan
- **Accessibility**: ARIA labels, keyboard nav, focus management

### Provider Rules

- Provider must be at the top of the tree
- Provider tidak boleh render UI
- Provider harus pure wrapper
- Provider tidak boleh fetch data langsung

---

## Code Organization

### File Size Limits

- **Component**: Maks 200 baris. Jika lebih, ekstrak sub-komponen
- **Hook**: Maks 100 baris. Jika lebih, ekstrak utilitas
- **Util function**: Maks 50 baris. Satu fungsi = satu tanggung jawab
- **Store**: Maks 150 baris. Jika lebih, slice pattern

### Import Rules

```tsx
// ✅ Urutan import
import type { ReactNode } from "react" // 1. Built-in

import { useQuery } from "@tanstack/react-query" // 2. Eksternal

import { anything } from "@/features/auth/..." // Cross-feature import

import { formatDate } from "@/utils/format-date" // 4. Relative (jika perlu)

import { Button } from "@/components/ui/button" // 3. Internal (@/ alias)

// ❌ Dilarang
import { something } from "../../components/..." // Relative path dengan ../../
```

---

## Error Handling

### Strategy

```tsx
// 1. API Layer: Zod validation
const schema = z.object({ email: z.string().email() })

// 2. Service Layer: try/catch dengan typed errors
async function getUsers(): Promise<Result<User[]>> {
  try {
    const data = await api.get('/users')
    return { ok: true, data }
  } catch (error) {
    return { ok: false, error: parseApiError(error) }
  }
}

// 3. UI Layer: Error boundary + toast
function UsersPage() {
  const { data, error } = useQuery(...)
  if (error) return <ErrorState message={error.message} />
  return <UserList data={data} />
}
```

---

## Performance Rules

1. **Dynamic import** untuk komponen berat: `next/dynamic`
2. **Image optimization**: next/image, webp format
3. **Debounce/throttle**: usehooks-ts untuk event berat
4. **React.memo**: Hanya untuk list items dengan banyak render
5. **Bundle size**: Monitor dengan next/bundle-analyzer

---

## Related Documents

- [System Overview](../architecture/system-overview.md)
- [API Guidelines](../api/api-guidelines.md)
- [Testing Strategy](../testing/testing-strategy.md)
