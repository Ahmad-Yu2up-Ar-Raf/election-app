<?php

use App\ElectionsStatus;
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
         $table->string('title', 255)->change();           // Pastikan cukup panjang
            $table->text('description')->nullable()->change(); // Gunakan text untuk deskripsi
            $table->string('status', 255)->default(ElectionsStatus::Upcoming->value)->change(); // Perb
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('elections', function (Blueprint $table) {
        $table->string('title' , 10)->unique();
            $table->string('description')->nullable();
                 $table->string('status')->default(ElectionsStatus::Upcoming->value);
        });
    }
};
