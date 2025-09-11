<?php

namespace App\Jobs;

use App\Models\ClientSession;
use App\Models\CaptivePortal;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class CleanupExpiredSessions implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expiredCount = 0;
        
        // Obtener todas las sesiones activas
        $activeSessions = ClientSession::where('status', 'active')->get();
        
        foreach ($activeSessions as $session) {
            if ($session->hasExpired()) {
                $session->expire();
                $expiredCount++;
            }
        }
        
        // Limpiar sesiones muy antiguas (más de 30 días)
        $oldSessionsCount = ClientSession::where('login_time', '<', Carbon::now()->subDays(30))
                                        ->delete();
        
        Log::info('Session cleanup completed', [
            'expired_sessions' => $expiredCount,
            'deleted_old_sessions' => $oldSessionsCount,
        ]);
    }
}
