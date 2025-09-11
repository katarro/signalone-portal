#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

echo -e "${BLUE}🚀 Iniciando deploy de SignalOne Portal...${NC}"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "composer.json" ] || [ ! -f "package.json" ]; then
    error_exit "No se encontraron archivos composer.json o package.json. Ejecuta desde la raíz del proyecto."
fi

# Verificar dependencias
info "� Verificando dependencias..."

if ! command -v php &> /dev/null; then
    error_exit "PHP no está instalado o no está en el PATH"
fi

if ! command -v composer &> /dev/null; then
    error_exit "Composer no está instalado o no está en el PATH"
fi

if ! command -v npm &> /dev/null; then
    error_exit "npm no está instalado o no está en el PATH"
fi

# Verificar archivo .env
if [ ! -f ".env" ]; then
    warning "Archivo .env no encontrado. Copiando desde .env.example..."
    cp .env.example .env || error_exit "No se pudo crear el archivo .env"
fi

echo ""
info "�📦 Instalando dependencias de Composer..."
composer install --optimize-autoloader --no-dev || error_exit "Falló la instalación de dependencias de Composer"

echo ""
info "📦 Instalando dependencias de npm..."
npm ci || error_exit "Falló la instalación de dependencias de npm"

echo ""
info "🔑 Generando clave de aplicación..."
php artisan key:generate --force || error_exit "Falló la generación de la clave de aplicación"

echo ""
info "🗄️  Ejecutando migraciones de base de datos..."
php artisan migrate --force || error_exit "Fallaron las migraciones de base de datos"

echo ""
info "🌱 Ejecutando seeders..."
php artisan db:seed --force || warning "Los seeders fallaron, continuando..."

echo ""
info "🔗 Creando enlace simbólico de storage..."
php artisan storage:link || warning "El enlace de storage ya existe o falló"

echo ""
info "🧪 Ejecutando tests..."
composer run test || error_exit "Los tests fallaron. No se puede continuar con el deploy"

echo ""
info "📦 Compilando assets frontend para producción..."
npm run build || error_exit "Falló la compilación de assets frontend"

echo ""
info "⚡ Optimizando Laravel para producción..."

info "- Limpiando cachés existentes..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

info "- Cacheando configuración..."
php artisan config:cache || error_exit "Falló el cache de configuración"

info "- Cacheando rutas..."
php artisan route:cache || error_exit "Falló el cache de rutas"

info "- Cacheando vistas..."
php artisan view:cache || error_exit "Falló el cache de vistas"

info "- Optimizando aplicación..."
php artisan optimize || error_exit "Falló la optimización de la aplicación"

echo ""
success "🎉 Deploy completado exitosamente!"
echo ""
info "📊 Información del deploy:"
echo "  - Proyecto: SignalOne Portal"
echo "  - Fecha: $(date)"
echo "  - Usuario: $(whoami)"
echo "  - Directorio: $(pwd)"
echo ""
info "🌐 Para iniciar el servidor de desarrollo:"
echo "  php artisan serve --host=0.0.0.0 --port=8080"
echo ""
info "📍 Acceso local: http://localhost:8080"
info "📍 Acceso red: http://$(hostname -I | cut -d' ' -f1):8080"