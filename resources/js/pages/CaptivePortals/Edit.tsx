import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wifi, Settings, Palette, Shield, Clock, ArrowLeft } from 'lucide-react';
import GeneralTab from './tabs/GeneralTab';
import AuthenticationTab from './tabs/AuthenticationTab';
import SessionTab from './tabs/SessionTab';
import AppearanceTab from './tabs/AppearanceTab';
import AdvancedTab from './tabs/AdvancedTab';

interface Props {
    captivePortal: Record<string, any>;
}

interface FormData {
    name: string;
    description: string;
    auth_method: string;
    login_page_title: string;
    welcome_message: string;
    redirect_url: string;
    auto_redirect: boolean;
    require_terms: boolean;
    terms_content: string;
    terms_url: string;
    session_timeout: number;
    idle_timeout: number;
    bandwidth_limit_down: number;
    bandwidth_limit_up: number;
    social_auth_config: Record<string, any>;
    sms_provider: string;
    sms_config: Record<string, any>;
    logo_url: string;
    background_color: string;
    primary_color: string;
    custom_css: string;
    enable_logging: boolean;
    log_failed_attempts: boolean;
    is_active: boolean;
    listening_port: number;
    max_clients: number;
    force_https: boolean;
    enable_mac_auth: boolean;
    block_social_media: boolean;
    enable_bandwidth_log: boolean;
    enable_device_fingerprint: boolean;
    log_retention_days: number;
    max_login_attempts: number;
    lockout_duration: number;
    firewall_rules: string;
    enable_dos_protection: boolean;
    enable_ssl_enforcement: boolean;
    webhook_url: string;
    radius_server: string;
    radius_secret: string;
    api_integrations: string;
    enable_analytics: boolean;
    enable_push_notifications: boolean;
    enable_api_access: boolean;
}

