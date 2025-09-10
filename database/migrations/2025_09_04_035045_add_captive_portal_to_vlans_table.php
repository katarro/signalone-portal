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
            $table->foreignId('captive_portal_id')->nullable()->constrained('captive_portals')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vlans', function (Blueprint $table) {
            $table->dropForeign(['captive_portal_id']);
            $table->dropColumn('captive_portal_id');
        });
    }
};
