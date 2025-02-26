<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionRevision extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'request_details',
        'requested_by',
        'status',
    ];

    /**
     * Get the commission that owns the revision.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Get the user who requested the revision.
     */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    /**
     * Mark the revision as in progress.
     */
    public function markAsInProgress(): void
    {
        $this->status = 'in-progress';
        $this->save();
    }

    /**
     * Mark the revision as completed.
     */
    public function markAsCompleted(): void
    {
        $this->status = 'completed';
        $this->save();
    }

    /**
     * Check if the revision is requested.
     */
    public function isRequested(): bool
    {
        return $this->status === 'requested';
    }

    /**
     * Check if the revision is in progress.
     */
    public function isInProgress(): bool
    {
        return $this->status === 'in-progress';
    }

    /**
     * Check if the revision is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }
}
