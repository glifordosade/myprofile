# Stage 1: Build Astro Static Site
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy project source files
COPY . .

# Build static production files to /app/dist
RUN npm run build

# Stage 2: Serve static files with Nginx
FROM nginx:alpine AS production

# Custom Nginx configuration for Astro static routing & caching
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    gzip on;\n\
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;\n\
\n\
    location / {\n\
        try_files $uri $uri/ $uri.html /index.html;\n\
    }\n\
\n\
    location /_astro/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
