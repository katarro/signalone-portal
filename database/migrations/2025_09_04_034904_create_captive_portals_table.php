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
        Schema::create('captive_portals', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nombre del portal cautivo');
            $table->text('description')->nullable()->comment('Descripción del portal');
            
            // Configuración de autenticación
            $table->enum('auth_method', [
                'user_password', 
                'voucher', 
                'social', 
                'sms', 
                'terms_only'
            ])->default('terms_only')->comment('Método de autenticación');
            
            // Páginas y redirección
            $table->string('login_page_title')->default('Acceso WiFi')->comment('Título de la página de login');
            $table->text('welcome_message')->nullable()->comment('Mensaje de bienvenida');
            $table->string('redirect_url')->nullable()->comment('URL de redirección después del login');
            $table->boolean('auto_redirect')->default(true)->comment('Redirección automática al portal');
            
            // Términos y condiciones
            $table->boolean('require_terms')->default(true)->comment('Requiere aceptar términos');
            $table->text('terms_content')->nullable()->comment('Contenido de términos y condiciones');
            $table->string('terms_url')->nullable()->comment('URL externa de términos');
            
            // Configuración de sesión
            $table->integer('session_timeout')->default(480)->comment('Tiempo de sesión en minutos (8 horas)');
            $table->integer('idle_timeout')->default(30)->comment('Tiempo de inactividad en minutos');
            
            // Límites de ancho de banda
            $table->integer('bandwidth_limit_down')->nullable()->comment('Límite de descarga en Kbps');
            $table->integer('bandwidth_limit_up')->nullable()->comment('Límite de subida en Kbps');
            
            // Configuración de redes sociales
            $table->json('social_auth_config')->nullable()->comment('Configuración de autenticación social');
            
            // Configuración de SMS
            $table->string('sms_provider')->nullable()->comment('Proveedor de SMS');
            $table->json('sms_config')->nullable()->comment('Configuración de SMS');
            
            // Personalización visual
            $table->string('logo_url')->nullable()->comment('URL del logo');
            $table->string('background_color')->default('#ffffff')->comment('Color de fondo');
            $table->string('primary_color')->default('#007bff')->comment('Color primario');
            $table->text('custom_css')->nullable()->comment('CSS personalizado');
            
            // Monitoreo
            $table->boolean('enable_logging')->default(true)->comment('Habilitar logs');
            $table->boolean('log_failed_attempts')->default(true)->comment('Registrar intentos fallidos');
            
            // Estado
            $table->boolean('is_active')->default(true)->comment('Portal activo');
            
            $table->timestamps();
            
            // Índices
            $table->index('auth_method');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('captive_portals');
    }
};
