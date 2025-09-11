<?php

namespace App\Jobs;

use App\Models\Ap;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class PingAccessPointsJob implements ShouldQueue
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
        Log::info('Starting automatic ping check for all access points');

        $activeAps = Ap::where('is_active', true)->get();

        foreach ($activeAps as $ap) {
            try {
                $this->pingAccessPoint($ap);
            } catch (\Exception $e) {
                Log::error("Error pinging AP {$ap->id}: " . $e->getMessage());
            }
        }

        Log::info("Completed ping check for {$activeAps->count()} access points");
    }

    /**
     * Ejecuta ping a un Access Point específico
     */
    private function pingAccessPoint(Ap $ap): void
    {
        $ip = $ap->ip_address;
        $startTime = microtime(true);

        Log::info("Pinging AP {$ap->id} ({$ap->name}) at {$ip}");

        // Comando ping: 3 paquetes, timeout 5 segundos por paquete
        $command = "ping -c 3 -W 5 " . escapeshellarg($ip) . " 2>&1";
        $output = shell_exec($command);
        
        $endTime = microtime(true);
        $responseTime = round(($endTime - $startTime) * 1000); // en ms

        // Analizar resultado del ping
        $result = $this->analyzePingResult($output);

        // Actualizar el AP en la base de datos
        $this->updateApStatus($ap, $result, $responseTime);

        Log::info("AP {$ap->id} ping result", [
            'ip' => $ip,
            'success' => $result['success'],
            'packets_received' => $result['packets_received'],
            'packet_loss' => $result['packet_loss'],
            'avg_time' => $result['avg_time'],
            'status' => $result['status']
        ]);
    }

    /**
     * Analiza el resultado del comando ping
     */
    private function analyzePingResult(?string $output): array
    {
        if (!$output) {
            return [
                'success' => false,
                'packets_received' => 0,
                'packet_loss' => 100,
                'avg_time' => null,
                'status' => 'offline',
                'status_text' => 'Sin respuesta'
            ];
        }

        // Buscar estadísticas de paquetes
        preg_match('/(\d+) packets transmitted, (\d+) received/', $output, $matches);
        $transmitted = isset($matches[1]) ? (int)$matches[1] : 0;
        $received = isset($matches[2]) ? (int)$matches[2] : 0;
        
        $packetLoss = $transmitted > 0 ? round((($transmitted - $received) / $transmitted) * 100) : 100;

        // Buscar tiempo promedio
        preg_match('/= [\d.]+\/([\d.]+)\/[\d.]+\/[\d.]+/', $output, $timeMatches);
        $avgTime = isset($timeMatches[1]) ? round((float)$timeMatches[1], 2) : null;

        // Determinar estado basado en paquetes recibidos
        $success = $received === 3; // 100% de éxito (3 de 3 paquetes)
        
        if ($success) {
            $status = 'online';
            $statusText = 'En línea';
        } elseif ($received > 0) {
            $status = 'error';
            $statusText = 'Pérdida de paquetes';
        } else {
            $status = 'offline';
            $statusText = 'Desconectado';
        }

        return [
            'success' => $success,
            'packets_received' => $received,
            'packet_loss' => $packetLoss,
            'avg_time' => $avgTime,
            'status' => $status,
            'status_text' => $statusText
        ];
    }

    /**
     * Actualiza el estado del AP en la base de datos
     */
    private function updateApStatus(Ap $ap, array $result, int $responseTime): void
    {
        $ap->update([
            'status' => $result['status'],
            'status_text' => $result['status_text'],
            'ping_response_time' => $result['avg_time'],
            'last_ping' => now(),
            'packet_loss' => $result['packet_loss'],
            'packets_received' => $result['packets_received'],
        ]);
    }
}
