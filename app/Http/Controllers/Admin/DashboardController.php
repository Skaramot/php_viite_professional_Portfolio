<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogComment;
use App\Models\BlogPost;
use App\Models\SiteVisit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();

        // Stats
        $stats = [
            'total_visits' => SiteVisit::count(),
            'today_visits' => SiteVisit::whereDate('created_at', $now->toDateString())->count(),
            'week_visits' => SiteVisit::where('created_at', '>=', $now->copy()->subWeek())->count(),
            'month_visits' => SiteVisit::where('created_at', '>=', $now->copy()->subMonth())->count(),
            'unique_visitors' => SiteVisit::distinct('ip_hash')->count('ip_hash'),
            'total_posts' => BlogPost::count(),
            'total_comments' => BlogComment::count(),
            'live_visitors' => SiteVisit::where('created_at', '>=', $now->copy()->subMinutes(5))->distinct('ip_hash')->count('ip_hash'),
        ];

        // Visits over last 30 days for line chart
        $visitsChart = SiteVisit::where('created_at', '>=', $now->copy()->subDays(30))
            ->selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($row) => ['date' => $row->date, 'count' => $row->count]);

        // Fill in missing dates with 0
        $filledChart = collect();
        for ($i = 29; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i)->toDateString();
            $existing = $visitsChart->firstWhere('date', $date);
            $filledChart->push([
                'date' => $date,
                'count' => $existing ? $existing['count'] : 0,
            ]);
        }

        // Top pages
        $topPages = SiteVisit::selectRaw("path, COUNT(*) as count")
            ->groupBy('path')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        // Device breakdown
        $devices = SiteVisit::selectRaw("COALESCE(device_type, 'unknown') as device, COUNT(*) as count")
            ->groupBy('device')
            ->get()
            ->pluck('count', 'device');

        // Browser breakdown
        $browsers = SiteVisit::selectRaw("COALESCE(browser, 'Unknown') as browser, COUNT(*) as count")
            ->groupBy('browser')
            ->orderByDesc('count')
            ->limit(6)
            ->get()
            ->pluck('count', 'browser');

        // Recent visitors (last 20)
        $recentVisitors = SiteVisit::latest('created_at')
            ->limit(20)
            ->get()
            ->map(fn($v) => [
                'time' => $v->created_at?->diffForHumans(),
                'path' => $v->path,
                'browser' => $v->browser,
                'device' => $v->device_type,
            ]);

        // Visits by hour of day (for bar chart)
        $hourlyVisits = SiteVisit::selectRaw("CAST(strftime('%H', created_at) AS INTEGER) as hour, COUNT(*) as count")
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->pluck('count', 'hour');

        // Fill all 24 hours
        $filledHourly = collect();
        for ($h = 0; $h < 24; $h++) {
            $filledHourly->push([
                'hour' => sprintf('%02d:00', $h),
                'count' => $hourlyVisits->get($h, 0),
            ]);
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'visitsChart' => $filledChart,
            'topPages' => $topPages,
            'devices' => $devices,
            'browsers' => $browsers,
            'recentVisitors' => $recentVisitors,
            'hourlyVisits' => $filledHourly,
        ]);
    }
}
