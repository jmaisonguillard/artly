<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MessageThread extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'subject',
        'last_message_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_message_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the messages in this thread
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'thread_id')->orderBy('created_at', 'asc');
    }

    /**
     * Get the latest message in this thread
     */
    public function latestMessage()
    {
        return $this->messages()->latest()->first();
    }

    /**
     * Get the participants of this thread
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'message_thread_participants', 'thread_id', 'user_id')
            ->withPivot(['last_read_at', 'is_muted', 'is_starred'])
            ->withTimestamps();
    }

    /**
     * Add a participant to this thread
     */
    public function addParticipant($userId): void
    {
        $this->participants()->attach($userId);
    }

    /**
     * Remove a participant from this thread
     */
    public function removeParticipant($userId): void
    {
        $this->participants()->detach($userId);
    }

    /**
     * Mark thread as read for a user
     */
    public function markAsRead($userId): void
    {
        $this->participants()->updateExistingPivot($userId, [
            'last_read_at' => now(),
        ]);
    }

    /**
     * Check if thread has unread messages for a user
     */
    public function hasUnreadMessages($userId): bool
    {
        $participant = $this->participants()->where('user_id', $userId)->first();

        if (!$participant) {
            return false;
        }

        $lastReadAt = $participant->pivot->last_read_at;

        if (is_null($lastReadAt)) {
            return $this->messages()->where('sender_id', '!=', $userId)->exists();
        }

        return $this->messages()
            ->where('sender_id', '!=', $userId)
            ->where('created_at', '>', $lastReadAt)
            ->exists();
    }

    /**
     * Count unread messages for a user
     */
    public function unreadMessagesCount($userId): int
    {
        $participant = $this->participants()->where('user_id', $userId)->first();

        if (!$participant) {
            return 0;
        }

        $lastReadAt = $participant->pivot->last_read_at;

        if (is_null($lastReadAt)) {
            return $this->messages()->where('sender_id', '!=', $userId)->count();
        }

        return $this->messages()
            ->where('sender_id', '!=', $userId)
            ->where('created_at', '>', $lastReadAt)
            ->count();
    }
}
