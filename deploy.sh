#!/bin/bash

echo "🚀 Iniciando deploy de SignalOne Portal..."
echo ""

echo "📦 Compilando assets frontend..."
npm run build

echo ""
echo "⚡ Optimizando Laravel para producción..."

echo "- Cacheando configuración..."
php artisan config:cache

echo "- Cacheando rutas..."
php artisan route:cache

echo "- Cacheando vistas..."
php artisan view:cache

echo "- Optimizando aplicación..."
php artisan optimize

echo ""
echo "✅ Deploy completado exitosamente"
echo "🌐 Iniciando servidor en puerto 8080..."
echo "📍 Acceso: http://100.122.44.126:8080"
echo ""

php artisan serve --host=0.0.0.0 --port=8080