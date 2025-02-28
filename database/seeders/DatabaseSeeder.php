<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed users first (required for commission relationships)
        $this->call([
            UserSeeder::class,
            CommissionSeeder::class,
            MessageSeeder::class,
            CommissionReviewSeeder::class,
        ]);
    }
}
