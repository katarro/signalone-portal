#!/bin/bash

# Script de deploy para producción
# Este script asume que ya tienes el código en el servidor

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
APP_DIR="/var/www/signalone-portal"
BACKUP_DIR="/var/backups/signalone-portal"
SERVICE_NAME="signalone-portal"

# Función para mostrar errores y salir
error_exit() {
    echo -e "${RED}❌ Error: $1${NC}" >&2
    exit 1
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Función para mostrar info
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Función para mostrar warning
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo -e "${BLUE}🚀 Iniciando deploy de producción - SignalOne Portal${NC}"
echo ""

# Verificar que se ejecuta como root o con sudo
if [ "$EUID" -ne 0 ]; then
    error_exit "Este script debe ejecutarse como root o con sudo"
fi

# Cambiar al directorio de la aplicación
cd "$APP_DIR" || error_exit "No se pudo acceder al directorio $APP_DIR"

# Crear directorio de backup si no existe
mkdir -p "$BACKUP_DIR"

echo ""
info "📋 Creando backup de la aplicación actual..."
BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" . || warning "No se pudo crear el backup"

echo ""
info "🔄 Poniendo la aplicación en modo mantenimiento..."
php artisan down --retry=60 || warning "No se pudo activar el modo mantenimiento"

echo ""
info "📦 Actualizando dependencias de Composer..."
composer install --optimize-autoloader --no-dev --no-interaction || error_exit "Falló la instalación de Composer"

echo ""
info "📦 Actualizando dependencias de npm..."
npm ci --production || error_exit "Falló la instalación de npm"

echo ""
info "🗄️  Ejecutando migraciones de base de datos..."
php artisan migrate --force || error_exit "Fallaron las migraciones"

echo ""
info "📦 Compilando assets frontend..."
npm run build || error_exit "Falló la compilación de assets"

echo ""
info "🧹 Limpiando cachés..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

echo ""
info "⚡ Optimizando para producción..."
php artisan config:cache || error_exit "Falló el cache de configuración"
php artisan route:cache || error_exit "Falló el cache de rutas"
php artisan view:cache || error_exit "Falló el cache de vistas"
php artisan optimize || error_exit "Falló la optimización"

echo ""
info "🔧 Configurando permisos..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo ""
info "🔄 Reiniciando servicios..."
systemctl reload-or-restart nginx || warning "No se pudo reiniciar nginx"
systemctl reload-or-restart php8.1-fpm || warning "No se pudo reiniciar PHP-FPM"

# Si usas supervisor para colas
if systemctl is-active --quiet supervisor; then
    supervisorctl restart all || warning "No se pudo reiniciar supervisor"
fi

echo ""
info "🔄 Saliendo del modo mantenimiento..."
php artisan up || warning "No se pudo desactivar el modo mantenimiento"

echo ""
success "🎉 Deploy de producción completado exitosamente!"
echo ""
info "📊 Información del deploy:"
echo "  - Proyecto: SignalOne Portal"
echo "  - Fecha: $(date)"
echo "  - Usuario: $(whoami)"
echo "  - Backup: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
echo ""
info "🔍 Para verificar el estado de la aplicación:"
echo "  systemctl status nginx"
echo "  systemctl status php8.1-fpm"
echo "  tail -f storage/logs/laravel.log"
