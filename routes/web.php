<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

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
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/commission/{commission}', [DashboardController::class, 'viewCommission'])->name('commission.view');
    });
});
