# Stage 1: Build the Vite frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies (includes devDependencies required for vite build)
RUN npm install

# Copy all source files
COPY . .

# Build the frontend (outputs to /app/dist)
RUN npm run build

# Stage 2: Setup the final Node server image
FROM node:18-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy backend package files
COPY server/package*.json ./server/

# Install backend dependencies
RUN cd server && npm install --production

# Copy backend source
COPY server/ ./server/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./dist

# Expose the API/Server port
EXPOSE 5000

# Start the server directly
CMD ["node", "server/server.js"]
