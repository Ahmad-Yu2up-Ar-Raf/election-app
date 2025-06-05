<?php

namespace App\Console\Commands;

use App\Models\Election;
use App\ElectionsStatus;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateElectionStatus extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'elections:update-status';

    /**
     * The console command description.
     */
    protected $description = 'Update election status based on current date and time';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting election status update...');
        
        $now = Carbon::now();
        $updatedCount = 0;

        // Get semua elections yang bukan cancelled atau inactive
        $elections = Election::whereNotIn('status', [
            ElectionsStatus::Cancelled,
            ElectionsStatus::Inactive
        ])->get();

        foreach ($elections as $election) {
            $startDate = Carbon::parse($election->start_date);
            $endDate = Carbon::parse($election->end_date);
            $currentStatus = $election->status;
            $newStatus = null;

            // Tentukan status baru berdasarkan tanggal
            if ($now->lt($startDate)) {
                $newStatus = ElectionsStatus::Upcoming;
            } elseif ($now->gte($startDate) && $now->lt($endDate)) {
                $newStatus = ElectionsStatus::Ongoing;
            } elseif ($now->gte($endDate)) {
                $newStatus = ElectionsStatus::Finished;
            }

            // Update jika status berubah
            if ($newStatus && $currentStatus !== $newStatus) {
                $election->update(['status' => $newStatus]);
                $updatedCount++;
                
                $this->line("Updated election '{$election->title}' from {$currentStatus->value} to {$newStatus->value}");
            }
        }

        $this->info("Election status update completed. Updated {$updatedCount} elections.");
        
        return Command::SUCCESS;
    }
}