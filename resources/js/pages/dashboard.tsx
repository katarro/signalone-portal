import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ConnectivityOverview } from '@/components/dashboard/connectivity-overview';
import { ZonaStats } from '@/components/dashboard/zona-stats';
import { PortalStats } from '@/components/dashboard/portal-stats';
import { ProblematicAps } from '@/components/dashboard/problematic-aps';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { NetworkPerformance } from '@/components/dashboard/network-performance';
import { 
    Network, 
    Wifi, 
    MapPin, 
    Shield, 
    Activity,
    Users
} from 'lucide-react';

interface DashboardProps {
    stats: {
        total_aps: number;
        active_aps: number;
        online_aps: number;
        total_vlans: number;
        active_vlans: number;
        total_zonas: number;
        active_zonas: number;
        total_portals: number;
        active_portals: number;
    };
    connectivity: {
        total_aps: number;
        active_aps: number;
        online_aps: number;
        offline_aps: number;
        connectivity_rate: number;
    };
    zona_stats: Array<{
        id: number;
        name: string;
        location?: string;
        aps_count: number;
        vlans_count: number;
    }>;
    portal_stats: Array<{
        auth_method: string;
        count: number;
    }>;
    vlan_usage: Array<{
        id: number;
        name: string;
        aps_count: number;
        zona?: {
            id: number;
            name: string;
        };
    }>;
    problematic_aps: Array<{
        id: number;
        name: string;
        ip_address: string;
        last_ping?: string;
        ping_response_time?: number;
        vlan?: {
            id: number;
            name: string;
        };
        zona?: {
            id: number;
            name: string;
        };
    }>;
    recent_activity: Array<{
        type: string;
        title: string;
        description: string;
        time: string;
        icon: string;
    }>;
    network_performance: {
        avg_response_time: number;
        total_bandwidth_allocated: number;
        peak_hours: Array<{
            hour: string;
            usage: number;
        }>;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    stats,
    connectivity,
    zona_stats,
    portal_stats,
    vlan_usage,
    problematic_aps,
    recent_activity,
    network_performance
}: DashboardProps) {
    const [connectivityData, setConnectivityData] = useState(connectivity);
    
    const handleConnectivityRefresh = () => {
        router.get(dashboard(), {}, {
            only: ['connectivity'],
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                setConnectivityData(page.props.connectivity as any);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Access Points"
                        value={stats.total_aps}
                        description={`${stats.active_aps} activos`}
                        icon={Wifi}
                        iconColor="text-blue-600"
                    />
                    <StatCard
                        title="VLANs"
                        value={stats.total_vlans}
                        description={`${stats.active_vlans} activas`}
                        icon={Network}
                        iconColor="text-green-600"
                    />
                    <StatCard
                        title="Zonas"
                        value={stats.total_zonas}
                        description={`${stats.active_zonas} activas`}
                        icon={MapPin}
                        iconColor="text-purple-600"
                    />
                    <StatCard
                        title="Portales Cautivos"
                        value={stats.total_portals}
                        description={`${stats.active_portals} activos`}
                        icon={Shield}
                        iconColor="text-orange-600"
                    />
                </div>

                {/* Fila principal con conectividad y métricas */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ConnectivityOverview 
                        stats={connectivityData} 
                        onRefresh={handleConnectivityRefresh}
                    />
                    <NetworkPerformance performance={network_performance} />
                </div>

                {/* Segunda fila con estadísticas de zonas y portales */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ZonaStats zonas={zona_stats} />
                    <PortalStats portals={portal_stats} />
                </div>

                {/* Tercera fila con problemas y actividad */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ProblematicAps aps={problematic_aps} />
                    <RecentActivity activities={recent_activity} />
                </div>

                {/* Información adicional si es necesaria */}
                {vlan_usage.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            VLANs más utilizadas
                        </h3>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {vlan_usage.slice(0, 6).map((vlan) => (
                                <div key={vlan.id} className="bg-background p-3 rounded-lg border">
                                    <div className="font-medium">{vlan.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {vlan.aps_count} APs • Zona: {vlan.zona?.name || 'Sin zona asignada'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
