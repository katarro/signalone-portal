#!/bin/bash

# Script rápido para desarrollo local
# Uso: ./dev.sh [start|stop|restart|logs|fresh]

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

case "$1" in
    "start")
        info "🚀 Iniciando servidor de desarrollo..."
        php artisan serve --host=0.0.0.0 --port=8080
        ;;
    "stop")
        info "🛑 Deteniendo servidor de desarrollo..."
        pkill -f "php artisan serve" || warning "No hay servidor ejecutándose"
        ;;
    "restart")
        info "🔄 Reiniciando servidor de desarrollo..."
        pkill -f "php artisan serve" 2>/dev/null
        sleep 2
        php artisan serve --host=0.0.0.0 --port=8080 &
        success "Servidor reiniciado en segundo plano"
        ;;
    "logs")
        info "📋 Mostrando logs en tiempo real (Ctrl+C para salir)..."
        tail -f storage/logs/laravel.log
        ;;
    "fresh")
        info "🧹 Instalación fresca para desarrollo..."
        
        # Instalar dependencias
        composer install
        npm install
        
        # Configurar entorno
        if [ ! -f ".env" ]; then
            cp .env.example .env
            php artisan key:generate
        fi
        
        # Base de datos
        php artisan migrate:fresh --seed
        
        # Enlaces y permisos
        php artisan storage:link
        chmod -R 775 storage bootstrap/cache
        
        # Compilar assets
        npm run dev
        
        success "Instalación fresca completada"
        ;;
    "build")
        info "📦 Compilando assets para desarrollo..."
        npm run dev
        ;;
    "watch")
        info "👀 Iniciando watch mode para assets..."
        npm run dev
        ;;
    "test")
        info "🧪 Ejecutando tests..."
        composer run test
        ;;
    "test-coverage")
        info "🧪 Ejecutando tests con cobertura..."
        php artisan test --coverage
        ;;
    *)
        echo "🔧 Script de desarrollo SignalOne Portal"
        echo ""
        echo "Uso: $0 [comando]"
        echo ""
        echo "Comandos disponibles:"
        echo "  start          - Iniciar servidor de desarrollo"
        echo "  stop           - Detener servidor de desarrollo"
        echo "  restart        - Reiniciar servidor de desarrollo"
        echo "  logs           - Ver logs en tiempo real"
        echo "  fresh          - Instalación fresca completa"
        echo "  build          - Compilar assets una vez"
        echo "  watch          - Compilar assets en modo watch"
        echo "  test           - Ejecutar tests"
        echo "  test-coverage  - Ejecutar tests con cobertura"
        echo ""
        echo "Ejemplos:"
        echo "  $0 start"
        echo "  $0 fresh"
        echo "  $0 test"
        ;;
esac
