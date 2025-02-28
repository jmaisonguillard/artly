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
        Schema::create('commission_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('commission_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('artist_id')->constrained('users')->onDelete('cascade');

            // Overall rating (1-5 stars, with decimals)
            $table->decimal('rating', 3, 1)->comment('Overall rating 1-5 stars');

            // Review text
            $table->text('content')->nullable();

            // Category-specific ratings (1-5 stars, integers only)
            $table->unsignedTinyInteger('communication_rating')->nullable();
            $table->unsignedTinyInteger('quality_rating')->nullable();
            $table->unsignedTinyInteger('timeliness_rating')->nullable();
            $table->unsignedTinyInteger('value_rating')->nullable();

            // Control fields
            $table->boolean('public')->default(true)->comment('Whether this review is publicly visible');

            // Artist response
            $table->text('artist_response')->nullable();
            $table->timestamp('artist_response_at')->nullable();

            // Metadata
            $table->timestamps();

            // Ensure one review per commission
            $table->unique('commission_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_reviews');
    }
};
