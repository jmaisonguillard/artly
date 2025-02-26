<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commission extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'title',
        'description',
        'client_id',
        'artist_id',
        'price',
        'status',
        'stage',
        'progress',
        'revisions_used',
        'revisions_allowed',
        'commercial_usage_allowed',
        'copyright_transfer',
        'due_date',
        'estimated_completion_date',
    ];

    protected $casts = [
        'due_date' => 'date',
        'estimated_completion_date' => 'date',
        'commercial_usage_allowed' => 'boolean',
        'copyright_transfer' => 'boolean',
        'progress' => 'integer',
        'revisions_used' => 'integer',
        'revisions_allowed' => 'integer',
    ];

    /**
     * Generate a unique commission ID.
     */
    public static function generateCommissionId(): string
    {
        $year = date('Y');
        $month = date('m');

        // Get the highest commission number for the current year/month
        $latestCommission = self::where('commission_id', 'LIKE', "COM-{$year}-{$month}%")
            ->orderBy('commission_id', 'desc')
            ->first();

        if ($latestCommission) {
            // Extract the current number and increment
            $parts = explode('-', $latestCommission->commission_id);
            $number = intval(end($parts)) + 1;
        } else {
            $number = 1;
        }

        // Format with padding (e.g., COM-2024-05-0001)
        return "COM-{$year}-{$month}-" . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get the client that owns the commission.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    /**
     * Get the artist that owns the commission.
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(User::class, 'artist_id');
    }

    /**
     * Get the messages for the commission.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(CommissionMessage::class);
    }

    /**
     * Get the files for the commission.
     */
    public function files(): HasMany
    {
        return $this->hasMany(CommissionFile::class);
    }

    /**
     * Get the milestones for the commission.
     */
    public function milestones(): HasMany
    {
        return $this->hasMany(CommissionMilestone::class)->orderBy('order');
    }

    /**
     * Get the payments for the commission.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(CommissionPayment::class);
    }

    /**
     * Get the revisions for the commission.
     */
    public function revisions(): HasMany
    {
        return $this->hasMany(CommissionRevision::class);
    }

    /**
     * Check if the commission is in a specific status.
     */
    public function hasStatus(string $status): bool
    {
        return $this->status === $status;
    }

    /**
     * Check if the commission is in a specific stage.
     */
    public function hasStage(string $stage): bool
    {
        return $this->stage === $stage;
    }

    /**
     * Get the latest file for the current stage.
     */
    public function getLatestStageFile()
    {
        return $this->files()
            ->where('stage', $this->stage)
            ->where('is_current_version', true)
            ->first();
    }

    /**
     * Get the remaining revision count.
     */
    public function getRemainingRevisionsCount(): int
    {
        return max(0, $this->revisions_allowed - $this->revisions_used);
    }

    /**
     * Check if the user can request a revision.
     */
    public function canRequestRevision(): bool
    {
        return $this->getRemainingRevisionsCount() > 0 &&
            !$this->hasStatus('completed') &&
            !$this->hasStatus('cancelled');
    }

    /**
     * Get the current milestone.
     */
    public function getCurrentMilestone()
    {
        return $this->milestones()
            ->where('completed', false)
            ->orderBy('order')
            ->first();
    }
}
