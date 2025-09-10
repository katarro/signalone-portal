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
        Schema::create('zonas', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Nombre de la zona');
            $table->text('description')->nullable()->comment('Descripción de la zona');
            $table->string('location')->nullable()->comment('Ubicación geográfica');
            $table->boolean('is_active')->default(true)->comment('Estado activo/inactivo');
            $table->timestamps();

            // Índices
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zonas');
    }
};
