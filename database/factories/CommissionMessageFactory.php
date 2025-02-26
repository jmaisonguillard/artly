<?php

namespace Database\Factories;

use App\Models\CommissionMessage;
use App\Models\Commission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommissionMessage>
 */
class CommissionMessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CommissionMessage::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Get a random commission with its client and artist
        $commission = Commission::inRandomOrder()->first();

        if (!$commission) {
            $commission = Commission::factory()->create();
        }

        // Randomly choose if this is from client or artist
        $senderType = $this->faker->randomElement(['client', 'artist']);
        $userId = $senderType === 'client' ? $commission->client_id : $commission->artist_id;

        return [
            'commission_id' => $commission->id,
            'user_id' => $userId,
            'sender_type' => $senderType,
            'content' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween($commission->created_at, 'now'),
        ];
    }

    /**
     * Indicate that the message is from the client.
     *
     * @return static
     */
    public function fromClient()
    {
        return $this->state(function (array $attributes) {
            $commission = Commission::find($attributes['commission_id']);
            return [
                'user_id' => $commission->client_id,
                'sender_type' => 'client',
            ];
        });
    }

    /**
     * Indicate that the message is from the artist.
     *
     * @return static
     */
    public function fromArtist()
    {
        return $this->state(function (array $attributes) {
            $commission = Commission::find($attributes['commission_id']);
            return [
                'user_id' => $commission->artist_id,
                'sender_type' => 'artist',
            ];
        });
    }
}
