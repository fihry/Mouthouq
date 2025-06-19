# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (including next.config.ts) into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve Stage
FROM nginx:alpine

# Copy the static assets, public files, and server output from the builder stage
COPY --from=builder /app/.next/static /usr/share/nginx/html/.next/static
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/.next/server /usr/share/nginx/html/.next/server

# Copy the next.config.ts from the builder stage
COPY --from=builder /app/next.config.ts /usr/share/nginx/html/next.config.ts

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
