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
        Schema::create('commissions', function (Blueprint $table) {
            $table->id();
            $table->string('commission_id')->unique(); // Custom ID format e.g. COM-2024-0523
            $table->string('title');
            $table->text('description');
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('artist_id')->constrained('users')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->enum('status', ['pending', 'in-progress', 'pending-approval', 'revisions', 'completed', 'cancelled'])->default('pending');
            $table->enum('stage', ['concept', 'sketch', 'lineart', 'coloring', 'final'])->default('concept');
            $table->integer('progress')->default(0); // Percentage of completion
            $table->integer('revisions_used')->default(0);
            $table->integer('revisions_allowed')->default(3);
            $table->boolean('commercial_usage_allowed')->default(false);
            $table->boolean('copyright_transfer')->default(false);
            $table->date('due_date')->nullable();
            $table->date('estimated_completion_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commissions');
    }
};
