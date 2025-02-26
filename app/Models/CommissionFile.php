<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class CommissionFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'commission_id',
        'uploaded_by',
        'name',
        'path',
        'mime_type',
        'size',
        'thumbnail_path',
        'stage',
        'is_current_version',
    ];

    protected $casts = [
        'is_current_version' => 'boolean',
    ];

    /**
     * Get the commission that owns the file.
     */
    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class);
    }

    /**
     * Get the user who uploaded the file.
     */
    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the full URL for the file.
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
     * Check if the file is an image.
     */
    public function isImage(): bool
    {
        return strpos($this->mime_type, 'image/') === 0;
    }

    /**
     * Set this file as the current version and unset any other current versions for this stage.
     */
    public function markAsCurrent(): void
    {
        // Unset all other current versions for this commission and stage
        self::where('commission_id', $this->commission_id)
            ->where('stage', $this->stage)
            ->where('id', '!=', $this->id)
            ->update(['is_current_version' => false]);

        // Set this one as current
        $this->is_current_version = true;
        $this->save();
    }
}
