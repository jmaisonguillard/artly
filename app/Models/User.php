<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'display_name',
        'email',
        'password',
        'role',
        'avatar',
        'website',
        'verification_token',
    ];

    protected $appends = [
        'avatar_url',
        'full_name',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's avatar URL.
     * If no avatar is set, returns a generated initial avatar based on the user's name.
     */
    public function getAvatarUrlAttribute(): string
    {
        if (empty($this->avatar)) {
            $initials = '';
            if (!empty($this->first_name) && !empty($this->last_name)) {
                $initials = strtoupper(substr($this->first_name, 0, 1) . substr($this->last_name, 0, 1));
            } elseif (!empty($this->display_name)) {
                $initials = strtoupper(substr($this->display_name, 0, 1));
            }

            return "https://ui-avatars.com/api/?name=" . urlencode($initials) . "&background=random&color=fff";
        }

        return $this->avatar;
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function isArtist(): bool
    {
        return $this->role === 'artist';
    }

    public function isClient(): bool
    {
        return $this->role === 'client';
    }
}
