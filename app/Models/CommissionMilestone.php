<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionMilestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'title',
        'description',
        'completed',
        'completed_at',
        'due_date',
        'order',
    ];

    protected $casts = [
        'completed' => 'boolean',
        'completed_at' => 'datetime',
        'due_date' => 'date',
    ];

    /**
     * Get the commission that owns the milestone.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Mark the milestone as completed.
     */
    public function complete(): void
    {
        $this->completed = true;
        $this->completed_at = now();
        $this->save();
    }

    /**
     * Mark the milestone as not completed.
     */
    public function reopen(): void
    {
        $this->completed = false;
        $this->completed_at = null;
        $this->save();
    }

    /**
     * Check if the milestone is overdue.
     */
    public function isOverdue(): bool
    {
        return !$this->completed && $this->due_date && $this->due_date->isPast();
    }
}
