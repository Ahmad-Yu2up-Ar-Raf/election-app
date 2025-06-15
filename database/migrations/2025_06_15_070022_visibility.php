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
        Schema::table('elections', function (Blueprint $table) {
            if (!Schema::hasColumn('elections', 'visibility')) { 
                // Gunakan string literal langsung instead of enum
                $table->string('visibility')->default('public');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('elections', function (Blueprint $table) {
            if (Schema::hasColumn('elections', 'visibility')) {
                $table->dropColumn('visibility');
            }
        });
    }
};