<?php

use App\Gender;
use App\Status;
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
        Schema::table('calon', function (Blueprint $table) {
           $table->string('gender')->default(Gender::Male->value);
            $table->string('status')->default(Status::Active->value); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('calon', function (Blueprint $table) {
             $table->index('gender')->default(Gender::Male->value);
            $table->index('status')->default(Status::Active->value); 
        });
    }
};
