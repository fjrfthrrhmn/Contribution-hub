# src/testing/ -- Test Infrastructure

## Fungsi

Setup dan utilities untuk testing: Vitest configuration, Testing Library setup, custom matchers, test fixtures, mock data factories, MSW handlers.

## Aturan Development

- Test files diletakkan berdampingan dengan source file (\*.test.ts)
- Folder ini hanya untuk shared test utilities, bukan test files
- Coverage target: utils 90%+, hooks 80%+, components 70%+

## Convention

- Nama file: `setup.ts`, `test-utils.tsx`, `factories.ts`, `mocks.ts`
- Helper functions: `renderWithProviders`, `createMockUser`, `mockApiResponse`
- Test data factories untuk generate data konsisten

## Dependency Boundaries

- Boleh import: semua folder (untuk setup dan mocking)
- Tidak boleh: mengandung test logic aplikasi

## Best Practices

- AAA pattern: Arrange → Act → Assert
- Satu logical assertion per test case
- Mock eksternal API calls di test setup
- Gunakan fakery/test data, jangan hardcode values di test

## AI Do's / Don'ts

- Boleh: menambah test utilities, setup helpers
- Tidak boleh: mengubah production code via testing folder
