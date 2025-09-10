import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Smartphone, Hash, MessageSquare, CheckCircle } from 'lucide-react';

interface PortalStatsProps {
    portals: Array<{
        auth_method: string;
        count: number;
    }>;
}

const authMethodConfig = {
    'terms_only': {
        label: 'Solo Términos',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800',
        description: 'Acceso libre'
    },
    'user_password': {
        label: 'Usuario/Contraseña',
        icon: Users,
        color: 'bg-blue-100 text-blue-800',
        description: 'Autenticación básica'
    },
    'voucher': {
        label: 'Voucher',
        icon: Hash,
        color: 'bg-purple-100 text-purple-800',
        description: 'Códigos temporales'
    },
    'social': {
        label: 'Redes Sociales',
        icon: Smartphone,
        color: 'bg-orange-100 text-orange-800',
        description: 'Login social'
    },
    'sms': {
        label: 'SMS',
        icon: MessageSquare,
        color: 'bg-cyan-100 text-cyan-800',
        description: 'Verificación por SMS'
    }
};

export function PortalStats({ portals }: PortalStatsProps) {
    const totalPortals = portals.reduce((sum, portal) => sum + portal.count, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Portales Cautivos
                </CardTitle>
                <CardDescription>Distribución por método de autenticación</CardDescription>
            </CardHeader>
            <CardContent>
                {portals.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No hay portales cautivos configurados</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {portals.map((portal) => {
                            const config = authMethodConfig[portal.auth_method as keyof typeof authMethodConfig];
                            const IconComponent = config?.icon || Shield;
                            const percentage = totalPortals > 0 ? ((portal.count / totalPortals) * 100).toFixed(1) : 0;

                            return (
                                <div key={portal.auth_method} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-full ${config?.color || 'bg-gray-100 text-gray-800'}`}>
                                            <IconComponent className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {config?.label || portal.auth_method}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {config?.description || 'Método personalizado'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">{portal.count}</div>
                                        <Badge variant="outline" className="text-xs">
                                            {percentage}%
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                        
                        <div className="pt-3 border-t">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Total de portales:</span>
                                <span>{totalPortals}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
