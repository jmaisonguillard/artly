<?php

namespace Database\Factories;

use App\Models\CommissionMilestone;
use App\Models\Commission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommissionMilestone>
 */
class CommissionMilestoneFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CommissionMilestone::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $commission = Commission::inRandomOrder()->first();

        if (!$commission) {
            $commission = Commission::factory()->create();
        }

        $order = CommissionMilestone::where('commission_id', $commission->id)->count() + 1;

        // Default milestone titles based on order
        $milestoneMap = [
            1 => 'Initial Concept Approval',
            2 => 'Sketch Approval',
            3 => 'Lineart Approval',
            4 => 'Color and Shading Approval',
            5 => 'Final Delivery',
        ];

        $title = $milestoneMap[$order] ?? 'Milestone ' . $order;

        // Description based on title
        $descriptionMap = [
            'Initial Concept Approval' => 'Review and approve the initial concept and ideas',
            'Sketch Approval' => 'Review and approve the rough sketch and composition',
            'Lineart Approval' => 'Review and approve the final lineart before coloring',
            'Color and Shading Approval' => 'Review and approve colors, lighting and shading',
            'Final Delivery' => 'Final artwork delivery and project completion',
        ];

        $description = $descriptionMap[$title] ?? $this->faker->sentence();

        // Generate dates based on commission timeline
        $commissionStartDate = $commission->created_at;
        $commissionEndDate = $commission->due_date;
        $totalDays = $commissionStartDate->diff($commissionEndDate)->days;
        $daysPerMilestone = max(1, floor($totalDays / 5));

        // Due date for this milestone
        $dueDateDays = $daysPerMilestone * $order;
        $dueDate = (clone $commissionStartDate)->modify("+{$dueDateDays} days");

        // Determine if milestone is completed based on order and commission progress
        $completed = false;
        $completedAt = null;

        if ($commission->status === 'completed') {
            // All milestones are completed for completed commissions
            $completed = true;
            $completedAt = $this->faker->dateTimeBetween($commissionStartDate, $commission->updated_at);
        } else {
            // For in-progress commissions, calculate based on progress
            $progressThresholds = [
                1 => 20,  // First milestone complete at 20% progress
                2 => 40,  // Second milestone complete at 40% progress
                3 => 65,  // Third milestone complete at 65% progress
                4 => 90,  // Fourth milestone complete at 90% progress
                5 => 100, // Fifth milestone complete at 100% progress
            ];

            $threshold = $progressThresholds[$order] ?? ($order * 20);

            if ($commission->progress >= $threshold) {
                $completed = true;
                $completedAt = $this->faker->dateTimeBetween($commissionStartDate, $commission->updated_at);
            }
        }

        return [
            'commission_id' => $commission->id,
            'title' => $title,
            'description' => $description,
            'completed' => $completed,
            'completed_at' => $completedAt,
            'due_date' => $dueDate,
            'order' => $order,
        ];
    }

    /**
     * Indicate that the milestone is completed.
     *
     * @return static
     */
    public function completed()
    {
        return $this->state(function (array $attributes) {
            $commission = Commission::find($attributes['commission_id']);
            return [
                'completed' => true,
                'completed_at' => $this->faker->dateTimeBetween($commission->created_at, 'now'),
            ];
        });
    }
}
