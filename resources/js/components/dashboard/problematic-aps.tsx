import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Wifi, WifiOff, Clock } from 'lucide-react';

interface ProblematicApsProps {
    aps: Array<{
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
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'hace un momento';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays}d`;
}

interface ProblematicApsProps {
    aps: Array<{
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
}

export function ProblematicAps({ aps }: ProblematicApsProps) {
    const getStatusInfo = (ap: any) => {
        if (!ap.last_ping) {
            return {
                status: 'Sin ping',
                color: 'bg-gray-100 text-gray-800',
                icon: WifiOff,
                severity: 'high'
            };
        }

        const lastPingDate = new Date(ap.last_ping);
        const minutesAgo = (Date.now() - lastPingDate.getTime()) / (1000 * 60);

        if (minutesAgo > 10) {
            return {
                status: 'Desconectado',
                color: 'bg-red-100 text-red-800',
                icon: WifiOff,
                severity: 'high'
            };
        }

        if (ap.ping_response_time > 1000) {
            return {
                status: 'Lento',
                color: 'bg-yellow-100 text-yellow-800',
                icon: Wifi,
                severity: 'medium'
            };
        }

        return {
            status: 'Problema',
            color: 'bg-orange-100 text-orange-800',
            icon: AlertTriangle,
            severity: 'medium'
        };
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    APs con Problemas
                </CardTitle>
                <CardDescription>Access Points que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
                {aps.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <Wifi className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>¡Excelente! No hay APs con problemas</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {aps.map((ap) => {
                            const statusInfo = getStatusInfo(ap);
                            const IconComponent = statusInfo.icon;

                            return (
                                <div key={ap.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-full ${statusInfo.color}`}>
                                            <IconComponent className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{ap.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                IP: {ap.ip_address}
                                            </div>
                                            {ap.zona && (
                                                <div className="text-sm text-muted-foreground">
                                                    Zona: {ap.zona.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <Badge className={statusInfo.color}>
                                            {statusInfo.status}
                                        </Badge>
                                        {ap.last_ping && (
                                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {getTimeAgo(ap.last_ping)}
                                            </div>
                                        )}
                                        {ap.ping_response_time && (
                                            <div className="text-xs text-muted-foreground">
                                                Ping: {ap.ping_response_time}ms
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        
                        {aps.length >= 5 && (
                            <div className="text-center pt-2">
                                <span className="text-sm text-muted-foreground">
                                    Mostrando los 5 APs con mayor prioridad
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
