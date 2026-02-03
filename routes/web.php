<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
