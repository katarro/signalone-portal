<?php

namespace App\Http\Controllers;

use App\Models\Ap;
use App\Models\Vlan;
use App\Models\Zona;
use App\Models\CaptivePortal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Estadísticas generales
        $totalAps = Ap::count();
        $activeAps = Ap::where('is_active', true)->count();
        $onlineAps = Ap::where('is_active', true)
            ->whereNotNull('last_ping')
            ->where('last_ping', '>=', Carbon::now()->subMinutes(5))
            ->count();

        $totalVlans = Vlan::count();
        $activeVlans = Vlan::where('is_active', true)->count();
        
        $totalZonas = Zona::count();
        $activeZonas = Zona::where('is_active', true)->count();
        
        $totalPortals = CaptivePortal::count();
        $activePortals = CaptivePortal::where('is_active', true)->count();

        // Métricas de conectividad
        $connectivityStats = [
            'total_aps' => $totalAps,
            'active_aps' => $activeAps,
            'online_aps' => $onlineAps,
            'offline_aps' => $activeAps - $onlineAps,
            'connectivity_rate' => $activeAps > 0 ? round(($onlineAps / $activeAps) * 100, 1) : 0,
        ];

        // Distribución por zonas
        $zonaStats = Zona::withCount(['aps', 'vlans'])
            ->where('is_active', true)
            ->orderBy('aps_count', 'desc')
            ->take(5)
            ->get();

        // Estado de los portales cautivos
        $portalStats = CaptivePortal::select('auth_method')
            ->selectRaw('count(*) as count')
            ->where('is_active', true)
            ->groupBy('auth_method')
            ->get();

        // VLANs más utilizadas
        $vlanUsage = Vlan::withCount('aps')
            ->with('zona:id,name')
            ->where('is_active', true)
            ->orderBy('aps_count', 'desc')
            ->take(5)
            ->get();

        // APs con problemas de conectividad
        $problematicAps = Ap::with(['vlan:id,name', 'zona:id,name'])
            ->where('is_active', true)
            ->where(function($query) {
                $query->whereNull('last_ping')
                    ->orWhere('last_ping', '<', Carbon::now()->subMinutes(10))
                    ->orWhere('ping_response_time', '>', 1000);
            })
            ->orderBy('last_ping', 'asc')
            ->take(5)
            ->get();

        // Actividad reciente
        $recentActivity = collect();
        
        // APs creados recientemente
        $recentAps = Ap::with(['zona:id,name'])
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function($ap) {
                return [
                    'type' => 'ap_created',
                    'title' => "AP {$ap->name} creado",
                    'description' => "Zona: " . ($ap->zona ? $ap->zona->name : 'Sin zona asignada'),
                    'time' => $ap->created_at,
                    'icon' => 'wifi'
                ];
            });

        $recentActivity = $recentActivity->merge($recentAps);

        // VLANs creadas recientemente
        $recentVlans = Vlan::with(['zona:id,name'])
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function($vlan) {
                return [
                    'type' => 'vlan_created',
                    'title' => "VLAN {$vlan->name} creada",
                    'description' => "ID: {$vlan->vlan_id} - Zona: " . ($vlan->zona ? $vlan->zona->name : 'Sin zona asignada'),
                    'time' => $vlan->created_at,
                    'icon' => 'network'
                ];
            });

        $recentActivity = $recentActivity->merge($recentVlans);

        // Portales creados recientemente
        $recentPortals = CaptivePortal::where('created_at', '>=', Carbon::now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function($portal) {
                return [
                    'type' => 'portal_created',
                    'title' => "Portal {$portal->name} creado",
                    'description' => "Método: {$portal->auth_method}",
                    'time' => $portal->created_at,
                    'icon' => 'shield'
                ];
            });

        $recentActivity = $recentActivity->merge($recentPortals);

        // Ordenar actividad por fecha
        $recentActivity = $recentActivity->sortByDesc('time')->take(10)->values();

        // Rendimiento promedio de la red
        $avgResponseTime = Ap::where('is_active', true)
            ->whereNotNull('ping_response_time')
            ->avg('ping_response_time');

        $networkPerformance = [
            'avg_response_time' => $avgResponseTime ? round($avgResponseTime, 2) : 0,
            'total_bandwidth_allocated' => 0, // Se puede calcular sumando los límites de los portales
            'peak_hours' => [
                ['hour' => '09:00', 'usage' => 85],
                ['hour' => '12:00', 'usage' => 95],
                ['hour' => '15:00', 'usage' => 78],
                ['hour' => '18:00', 'usage' => 92],
            ]
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'total_aps' => $totalAps,
                'active_aps' => $activeAps,
                'online_aps' => $onlineAps,
                'total_vlans' => $totalVlans,
                'active_vlans' => $activeVlans,
                'total_zonas' => $totalZonas,
                'active_zonas' => $activeZonas,
                'total_portals' => $totalPortals,
                'active_portals' => $activePortals,
            ],
            'connectivity' => $connectivityStats,
            'zona_stats' => $zonaStats ?? collect(),
            'portal_stats' => $portalStats ?? collect(),
            'vlan_usage' => $vlanUsage ?? collect(),
            'problematic_aps' => $problematicAps ?? collect(),
            'recent_activity' => $recentActivity ?? collect(),
            'network_performance' => $networkPerformance,
        ]);
    }
}
