import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Wifi, Network, Shield, MapPin } from 'lucide-react';

interface RecentActivityProps {
    activities: Array<{
        type: string;
        title: string;
        description: string;
        time: string;
        icon: string;
    }>;
}

const iconMap = {
    wifi: Wifi,
    network: Network,
    shield: Shield,
    map: MapPin,
};

export function RecentActivity({ activities }: RecentActivityProps) {
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

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'ap_created':
                return 'bg-blue-100 text-blue-800';
            case 'vlan_created':
                return 'bg-green-100 text-green-800';
            case 'portal_created':
                return 'bg-purple-100 text-purple-800';
            case 'zona_created':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Actividad Reciente
                </CardTitle>
                <CardDescription>Últimos cambios en la infraestructura</CardDescription>
            </CardHeader>
            <CardContent>
                {activities.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No hay actividad reciente</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activities.map((activity, index) => {
                            const IconComponent = iconMap[activity.icon as keyof typeof iconMap] || Clock;
                            
                            return (
                                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                                        <IconComponent className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{activity.title}</div>
                                        <div className="text-sm text-muted-foreground truncate">
                                            {activity.description}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {getTimeAgo(activity.time)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        
                        {activities.length >= 10 && (
                            <div className="text-center pt-2">
                                <span className="text-sm text-muted-foreground">
                                    Mostrando los últimos 10 eventos
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
