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
        Schema::table('vlans', function (Blueprint $table) {
            $table->integer('bandwidth_limit')->nullable()->after('mtu')->comment('Límite de ancho de banda en Mbps');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vlans', function (Blueprint $table) {
            $table->dropColumn('bandwidth_limit');
        });
    }
};
