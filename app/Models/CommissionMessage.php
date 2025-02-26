<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommissionMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'user_id',
        'sender_type',
        'content',
    ];

    /**
     * Get the commission that owns the message.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Get the user that sent the message.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(CommissionMessageAttachment::class);
    }

    /**
     * Check if the message is from the artist.
     */
    public function isFromArtist(): bool
    {
        return $this->sender_type === 'artist';
    }

    /**
     * Check if the message is from the client.
     */
    public function isFromClient(): bool
    {
        return $this->sender_type === 'client';
    }
}
