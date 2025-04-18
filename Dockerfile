# # # Build stage
# FROM --platform=arm64 node:20-alpine AS build

# # WORKDIR /app

# # EXPOSE 4173

# # # Define build arguments
# # ARG VITE_ENV
# ARG VITE_BACKEND_URL

# # # Set environment variables for Vite build
# # ENV VITE_ENV=$VITE_ENV
# ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# # # Copy package files
# # COPY package.json yarn.lock ./

# # # Install dependencies
# RUN yarn install --frozen-lockfile

# # # Copy source code
# COPY . .

# # # Build the application
# RUN yarn build

# CMD yarn preview

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY ./build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 