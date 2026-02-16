# Stage 1: Build the Go application
FROM golang:1.23-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go binary
RUN go build -o /out/backend cmd/main.go

# Stage 2: Create a minimal image to run the app
FROM alpine:3.14

# Set the working directory
WORKDIR /app

# Install required dependencies (e.g., libc if needed)
RUN apk add --no-cache libc6-compat

# Copy the compiled Go binary from the builder stage
COPY --from=builder /out/backend /app/backend

# Copy configuration
COPY internal/config /app/internal/config

# Environment variables will be handled by docker-compose env_file

# Expose the port your app will run on
EXPOSE 8000

# Start the Go application
CMD ["./backend"]
