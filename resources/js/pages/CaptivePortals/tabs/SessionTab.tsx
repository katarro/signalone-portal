import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface SessionTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function SessionTab({ data, setData, errors }: SessionTabProps) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Configuración de Sesión y Timeouts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="session_timeout">Tiempo de Sesión (minutos) *</Label>
                            <Input
                                id="session_timeout"
                                type="number"
                                min="1"
                                max="1440"
                                value={data.session_timeout}
                                onChange={(e) => setData('session_timeout', parseInt(e.target.value) || 480)}
                            />
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>Máximo 24 horas (1440 minutos)</p>
                                <p>Actual: {Math.floor(data.session_timeout / 60)}h {data.session_timeout % 60}min</p>
                            </div>
                            {errors.session_timeout && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.session_timeout}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="idle_timeout">Tiempo de Inactividad (minutos) *</Label>
                            <Input
                                id="idle_timeout"
                                type="number"
                                min="1"
                                max="120"
                                value={data.idle_timeout}
                                onChange={(e) => setData('idle_timeout', parseInt(e.target.value) || 30)}
                            />
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>Máximo 2 horas (120 minutos)</p>
                                <p>Desconexión automática tras inactividad</p>
                            </div>
                            {errors.idle_timeout && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.idle_timeout}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="redirect_url">URL de Redirección Post-Login</Label>
                        <Input
                            id="redirect_url"
                            value={data.redirect_url}
                            onChange={(e) => setData('redirect_url', e.target.value)}
                            placeholder="https://ejemplo.com/bienvenida"
                        />
                        <p className="text-xs text-muted-foreground">
                            URL a la que se redirigirá al usuario después del login exitoso (opcional)
                        </p>
                        {errors.redirect_url && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                {errors.redirect_url}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="auto_redirect"
                            checked={data.auto_redirect}
                            onCheckedChange={(checked: boolean) => setData('auto_redirect', checked)}
                        />
                        <Label htmlFor="auto_redirect">Redirección automática después del login</Label>
                    </div>
                    {!data.auto_redirect && (
                        <div className="text-xs text-muted-foreground ml-6">
                            El usuario permanecerá en la página de confirmación de acceso
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Control de Ancho de Banda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bandwidth_limit_down">Límite de Descarga (Kbps)</Label>
                            <Input
                                id="bandwidth_limit_down"
                                type="number"
                                min="64"
                                step="64"
                                value={data.bandwidth_limit_down || ''}
                                onChange={(e) => setData('bandwidth_limit_down', 
                                    e.target.value ? parseInt(e.target.value) : 0)}
                                placeholder="Ej. 10240 (10 Mbps)"
                            />
                            <div className="text-xs text-muted-foreground">
                                {data.bandwidth_limit_down ? 
                                    `≈ ${(data.bandwidth_limit_down / 1024).toFixed(1)} Mbps` : 
                                    'Sin límite'}
                            </div>
                            {errors.bandwidth_limit_down && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.bandwidth_limit_down}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bandwidth_limit_up">Límite de Subida (Kbps)</Label>
                            <Input
                                id="bandwidth_limit_up"
                                type="number"
                                min="64"
                                step="64"
                                value={data.bandwidth_limit_up || ''}
                                onChange={(e) => setData('bandwidth_limit_up', 
                                    e.target.value ? parseInt(e.target.value) : 0)}
                                placeholder="Ej. 2048 (2 Mbps)"
                            />
                            <div className="text-xs text-muted-foreground">
                                {data.bandwidth_limit_up ? 
                                    `≈ ${(data.bandwidth_limit_up / 1024).toFixed(1)} Mbps` : 
                                    'Sin límite'}
                            </div>
                            {errors.bandwidth_limit_up && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.bandwidth_limit_up}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="text-sm font-medium text-blue-800 mb-1">Presets Comunes:</div>
                        <div className="flex flex-wrap gap-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    setData('bandwidth_limit_down', 2048);
                                    setData('bandwidth_limit_up', 512);
                                }}
                            >
                                Básico (2/0.5 Mbps)
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    setData('bandwidth_limit_down', 10240);
                                    setData('bandwidth_limit_up', 2048);
                                }}
                            >
                                Estándar (10/2 Mbps)
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    setData('bandwidth_limit_down', 51200);
                                    setData('bandwidth_limit_up', 10240);
                                }}
                            >
                                Premium (50/10 Mbps)
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    setData('bandwidth_limit_down', 0);
                                    setData('bandwidth_limit_up', 0);
                                }}
                            >
                                Sin límite
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
