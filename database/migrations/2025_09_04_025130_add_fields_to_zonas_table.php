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
        Schema::table('zonas', function (Blueprint $table) {
            $table->string('contact_person')->nullable()->after('location');
            $table->string('contact_phone')->nullable()->after('contact_person');
            $table->string('contact_email')->nullable()->after('contact_phone');
            $table->text('notes')->nullable()->after('contact_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('zonas', function (Blueprint $table) {
            $table->dropColumn(['contact_person', 'contact_phone', 'contact_email', 'notes']);
        });
    }
};
