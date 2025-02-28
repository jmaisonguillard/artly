<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionReview extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'commission_id',
        'client_id',
        'artist_id',
        'rating',
        'content',
        'communication_rating',
        'quality_rating',
        'timeliness_rating',
        'value_rating',
        'public',
        'artist_response',
        'artist_response_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'float',
        'communication_rating' => 'integer',
        'quality_rating' => 'integer',
        'timeliness_rating' => 'integer',
        'value_rating' => 'integer',
        'public' => 'boolean',
        'artist_response_at' => 'datetime',
    ];

    /**
     * Get the commission that was reviewed.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Get the client who wrote the review.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the artist who was reviewed.
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(User::class, 'artist_id');
    }

    /**
     * Scope for public reviews.
     */
    public function scopePublic($query)
    {
        return $query->where('public', true);
    }

    /**
     * Scope for featured reviews.
     */
    public function scopeFeatured($query)
    {
        return $query->where('public', true)
            ->where('rating', '>=', 4.0)
            ->whereNotNull('content')
            ->where(function ($query) {
                $query->whereNotNull('communication_rating')
                    ->whereNotNull('quality_rating')
                    ->whereNotNull('timeliness_rating')
                    ->whereNotNull('value_rating');
            });
    }

    /**
     * Calculate the average of all category ratings.
     *
     * @return float
     */
    public function getAverageRatingAttribute(): float
    {
        $ratings = array_filter([
            $this->communication_rating,
            $this->quality_rating,
            $this->timeliness_rating,
            $this->value_rating
        ]);

        if (count($ratings) === 0) {
            return $this->rating;
        }

        return round(array_sum($ratings) / count($ratings), 1);
    }
}
