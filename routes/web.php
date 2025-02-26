<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

Route::get('/', fn() => Inertia::render('Homepage'));
Route::get('/register/{type?}', fn($type = null) => Inertia::render('Register', ['type' => $type]))
    ->where('type', '^(?!success$)[a-zA-Z0-9-]+$');
Route::get('/register/success', fn() => Inertia::render('RegisterSuccess'));
Route::get('/login', fn() => Inertia::render('Login'))->name('login');
Route::post('/authenticate', [AuthController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);
Route::get('/verify-email/{token}', [UserController::class, 'verifyEmail'])
    ->where('token', '^(?!invalid$|success$)[a-zA-Z0-9-]+$')
    ->name('verify-email');
Route::get('/verify-email/invalid', fn() => Inertia::render('verify/VerifyInvalid'));
Route::get('/verify-email/success', fn() => Inertia::render('verify/VerifySuccess'));
Route::post('/reverify', [UserController::class, 'reverify']);

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', fn() => Inertia::render(Auth::user()->role == 'client' ? 'dashboard/Client' : 'dashboard/Index'));
        Route::get('/commission/{commission}', function(App\Models\Commission $commission) {
            $commission->load([
                'client:id,first_name,last_name,display_name,avatar',
                'artist:id,first_name,last_name,display_name,avatar',
                'messages' => function($query) {
                    $query->with([
                        'user:id,first_name,last_name,display_name,avatar',
                        'attachments'
                    ]);
                },
                'files',
                'milestones' => function($query) {
                    $query->orderBy('order');
                }
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
                        'estimatedCompletion' => $commission->estimated_completion_date->format('M d, Y')
                    ],
                    'client' => [
                        'name' => $commission->client->display_name,
                        'avatar' => $commission->client->avatar,
                        'rating' => 4.5 // You'll need to implement this based on your rating system
                    ],
                    'artist' => [
                        'name' => $commission->artist->display_name,
                        'avatar' => $commission->artist->avatar,
                        'rating' => 4.8 // You'll need to implement this based on your rating system
                    ],
                    'messages' => $commission->messages->map(function($message) {
                        return [
                            'id' => $message->id,
                            'content' => $message->content,
                            'sender' => $message->sender_type,
                            'name' => $message->user->display_name,
                            'avatar' => $message->user->avatar,
                            'timestamp' => $message->created_at->diffForHumans(),
                            'attachments' => $message->attachments->map(function($attachment) {
                                return [
                                    'id' => $attachment->id,
                                    'name' => $attachment->name,
                                    'thumbnail' => $attachment->getThumbnailUrl(),
                                ];
                            })
                        ];
                    }),
                    'files' => $commission->files->map(function($file) {
                        return [
                            'id' => $file->id,
                            'name' => $file->name,
                            'thumbnail' => $file->getThumbnailUrl(),
                            'stage' => $file->stage,
                            'date' => $file->created_at->format('M d, Y')
                        ];
                    }),
                    'milestones' => $commission->milestones->map(function($milestone) {
                        return [
                            'id' => $milestone->id,
                            'title' => $milestone->title,
                            'description' => $milestone->description,
                            'completed' => $milestone->completed,
                            'date' => $milestone->due_date ? $milestone->due_date->format('M d, Y') : null,
                        ];
                    })
                ]
            ]);
        });
    });
});
