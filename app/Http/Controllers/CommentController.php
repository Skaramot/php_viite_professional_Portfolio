<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
        ]);

        $post->comments()->create($validated);

        return back();
    }
}
