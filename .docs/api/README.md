# api/ -- Dokumentasi API

> API endpoints, request/response schemas, integrasi eksternal.

---

## Tujuan

Folder ini berisi dokumentasi API yang mencakup:

- REST API endpoints dan spesifikasinya
- Request/response schemas
- Authentication dan authorization untuk setiap endpoint
- Error codes dan error responses
- Rate limiting dan throttling
- Integrasi dengan third-party services
- API versioning strategy

---

## Struktur yang Direkomendasikan

```txt
api/
├── README.md              # File ini -- panduan folder
├── overview.md            # API overview, base URL, auth
├── endpoints/             # Dokumentasi per endpoint
│   ├── auth.md
│   ├── users.md
│   └── ...
├── errors.md              # Standard error codes
├── webhooks.md            # Webhook documentation
├── third-party.md         # Third-party API integrations
└── changelog.md           # API changelog
```

---

## Template Endpoint Documentation

```markdown
# [METHOD] /api/[path]

## Description

[Penjelasan endpoint]

## Authentication

[Required auth type]

## Request

### Headers

| Header | Value | Required |
| ------ | ----- | -------- |
|        |       |          |

### Query Parameters

| Parameter | Type | Required | Default | Description |
| --------- | ---- | -------- | ------- | ----------- |
|           |      |          |         |             |

### Request Body

\`\`\`json
{
"field": "value"
}
\`\`\`

## Response

### Success (200)

\`\`\`json
{
"data": {}
}
\`\`\`

### Error (4xx/5xx)

\`\`\`json
{
"error": {
"code": "ERROR_CODE",
"message": "Human readable message"
}
}
\`\`\`

## Example

\`\`\`bash
curl -X [METHOD] https://api.example.com/[path] \
 -H "Authorization: Bearer [token]"
\`\`\`
```

---

## Best Practices

1. **Consistent response format** -- Semua response harus format yang konsisten
2. **Version your API** -- Gunakan prefix `/api/v1/`, `/api/v2/`
3. **Document errors** -- Setiap endpoint harus mendokumentasikan error codes
4. **Use Zod schemas** -- Dokumentasi API bisa digenerate dari Zod schemas
5. **Keep docs updated** -- API docs harus sinkron dengan implementasi

---

## Tools

- **API Route Handler** -- Semua API route di `src/app/api/`
- **Zod** -- Validasi request/response dengan Zod schemas
- **OpenAPI/Swagger** -- Untuk auto-generated API documentation (jika diperlukan)
