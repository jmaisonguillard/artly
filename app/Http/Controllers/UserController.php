<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserVerify;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'displayName' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'portfolioUrl' => 'nullable|url|max:255',
            'agreeTerms' => 'required|boolean',
            'userType' => 'required|string|in:client,artist',
            'avatar' => 'nullable|image|max:2048'
        ]);

        if (!$validatedData['agreeTerms']) {
            return response()->json(['message' => 'Terms and conditions must be accepted'], 400);
        }

        $user = new User();
        $user->first_name = $validatedData['firstName'];
        $user->last_name = $validatedData['lastName'];
        $user->display_name = $validatedData['displayName'];
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        $user->role = $validatedData['userType'];
        $user->website = $validatedData['portfolioUrl'];
        $user->verification_token = Str::random(32);

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }

        $user->save();

        // Send verification email
        Mail::to($user->email)->send(new UserVerify($user));

        return redirect('/register/success');
    }

    public function verifyEmail($token)
    {
        $user = User::where('verification_token', $token)->first();

        if (!$user) {
            return redirect('/verify-email/invalid');
        }

        $user->email_verified_at = now();
        $user->save();

        Auth::login($user);

        return redirect('/verify-email/success');
    }

    public function reverify(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255'
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user) {
            return false;
        }

        Mail::to($user->email)->send(new UserVerify($user));

        return redirect('/register/success');
    }
}
