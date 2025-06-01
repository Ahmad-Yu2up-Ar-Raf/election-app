<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

// Channel untuk votes
Broadcast::channel('votes', function () {
    return true; // Mengizinkan semua user untuk subscribe ke channel ini
});

Broadcast::channel('election.{electionId}', function ($user, $electionId) {
    return true; // Atau bisa ditambahkan logic untuk membatasi akses
});