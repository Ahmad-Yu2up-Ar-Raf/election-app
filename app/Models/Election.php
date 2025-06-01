<?php

namespace App\Models;

use App\ElectionsStatus;
use App\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Election extends Model
{
   use HasFactory;

   protected $table = 'elections';



    protected $fillable = [
    'title',
    'description',
    'status',
    'start_date',
    'end_date',
    'capacity',
    'user_id'
];

   
    protected $casts = [
        'title' => 'string',
        'status' => ElectionsStatus::class,

        'description' => 'string',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'capacity' => 'integer',
    ];


 




  public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function candidates():  HasMany
    {
      return $this->hasMany(Calon::class, 'election_id');
    }
    public function voters():  HasMany
    {
      return $this->hasMany(Vote::class, 'election_id');
    }
}
