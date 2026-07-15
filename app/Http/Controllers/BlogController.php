<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $ipHash = hash('sha256', $request->ip() . config('app.key'));
        
        $posts = BlogPost::with('user')
            ->published()
            ->withCount('comments')
            ->latest('published_at')
            ->paginate(10);

        // Transform posts to include reaction counts and user reactions
        $posts->through(function ($post) use ($ipHash) {
            $post->reaction_counts = $post->reaction_counts; // accessor
            $post->user_reactions = $post->getUserReactions($ipHash);
            return $post;
        });

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
        ]);
    }

    public function show(Request $request, BlogPost $post)
    {
        $ipHash = hash('sha256', $request->ip() . config('app.key'));

        $post->load(['user', 'comments' => fn($q) => $q->latest()]);
        $post->loadCount('comments');
        $post->reaction_counts = $post->reaction_counts;
        $post->user_reactions = $post->getUserReactions($ipHash);

        return Inertia::render('Blog/Show', [
            'post' => $post,
        ]);
    }
}
