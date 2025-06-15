<?php

namespace App\Models;

use App\ElectionsStatus;

use App\Visibility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

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
    'visibility',
    'user_id',
   ];

   protected $casts = [
        'title' => 'string',
        'status' => ElectionsStatus::class,
        'visibility' => Visibility::class,
        'description' => 'string',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'capacity' => 'integer',
   ];

   // Boot method untuk auto update status
   protected static function boot()
   {
       parent::boot();

       // Update status saat model di-retrieve
       static::retrieved(function ($election) {
           $election->updateStatusBasedOnDate();
       });
   }

   // Method untuk update status berdasarkan tanggal
   public function updateStatusBasedOnDate()
   {
       $now = Carbon::now();
       $startDate = Carbon::parse($this->start_date);
       $endDate = Carbon::parse($this->end_date);
       
       $newStatus = null;

       // Tentukan status berdasarkan tanggal
       if ($now->lt($startDate)) {
           // Sebelum tanggal mulai
           $newStatus = ElectionsStatus::Upcoming;
       } elseif ($now->gte($startDate) && $now->lt($endDate)) {
           // Sedang berlangsung
           $newStatus = ElectionsStatus::Ongoing;
       } elseif ($now->gte($endDate)) {
           // Sudah berakhir
           $newStatus = ElectionsStatus::Finished;
       }

       // Update jika status berbeda dan bukan cancelled/inactive
       if ($newStatus && 
           $this->status !== $newStatus && 
           $this->status !== ElectionsStatus::Cancelled && 
           $this->status !== ElectionsStatus::Inactive) {
           
           $this->status = $newStatus;
           $this->saveQuietly(); // Save tanpa trigger events
       }
   }

   // Method untuk manual update status
   public function refreshStatus()
   {
       $this->updateStatusBasedOnDate();
       return $this;
   }

   // Scope untuk filter berdasarkan status aktual
   public function scopeWithCurrentStatus($query)
   {
       return $query->get()->each(function ($election) {
           $election->updateStatusBasedOnDate();
       });
   }

   // Accessor untuk mendapatkan status real-time
   public function getCurrentStatusAttribute()
   {
       $now = Carbon::now();
       $startDate = Carbon::parse($this->start_date);
       $endDate = Carbon::parse($this->end_date);

       if ($this->status === ElectionsStatus::Cancelled || 
           $this->status === ElectionsStatus::Inactive) {
           return $this->status;
       }

       if ($now->lt($startDate)) {
           return ElectionsStatus::Upcoming;
       } elseif ($now->gte($startDate) && $now->lt($endDate)) {
           return ElectionsStatus::Ongoing;
       } elseif ($now->gte($endDate)) {
           return ElectionsStatus::Finished;
       }

       return $this->status;
   }

   public function user(): BelongsTo
   {
       return $this->belongsTo(User::class);
   }

   public function candidates(): HasMany
   {
      return $this->hasMany(Calon::class, 'election_id');
   }
   
   public function voters(): HasMany
   {
      return $this->hasMany(Vote::class, 'election_id');
   }
}