import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AlertCircle } from 'lucide-react';

interface AuthenticationTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function AuthenticationTab({ data, setData, errors }: AuthenticationTabProps) {
    const authMethodOptions = [
        { value: 'terms_only', label: 'Solo términos y condiciones' },
        { value: 'user_password', label: 'Usuario y contraseña' },
        { value: 'voucher', label: 'Voucher/Código' },
        { value: 'social', label: 'Redes sociales' },
        { value: 'sms', label: 'SMS' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Configuración de Autenticación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="auth_method">Método de Autenticación *</Label>
                    <Select
                        value={data.auth_method}
                        onValueChange={(value) => setData('auth_method', value as any)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un método" />
                        </SelectTrigger>
                        <SelectContent>
                            {authMethodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.auth_method && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.auth_method}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="login_page_title">Título de la Página *</Label>
                    <Input
                        id="login_page_title"
                        value={data.login_page_title}
                        onChange={(e) => setData('login_page_title', e.target.value)}
                        placeholder="Acceso WiFi"
                    />
                    {errors.login_page_title && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.login_page_title}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="welcome_message">Mensaje de Bienvenida</Label>
                    <Textarea
                        id="welcome_message"
                        value={data.welcome_message}
                        onChange={(e) => setData('welcome_message', e.target.value)}
                        placeholder="Bienvenido a nuestra red WiFi"
                        rows={3}
                    />
                    {errors.welcome_message && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.welcome_message}
                        </p>
                    )}
                </div>

                {/* Configuración específica por método de autenticación */}
                {data.auth_method === 'social' && (
                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Configuración de Redes Sociales</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-sm text-muted-foreground mb-3">
                                Configura los proveedores de autenticación social que deseas habilitar:
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="facebook_enabled"
                                        checked={(data.social_auth_config as any)?.facebook?.enabled || false}
                                        onChange={(e) => {
                                            const config = data.social_auth_config || {};
                                            setData('social_auth_config', {
                                                ...config,
                                                facebook: { enabled: e.target.checked }
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="facebook_enabled">Facebook Login</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="google_enabled"
                                        checked={(data.social_auth_config as any)?.google?.enabled || false}
                                        onChange={(e) => {
                                            const config = data.social_auth_config || {};
                                            setData('social_auth_config', {
                                                ...config,
                                                google: { enabled: e.target.checked }
                                            });
                                        }}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="google_enabled">Google Login</Label>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Nota: Las claves API deben configurarse en el servidor para que funcionen correctamente.
                            </div>
                        </CardContent>
                    </Card>
                )}

                {data.auth_method === 'sms' && (
                    <Card className="bg-green-50 border-green-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Configuración de SMS</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Label htmlFor="sms_provider_select">Proveedor de SMS</Label>
                                <Select
                                    value={data.sms_provider}
                                    onValueChange={(value) => setData('sms_provider', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un proveedor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="twilio">Twilio</SelectItem>
                                        <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                                        <SelectItem value="aws_sns">AWS SNS</SelectItem>
                                        <SelectItem value="custom">Personalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                La configuración del proveedor (API keys, tokens) debe realizarse en el servidor.
                            </div>
                        </CardContent>
                    </Card>
                )}

                {data.auth_method === 'voucher' && (
                    <Card className="bg-purple-50 border-purple-200">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">Configuración de Vouchers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                                Los vouchers/códigos se pueden generar y gestionar después de crear el portal.
                                Características disponibles:
                            </div>
                            <ul className="text-sm space-y-1 ml-4">
                                <li>• Códigos de un solo uso o reutilizables</li>
                                <li>• Tiempo de validez configurable</li>
                                <li>• Límites de ancho de banda por voucher</li>
                                <li>• Generación masiva de códigos</li>
                            </ul>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="require_terms"
                            checked={data.require_terms}
                            onCheckedChange={(checked: boolean) => setData('require_terms', checked)}
                        />
                        <Label htmlFor="require_terms">Requiere aceptar términos y condiciones</Label>
                    </div>

                    {data.require_terms && (
                        <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                            <div className="space-y-2">
                                <Label htmlFor="terms_content">Contenido de Términos</Label>
                                <Textarea
                                    id="terms_content"
                                    value={data.terms_content}
                                    onChange={(e) => setData('terms_content', e.target.value)}
                                    placeholder="Al usar esta red WiFi, acepta nuestros términos y condiciones..."
                                    rows={5}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="terms_url">URL Externa de Términos (Opcional)</Label>
                                <Input
                                    id="terms_url"
                                    value={data.terms_url}
                                    onChange={(e) => setData('terms_url', e.target.value)}
                                    placeholder="https://ejemplo.com/terminos"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Si se proporciona, se usará en lugar del contenido de términos interno
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
