<?php

namespace App\Models;

use App\Gender;
use App\Status;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Calon extends Model
{
      use HasFactory;

   protected $table = 'calon';



      protected $fillable = [
        
        'nama',
        'kelas',
        'visi',
        'misi',
        'gender',
        'picture',
        'status',
         'user_id',
         'election_id'
    ];


   
    protected $casts = [
        'nama' => 'string',
        'kelas' => 'string',
        'visi' => 'string',
        'misi' => 'string',
        'gender' => Gender::class,
        'status' => Status::class,
        'picture' => 'string',
    ];

 


  public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function votes():  HasMany
    {
      return $this->hasMany(Vote::class, 'calon_id');
    }
 
  public function elections(): BelongsTo
    {
      return $this->belongsTo(Election::class, 'election_id');
    }
}
