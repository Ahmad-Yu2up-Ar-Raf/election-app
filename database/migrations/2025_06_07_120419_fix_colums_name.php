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
        Schema::table('votes', function (Blueprint $table) {
                    if (!Schema::hasColumn('votes', 'election_id')) { 

                        $table->foreignId('election_id')->constrained('elections')->onDelete('cascade');
                    }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('votes', function (Blueprint $table) {
            $table->foreignId('elections_id')->constrained('elections')->onDelete('cascade');
        });
    }
};
