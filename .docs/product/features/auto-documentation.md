# Feature: Auto-Documentation

> Dokumentasi aktivitas coding otomatis yang menghasilkan catatan progress meaningful.

---

## Deskripsi

Auto-Documentation adalah fitur yang secara otomatis mengubah aktivitas coding mentah menjadi dokumentasi progress yang terstruktur dan mudah dibaca. Fitur ini menjembatani kesenjangan antara "coding" dan "mendokumentasikan apa yang sudah dikerjakan."

## User Story

Sebagai developer, saya ingin aktivitas coding saya otomatis terdokumentasi menjadi catatan progress yang rapi, sehingga saya tidak perlu membuang waktu membuat daily report manual dan tetap memiliki portofolio aktivitas yang terorganisir.

## Acceptance Criteria

### Daily Activity Summary

- [ ] Generate otomatis ringkasan aktivitas harian setiap pukul 23:59
- [ ] Format: markdown yang siap dipakai
- [ ] Konten summary:
  - Total commits dan repository yang dikerjakan
  - PR yang dibuat/direview
  - Issue yang dibuat/ditutup
  - Highlight (aktivitas paling signifikan)
  - Learning points (dari commit messages yang mengandung keyword "learn", "study", dll)
- [ ] Pengguna bisa edit summary sebelum disimpan
- [ ] Daily summary bisa di-share ke social media (opsional)

### Weekly Progress Report

- [ ] Generate otomatis setiap hari Minggu
- [ ] Format yang lebih komprehensif:
  - Overview mingguan (total aktivitas per kategori)
  - Streak status
  - Goals achievement rate
  - Repository activity breakdown
  - Insight dan rekomendasi
- [ ] Bisa di-export ke PDF/Markdown/HTML
- [ ] Template yang bisa dikustomisasi
- [ ] Email digest (opsional)

### Auto-Generated Changelog

- [ ] Generate changelog dari commit messages per repository
- [ ] Grouping berdasarkan tipe (feat, fix, refactor, docs, chore)
- [ ] Link ke commit/PR yang relevan
- [ ] Format mengikuti [Keep a Changelog](https://keepachangelog.com/)
- [ ] Bisa di-push ke repository sebagai file CHANGELOG.md

### Activity Journal

- [ ] Timeline view dari semua aktivitas
- [ ] Search dan filter
- [ ] Tagging system untuk kategorisasi manual
- [ ] Notes: pengguna bisa menambahkan catatan personal per hari
- [ ] Export full journal ke berbagai format

### Portfolio Generation

- [ ] Generate GitHub profile README dari aktivitas
- [ ] Include metrics yang meaningful (bukan hanya angka)
- [ ] Tema yang bisa dikustomisasi
- [ ] Auto-update setiap minggu
- [ ] Preview sebelum publish

### Documentation Quality

- [ ] Commit messages dengan keyword tertentu mendapat highlight khusus
- [ ] Deteksi aktivitas dokumentasi (commit ke docs/, .md files)
- [ ] Kualitas dokumentasi scoring (berdasarkan rasio docs vs code)

## Technical Notes

### Data Flow

```
Raw Activities (database)
    │
    ▼
Daily Summary Generator (cron: 23:59 daily)
    │ Parse commit messages
    │ Categorize activities
    │ Generate narrative
    ▼
Daily Summary (markdown)
    │
    ├── Stored in daily_logs table
    ├── Available via API
    └── Sent as notification (opsional)

Weekly Report Generator (cron: Sunday 23:59)
    │ Aggregate 7 daily summaries
    │ Calculate metrics
    │ Generate insight
    ▼
Weekly Report (markdown/PDF)
```

### Narrative Generation

Narasi untuk daily summary dibuat dengan template:

```
## [Day], [Date]

Total aktivitas: [X] commits, [Y] PRs, [Z] reviews

**Repository: [name]**
- [feat]: [deskripsi dari commit message]
- [fix]: [deskripsi dari commit message]
- Progress: [perubahan signifikan]

**Highlight:**
[Commit/PR paling signifikan hari ini]

**Learning:**
[Catatan belajar jika ada]
```

### Data Model

```typescript
interface DailySummary {
	id: string
	userId: string
	date: Date
	content: string // generated markdown
	edited: boolean // apakah sudah diedit user
	highlights: Highlight[]
	metrics: {
		totalCommits: number
		totalPRs: number
		totalReviews: number
		totalIssues: number
		repositories: number
		codingMinutes: number
		learningPoints: string[]
	}
}

interface WeeklyReport {
	id: string
	userId: string
	weekStart: Date
	weekEnd: Date
	content: string // generated markdown
	metrics: WeeklyMetrics
	insight: string[] // generated insight
}
```

### API Endpoints

| Method | Endpoint                    | Deskripsi                 |
| ------ | --------------------------- | ------------------------- |
| GET    | /api/daily-summary?date=    | Get daily summary         |
| PUT    | /api/daily-summary/:id      | Edit daily summary        |
| GET    | /api/weekly-report?week=    | Get weekly report         |
| POST   | /api/daily-summary/generate | Trigger manual generation |
| GET    | /api/journal                | Get activity journal      |

## Dependencies

- date-fns (date formatting)
- next-intl (multi-language summaries)
- recharts / nivo (charts untuk report)
- PDF generation library (jika export PDF)

## Related Documents

- [Activity Tracking](./activity-tracking.md)
- [Habit System](./habit-system.md)
- [GitHub Profile Enhancer](./github-profile.md)
- [Execution Roadmap](../../../ROADMAP.md)
