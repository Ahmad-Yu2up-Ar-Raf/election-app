<?php

namespace App\Events;

use App\Models\Vote;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VoteCreatedEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $votes;

    public function __construct($votes)
    {
        $this->votes = $votes;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('vote'), // Sesuaikan dengan channel di frontend
        ];
    }

    public function broadcastAs()
    {
        return 'VoteCreatedEvent';
    }
    
    public function broadcastWith()
    {
        return [
            'votes' => $this->votes // Kirim semua votes sesuai expected format frontend
        ];
    }
}