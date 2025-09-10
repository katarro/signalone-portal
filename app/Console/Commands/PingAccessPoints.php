<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Ap;

class PingAccessPoints extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ap:ping {--all : Ping all active APs}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ping all active Access Points to check their connectivity status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting AP ping monitoring...');

        $aps = Ap::active()->get();

        if ($aps->isEmpty()) {
            $this->warn('No active Access Points found.');
            return 0;
        }

        $this->info("Found {$aps->count()} active Access Points to monitor.");

        $online = 0;
        $offline = 0;

        foreach ($aps as $ap) {
            $this->info("Pinging {$ap->name} ({$ap->ip_address})...");

            $startTime = microtime(true);
            
            // Ejecutar ping
            $output = [];
            $return_var = 0;
            exec("ping -c 1 -W 3 {$ap->ip_address} 2>/dev/null", $output, $return_var);
            
            $endTime = microtime(true);
            $responseTime = ($endTime - $startTime) * 1000; // Convertir a milisegundos
            
            $success = $return_var === 0;
            
            if ($success) {
                $ap->updatePingStatus(true, round($responseTime));
                $this->line("  ✅ {$ap->name} - Online (" . round($responseTime) . "ms)");
                $online++;
            } else {
                $ap->updatePingStatus(false);
                $this->line("  ❌ {$ap->name} - Offline");
                $offline++;
            }
        }

        $this->info("Ping monitoring completed:");
        $this->line("  Online: {$online}");
        $this->line("  Offline: {$offline}");
        $this->line("  Total: " . ($online + $offline));

        return 0;
    }
}
