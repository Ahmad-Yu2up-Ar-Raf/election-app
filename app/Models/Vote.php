<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vote extends Model
{

    protected $table = 'votes';

    protected $fillable = [
        'calon_id',
    
    ];


    public function calon():  BelongsTo
    {
      return $this->belongsTo(Calon::class, 'calon_id');
    }

}
