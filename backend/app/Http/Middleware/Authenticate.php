<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (!auth('sanctum')->user()) {
            return response()->json(
                ['error' => 'Unauthenticated!'],
                Response::HTTP_UNAUTHORIZED
            );
        }

        return $next($request);
    }
}