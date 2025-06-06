FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    curl \
    && docker-php-ext-install pdo_sqlite \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js LTS
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN COMPOSER_MEMORY_LIMIT=-1 composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Copy package.json jika ada
COPY package*.json ./

# Install npm dependencies dengan fallback ke npm install
RUN npm install --production --no-optional --no-audit --legacy-peer-deps || echo "NPM install failed, continuing..."

# Copy seluruh aplikasi
COPY . .

# Try to build assets
RUN npm run build || npm run production || npm run dev || echo "No build script found, continuing..."

# Create database dan set permissions
RUN touch database/database.sqlite \
    && chmod -R 755 storage bootstrap/cache database

# Expose port
EXPOSE 8000

# Start Laravel with migration
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000