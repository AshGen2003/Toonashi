<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClerkWebhookController;
use App\Http\Controllers\UserSyncController;

Route::post('/user-sync', [UserSyncController::class, 'sync']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/webhooks/clerk', [ClerkWebhookController::class, 'handle']);

Route::get("/hi", function() {
    return response()->json([
        "message" => "Hello from anime backend!",
        "description" => "This is a backend for an anime-related project.",
    ]);
});