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
FROM node:20-alpine

WORKDIR /app

# Copy the built app and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/public ./public # Commented out as it's missing

EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
