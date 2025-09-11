import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Wifi, Clock, Activity, LogOut } from 'lucide-react';
import { useForm } from '@inertiajs/react';

interface CaptivePortal {
    id: number;
    name: string;
    description: string | null;
    redirect_url: string | null;
    session_timeout: number;
    idle_timeout: number;
}

interface ClientSession {
    session_id: string;
    login_time: string;
    auth_method: string;
    ip_address: string;
    device_name: string;
}

interface WelcomePageProps {
    portal: CaptivePortal;
    session: ClientSession;
}

export default function CaptivePortalWelcome({ portal, session }: WelcomePageProps) {
    const { post, processing } = useForm();

    const handleLogout = () => {
        post(`/portal/logout/${session.session_id}`);
    };

    const handleContinue = () => {
        if (portal.redirect_url) {
            window.location.href = portal.redirect_url;
        } else {
            window.location.href = 'https://www.google.com';
        }
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
            <Head title="Conectado - WiFi Portal" />
            
            <div className="w-full max-w-md">
                <Card className="shadow-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                ¡Conectado con éxito!
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                Ya tienes acceso a Internet
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Estado de conexión */}
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Wifi className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-green-900">Conexión Activa</p>
                                    <p className="text-sm text-green-700">
                                        Portal: {portal.name}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
                                    Activo
                                </Badge>
                            </div>
                        </div>

                        {/* Información de sesión */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <Clock className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">Duración</p>
                                <p className="text-xs text-gray-600">
                                    {formatDuration(portal.session_timeout)}
                                </p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <Activity className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                                <p className="text-sm font-medium text-gray-900">Inactividad</p>
                                <p className="text-xs text-gray-600">
                                    {formatDuration(portal.idle_timeout)}
                                </p>
                            </div>
                        </div>

                        {/* Información del dispositivo */}
                        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                            <h4 className="font-medium text-blue-900">Tu Dispositivo</h4>
                            <div className="text-sm text-blue-800 space-y-1">
                                <p>Dispositivo: {session.device_name}</p>
                                <p>IP: {session.ip_address}</p>
                                <p>Conectado: {new Date(session.login_time).toLocaleTimeString('es-CL')}</p>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleContinue}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                size="lg"
                            >
                                Continuar Navegando
                            </Button>
                            
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="w-full"
                                disabled={processing}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                {processing ? 'Desconectando...' : 'Cerrar Sesión'}
                            </Button>
                        </div>

                        {/* Información adicional */}
                        <div className="text-xs text-gray-500 text-center space-y-1">
                            <p>Tu sesión se cerrará automáticamente después de {formatDuration(portal.session_timeout)}</p>
                            <p>O después de {formatDuration(portal.idle_timeout)} de inactividad</p>
                            <p className="pt-2 border-t">
                                ID de Sesión: {session.session_id.slice(-8)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