export default function Edit({ captivePortal }: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        name: captivePortal.name || '',
        description: captivePortal.description || '',
        auth_method: captivePortal.auth_method || 'terms_only',
        login_page_title: captivePortal.login_page_title || 'Acceso WiFi',
        welcome_message: captivePortal.welcome_message || '',
        redirect_url: captivePortal.redirect_url || '',
        auto_redirect: captivePortal.auto_redirect ?? true,
        require_terms: captivePortal.require_terms ?? true,
        terms_content: captivePortal.terms_content || '',
        terms_url: captivePortal.terms_url || '',
        session_timeout: captivePortal.session_timeout || 480,
        idle_timeout: captivePortal.idle_timeout || 30,
        bandwidth_limit_down: captivePortal.bandwidth_limit_down || 0,
        bandwidth_limit_up: captivePortal.bandwidth_limit_up || 0,
        social_auth_config: captivePortal.social_auth_config || {},
        sms_provider: captivePortal.sms_provider || '',
        sms_config: captivePortal.sms_config || {},
        logo_url: captivePortal.logo_url || '',
        background_color: captivePortal.background_color || '#ffffff',
        primary_color: captivePortal.primary_color || '#007bff',
        custom_css: captivePortal.custom_css || '',
        enable_logging: captivePortal.enable_logging ?? true,
        log_failed_attempts: captivePortal.log_failed_attempts ?? true,
        is_active: captivePortal.is_active ?? true,
        listening_port: captivePortal.listening_port || 8080,
        max_clients: captivePortal.max_clients || 0,
        force_https: captivePortal.force_https ?? false,
        enable_mac_auth: captivePortal.enable_mac_auth ?? false,
        block_social_media: captivePortal.block_social_media ?? false,
        enable_bandwidth_log: captivePortal.enable_bandwidth_log ?? false,
        enable_device_fingerprint: captivePortal.enable_device_fingerprint ?? false,
        log_retention_days: captivePortal.log_retention_days || 30,
        max_login_attempts: captivePortal.max_login_attempts || 5,
        lockout_duration: captivePortal.lockout_duration || 30,
        firewall_rules: captivePortal.firewall_rules || '',
        enable_dos_protection: captivePortal.enable_dos_protection ?? false,
        enable_ssl_enforcement: captivePortal.enable_ssl_enforcement ?? false,
        webhook_url: captivePortal.webhook_url || '',
        radius_server: captivePortal.radius_server || '',
        radius_secret: captivePortal.radius_secret || '',
        api_integrations: captivePortal.api_integrations || '',
        enable_analytics: captivePortal.enable_analytics ?? false,
        enable_push_notifications: captivePortal.enable_push_notifications ?? false,
        enable_api_access: captivePortal.enable_api_access ?? false,
    });

    const [activeTab, setActiveTab] = useState('general');

    const handleTabChange = (value: string) => {
        console.log('Changing tab to:', value);
        setActiveTab(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log('=== CAPTIVE PORTAL FORM SUBMISSION ===');
        console.log('Portal ID:', captivePortal.id);
        console.log('Form data being submitted:', data);
        console.log('Processing state:', processing);
        console.log('Current errors:', errors);
        
        // Verificar que todos los campos requeridos estén presentes
        const requiredFields = ['name', 'auth_method', 'login_page_title', 'session_timeout', 'idle_timeout', 'background_color', 'primary_color'];
        const missingFields = requiredFields.filter(field => !(data as any)[field]);
        
        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            alert(`Faltan campos requeridos: ${missingFields.join(', ')}`);
            return;
        }

        // Preparar los datos para envío, convirtiendo 0 a null para campos opcionales de límites
        const submitData = {
            ...data,
            bandwidth_limit_down: data.bandwidth_limit_down === 0 ? null : data.bandwidth_limit_down,
            bandwidth_limit_up: data.bandwidth_limit_up === 0 ? null : data.bandwidth_limit_up,
            max_clients: data.max_clients === 0 ? null : data.max_clients,
        };
        
        console.log('Processed data for submission:', submitData);
        
        router.put(`/captive-portals/${captivePortal.id}`, submitData, {
            onBefore: () => {
                console.log('Request starting...');
                return true;
            },
            onStart: () => {
                console.log('Request started');
            },
            onProgress: (progress) => {
                console.log('Request progress:', progress);
            },
            onSuccess: (page) => {
                console.log('Update successful!');
                console.log('Response page:', page);
                router.visit('/captive-portals');
            },
            onError: (errors) => {
                console.error('Update failed with validation errors:', errors);
                alert('Error de validación. Revisa la consola para más detalles.');
            },
            onFinish: () => {
                console.log('Request finished');
                console.log('=== END SUBMISSION ===');
            }
        });
    };

    return (
        <AppLayout>
            <Head title={`Editar Portal: ${captivePortal.name}`} />
            
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Editar Portal Cautivo
                            </h1>
                            <p className="text-muted-foreground">
                                Modifica la configuración del portal cautivo "{captivePortal.name}"
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="general" className="flex items-center gap-2 cursor-pointer">
                                <Wifi className="h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger value="authentication" className="flex items-center gap-2 cursor-pointer">
                                <Shield className="h-4 w-4" />
                                Autenticación
                            </TabsTrigger>
                            <TabsTrigger value="session" className="flex items-center gap-2 cursor-pointer">
                                <Clock className="h-4 w-4" />
                                Sesión
                            </TabsTrigger>
                            <TabsTrigger value="appearance" className="flex items-center gap-2 cursor-pointer">
                                <Palette className="h-4 w-4" />
                                Apariencia
                            </TabsTrigger>
                            <TabsTrigger value="advanced" className="flex items-center gap-2 cursor-pointer">
                                <Settings className="h-4 w-4" />
                                Avanzado
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="general" className="space-y-6">
                            <GeneralTab 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>

                        <TabsContent value="authentication" className="space-y-6">
                            <AuthenticationTab 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>

                        <TabsContent value="session" className="space-y-6">
                            <SessionTab 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>

                        <TabsContent value="appearance" className="space-y-6">
                            <AppearanceTab 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>

                        <TabsContent value="advanced" className="space-y-6">
                            <AdvancedTab 
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-between gap-4 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.visit('/captive-portals')}
                        >
                            Cancelar
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    // Vista previa del portal
                                    window.open(`/captive-portals/${captivePortal.id}/preview`, '_blank');
                                }}
                            >
                                Vista Previa
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
