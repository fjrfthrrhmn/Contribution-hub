# architecture/ -- Dokumentasi Arsitektur

> System architecture, data flow, module boundaries, dan architectural patterns.

---

## Tujuan

Folder ini berisi dokumentasi arsitektur yang mencakup:

- Information architecture (sitemap, navigation, user flows, URL design)
- High-level system architecture
- Module boundaries dan dependency graph
- Data flow diagrams
- Component hierarchy
- State management architecture
- API architecture dan integration patterns
- Error handling strategy
- Performance architecture

---

## Struktur yang Direkomendasikan

```txt
architecture/
├── README.md              # File ini -- panduan folder
├── information-architecture.md # Sitemap, navigasi, user flows, URL design
├── system-overview.md     # High-level architecture overview
├── product-architecture.md # Domain model, feature mapping, data flow
├── folder-structure.md    # FSD folder structure dan dependency rules
│── data-flow.md           # Data flow diagrams dan penjelasan
├── state-management.md    # State management architecture
├── error-handling.md      # Error handling strategy
├── performance.md         # Performance architecture decisions
└── diagrams/              # Architecture diagrams (Mermaid, Excalidraw)
```

---

## Template Architecture Document

```markdown
# [Architecture Concern]

## Context

[Latar belakang dan problem statement]

## Decision

[Keputusan arsitektur yang diambil]

## Rationale

[Mengapa memilih pendekatan ini]

## Consequences

[Dampak positif dan negatif dari keputusan ini]

## Diagram

[Link atau embed diagram arsitektur]
```

---

## Architecture Principles

1. **Separation of Concerns** -- Pisahkan UI, logic, state, dan API
2. **Dependency Inversion** -- Module abstrak tidak boleh dependen pada module konkret
3. **Explicit Boundaries** -- Batas module harus jelas dan ditegakkan
4. **Loose Coupling** -- Module harus bisa berubah secara independen
5. **High Cohesion** -- Module harus berisi hal-hal yang saling terkait
6. **Consistent Patterns** -- Gunakan pola yang sama untuk masalah yang sama

---

## Feature-Sliced Design (FSD) Layers

```
app/           -- Entry point, routing, global layout
├── processes/  -- Business processes (multi-step)
├── pages/     -- Halaman aplikasi (composed dari features)
├── features/  -- Feature modules (self-contained)
├── entities/  -- Business entities
└── shared/    -- Shared UI, lib, API, config
```

Lihat dokumentasi FSD di `AGENTS.md` untuk detail lebih lanjut.

---

## Tools for Architecture Documentation

- **Mermaid.js** -- Diagram sebagai kode (sequence, flow, class)
- **Excalidraw** -- Whiteboard-style diagrams (simpan di `diagrams/`)
- **PlantUML** -- Text-based UML diagrams
- **SVG** -- Untuk diagram statis yang complex
