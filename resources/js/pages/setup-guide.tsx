import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Circle, Network, Shield, MapPin, Wifi, AlertTriangle, Info, Lightbulb } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guía de Configuración',
        href: '/setup-guide',
    },
];

const steps = [
    {
        number: 1,
        title: 'Infraestructura Física',
        description: 'Preparación del hardware y conectividad básica',
        icon: Network,
        color: 'bg-blue-500',
        items: [
            'Red configurada',
            'Switches y routers instalados',
            'Access Points montados físicamente',
            'Conectividad básica verificada',
            'Cableado estructurado completo'
        ]
    },
    {
        number: 2,
        title: 'Crear Zona',
        description: 'Definir ubicación lógica de la infraestructura',
        icon: MapPin,
        color: 'bg-green-500',
        link: '/create-zona',
        items: [
            'Definir ubicación física (oficina, piso, edificio)',
            'Agregar información de contacto',
            'Describir el área de cobertura',
            'Establecer responsable de la zona'
        ]
    },
    {
        number: 3,
        title: 'Crear Portal Cautivo',
        description: 'Configurar sistema de autenticación',
        icon: Shield,
        color: 'bg-purple-500',
        link: '/captive-portals/create',
        items: [
            'Seleccionar método de autenticación',
            'Personalizar página de login',
            'Configurar timeouts y límites',
            'Definir términos y condiciones',
            'Establecer colores y branding'
        ]
    },
    {
        number: 4,
        title: 'Crear VLAN',
        description: 'Configurar segmento de red virtual',
        icon: Network,
        color: 'bg-orange-500',
        link: '/create-vlan',
        items: [
            'Asignar VLAN ID único',
            'Configurar subred y gateway',
            'Establecer servidores DNS',
            'Asignar a zona creada',
            'Vincular portal cautivo',
            'Configurar rango DHCP'
        ]
    },
    {
        number: 5,
        title: 'Configurar Access Point',
        description: 'Registrar y configurar punto de acceso',
        icon: Wifi,
        color: 'bg-cyan-500',
        link: '/create-ap',
        items: [
            'Registrar MAC address del AP',
            'Asignar a VLAN configurada',
            'Configurar SSID y contraseña',
            'Establecer parámetros de seguridad',
            'Verificar conectividad'
        ]
    }
];

const authMethods = [
    {
        method: 'Solo términos y condiciones',
        description: 'Acceso libre con aceptación de términos',
        useCase: 'WiFi público, cafeterías, espacios comerciales'
    },
    {
        method: 'Usuario y contraseña',
        description: 'Control de acceso con credenciales',
        useCase: 'Redes corporativas, acceso de empleados'
    },
    {
        method: 'Voucher/Código',
        description: 'Acceso temporal con tickets',
        useCase: 'Hoteles, eventos, centros de conferencias'
    },
    {
        method: 'Redes sociales',
        description: 'Login con Facebook, Google, etc.',
        useCase: 'Marketing digital, captura de datos'
    },
    {
        method: 'SMS',
        description: 'Verificación por mensaje de texto',
        useCase: 'Verificación de identidad, mayor seguridad'
    }
];

export default function SetupGuide() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Guía de Configuración" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Guía de Configuración del Portal</h1>
                    <p className="text-muted-foreground">
                        Sigue estos pasos para configurar correctamente tu infraestructura de red WiFi con portal cautivo.
                    </p>
                </div>

                {/* Alert Info */}
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Importante:</strong> Sigue el orden indicado para evitar errores de configuración. 
                        Cada paso depende del anterior.
                    </AlertDescription>
                </Alert>

                {/* Steps Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Pasos de Configuración</h2>
                    
                    <div className="grid gap-6">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <Card key={step.number} className="relative">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className={`rounded-full p-2 ${step.color} text-white`}>
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="flex items-center gap-2">
                                                    Paso {step.number}: {step.title}
                                                    {step.link && (
                                                        <Badge variant="outline" className="ml-auto">
                                                            <a href={step.link} className="text-xs">
                                                                Ir al formulario →
                                                            </a>
                                                        </Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>{step.description}</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {step.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-center gap-2 text-sm">
                                                    <Circle className="h-3 w-3 text-muted-foreground" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>


          

                <Separator />

                {/* Troubleshooting */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Verificación Final</h2>
                    
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Lista de verificación antes de poner en producción:</strong>
                            <ul className="mt-2 space-y-1 text-sm">
                                <li>• Probar conectividad desde un dispositivo cliente</li>
                                <li>• Verificar que el portal cautivo se muestre correctamente</li>
                                <li>• Confirmar asignación automática de IPs por DHCP</li>
                                <li>• Testear el proceso de autenticación completo</li>
                                <li>• Verificar redirección después de la autenticación</li>
                                <li>• Comprobar logs de conexión y posibles errores</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">¿Problemas de conectividad?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>1. Verificar configuración de red:</strong> Gateway, DNS y rango DHCP</p>
                            <p><strong>2. Comprobar estado del AP:</strong> Conectividad física y configuración VLAN</p>
                            <p><strong>3. Revisar portal cautivo:</strong> URLs, timeouts y método de autenticación</p>
                            <p><strong>4. Consultar logs:</strong> Buscar errores en el sistema de logging</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
