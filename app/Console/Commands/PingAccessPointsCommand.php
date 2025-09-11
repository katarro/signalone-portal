<?php

namespace App\Console\Commands;

use App\Jobs\PingAccessPointsJob;
use Illuminate\Console\Command;

class PingAccessPointsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ap:ping-all {--sync : Execute synchronously instead of queuing}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ping all active access points to check their status';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting ping check for all active access points...');

        if ($this->option('sync')) {
            // Ejecutar sincrónicamente
            $job = new PingAccessPointsJob();
            $job->handle();
            $this->info('Ping check completed synchronously.');
        } else {
            // Agregar a la cola
            PingAccessPointsJob::dispatch();
            $this->info('Ping check job queued successfully.');
        }

        return 0;
    }
}
