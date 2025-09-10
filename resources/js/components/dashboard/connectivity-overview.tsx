import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Activity, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface ConnectivityOverviewProps {
    stats: {
        total_aps: number;
        active_aps: number;
        online_aps: number;
        offline_aps: number;
        connectivity_rate: number;
    };
    onRefresh?: () => void;
}

export function ConnectivityOverview({ stats, onRefresh }: ConnectivityOverviewProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        if (isRefreshing || !onRefresh) return;
        
        setIsRefreshing(true);
        try {
            await onRefresh();
        } catch (error) {
            console.error('Error al refrescar conectividad:', error);
        } finally {
            // Simular un pequeño delay para mejor UX
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };
    const getStatusColor = (rate: number) => {
        if (rate >= 90) return "text-green-600";
        if (rate >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    const getStatusBadge = (rate: number) => {
        if (rate >= 90) return { variant: "default" as const, text: "Excelente", color: "bg-green-100 text-green-800" };
        if (rate >= 70) return { variant: "secondary" as const, text: "Bueno", color: "bg-yellow-100 text-yellow-800" };
        return { variant: "destructive" as const, text: "Crítico", color: "bg-red-100 text-red-800" };
    };

    const statusBadge = getStatusBadge(stats.connectivity_rate);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Estado de Conectividad</CardTitle>
                        <CardDescription>Monitoreo en tiempo real de Access Points</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={statusBadge.color}>
                            {statusBadge.text}
                        </Badge>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={isRefreshing || !onRefresh}
                            className="h-8 w-8 p-0"
                            title="Actualizar estado de conectividad"
                        >
                            <RotateCcw 
                                className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                            />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Progreso general */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Tasa de conectividad</span>
                        <span className={getStatusColor(stats.connectivity_rate)}>
                            {stats.connectivity_rate}%
                        </span>
                    </div>
                    <Progress 
                        value={stats.connectivity_rate} 
                        className="h-2"
                    />
                </div>

                {/* Estadísticas detalladas */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Wifi className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{stats.online_aps}</div>
                        <div className="text-xs text-muted-foreground">En línea</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <WifiOff className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold text-red-600">{stats.offline_aps}</div>
                        <div className="text-xs text-muted-foreground">Desconectados</div>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Activity className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{stats.total_aps}</div>
                        <div className="text-xs text-muted-foreground">Total APs</div>
                    </div>
                </div>

                {/* Indicador visual */}
                <div className="flex items-center justify-center pt-2">
                    <div className="flex space-x-1">
                        {Array.from({ length: 10 }, (_, i) => {
                            const threshold = (i + 1) * 10;
                            const isActive = stats.connectivity_rate >= threshold;
                            return (
                                <div
                                    key={i}
                                    className={`h-2 w-3 rounded-sm ${
                                        isActive 
                                            ? threshold <= 70 ? 'bg-red-500' : threshold <= 90 ? 'bg-yellow-500' : 'bg-green-500'
                                            : 'bg-gray-200'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
