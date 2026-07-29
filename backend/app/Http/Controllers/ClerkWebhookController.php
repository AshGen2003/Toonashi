<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User; // Assuming you have a User model
use Svix\Webhook;
use Svix\Exception\WebhookSigningException;

class ClerkWebhookController extends Controller
{
    public function handle(Request $request)
    {
        // 1. Get the headers
        $headers = $request->headers->all();
        $svix_id = $headers['svix-id'][0] ?? null;
        $svix_timestamp = $headers['svix-timestamp'][0] ?? null;
        $svix_signature = $headers['svix-signature'][0] ?? null;

        if (!$svix_id || !$svix_timestamp || !$svix_signature) {
            return response()->json(['error' => 'Missing svix headers'], 400);
        }

        // 2. Get the payload
        $payload = $request->getContent();
        $secret = env('CLERK_WEBHOOK_SECRET');

        // 3. Verify the signature
        try {
            $wh = new Webhook($secret);
            // This throws an exception if the signature is invalid
            $evt = $wh->verify($payload, [
                'svix-id' => $svix_id,
                'svix-timestamp' => $svix_timestamp,
                'svix-signature' => $svix_signature,
            ]);
        } catch (WebhookSigningException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // 4. Handle the specific event
        $eventType = $evt['type'];
        $data = $evt['data'];

        if ($eventType === 'user.created' || $eventType === 'user.updated') {
            $this->syncUser($data);
        }

        return response()->json(['message' => 'Webhook received']);
    }

    private function syncUser($data)
    {
        // Extract email (Clerk sends an array of emails)
        $email = $data['email_addresses'][0]['email_address'] ?? null;
        
        // Check if this is a Google user
        $isGoogle = false;
        foreach ($data['external_accounts'] as $account) {
            if ($account['provider'] === 'oauth_google') {
                $isGoogle = true;
                // You can grab google-specific ID here: $account['provider_user_id']
                break;
            }
        }

        // Upsert user into MySQL
        User::updateOrCreate(
            ['email' => $email], // Search by email (or use 'clerk_id' if you add that column)
            [
                'name' => $data['first_name'] . ' ' . $data['last_name'],
                'password' => bcrypt(str()->random(16)), // Random password since they use Google
                'google_auth_enabled' => $isGoogle, // Custom column example
                'avatar_url' => $data['image_url'] ?? null,
                'clerk_id' => $data['id'], // Recommended: Add this column to your users table
            ]
        );
        
        Log::info("User synced: " . $email);
    }
}