<?php

namespace App\Models;



use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{
   protected $model = Vote::class;
    protected $table = 'votes';

    protected $fillable = [
        'calon_id',
        'election_id',
    ];

  protected $casts = [
        'calon_id' => 'integer',
        'election_id' => 'integer',
    ];

    public function calon():  BelongsTo
    {
      return $this->belongsTo(Calon::class, 'calon_id');
    }
    public function Election():  BelongsTo
    {
      return $this->belongsTo(Election::class, 'election_id');
    }

}
