import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Wifi, Settings, Palette, Shield, Clock } from 'lucide-react';

interface CreateCaptivePortalForm {
    name: string;
    description: string;
    auth_method: 'user_password' | 'voucher' | 'social' | 'sms' | 'terms_only';
    login_page_title: string;
    welcome_message: string;
    redirect_url: string;
    auto_redirect: boolean;
    require_terms: boolean;
    terms_content: string;
    terms_url: string;
    session_timeout: number;
    idle_timeout: number;
    bandwidth_limit_down: number | null;
    bandwidth_limit_up: number | null;
    social_auth_config: Record<string, any> | null;
    sms_provider: string;
    sms_config: Record<string, any> | null;
    logo_url: string;
    background_color: string;
    primary_color: string;
    custom_css: string;
    enable_logging: boolean;
    log_failed_attempts: boolean;
    is_active: boolean;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<CreateCaptivePortalForm>({
        name: '',
        description: '',
        auth_method: 'terms_only',
        login_page_title: 'Acceso WiFi',
        welcome_message: '',
        redirect_url: '',
        auto_redirect: true,
        require_terms: true,
        terms_content: '',
        terms_url: '',
        session_timeout: 480,
        idle_timeout: 30,
        bandwidth_limit_down: null,
        bandwidth_limit_up: null,
        social_auth_config: null,
        sms_provider: '',
        sms_config: null,
        logo_url: '',
        background_color: '#ffffff',
        primary_color: '#007bff',
        custom_css: '',
        enable_logging: true,
        log_failed_attempts: true,
        is_active: true,
    });

    const [activeTab, setActiveTab] = useState('general');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/captive-portals');
    };

    const authMethodOptions = [
        { value: 'terms_only', label: 'Solo términos y condiciones' },
        { value: 'user_password', label: 'Usuario y contraseña' },
        { value: 'voucher', label: 'Voucher/Código' },
        { value: 'social', label: 'Redes sociales' },
        { value: 'sms', label: 'SMS' },
    ];

    return (
        <AppLayout>
            <Head title="Crear Portal Cautivo" />
            
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Crear Portal Cautivo</h1>
                        <p className="text-muted-foreground">
                            Configura un nuevo portal cautivo para controlar el acceso a la red
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="general" className="flex items-center gap-2">
                                <Wifi className="h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="authentication" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Autenticación
                            </TabsTrigger>
                            <TabsTrigger value="session" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Sesión
                            </TabsTrigger>
                            <TabsTrigger value="appearance" className="flex items-center gap-2">
                                <Palette className="h-4 w-4" />
                                Apariencia
                            </TabsTrigger>
                            <TabsTrigger value="advanced" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Avanzado
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información General</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre del Portal *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ej. Portal WiFi Corporativo"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Descripción del portal cautivo"
                                            rows={3}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Portal activo</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="authentication" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración de Autenticación</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="auth_method">Método de Autenticación *</Label>
                                        <Select
                                            value={data.auth_method}
                                            onValueChange={(value) => setData('auth_method', value)}
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
                                            <div className="space-y-4 pl-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="terms_content">Contenido de Términos</Label>
                                                    <Textarea
                                                        id="terms_content"
                                                        value={data.terms_content}
                                                        onChange={(e) => setData('terms_content', e.target.value)}
                                                        placeholder="Contenido de términos y condiciones"
                                                        rows={5}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="terms_url">URL Externa de Términos</Label>
                                                    <Input
                                                        id="terms_url"
                                                        value={data.terms_url}
                                                        onChange={(e) => setData('terms_url', e.target.value)}
                                                        placeholder="https://ejemplo.com/terminos"
                                                    />
                                                    <p className="text-xs text-muted-foreground">
                                                        Si se proporciona, se usará en lugar del contenido de términos
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="session" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración de Sesión</CardTitle>
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
                                                onChange={(e) => setData('session_timeout', parseInt(e.target.value))}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Máximo 24 horas (1440 minutos)
                                            </p>
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
                                                onChange={(e) => setData('idle_timeout', parseInt(e.target.value))}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Máximo 2 horas (120 minutos)
                                            </p>
                                            {errors.idle_timeout && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.idle_timeout}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="redirect_url">URL de Redirección</Label>
                                        <Input
                                            id="redirect_url"
                                            value={data.redirect_url}
                                            onChange={(e) => setData('redirect_url', e.target.value)}
                                            placeholder="https://ejemplo.com"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            URL a la que se redirigirá al usuario después del login
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
                                        <Label htmlFor="auto_redirect">Redirección automática</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Límites de Ancho de Banda</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bandwidth_limit_down">Límite de Descarga (Kbps)</Label>
                                            <Input
                                                id="bandwidth_limit_down"
                                                type="number"
                                                min="1"
                                                value={data.bandwidth_limit_down || ''}
                                                onChange={(e) => setData('bandwidth_limit_down', 
                                                    e.target.value ? parseInt(e.target.value) : null)}
                                                placeholder="Ej. 10240"
                                            />
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
                                                min="1"
                                                value={data.bandwidth_limit_up || ''}
                                                onChange={(e) => setData('bandwidth_limit_up', 
                                                    e.target.value ? parseInt(e.target.value) : null)}
                                                placeholder="Ej. 2048"
                                            />
                                            {errors.bandwidth_limit_up && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.bandwidth_limit_up}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Dejar en blanco para no aplicar límites
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="appearance" className="space-y-6">
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
                                        {errors.logo_url && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.logo_url}
                                            </p>
                                        )}
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
                                                    className="w-12 h-10 border rounded"
                                                />
                                            </div>
                                            {errors.background_color && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.background_color}
                                                </p>
                                            )}
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
                                                    className="w-12 h-10 border rounded"
                                                />
                                            </div>
                                            {errors.primary_color && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.primary_color}
                                                </p>
                                            )}
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
                                        {errors.custom_css && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.custom_css}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración Avanzada</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="enable_logging"
                                                checked={data.enable_logging}
                                                onCheckedChange={(checked: boolean) => setData('enable_logging', checked)}
                                            />
                                            <Label htmlFor="enable_logging">Habilitar logs de conexión</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="log_failed_attempts"
                                                checked={data.log_failed_attempts}
                                                onCheckedChange={(checked: boolean) => setData('log_failed_attempts', checked)}
                                            />
                                            <Label htmlFor="log_failed_attempts">Registrar intentos fallidos</Label>
                                        </div>
                                    </div>

                                    {data.auth_method === 'sms' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="sms_provider">Proveedor de SMS</Label>
                                            <Input
                                                id="sms_provider"
                                                value={data.sms_provider}
                                                onChange={(e) => setData('sms_provider', e.target.value)}
                                                placeholder="twilio, nexmo, etc."
                                            />
                                            {errors.sms_provider && (
                                                <p className="text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    {errors.sms_provider}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end gap-4 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creando...' : 'Crear Portal Cautivo'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
