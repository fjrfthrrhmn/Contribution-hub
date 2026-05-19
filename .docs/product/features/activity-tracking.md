# Feature: GitHub Activity Tracking

> Fitur inti untuk melacak dan merekam aktivitas GitHub pengguna secara otomatis.

---

## Deskripsi

Fitur ini memungkinkan pengguna menghubungkan akun GitHub mereka dan secara otomatis melacak semua aktivitas coding yang meaningful. Sistem membaca data dari GitHub API dan menyimpannya dalam format terstruktur untuk analisis dan visualisasi lebih lanjut.

## User Story

Sebagai developer, saya ingin semua aktivitas coding saya (commit, PR, issue) otomatis tercatat di satu tempat, sehingga saya tidak perlu manual mencatat apa yang sudah saya kerjakan setiap hari.

## Acceptance Criteria

### GitHub Integration

- [ ] Pengguna dapat login dengan GitHub OAuth
- [ ] Sistem dapat membaca public repositories pengguna
- [ ] Sistem dapat membaca private repositories (dengan izin)
- [ ] Sync aktivitas dilakukan secara otomatis setiap 15 menit
- [ ] Pengguna dapat memilih repository yang dilacak (include/exclude)
- [ ] Rate limit GitHub API di-handle dengan baik

### Activity Types yang Dilacak

| Tipe Aktivitas         | Sumber Data       | Kategori      |
| ---------------------- | ----------------- | ------------- |
| Push / Commit          | GitHub Events API | Coding        |
| Pull Request dibuat    | GitHub Events API | Collaboration |
| Pull Request di-review | GitHub Events API | Review        |
| Issue dibuat           | GitHub Events API | Management    |
| Issue comment          | GitHub Events API | Discussion    |
| Code review comment    | GitHub Events API | Review        |
| Repository created     | GitHub Events API | Management    |
| Release published      | GitHub Events API | Release       |
| Fork                   | GitHub Events API | Exploration   |
| Star                   | GitHub Events API | Curation      |

### Activity Log

- [ ] Setiap aktivitas memiliki timestamp, repository, tipe, dan deskripsi
- [ ] Aktivitas ditampilkan dalam timeline kronologis
- [ ] Filter berdasarkan tipe aktivitas, repository, atau tanggal
- [ ] Search di dalam activity log
- [ ] Ekspor activity log ke JSON/CSV/Markdown

### Smart Deduplication

- [ ] Aktivitas yang sama tidak dicatat dua kali
- [ ] Commit dalam satu push digabung menjadi satu entry (dengan detail)
- [ ] PR updates tidak membuat entry baru (hanya status change)

## Technical Notes

### Data Model

```typescript
interface Activity {
	id: string
	userId: string
	type:
		| "commit"
		| "pull_request"
		| "issue"
		| "review"
		| "release"
		| "fork"
		| "star"
	repository: {
		name: string
		owner: string
		url: string
	}
	timestamp: Date
	description: string
	metadata: {
		commitCount?: number
		prNumber?: number
		issueNumber?: number
		branch?: string
		files?: string[]
		additions?: number
		deletions?: number
	}
	category:
		| "coding"
		| "review"
		| "management"
		| "discussion"
		| "exploration"
		| "release"
	source: "github_api" | "manual" | "git_hook"
}
```

### API Endpoints

| Method | Endpoint              | Deskripsi                              |
| ------ | --------------------- | -------------------------------------- |
| GET    | /api/activities       | List aktivitas (paginated, filterable) |
| GET    | /api/activities/stats | Activity statistics                    |
| POST   | /api/activities/sync  | Trigger manual sync                    |
| POST   | /api/activities       | Create aktivitas manual                |

### Sync Architecture

```
GitHub API (polling)
    │ (15 menit)
    ▼
Background Job (Vercel Cron / node-cron)
    │
    ├── Fetch events since last sync
    ├── Deduplication check
    ├── Store di database
    └── Update cache (React Query)
```

### Database Tables

- `activities` -- Semua aktivitas yang tercatat
- `activity_sync_log` -- Log sinkronisasi (last sync, status, error)
- `user_repositories` -- Repository yang dipilih pengguna

## Dependencies

- Better Auth (GitHub OAuth plugin)
- TanStack React Query (caching aktivitas)
- Background jobs (Vercel Cron / BullMQ)
- Database (PostgreSQL via Prisma / Drizzle)

## Related Documents

- [Product Definition](../definition.md)
- [Execution Roadmap](../../../ROADMAP.md)
- [Architecture Overview](../../architecture/product-architecture.md)
