<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */


  public function down(): void
    {
        Schema::table('calon', function (Blueprint $table) {
          $table->foreignId('election_id')->nullable()->constrained('elections')->onDelete('cascade');
        });
    }

    public function up(): void
    {
        Schema::table('calon', function (Blueprint $table) {
                if (!Schema::hasColumn('calon', 'election_id')) {
       
            $table->foreignId('election_id')->unsigned()->nullable()->constrained('elections')->onDelete('set null');
        }
        });
    }

    /**
     * Reverse the migrations.
     */
  
};
