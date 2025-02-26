<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::firstOrCreate(
            ['email' => 'admin@artly.com'],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'display_name' => 'admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create sample artists
        $artists = [
            [
                'first_name' => 'Sophia',
                'last_name' => 'Chen',
                'display_name' => 'sophia.chen',
                'email' => 'sophia@artly.com',
                'password' => Hash::make('password'),
                'role' => 'artist',
            ],
            [
                'first_name' => 'Marcus',
                'last_name' => 'Rivera',
                'display_name' => 'marcus.rivera',
                'email' => 'marcus@artly.com',
                'password' => Hash::make('password'),
                'role' => 'artist',
            ],
            [
                'first_name' => 'Aisha',
                'last_name' => 'Johnson',
                'display_name' => 'aisha.johnson',
                'email' => 'aisha@artly.com',
                'password' => Hash::make('password'),
                'role' => 'artist',
            ],
            [
                'first_name' => 'Leo',
                'last_name' => 'Kim',
                'display_name' => 'leo.kim',
                'email' => 'leo@artly.com',
                'password' => Hash::make('password'),
                'role' => 'artist',
            ],
        ];

        foreach ($artists as $artist) {
            User::firstOrCreate(
                ['email' => $artist['email']],
                $artist
            );
        }

        // Create sample clients
        $clients = [
            [
                'first_name' => 'Alex',
                'last_name' => 'Morgan',
                'display_name' => 'alex.morgan',
                'email' => 'alex@example.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
            [
                'first_name' => 'Jamie',
                'last_name' => 'Smith',
                'display_name' => 'jamie.smith',
                'email' => 'jamie@example.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
            [
                'first_name' => 'Taylor',
                'last_name' => 'Wilson',
                'display_name' => 'taylor.wilson',
                'email' => 'taylor@example.com',
                'password' => Hash::make('password'),
                'role' => 'client',
            ],
        ];

        foreach ($clients as $client) {
            User::firstOrCreate(
                ['email' => $client['email']],
                $client
            );
        }

        // Create additional random users
        User::factory()->count(5)->create(['role' => 'artist']);
        User::factory()->count(10)->create(['role' => 'client']);
    }
}
