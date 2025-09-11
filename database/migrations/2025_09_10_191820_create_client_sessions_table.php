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
        Schema::create('client_sessions', function (Blueprint $table) {
            $table->id();
            
            // Relaciones
            $table->foreignId('captive_portal_id')->constrained()->onDelete('cascade')
                  ->comment('Portal cautivo utilizado');
            $table->foreignId('vlan_id')->nullable()->constrained()->onDelete('set null')
                  ->comment('VLAN asociada');
            $table->foreignId('ap_id')->nullable()->constrained()->onDelete('set null')
                  ->comment('Access Point utilizado');
            
            // Información del cliente
            $table->string('session_id')->unique()->comment('ID único de sesión');
            $table->macAddress('mac_address')->comment('Dirección MAC del dispositivo');
            $table->ipAddress('ip_address')->comment('Dirección IP asignada');
            $table->string('username')->nullable()->comment('Usuario si se autenticó');
            $table->string('device_name')->nullable()->comment('Nombre del dispositivo');
            $table->string('user_agent')->nullable()->comment('User agent del navegador');
            
            // Información de autenticación
            $table->enum('auth_method', [
                'user_password', 
                'voucher', 
                'social', 
                'sms', 
                'terms_only',
                'guest'
            ])->comment('Método de autenticación utilizado');
            $table->json('auth_data')->nullable()->comment('Datos adicionales de autenticación');
            
            // Información de sesión
            $table->timestamp('login_time')->comment('Hora de inicio de sesión');
            $table->timestamp('logout_time')->nullable()->comment('Hora de cierre de sesión');
            $table->timestamp('last_activity')->comment('Última actividad registrada');
            $table->integer('session_duration')->default(0)->comment('Duración total de sesión en segundos');
            $table->enum('status', ['active', 'expired', 'terminated', 'logout'])
                  ->default('active')->comment('Estado de la sesión');
            
            // Estadísticas de uso
            $table->bigInteger('bytes_downloaded')->default(0)->comment('Bytes descargados');
            $table->bigInteger('bytes_uploaded')->default(0)->comment('Bytes subidos');
            $table->bigInteger('packets_downloaded')->default(0)->comment('Paquetes descargados');
            $table->bigInteger('packets_uploaded')->default(0)->comment('Paquetes subidos');
            
            // Información de ubicación y red
            $table->string('zona_name')->nullable()->comment('Nombre de la zona al momento de conexión');
            $table->string('ap_name')->nullable()->comment('Nombre del AP al momento de conexión');
            $table->string('ssid')->nullable()->comment('SSID utilizado');
            $table->integer('signal_strength')->nullable()->comment('Intensidad de señal');
            
            // Información adicional
            $table->json('metadata')->nullable()->comment('Metadatos adicionales');
            $table->string('termination_reason')->nullable()->comment('Razón de terminación de sesión');
            
            $table->timestamps();
            
            // Índices para optimizar consultas
            $table->index(['captive_portal_id', 'status']);
            $table->index(['mac_address', 'login_time']);
            $table->index(['ip_address', 'status']);
            $table->index(['login_time', 'logout_time']);
            $table->index('last_activity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_sessions');
    }
};
