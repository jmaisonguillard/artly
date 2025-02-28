<?php

namespace Database\Factories;

use App\Models\Commission;
use App\Models\CommissionReview;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommissionReview>
 */
class CommissionReviewFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CommissionReview::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Find a completed commission
        $commission = Commission::where('status', 'completed')
                        ->inRandomOrder()
                        ->first();

        if (!$commission) {
            // Create a completed commission if none exists
            $commission = Commission::factory()->completed()->create();
        }

        // Generate a rating between 3 and 5 with one decimal place precision
        $rating = $this->faker->randomFloat(1, 3, 5);

        // Generate positive review phrases for high ratings
        $positiveAdjectives = [
            'amazing', 'excellent', 'outstanding', 'fantastic', 'incredible',
            'brilliant', 'superb', 'impressive', 'exceptional', 'wonderful'
        ];

        $positiveNouns = [
            'experience', 'collaboration', 'partnership', 'process', 'journey',
            'result', 'artwork', 'illustration', 'design', 'commission'
        ];

        $positiveVerbs = [
            'exceeded', 'surpassed', 'outperformed', 'transcended',
            'blew away', 'amazed', 'impressed', 'delighted'
        ];

        $positiveSegments = [
            "Working with this artist was {$this->faker->randomElement($positiveAdjectives)}!",
            "I'm so happy with the {$this->faker->randomElement($positiveNouns)}.",
            "The artist {$this->faker->randomElement($positiveVerbs)} my expectations.",
            "I'll definitely commission again in the future.",
            "The final artwork was exactly what I envisioned.",
            "Communication was clear and prompt throughout.",
            "The artist was very accommodating with my revision requests.",
            "They captured my idea perfectly and brought it to life.",
            "I received many compliments on the commissioned piece.",
            "The attention to detail was remarkable.",
        ];

        // Shuffle and select 2-4 segments to create a compelling review
        shuffle($positiveSegments);
        $selectedSegments = array_slice($positiveSegments, 0, $this->faker->numberBetween(2, 4));
        $content = implode(' ', $selectedSegments);

        // Artist response probability and phrases
        $artistResponses = [
            "Thank you so much for your kind words! It was a pleasure working with you.",
            "I'm delighted that you're happy with the final artwork. Looking forward to working together again!",
            "Thank you for the wonderful review! I really enjoyed bringing your vision to life.",
            "I appreciate your feedback! It was a fun project to work on.",
            "Thanks for being such a great client to work with! I'm glad you love the final result.",
        ];

        // Determine if the artist has responded (30% chance)
        $hasArtistResponse = $this->faker->boolean(30);
        $artistResponse = $hasArtistResponse ? $this->faker->randomElement($artistResponses) : null;
        $artistResponseAt = $hasArtistResponse ? $this->faker->dateTimeBetween('-30 days', 'now') : null;

        // Generate category ratings that are relatively consistent with the overall rating
        $categoryBaseRating = floor($rating);
        $categoryVariation = $this->faker->boolean(70) ? 0 : ($this->faker->boolean() ? 1 : -1);

        $communicationRating = min(5, max(1, $categoryBaseRating + $this->faker->randomElement([$categoryVariation, 0])));
        $qualityRating = min(5, max(1, $categoryBaseRating + $this->faker->randomElement([$categoryVariation, 0])));
        $timelinessRating = min(5, max(1, $categoryBaseRating + $this->faker->randomElement([$categoryVariation, 0])));
        $valueRating = min(5, max(1, $categoryBaseRating + $this->faker->randomElement([$categoryVariation, 0])));

        // Generate timestamps
        $createdAt = $this->faker->dateTimeBetween(
            (clone $commission->updated_at)->modify('+1 day'),
            (clone $commission->updated_at)->modify('+14 days')
        );

        return [
            'commission_id' => $commission->id,
            'client_id' => $commission->client_id,
            'artist_id' => $commission->artist_id,
            'rating' => $rating,
            'content' => $content,
            'communication_rating' => $communicationRating,
            'quality_rating' => $qualityRating,
            'timeliness_rating' => $timelinessRating,
            'value_rating' => $valueRating,
            'public' => $this->faker->boolean(90), // 90% chance to be public
            'artist_response' => $artistResponse,
            'artist_response_at' => $artistResponseAt,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }

    /**
     * Indicate that the review is highly rated.
     *
     * @return static
     */
    public function fiveStars()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->randomFloat(1, 4.8, 5.0),
                'communication_rating' => 5,
                'quality_rating' => 5,
                'timeliness_rating' => $this->faker->randomElement([4, 5]),
                'value_rating' => 5,
            ];
        });
    }

    /**
     * Indicate that the review is average.
     *
     * @return static
     */
    public function average()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->randomFloat(1, 2.5, 3.5),
                'communication_rating' => $this->faker->numberBetween(2, 4),
                'quality_rating' => $this->faker->numberBetween(2, 4),
                'timeliness_rating' => $this->faker->numberBetween(2, 4),
                'value_rating' => $this->faker->numberBetween(2, 4),
            ];
        });
    }

    /**
     * Indicate that the review has an artist response.
     *
     * @return static
     */
    public function withArtistResponse()
    {
        return $this->state(function (array $attributes) {
            $artistResponses = [
                "Thank you so much for your kind words! It was a pleasure working with you.",
                "I'm delighted that you're happy with the final artwork. Looking forward to working together again!",
                "Thank you for the wonderful review! I really enjoyed bringing your vision to life.",
                "I appreciate your feedback! It was a fun project to work on.",
                "Thanks for being such a great client to work with! I'm glad you love the final result.",
            ];

            $createdAt = $attributes['created_at'] ?? now();
            $responseAt = $this->faker->dateTimeBetween(
                (clone $createdAt)->modify('+1 day'),
                (clone $createdAt)->modify('+7 days')
            );

            return [
                'artist_response' => $this->faker->randomElement($artistResponses),
                'artist_response_at' => $responseAt,
            ];
        });
    }

    /**
     * Indicate that the review should be featured.
     *
     * @return static
     */
    public function featured()
    {
        return $this->state(function (array $attributes) {
            return [
                'rating' => $this->faker->randomFloat(1, 4.0, 5.0),
                'public' => true,
                'content' => $this->faker->paragraphs(2, true),
                'communication_rating' => $this->faker->numberBetween(4, 5),
                'quality_rating' => $this->faker->numberBetween(4, 5),
                'timeliness_rating' => $this->faker->numberBetween(4, 5),
                'value_rating' => $this->faker->numberBetween(4, 5),
            ];
        });
    }
}
