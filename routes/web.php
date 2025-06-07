<?php

use App\Http\Controllers\AdmindController;
use App\Http\Controllers\CalonController;
use App\Http\Controllers\ElectionsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
// use App\Http\Controllers\VoteController;
// use App\Models\Election;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('admind', AdmindController::class);
        
        // Elections routes
        Route::resource('elections', ElectionsController::class);
        Route::resource('candidate', CalonController::class);
        Route::resource('users', UserController::class);
    });

    // Votes routes with auth middleware

});


// ...existing code...
// Votes routes - pastikan konsisten dengan yang digunakan di frontend
Route::prefix('vote')->name('vote.')->group(function () {
    Route::get('/', [VoteController::class, 'index'])->name('index');
    Route::get('/{election}', [VoteController::class, 'show'])->name('show');
    // Perbaiki route ini agar sesuai dengan yang digunakan di frontend
    Route::post('/{election}', [VoteController::class, 'store'])->name('store');
});


// ...existing code...

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
