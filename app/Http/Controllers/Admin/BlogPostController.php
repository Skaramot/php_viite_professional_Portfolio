<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('user')
            ->withCount(['comments', 'reactions'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:5000',
            'image' => 'nullable|image|max:5120', // 5MB
        ]);

        $data = [
            'content' => $validated['content'],
            'published_at' => now(),
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('blog-images', 'public');
        }

        $request->user()->blogPosts()->create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Post published!');
    }

    public function edit(BlogPost $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:5000',
            'image' => 'nullable|image|max:5120',
            'remove_image' => 'boolean',
        ]);

        $post->content = $validated['content'];

        if ($request->boolean('remove_image') && $post->image) {
            Storage::disk('public')->delete($post->image);
            $post->image = null;
        }

        if ($request->hasFile('image')) {
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $post->image = $request->file('image')->store('blog-images', 'public');
        }

        $post->save();

        return redirect()->route('admin.posts.index')->with('success', 'Post updated!');
    }

    public function destroy(BlogPost $post)
    {
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted!');
    }
}
