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
        Schema::create('vlans', function (Blueprint $table) {
            $table->id();
            $table->integer('vlan_id')->unique()->comment('VLAN ID (1-4094)');
            $table->string('name')->comment('Nombre de la VLAN');
            $table->text('description')->nullable()->comment('Descripción de la VLAN');
            $table->string('subnet')->comment('Subred en formato CIDR');
            $table->string('gateway')->comment('Gateway de la VLAN');
            $table->string('dns_primary')->comment('DNS primario');
            $table->string('dns_secondary')->nullable()->comment('DNS secundario');
            $table->boolean('dhcp_enabled')->default(true)->comment('DHCP habilitado');
            $table->string('dhcp_start')->nullable()->comment('IP inicio del rango DHCP');
            $table->string('dhcp_end')->nullable()->comment('IP final del rango DHCP');
            $table->unsignedBigInteger('zona_id')->nullable()->comment('ID de la zona asignada');
            $table->enum('priority', ['low', 'normal', 'high', 'critical'])->default('normal')->comment('Prioridad de la VLAN');
            $table->integer('mtu')->default(1500)->comment('MTU de la VLAN');
            $table->boolean('is_active')->default(true)->comment('Estado activo/inactivo');
            $table->timestamps();

            // Índices
            $table->index('vlan_id');
            $table->index('zona_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vlans');
    }
};
