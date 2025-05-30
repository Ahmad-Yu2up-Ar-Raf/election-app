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
        Schema::create('calon', function (Blueprint $table) {
          $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama')->unique();
           $table->string('gender')->default(Gender::Male->value);
            $table->string('status')->default(Status::Active->value); 
            $table->string('visi')->nullable();
            $table->string('misi')->nullable();
            $table->string('picture')->nullable();
            $table->string('kelas', 10)->nullable();
    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calon');
    }
};
