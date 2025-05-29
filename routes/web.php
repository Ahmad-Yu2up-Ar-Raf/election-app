<?php

use App\Http\Controllers\CalonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('calon', CalonController::class);
    });
});




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
