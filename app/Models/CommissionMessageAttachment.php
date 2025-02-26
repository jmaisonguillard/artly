<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class CommissionMessageAttachment extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_message_id',
        'name',
        'path',
        'mime_type',
        'size',
        'thumbnail_path',
    ];

    /**
     * Get the message that owns the attachment.
     */
    public function message(): BelongsTo
    {
        return $this->belongsTo(CommissionMessage::class, 'commission_message_id');
    }

    /**
     * Get the full URL for the attachment.
     */
    public function getUrl(): string
    {
        return Storage::url($this->path);
    }

    /**
     * Get the full URL for the thumbnail.
     */
    public function getThumbnailUrl(): ?string
    {
        return $this->thumbnail_path ? Storage::url($this->thumbnail_path) : null;
    }

    /**
     * Check if the attachment is an image.
     */
    public function isImage(): bool
    {
        return strpos($this->mime_type, 'image/') === 0;
    }
}
