.PHONY: migrate-up migrate-down migrate-create db-setup db-drop run-backend run-frontend logs

# --------------------------
# Load environment variables
# --------------------------
ENV_FILE := .env
include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

# Database connection string
DB_URL ?= postgresql://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable

# --------------------------
# Database / Migrations
# --------------------------

# Migrate up
migrate-up:
	@echo "⬆️ Running migrations up..."
	cd src/backend && migrate -database "$(DB_URL)" -path internal/database/migrations up

# Migrate down
migrate-down:
	@echo "⬇️ Running migrations down..."
	cd src/backend && migrate -database "$(DB_URL)" -path internal/database/migrations down

# Create a new migration
migrate-create:
	@name=${name:-default_migration}; \
	echo "📂 Creating migration $$name..."; \
	cd src/backend && migrate create -ext sql -dir internal/database/migrations -seq $$name

# --------------------------
# Database setup / teardown
# --------------------------

# Setup database (cluster, user, DB, migrations)
db-setup:
	@echo "🚀 Ensuring PostgreSQL cluster exists..."
	@if ! pg_lsclusters | grep -q "16.*online"; then \
		echo "Cluster not found, creating..."; \
		sudo pg_createcluster 16 local --start; \
	else \
		echo "Cluster already exists."; \
	fi
	@echo "🚀 Creating user $(DB_USER) if not exists..."
	@sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname='$(DB_USER)'" | grep -q 1 || \
		sudo -u postgres psql -c "CREATE USER $(DB_USER) WITH PASSWORD '$(DB_PASSWORD)';"
	@echo "🚀 Creating database $(DB_NAME) if not exists..."
	@sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname='$(DB_NAME)'" | grep -q 1 || \
		sudo -u postgres psql -c "CREATE DATABASE $(DB_NAME) OWNER $(DB_USER);"
	@echo "⬆️ Running migrations up..."
	@$(MAKE) migrate-up

# Drop database
db-drop:
	@echo "🗑️ Dropping database $(DB_NAME)..."
	@sudo -u postgres dropdb $(DB_NAME) 2>/dev/null || echo "Database does not exist or could not be dropped."

# --------------------------
# Backend / Frontend
# --------------------------

# Run backend
run-backend:
	@echo "🏃 Running backend at http://$(SERVER_HOST):$(SERVER_PORT)"
	cd src/backend && go run ./cmd/main.go

# Run frontend
run-frontend:
	@echo "🏃 Running frontend"
	cd src/frontend && npm install && npm run dev

# Tail backend logs
logs:
	@echo "📜 Tailing logs from $(LOG_FILE)"
	@sudo tail -f $(LOG_FILE)
