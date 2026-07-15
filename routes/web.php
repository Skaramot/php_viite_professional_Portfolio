<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReactionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\BlogPostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/experience', function () {
    return Inertia::render('Experience');
})->name('experience');

Route::get('/education', function () {
    return Inertia::render('Education');
})->name('education');

Route::get('/skills', function () {
    return Inertia::render('Skills');
})->name('skills');

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

Route::get('/publication', function () {
    return Inertia::render('Publication');
})->name('publication');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Public Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{post}/comments', [CommentController::class, 'store'])->name('blog.comments.store');
Route::post('/blog/{post}/reactions', [ReactionController::class, 'toggle'])->name('blog.reactions.toggle');

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Admin
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', BlogPostController::class)->except(['show']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
