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
        Schema::create('aps', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nombre del Access Point');
            $table->string('ssid')->comment('SSID de la red inalámbrica');
            $table->string('ip_address')->comment('Dirección IP del AP');
            $table->string('mac_address')->unique()->comment('Dirección MAC del AP');
            $table->text('description')->nullable()->comment('Descripción del AP');
            $table->unsignedBigInteger('vlan_id')->nullable()->comment('VLAN asociada');
            $table->unsignedBigInteger('zona_id')->nullable()->comment('Zona donde está ubicado');
            $table->string('location')->nullable()->comment('Ubicación específica');
            $table->enum('frequency_band', ['2.4GHz', '5GHz', 'dual'])->default('dual')->comment('Banda de frecuencia');
            $table->string('security_type')->default('WPA3')->comment('Tipo de seguridad');
            $table->string('password')->nullable()->comment('Contraseña de la red');
            $table->integer('max_clients')->default(50)->comment('Máximo número de clientes');
            $table->integer('current_clients')->default(0)->comment('Clientes conectados actualmente');
            $table->enum('status', ['online', 'offline', 'error', 'maintenance'])->default('offline')->comment('Estado del AP');
            $table->timestamp('last_ping')->nullable()->comment('Último ping exitoso');
            $table->integer('ping_response_time')->nullable()->comment('Tiempo de respuesta del ping en ms');
            $table->boolean('is_active')->default(true)->comment('AP activo/inactivo');
            $table->json('performance_metrics')->nullable()->comment('Métricas de rendimiento');
            $table->timestamps();

            // Índices
            $table->index('ip_address');
            $table->index('vlan_id');
            $table->index('zona_id');
            $table->index('status');
            $table->index('is_active');

            // Foreign keys
            $table->foreign('vlan_id')->references('id')->on('vlans')->onDelete('set null');
            $table->foreign('zona_id')->references('id')->on('zonas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aps');
    }
};
