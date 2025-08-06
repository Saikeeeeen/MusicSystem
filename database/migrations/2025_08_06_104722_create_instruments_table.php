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
        Schema::create('instruments', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_no');
            $table->string('type'); // e.g., INSTRUMENT
            $table->string('name'); // e.g., GUITAR
            $table->string('state'); // e.g., GOOD, DAMAGED
            $table->string('status'); // Available, Borrowed, Maintenance
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instruments');
    }
};
