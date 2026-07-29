<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        //web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        // Disable CSRF protection for specific routes here
        $middleware->validateCsrfTokens(except: [
            'api/webhooks/clerk', // <--- Add your Clerk route here
            'api/user-sync',      // <--- If you are using the sync route
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();