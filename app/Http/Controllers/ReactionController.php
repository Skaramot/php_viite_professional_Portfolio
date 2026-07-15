<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class ReactionController extends Controller
{
    public function toggle(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'type' => 'required|in:like,love,fire,clap,think',
        ]);

        $ipHash = hash('sha256', $request->ip() . config('app.key'));

        $existing = $post->reactions()
            ->where('type', $validated['type'])
            ->where('ip_hash', $ipHash)
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            $post->reactions()->create([
                'type' => $validated['type'],
                'ip_hash' => $ipHash,
            ]);
        }

        return back();
    }
}
