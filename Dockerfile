# Use PHP 8.2 with Alpine (lebih ringan)
FROM php:8.2-fpm-alpine

# Install system dependencies dan PHP extensions yang dibutuhkan Laravel + SQLite
RUN apk add --no-cache \
    build-base \
    curl \
    zip \
    unzip \
    git \
    nodejs \
    npm \
    nginx \
    supervisor \
    sqlite \
    sqlite-dev \
    && docker-php-ext-install \
    pdo \
    pdo_sqlite \
    bcmath \
    ctype \
    fileinfo \
    mbstring \
    tokenizer \
    xml

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files terlebih dahulu (untuk better Docker layer caching)
COPY composer.json composer.lock ./

# Set memory limit untuk composer
ENV COMPOSER_MEMORY_LIMIT=-1

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --ignore-platform-reqs \
    --prefer-dist

# Copy package.json untuk npm dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm ci --only=production

# Copy seluruh aplikasi
COPY . .

# Generate autoload dan optimize
RUN composer dump-autoload --optimize \
    && composer run-script post-autoload-dump

# Build assets jika ada
RUN npm run build || npm run production || echo "No build script found"

# Create SQLite database file dan set permissions
RUN touch /app/database/database.sqlite \
    && chown -R www-data:www-data \
    /app/storage \
    /app/bootstrap/cache \
    /app/database \
    && chmod -R 775 /app/storage \
    && chmod -R 775 /app/bootstrap/cache \
    && chmod -R 775 /app/database

# Create directories for logs
RUN mkdir -p /var/log/nginx \
    && mkdir -p /var/cache/nginx \
    && mkdir -p /run/nginx

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose port
EXPOSE 8080

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]