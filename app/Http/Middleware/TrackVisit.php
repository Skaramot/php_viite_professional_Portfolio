<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\SiteVisit;

class TrackVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    /**
     * Handle tasks after the response has been sent to the browser.
     */
    public function terminate(Request $request, Response $response): void
    {
        if ($request->method() !== 'GET') {
            return;
        }

        $path = $request->path();
        if (
            str_starts_with($path, 'admin') ||
            str_starts_with($path, '_debugbar') ||
            str_starts_with($path, 'favicon') ||
            preg_match('/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/i', $path)
        ) {
            return;
        }

        $userAgent = $request->userAgent();
        
        $deviceType = 'desktop';
        if (preg_match('/Mobile|Android|iPhone/i', $userAgent)) {
            $deviceType = 'mobile';
        } elseif (preg_match('/iPad|Tablet/i', $userAgent)) {
            $deviceType = 'tablet';
        }

        $browser = 'Other';
        if (preg_match('/Edg/i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/OPR|Opera/i', $userAgent)) {
            $browser = 'Opera';
        } elseif (preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Safari/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = 'Firefox';
        }

        $ipHash = hash('sha256', $request->ip() . config('app.key'));

        SiteVisit::create([
            'ip_hash' => $ipHash,
            'path' => '/' . ltrim($path, '/'),
            'method' => 'GET',
            'user_agent' => $userAgent,
            'referer' => $request->headers->get('referer'),
            'device_type' => $deviceType,
            'browser' => $browser,
            'created_at' => now(),
        ]);
    }
}
