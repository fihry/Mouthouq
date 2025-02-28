.PHONY: migrate-up migrate-down migrate-create db-setup

# Database connection string
DB_URL:="postgresql://fihry:Mouthouq_v1@localhost:5432/mouthouq?sslmode=disable"

# Migrate up
migrate-up:
    migrate -database $(DB_URL) -path internal/database/migrations up

# Migrate down
migrate-down:
    migrate -database $(DB_URL) -path internal/database/migrations down

# Create a new migration
migrate-create:
    migrate create -ext sql -dir internal/database/migrations -seq $(name)

# Setup database (creates DB and runs migrations)
db-setup:
    @echo "Creating database..."
    @PGPASSWORD=Mouthouq_v1 createdb -h localhost -U fihry mouthouq || echo "Database already exists"
    @echo "Running migrations..."
    @make migrate-up