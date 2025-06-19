.PHONY: migrate-up migrate-down migrate-create db-setup db-drop

# Database connection string
DB_USER := fihry
DB_PASSWORD := Mouthouq_v1
DB_NAME := mouthouq
DB_HOST := localhost
DB_PORT := 5432
DB_URL ?= postgresql://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable

# Migrate up
migrate-up:
		migrate -database $(DB_URL) -path internal/database/migrations up

# Migrate down
migrate-down:
		migrate -database $(DB_URL) -path internal/database/migrations down

# Create a new migration
migrate-create:
		@name=${name:-default_migration}; \
		migrate create -ext sql -dir internal/database/migrations -seq $$name

# Setup database (creates DB and runs migrations)
db-setup:
		@echo "Creating database..."
		@PGPASSWORD=$(DB_PASSWORD) createdb -h $(DB_HOST) -U $(DB_USER) $(DB_NAME) || echo "Database already exists"
		@echo "Running migrations..."
		@make migrate-up

# Drop the database
db-drop:
		@echo "Dropping database..."
		@PGPASSWORD=$(DB_PASSWORD) dropdb -h $(DB_HOST) -U $(DB_USER) $(DB_NAME) || echo "Database does not exist or could not be dropped."