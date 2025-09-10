import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AppearanceTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function AppearanceTab({ data, setData, errors }: AppearanceTabProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personalización Visual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="logo_url">URL del Logo</Label>
                            <Input
                                id="logo_url"
                                value={data.logo_url}
                                onChange={(e) => setData('logo_url', e.target.value)}
                                placeholder="https://ejemplo.com/logo.png"
                            />
                            <p className="text-xs text-muted-foreground">
                                Recomendado: PNG transparente, máximo 200x80px
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="background_color">Color de Fondo *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="background_color"
                                        value={data.background_color}
                                        onChange={(e) => setData('background_color', e.target.value)}
                                        placeholder="#ffffff"
                                    />
                                    <input
                                        type="color"
                                        value={data.background_color}
                                        onChange={(e) => setData('background_color', e.target.value)}
                                        className="w-12 h-10 border rounded cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="primary_color">Color Primario *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="primary_color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        placeholder="#007bff"
                                    />
                                    <input
                                        type="color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        className="w-12 h-10 border rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom_css">CSS Personalizado</Label>
                            <Textarea
                                id="custom_css"
                                value={data.custom_css}
                                onChange={(e) => setData('custom_css', e.target.value)}
                                placeholder="/* CSS personalizado */"
                                rows={8}
                                className="font-mono"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa del Portal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div 
                            className="border rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center space-y-4"
                            style={{ 
                                backgroundColor: data.background_color,
                                color: data.background_color === '#ffffff' ? '#1f2937' : '#ffffff'
                            }}
                        >
                            {data.logo_url ? (
                                <img 
                                    src={data.logo_url} 
                                    alt="Logo" 
                                    className="max-h-16 max-w-48 object-contain"
                                />
                            ) : (
                                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                    Su Logo
                                </div>
                            )}

                            <h1 className="text-2xl font-bold text-center">
                                {data.login_page_title || 'Acceso WiFi'}
                            </h1>

                            {data.welcome_message && (
                                <p className="text-center max-w-sm">
                                    {data.welcome_message}
                                </p>
                            )}

                            <div className="w-full max-w-sm space-y-3">
                                {data.auth_method === 'user_password' && (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Usuario" 
                                            className="w-full p-3 border rounded-lg text-gray-800"
                                            disabled 
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Contraseña" 
                                            className="w-full p-3 border rounded-lg text-gray-800"
                                            disabled 
                                        />
                                    </>
                                )}
                                
                                {data.auth_method === 'voucher' && (
                                    <input 
                                        type="text" 
                                        placeholder="Código de acceso" 
                                        className="w-full p-3 border rounded-lg text-center font-mono text-gray-800"
                                        disabled 
                                    />
                                )}

                                {data.require_terms && (
                                    <div className="flex items-start space-x-2 text-sm">
                                        <input type="checkbox" className="mt-1" disabled />
                                        <span>Acepto los términos y condiciones</span>
                                    </div>
                                )}

                                <button 
                                    className="w-full p-3 rounded-lg font-medium text-white transition-colors"
                                    style={{ backgroundColor: data.primary_color }}
                                    disabled
                                >
                                    {data.auth_method === 'terms_only' ? 'Acceder a Internet' : 
                                     data.auth_method === 'social' ? 'Conectar con Redes Sociales' :
                                     data.auth_method === 'sms' ? 'Enviar Código SMS' : 'Iniciar Sesión'}
                                </button>
                            </div>

                            <div className="text-xs opacity-75 text-center">
                                Sesión válida por {Math.floor(data.session_timeout / 60)}h {data.session_timeout % 60}min
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
