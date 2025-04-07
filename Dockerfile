# Build stage
FROM --platform=linux/arm64 node:20-alpine AS build

WORKDIR /app

# Define build arguments
ARG VITE_ENV
ARG VITE_BACKEND_URL_DEV

# Set environment variables for Vite build
ENV VITE_ENV=$VITE_ENV
ENV VITE_BACKEND_URL_DEV=$VITE_BACKEND_URL_DEV

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM --platform=linux/arm64 nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port (default to 80, can be overridden at runtime)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 