<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('captive_portals', function (Blueprint $table) {
            // Configuración avanzada
            $table->integer('listening_port')->nullable()->default(8080)->comment('Puerto de escucha del portal');
            $table->integer('max_clients')->nullable()->default(0)->comment('Máximo número de clientes (0 = ilimitado)');
            $table->boolean('force_https')->default(false)->comment('Forzar HTTPS');
            $table->boolean('enable_mac_auth')->default(false)->comment('Habilitar autenticación por MAC');
            $table->boolean('block_social_media')->default(false)->comment('Bloquear redes sociales');
            $table->boolean('enable_bandwidth_log')->default(false)->comment('Habilitar log de ancho de banda');
            $table->boolean('enable_device_fingerprint')->default(false)->comment('Habilitar fingerprinting de dispositivos');
            
            // Configuración de logs y retención
            $table->integer('log_retention_days')->nullable()->default(30)->comment('Días de retención de logs');
            $table->integer('max_login_attempts')->nullable()->default(5)->comment('Máximo intentos de login');
            $table->integer('lockout_duration')->nullable()->default(30)->comment('Duración de bloqueo en minutos');
            
            // Configuración de seguridad
            $table->text('firewall_rules')->nullable()->comment('Reglas de firewall personalizadas');
            $table->boolean('enable_dos_protection')->default(false)->comment('Habilitar protección DDoS');
            $table->boolean('enable_ssl_enforcement')->default(false)->comment('Forzar SSL/TLS');
            
            // Integraciones
            $table->string('webhook_url')->nullable()->comment('URL de webhook para notificaciones');
            $table->string('radius_server')->nullable()->comment('Servidor RADIUS');
            $table->string('radius_secret')->nullable()->comment('Secreto compartido RADIUS');
            $table->text('api_integrations')->nullable()->comment('Configuración de integraciones API');
            
            // Características adicionales
            $table->boolean('enable_analytics')->default(false)->comment('Habilitar analytics');
            $table->boolean('enable_push_notifications')->default(false)->comment('Habilitar notificaciones push');
            $table->boolean('enable_api_access')->default(false)->comment('Habilitar acceso por API');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('captive_portals', function (Blueprint $table) {
            $table->dropColumn([
                'listening_port',
                'max_clients',
                'force_https',
                'enable_mac_auth',
                'block_social_media',
                'enable_bandwidth_log',
                'enable_device_fingerprint',
                'log_retention_days',
                'max_login_attempts',
                'lockout_duration',
                'firewall_rules',
                'enable_dos_protection',
                'enable_ssl_enforcement',
                'webhook_url',
                'radius_server',
                'radius_secret',
                'api_integrations',
                'enable_analytics',
                'enable_push_notifications',
                'enable_api_access',
            ]);
        });
    }
};
