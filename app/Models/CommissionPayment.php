<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'amount',
        'type',
        'status',
        'description',
        'transaction_id',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the commission that owns the payment.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Mark the payment as completed.
     */
    public function markAsCompleted(string $transactionId = null): void
    {
        $this->status = 'completed';
        $this->paid_at = now();

        if ($transactionId) {
            $this->transaction_id = $transactionId;
        }

        $this->save();
    }

    /**
     * Mark the payment as refunded.
     */
    public function markAsRefunded(): void
    {
        $this->status = 'refunded';
        $this->save();
    }

    /**
     * Check if the payment is completed.
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    /**
     * Check if the payment is pending.
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if the payment is refunded.
     */
    public function isRefunded(): bool
    {
        return $this->status === 'refunded';
    }
}
