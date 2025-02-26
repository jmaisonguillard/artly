<?php

namespace Database\Factories;

use App\Models\Commission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commission>
 */
class CommissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Commission::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stages = ['concept', 'sketch', 'lineart', 'coloring', 'final'];
        $statuses = ['pending', 'in-progress', 'pending-approval', 'revisions', 'completed', 'cancelled'];
        $currentStage = $this->faker->randomElement($stages);
        $status = $this->faker->randomElement($statuses);

        // Generate progress based on stage and status
        $progressMap = [
            'concept' => [10, 20],
            'sketch' => [20, 40],
            'lineart' => [40, 65],
            'coloring' => [65, 90],
            'final' => [90, 100],
        ];

        $progressRange = $progressMap[$currentStage];
        $progress = $this->faker->numberBetween($progressRange[0], $progressRange[1]);

        // If completed, set progress to 100
        if ($status === 'completed') {
            $progress = 100;
            $currentStage = 'final';
        }

        // If cancelled, set a random progress
        if ($status === 'cancelled') {
            $progress = $this->faker->numberBetween(0, 80);
        }

        $createdAt = $this->faker->dateTimeBetween('-6 months', 'now');
        $dueDate = $this->faker->dateTimeBetween('+1 week', '+3 months');
        $estimatedCompletionDate = $this->faker->dateTimeBetween(
            $createdAt,
            (clone $dueDate)->modify('-1 day')
        );

        return [
            'commission_id' => 'COM-' . date('Y-m') . '-' . $this->faker->unique()->randomNumber(4, true),
            'title' => $this->faker->realText(30),
            'description' => $this->faker->realText(200),
            'client_id' => User::where('role', 'client')->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'client'])->id,
            'artist_id' => User::where('role', 'artist')->inRandomOrder()->first()->id ?? User::factory()->create(['role' => 'artist'])->id,
            'price' => $this->faker->randomFloat(2, 50, 500),
            'status' => $status,
            'stage' => $currentStage,
            'progress' => $progress,
            'revisions_used' => $this->faker->numberBetween(0, 3),
            'revisions_allowed' => $this->faker->numberBetween(2, 5),
            'commercial_usage_allowed' => $this->faker->boolean(30),
            'copyright_transfer' => $this->faker->boolean(10),
            'due_date' => $dueDate,
            'estimated_completion_date' => $estimatedCompletionDate,
            'created_at' => $createdAt,
            'updated_at' => $this->faker->dateTimeBetween($createdAt, 'now'),
        ];
    }

    /**
     * Indicate that the commission is completed.
     *
     * @return static
     */
    public function completed()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'completed',
                'stage' => 'final',
                'progress' => 100,
            ];
        });
    }

    /**
     * Indicate that the commission is in progress.
     *
     * @return static
     */
    public function inProgress()
    {
        return $this->state(function (array $attributes) {
            $stages = ['concept', 'sketch', 'lineart', 'coloring'];
            $currentStage = $this->faker->randomElement($stages);

            $progressMap = [
                'concept' => [10, 20],
                'sketch' => [20, 40],
                'lineart' => [40, 65],
                'coloring' => [65, 90],
            ];

            $progressRange = $progressMap[$currentStage];
            $progress = $this->faker->numberBetween($progressRange[0], $progressRange[1]);

            return [
                'status' => 'in-progress',
                'stage' => $currentStage,
                'progress' => $progress,
            ];
        });
    }

    /**
     * Indicate that the commission is pending approval.
     *
     * @return static
     */
    public function pendingApproval()
    {
        return $this->state(function (array $attributes) {
            $stages = ['sketch', 'lineart', 'coloring', 'final'];
            $currentStage = $this->faker->randomElement($stages);

            $progressMap = [
                'sketch' => [20, 40],
                'lineart' => [40, 65],
                'coloring' => [65, 90],
                'final' => [90, 100],
            ];

            $progressRange = $progressMap[$currentStage];
            $progress = $this->faker->numberBetween($progressRange[0], $progressRange[1]);

            return [
                'status' => 'pending-approval',
                'stage' => $currentStage,
                'progress' => $progress,
            ];
        });
    }
}
