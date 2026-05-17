# src/hooks/ -- Shared Custom Hooks

## Fungsi

Generic reusable React hooks yang digunakan di seluruh aplikasi: use-debounce, use-media-query, use-local-storage, use-intersection-observer.

## Aturan Development

- Hooks harus generic -- tidak terikat domain tertentu
- Hooks spesifik fitur -> `src/features/<fitur>/hooks/`
- Setiap hook = satu file

## Convention

- Nama file: `use-debounce.ts`, `use-media-query.ts`
- Nama hook: `useDebounce`, `useMediaQuery`
- Return type harus explicit interface

## Dependency Boundaries

- Boleh import: types/, utils/
- Tidak boleh: import dari app/, components/, features/, stores/

## Best Practices

- Cleanup di useEffect untuk memory leak
- Test hooks dengan renderHook dari Testing Library

## AI Do's / Don'ts

- Boleh: membuat generic hooks baru
- Tidak boleh: menaruh feature-specific logic di hooks shared
