.PHONY: help env-check db-up db-down db-logs db-shell minio-up minio-down minio-logs run-backend run-frontend build clean status compose-up compose-down compose-logs compose-restart

# Load environment variables
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# --------------------------
# Help
# --------------------------
help:
	@echo "Mouthouq Makefile Commands:"
	@echo ""
	@echo "  Database (Postgres):"
	@echo "    make db-up       - Start Postgres container"
	@echo "    make db-down     - Stop Postgres container"
	@echo "    make db-logs     - Show Postgres logs"
	@echo "    make db-shell    - Connect to Postgres shell"
	@echo ""
	@echo "  MinIO (Storage):"
	@echo "    make minio-up    - Start MinIO container"
	@echo "    make minio-down  - Stop MinIO container"
	@echo "    make minio-logs  - Show MinIO logs"
	@echo ""
	@echo "  App (Local Development):"
	@echo "    make run-backend  - Run Go backend locally"
	@echo "    make run-frontend - Run Next.js frontend locally"
	@echo "    make build        - Build backend binary"
	@echo "    make clean        - Remove build artifacts and caches"
	@echo ""
	@echo "  Docker Compose Stack:"
	@echo "    make compose-up      - Start all containers"
	@echo "    make compose-down    - Stop all containers"
	@echo "    make compose-logs    - View all logs"
	@echo "    make compose-restart - Restart all containers"
	@echo ""
	@echo "  Utility:"
	@echo "    make env-check    - Check environment variables"
	@echo "    make status       - Check service status"

# --------------------------
# Environment check
# --------------------------
env-check:
	@echo "=== Environment Check ==="
	@echo "DB_HOST: $(DB_HOST)"
	@echo "DB_PORT: $(DB_PORT)"
	@echo "DB_NAME: $(DB_NAME)"
	@echo "DB_USER: $(DB_USER)"
	@echo "SERVER_PORT: $(SERVER_PORT)"
	@echo "MINIO_ENDPOINT: $(MINIO_ENDPOINT)"
	@echo "REDIS_HOST: $(REDIS_HOST)"
	@echo "JWT_SECRET: $$(echo $(JWT_SECRET) | cut -c1-5)..."

# --------------------------
# Docker Compose stack
# --------------------------
compose-up:
	@echo "🚀 Starting Mouthouq stack..."
	docker compose up -d
	@echo "✅ Stack started!"

compose-down:
	@echo "� Stopping Mouthouq stack..."
	docker compose down
	@echo "✅ Stack stopped!"

compose-logs:
	docker compose logs -f

compose-restart: compose-down compose-up
	@echo "� Stack restarted!"

# --------------------------
# Database commands
# --------------------------
db-up:
	docker compose up -d postgres

db-down:
	docker compose stop postgres && docker compose rm -f postgres

db-logs:
	docker compose logs -f postgres

db-shell:
	docker compose exec postgres psql -U $(DB_USER) -d $(DB_NAME)

# --------------------------
# MinIO commands
# --------------------------
minio-up:
	docker compose up -d minio

minio-down:
	docker compose stop minio && docker compose rm -f minio

minio-logs:
	docker compose logs -f minio

# --------------------------
# Backend / Frontend commands
# --------------------------
run-backend:
	cd src/backend && go run cmd/main.go

run-frontend:
	cd src/frontend && npm run dev

build:
	mkdir -p bin
	cd src/backend && go build -o ../../bin/backend cmd/main.go

clean:
	@echo "🧹 Cleaning up..."
	rm -rf bin/
	cd src/backend && go clean
	cd src/frontend && rm -rf .next

# --------------------------
# Status
# --------------------------
status: env-check
	@echo "=== System Status ==="
	@docker ps --filter "name=mouthouq" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
