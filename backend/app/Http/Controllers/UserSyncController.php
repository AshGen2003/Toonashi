<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserSyncController extends Controller
{
    public function sync(Request $request)
    {
        // 1. Validate the incoming data
        $validated = $request->validate([
            'clerk_id' => 'required|string',
            'email' => 'required|email',
            'name' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);

        // 2. Update or Create the user in MySQL
        $user = User::updateOrCreate(
            ['email' => $validated['email']], // Check if email exists
            [
                'clerk_id' => $validated['clerk_id'],
                'name' => $validated['name'],
                'avatar_url' => $validated['avatar'],
                'password' => bcrypt(str()->random(16)), // Dummy password
            ]
        );

        return response()->json(['message' => 'User synced successfully', 'user' => $user]);
    }
}