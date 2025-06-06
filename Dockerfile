FROM php:8.2-cli

# Install dependencies termasuk Node.js terbaru
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    curl \
    && docker-php-ext-install pdo_sqlite

# Install Node.js versi LTS
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files dulu
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Copy package.json dan package-lock.json jika ada
COPY package*.json ./

# Install npm dependencies dengan handling error
RUN npm install --production --no-optional --no-audit || echo "NPM install failed, continuing without frontend assets"

# Copy seluruh aplikasi
COPY . .

# Build assets jika memungkinkan
RUN npm run build || npm run production || echo "No build script or build failed, continuing..."

# Create database dan set permissions
RUN touch database/database.sqlite \
    && chmod -R 755 storage bootstrap/cache database

# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /root/.npm

# Expose port
EXPOSE 8000

# Start Laravel
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000