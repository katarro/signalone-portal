import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { Wifi, Shield, Clock, Users } from 'lucide-react';

interface CaptivePortal {
    id: number;
    name: string;
    description: string | null;
    auth_method: string;
    login_page_title: string;
    welcome_message: string | null;
    require_terms: boolean;
    terms_content: string | null;
    session_timeout: number;
    idle_timeout: number;
}

interface ClientInfo {
    mac_address: string;
    ip_address: string;
    device_name: string;
}

interface AuthPageProps {
    portal: CaptivePortal;
    clientInfo: ClientInfo;
    errors?: Record<string, string>;
}

export default function CaptivePortalAuth({ portal, clientInfo }: AuthPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        voucher_code: '',
        accept_terms: false,
    });

    // Obtener errores generales desde las props de Inertia
    const authError = (errors as any)?.auth;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/portal/${portal.id}/authenticate`);
    };

    const renderAuthForm = () => {
        switch (portal.auth_method) {
            case 'user_password':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="Ingresa tu usuario"
                                className={errors.username ? 'border-red-500' : ''}
                                required
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Ingresa tu contraseña"
                                className={errors.password ? 'border-red-500' : ''}
                                required
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                    </div>
                );

            case 'voucher':
                return (
                    <div className="space-y-2">
                        <Label htmlFor="voucher_code">Código de Voucher</Label>
                        <Input
                            id="voucher_code"
                            type="text"
                            value={data.voucher_code}
                            onChange={(e) => setData('voucher_code', e.target.value)}
                            placeholder="Ingresa tu código de voucher"
                            className={errors.voucher_code ? 'border-red-500' : ''}
                            required
                        />
                        {errors.voucher_code && (
                            <p className="text-red-500 text-sm">{errors.voucher_code}</p>
                        )}
                    </div>
                );

            case 'terms_only':
            case 'guest':
            default:
                return (
                    <div className="text-center text-muted-foreground">
                        <p>Acceso como invitado</p>
                        <p className="text-sm">Solo necesitas aceptar los términos para continuar</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Head title={portal.login_page_title} />
            
            <div className="w-full max-w-md">
                <Card className="shadow-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Wifi className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                {portal.login_page_title}
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                {portal.welcome_message || 'Bienvenido a nuestro WiFi gratuito'}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Información de conexión */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Tu Conexión
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>Dispositivo: {clientInfo.device_name}</p>
                                <p>IP: {clientInfo.ip_address}</p>
                            </div>
                        </div>

                        {/* Información de sesión */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>Duración: {Math.floor(portal.session_timeout / 60)}h</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>Acceso gratuito</span>
                            </div>
                        </div>

                        {/* Formulario de autenticación */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {renderAuthForm()}

                            {/* Términos y condiciones */}
                            {portal.require_terms && (
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="accept_terms"
                                        checked={data.accept_terms}
                                        onCheckedChange={(checked) => setData('accept_terms', checked as boolean)}
                                        className={errors.accept_terms ? 'border-red-500' : ''}
                                    />
                                    <Label htmlFor="accept_terms" className="text-sm leading-5">
                                        Acepto los{' '}
                                        <a href="#" className="text-blue-600 hover:underline">
                                            términos y condiciones
                                        </a>{' '}
                                        de uso del servicio WiFi
                                    </Label>
                                </div>
                            )}

                            {errors.accept_terms && (
                                <p className="text-red-500 text-sm">{errors.accept_terms}</p>
                            )}
                            
                            {authError && (
                                <p className="text-red-500 text-sm text-center">{authError}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing || (portal.require_terms && !data.accept_terms)}
                            >
                                {processing ? 'Conectando...' : 'Conectar al WiFi'}
                            </Button>
                        </form>

                        {/* Información adicional */}
                        <div className="text-xs text-gray-500 text-center">
                            <p>Al conectarte, aceptas el uso responsable de la red.</p>
                            <p>Portal: {portal.name}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
