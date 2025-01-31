# Usa uma imagem oficial do PHP com suporte ao Laravel
FROM php:8.2-fpm

# Instala extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www/html

# 🔥 Copia todo o código do Laravel ANTES de rodar o Composer
COPY ./backend ./

# 🔥 Agora que todos os arquivos foram copiados, podemos instalar as dependências
RUN composer install --no-dev --optimize-autoloader

# Ajusta permissões para storage e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expor a porta do PHP-FPM
EXPOSE 9000

# Comando padrão do Laravel
CMD ["php-fpm"]
