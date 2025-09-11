<?php

namespace App\Console\Commands;

use App\Jobs\CleanupExpiredSessions;
use Illuminate\Console\Command;

class CleanupExpiredSessionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup expired client sessions from captive portal';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting session cleanup...');
        
        CleanupExpiredSessions::dispatch();
        
        $this->info('Session cleanup job dispatched successfully.');
        
        return 0;
    }
}
