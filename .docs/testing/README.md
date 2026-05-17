# testing/ -- Dokumentasi Testing

> Testing strategy, test types, coverage goals, dan best practices.

---

## Tujuan

Folder ini berisi dokumentasi testing yang mencakup:

- Testing strategy dan philosophy
- Unit testing guidelines
- Integration testing approach
- E2E testing dengan Playwright
- Coverage targets dan monitoring
- Mocking strategy
- Test data management
- CI/CD test integration

---

## Struktur yang Direkomendasikan

```txt
testing/
├── README.md              # File ini -- panduan folder
├── strategy.md            # Testing strategy overview
├── unit-testing.md        # Unit testing guidelines
├── integration-testing.md # Integration testing approach
├── e2e-testing.md         # E2E testing dengan Playwright
├── mocking.md             # Mocking strategy dan tools
├── coverage.md            # Coverage targets dan laporan
└── test-data.md           # Test fixtures dan factories
```

---

## Testing Pyramid

```
        /\
       /  \          E2E (Playwright) -- Critical paths
      /    \
     /      \        Integration -- Feature interactions
    /        \
   /__________\      Unit (Vitest) -- Logic, hooks, utils
```

---

## Template Test Plan

```markdown
# Test Plan: [Feature/Module]

## Scope

[Apa yang akan di-test]

## Out of Scope

[Apa yang TIDAK akan di-test]

## Test Cases

### Unit Tests

- [ ] Test case 1: [deskripsi]
- [ ] Test case 2: [deskripsi]

### Integration Tests

- [ ] Test case 1: [deskripsi]

### E2E Tests

- [ ] Test case 1: [deskripsi]

## Test Data

[Data yang dibutuhkan untuk testing]

## Success Criteria

[Kriteria kelulusan]
```

---

## Testing Principles

1. **Test behavior, not implementation** -- Fokus pada output, bukan internal detail
2. **Arrange-Act-Assert** -- Pola standar untuk test cases
3. **One assertion per test** -- Idealnya satu logical assertion per test
4. **Independent tests** -- Test harus bisa jalan dalam urutan apapun
5. **Fast feedback** -- Unit test harus selesai dalam milliseconds
6. **Realistic data** -- Gunakan data yang mendekati production

---

## Coverage Targets

| Layer                  | Target       |
| ---------------------- | ------------ |
| Utils / Pure functions | 90%+         |
| Hooks                  | 80%+         |
| Components             | 70%+         |
| API Routes             | 80%+         |
| E2E Critical Paths     | 100% covered |

---

## Tools

- **Vitest** -- Unit dan integration testing
- **Testing Library** -- React component testing
- **Playwright** -- E2E browser testing
- **MSW** -- API mocking (jika digunakan)
- **faker.js / @faker-js** -- Test data generation
