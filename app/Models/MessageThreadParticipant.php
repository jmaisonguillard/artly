<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MessageThreadParticipant extends Pivot
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'thread_id',
        'user_id',
        'last_read_at',
        'is_muted',
        'is_starred',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_read_at' => 'datetime',
        'is_muted' => 'boolean',
        'is_starred' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
