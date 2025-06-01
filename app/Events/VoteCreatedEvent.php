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

    public $vote;

    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('votes'),
        ];
    }

    public function broadcastAs()
    {
        return 'VoteCreatedEvent';
    }
    public function broadcastWith()
{
    return [
        'vote' => $this->vote->load('calon') // Load relasi jika diperlukan
    ];
}
}