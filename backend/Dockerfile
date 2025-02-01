# Usa uma imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    libicu-dev \
    supervisor \
    procps \
    netcat-openbsd \  
    # Substitua netcat por netcat-openbsd
    && docker-php-ext-install pdo pdo_mysql mysqli zip bcmath intl opcache

# Instala a extensão phpredis
RUN pecl install redis && docker-php-ext-enable redis

# Habilita o módulo do Apache rewrite
RUN a2enmod rewrite

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia o código do Laravel para o container
COPY . .

# Instala as dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Instala o pacote predis/predis
RUN composer require predis/predis

# Ajusta permissões para storage e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copia a configuração do Apache
COPY ./conf/apache.conf /etc/apache2/sites-available/000-default.conf

# Expõe a porta 80 (HTTP)
EXPOSE 80

# Comando para iniciar o Apache
CMD ["apache2-foreground"]