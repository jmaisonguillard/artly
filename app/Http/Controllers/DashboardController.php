<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Commission;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $commissions = Commission::where(function ($query) use ($user) {
            $query->where('client_id', $user->id)->orWhere('artist_id', $user->id);
        })
            ->with(['client:id,display_name,avatar', 'artist:id,display_name,avatar'])
            ->latest()
            ->paginate(20);

        // Calculate this month's earnings for the artist
        $thisMonthEarnings = 0;

        if ($user->role == 'artist') {
            $thisMonthEarnings = Commission::where('artist_id', $user->id)
                ->where('status', 'completed')
                ->whereMonth('completed_at', now()->month)
                ->whereYear('completed_at', now()->year)
                ->sum('price');
        }

        // Calculate completed projects count for the artist
        $completedProjectsCount = 0;

        if ($user->role == 'artist') {
            $completedProjectsCount = Commission::where('artist_id', $user->id)
                ->where('status', 'completed')
                ->whereMonth('completed_at', now()->month)
                ->whereYear('completed_at', now()->year)
                ->count();
        }

        // Calculate pending reviews count for the artist
        $pendingReviewsCount = 0;

        if ($user->role == 'artist') {
            $pendingReviewsCount = Commission::where('artist_id', $user->id)
                ->where('status', 'review')
                ->count();
        }

        // Calculate commissions nearing deadlines for artists
        $upcomingDeadlines = [];

        if ($user->role == 'artist') {
            // Get commissions that are due within the next 2 months
            // Only include active commissions (not completed or cancelled)
            // Limit to 5 results
            $upcomingDeadlines = Commission::where('artist_id', $user->id)
                // ->whereIn('status', ['pending', 'in_progress', 'review', 'revision'])
                // ->whereDate('due_date', '>=', now())
                // ->whereDate('due_date', '<=', now()->addMonths(2))
                ->with(['client:id,display_name,avatar'])
                ->orderBy('due_date')
                ->limit(2)
                ->get()
                ->map(function ($commission) {
                    return [
                        'id' => $commission->id,
                        'title' => $commission->title,
                        'client_name' => $commission->client->display_name,
                        'client_avatar' => $commission->client->avatar,
                        'due_date' => $commission->due_date->format('M d, Y'),
                        'days_left' => now()->diffInDays($commission->due_date),
                        'status' => $commission->status,
                    ];
                });
        }

        return Inertia::render('dashboard/Artist', [
            'commissions' => $commissions->items(),
            'active_commission_count' => $commissions->count(),
            'this_month_earnings' => $thisMonthEarnings,
            'completed_projects_count' => $completedProjectsCount,
            'pending_reviews_count' => $pendingReviewsCount,
            'upcoming_deadlines' => $upcomingDeadlines,
        ]);


    }

    public function viewCommission(Commission $commission)
    {
        if (!Auth::user()->can('view', $commission)) {
            abort(403, 'Unauthorized.');
        }
        $commission->load([
            'client:id,first_name,last_name,display_name,avatar',
            'artist:id,first_name,last_name,display_name,avatar',
            'messages' => function ($query) {
                $query->with(['user:id,first_name,last_name,display_name,avatar', 'attachments']);
            },
            'files',
            'milestones' => function ($query) {
                $query->orderBy('order');
            },
        ]);

        return Inertia::render('dashboard/commission/ViewCommission', [
            'commission' => [
                'id' => $commission->commission_id,
                'title' => $commission->title,
                'description' => $commission->description,
                'price' => $commission->price,
                'status' => $commission->status,
                'stage' => $commission->stage,
                'progress' => $commission->progress,
                'revisions' => $commission->revisions_used,
                'revisionsAllowed' => $commission->revisions_allowed,
                'timeline' => [
                    'due_date' => $commission->due_date->format('M d, Y'),
                    'estimatedCompletion' => $commission->estimated_completion_date->format('M d, Y'),
                ],
                'client' => [
                    'name' => $commission->client->display_name,
                    'avatar' => $commission->client->avatar,
                    'rating' => 4.5, // You'll need to implement this based on your rating system
                ],
                'artist' => [
                    'name' => $commission->artist->display_name,
                    'avatar' => $commission->artist->avatar,
                    'rating' => 4.8, // You'll need to implement this based on your rating system
                ],
                'messages' => $commission->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'content' => $message->content,
                        'sender' => $message->sender_type,
                        'name' => $message->user->display_name,
                        'avatar' => $message->user->avatar,
                        'timestamp' => $message->created_at->diffForHumans(),
                        'attachments' => $message->attachments->map(function ($attachment) {
                            return [
                                'id' => $attachment->id,
                                'name' => $attachment->name,
                                'thumbnail' => $attachment->getThumbnailUrl(),
                            ];
                        }),
                    ];
                }),
                'files' => $commission->files->map(function ($file) {
                    return [
                        'id' => $file->id,
                        'name' => $file->name,
                        'thumbnail' => $file->getThumbnailUrl(),
                        'stage' => $file->stage,
                        'date' => $file->created_at->format('M d, Y'),
                    ];
                }),
                'milestones' => $commission->milestones->map(function ($milestone) {
                    return [
                        'id' => $milestone->id,
                        'title' => $milestone->title,
                        'description' => $milestone->description,
                        'completed' => $milestone->completed,
                        'date' => $milestone->due_date ? $milestone->due_date->format('M d, Y') : null,
                    ];
                }),
            ],
        ]);
    }
}
