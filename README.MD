# Mouthouq

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Private](https://img.shields.io/badge/license-proprietary-red)

## Overview

Mouthouq is a professional services marketplace platform connecting users with vetted household service providers in Morocco. We streamline the process of finding and booking reliable maintenance, cleaning, and home improvement services.

## Technology Stack

### Backend
- Go
- PostgreSQL
- JWT Authentication
- UUID

### Frontend
- Next.js
- Tailwind CSS
- React Query

### Infrastructure
- Docker
- AWS/DigitalOcean
- GitHub Actions

## Development Setup

1. Environment setup:
```bash
cp .env.example .env
# Configure environment variables
```

2. Install dependencies:
```bash
# Backend
cd src/backend
go mod download

# Frontend
cd src/frontend
npm install
```

3. Start development servers:
```bash
# Backend
cd src/backend
go run main.go

# Frontend
cd src/frontend
npm run dev
```

## Documentation

Internal documentation is available in the `docs` folder:
- [The Mouthouq Booklet](./docs/Mouthouq_Booklet.pdf)
- [API Documentation](./docs/API_DOCS.md)
- [Development Roadmap](./docs/ROADMAP.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Git Workflow](./docs/GIT_WORKFLOW.md)

## Testing

```bash
# Backend tests
cd src/backend
go test ./...

# Frontend tests
cd src/frontend
npm test
```

## Deployment

Deployment guides for different environments:
- [Staging Deployment](./docs/STAGING_DEPLOY.md)
- [Production Deployment](./docs/PROD_DEPLOY.md)

## Support

For internal support and bug reporting, contact:
- Technical Team: tech@mouthouq.ma
- Product Team: product@mouthouq.ma

## Confidentiality Notice

This project and its contents are confidential and proprietary. Unauthorized access, use, or distribution is prohibited.

© 2025 Mouthouq. All rights reserved.