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
        Schema::table('aps', function (Blueprint $table) {
            // Solo agregar las columnas que no existen
            if (!Schema::hasColumn('aps', 'packet_loss')) {
                $table->integer('packet_loss')->nullable()->default(0)->comment('Porcentaje de pérdida de paquetes');
            }
            if (!Schema::hasColumn('aps', 'packets_received')) {
                $table->integer('packets_received')->nullable()->default(0)->comment('Paquetes recibidos en último ping');
            }
            // last_ping ya existe, no la agregamos
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('aps', function (Blueprint $table) {
            if (Schema::hasColumn('aps', 'packet_loss')) {
                $table->dropColumn('packet_loss');
            }
            if (Schema::hasColumn('aps', 'packets_received')) {
                $table->dropColumn('packets_received');
            }
        });
    }
};
