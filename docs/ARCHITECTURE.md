# Mouthouq - Project Structure & Tools

## Backend Development (Go + PostgreSQL)
- Gin - Lightweight HTTP web framework for Go.
- GORM - ORM library for PostgreSQL integration.
- GORM AutoMigrate - Schema managed by models at startup.
- bcrypt - Password hashing for authentication security.
- JWT - Token-based authentication.
- AIService (mock) - Basic scoring and verification placeholder logic.

## Frontend Development (Next.js + Tailwind CSS)
- Next.js - SSR and API-ready React framework.
- Tailwind CSS - Utility-first CSS for styling.
- shadcn/ui - Pre-built UI components.
- Lucide Icons - Open-source icons for UI.

## Database & Data Management
- PostgreSQL - Primary relational database.
- Redis - Optional cache (configured, not yet used).
- MinIO - Object storage for media uploads.

## Authentication & Security
- JWT (current).
- OAuth2 and CSRF protection (planned).

## Real-time & Notifications
- WebSockets (planned).

## Deployment & DevOps
- Docker - Local and development containerization.
- Kubernetes, NGINX, GitHub Actions, and cloud hosting (planned).

## Project Tree
```tree
Mouthouq/
│── docker-compose.yml
│── Makefile
│── README.MD
│── docs/
│   ├── API_DOCS.md
│   ├── ARCHITECTURE.md
│   ├── BUSINESS_MODEL.md
│   ├── ROADMAP.md
│   ├── GIT_WORKFLOW.md
│   ├── Mawthouq_Booklet.pdf
│   └── diagrams/
│       ├── API_ARCHITECTURE.md
│       └── DB_SCHEMA.md
│
│── src/
│   ├── backend/
│   │   ├── cmd/main.go
│   │   ├── internal/
│   │   │   ├── config/
│   │   │   ├── database/
│   │   │   ├── handlers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── utils/
│   │   │   └── websocket/       # placeholder
│   │   ├── Dockerfile
│   │   └── go.mod
│   │
│   └── frontend/
│       ├── src/app/
│       ├── src/components/
│       ├── Dockerfile
│       ├── next.config.ts
│       └── package.json
```
