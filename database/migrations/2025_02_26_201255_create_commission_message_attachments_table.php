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
        Schema::create('commission_message_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commission_message_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('path');
            $table->string('mime_type');
            $table->integer('size'); // File size in bytes
            $table->string('thumbnail_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_message_attachments');
    }
};
