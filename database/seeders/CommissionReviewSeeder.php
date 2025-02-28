<?php

namespace Database\Seeders;

use App\Models\Commission;
use App\Models\CommissionReview;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommissionReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find all completed commissions that don't have reviews yet
        $completedCommissionsWithoutReviews = Commission::where('status', 'completed')
            ->whereNotIn('id', function ($query) {
                $query->select('commission_id')
                    ->from('commission_reviews');
            })
            ->get();

        // Create reviews for 80% of completed commissions
        $commissions = $completedCommissionsWithoutReviews
            ->random(intval($completedCommissionsWithoutReviews->count() * 0.8));

        // Keep track of used commission IDs
        $usedCommissionIds = collect();

        // Create reviews for the randomly selected commissions
        $commissions->each(function ($commission) use ($usedCommissionIds) {
            if (!$usedCommissionIds->contains($commission->id)) {
                CommissionReview::factory()->create([
                    'commission_id' => $commission->id,
                    'client_id' => $commission->client_id,
                    'artist_id' => $commission->artist_id,
                ]);
                $usedCommissionIds->push($commission->id);
            }
        });

        // Get more commissions without reviews for the featured and other reviews
        $remainingCommissions = Commission::where('status', 'completed')
            ->whereNotIn('id', function ($query) {
                $query->select('commission_id')
                    ->from('commission_reviews');
            })
            ->inRandomOrder()
            ->take(18) // 10 featured + 5 average + 3 five-star
            ->get();

        $commissionChunks = $remainingCommissions->chunk(3);

        // Create 10 featured high-quality reviews with artist responses
        if ($commissionChunks->has(0)) {
            $commissionChunks[0]->take(10)->each(function ($commission) {
                CommissionReview::factory()
                    ->featured()
                    ->withArtistResponse()
                    ->create([
                        'commission_id' => $commission->id,
                        'client_id' => $commission->client_id,
                        'artist_id' => $commission->artist_id,
                    ]);
            });
        }

        // Create 5 average reviews
        if ($commissionChunks->has(1)) {
            $commissionChunks[1]->take(5)->each(function ($commission) {
                CommissionReview::factory()
                    ->average()
                    ->create([
                        'commission_id' => $commission->id,
                        'client_id' => $commission->client_id,
                        'artist_id' => $commission->artist_id,
                    ]);
            });
        }

        // Create 3 five-star reviews (some with artist responses)
        if ($commissionChunks->has(2)) {
            $lastChunk = $commissionChunks[2]->take(3);

            // Two without artist response
            $lastChunk->take(2)->each(function ($commission) {
                CommissionReview::factory()
                    ->fiveStars()
                    ->create([
                        'commission_id' => $commission->id,
                        'client_id' => $commission->client_id,
                        'artist_id' => $commission->artist_id,
                    ]);
            });

            // One with artist response
            if ($lastChunk->count() >= 3) {
                CommissionReview::factory()
                    ->fiveStars()
                    ->withArtistResponse()
                    ->create([
                        'commission_id' => $lastChunk->last()->id,
                        'client_id' => $lastChunk->last()->client_id,
                        'artist_id' => $lastChunk->last()->artist_id,
                    ]);
            }
        }
    }
}
