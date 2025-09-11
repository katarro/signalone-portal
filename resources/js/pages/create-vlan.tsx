import AppLayout from '@/layouts/app-layout';
import { createVlan } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear VLAN',
        href: createVlan().url,
    },
];

interface Zona {
    id: number;
    name: string;
    description: string;
    location?: string;
}

interface CaptivePortal {
    id: number;
    name: string;
    description?: string;
    auth_method: string;
    is_active: boolean;
}

interface CreateVlanProps {
    zonas: Zona[];
    captivePortals: CaptivePortal[];
}

export default function CreateVlan({ zonas, captivePortals }: CreateVlanProps) {
    const { data, setData, post, processing, errors } = useForm({
        vlan_id: '',
        name: '',
        description: '',
        subnet: '',
        gateway: '',
        dns_primary: '',
        dns_secondary: '',
        dhcp_enabled: 'true',
        dhcp_start: '',
        dhcp_end: '',
        zona_id: '',
        priority: 'normal',
        mtu: '1500',
        // Campos del portal cautivo
        captive_portal_option: 'none',
        captive_portal_id: '',
        new_portal_name: '',
        new_portal_auth_method: 'terms_only',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/create-vlan', {
            onSuccess: () => {
                toast.success("VLAN creada", {
                    description: `La VLAN "${data.name}" ha sido creada exitosamente.`,
                });
            },
            onError: (errors) => {
                console.error('Error creating VLAN:', errors);
                toast.error("Error al crear VLAN", {
                    description: "No se pudo crear la VLAN. Por favor, verifica los datos e intenta nuevamente.",
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear VLAN" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Crear Nueva VLAN</CardTitle>
                        <CardDescription>
                            Configure los parámetros de red para la nueva VLAN
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Información básica */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Información Básica</h3>
                                    
                                    <div>
                                        <Label htmlFor="vlan_id">VLAN ID *</Label>
                                        <Input
                                            id="vlan_id"
                                            type="number"
                                            min="1"
                                            max="4094"
                                            value={data.vlan_id}
                                            onChange={(e) => setData('vlan_id', e.target.value)}
                                            placeholder="Ej: 100"
                                            required
                                        />
                                        {errors.vlan_id && <p className="text-sm text-red-600">{errors.vlan_id}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="name">Nombre *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ej: VLAN_Oficinas"
                                            required
                                        />
                                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Descripción</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Descripción de la VLAN..."
                                            rows={3}
                                        />
                                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="zona_id">Zona Asignada *</Label>
                                        <Select value={data.zona_id} onValueChange={(value) => setData('zona_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una zona" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {zonas.map((zona) => (
                                                    <SelectItem key={zona.id} value={zona.id.toString()}>
                                                        <div>
                                                            <div className="font-medium">{zona.name}</div>
                                                            <div className="text-sm text-muted-foreground">{zona.description}</div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.zona_id && <p className="text-sm text-red-600">{errors.zona_id}</p>}
                                    </div>
                                </div>

                                {/* Configuración de red */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Configuración de Red</h3>
                                    
                                    <div>
                                        <Label htmlFor="subnet">Subred (CIDR) *</Label>
                                        <Input
                                            id="subnet"
                                            value={data.subnet}
                                            onChange={(e) => setData('subnet', e.target.value)}
                                            placeholder="Ej: 192.168.100.0/24"
                                            required
                                        />
                                        {errors.subnet && <p className="text-sm text-red-600">{errors.subnet}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="gateway">Gateway *</Label>
                                        <Input
                                            id="gateway"
                                            value={data.gateway}
                                            onChange={(e) => setData('gateway', e.target.value)}
                                            placeholder="Ej: 192.168.100.1"
                                            required
                                        />
                                        {errors.gateway && <p className="text-sm text-red-600">{errors.gateway}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="dns_primary">DNS Primario *</Label>
                                        <Input
                                            id="dns_primary"
                                            value={data.dns_primary}
                                            onChange={(e) => setData('dns_primary', e.target.value)}
                                            placeholder="Ej: 8.8.8.8"
                                            required
                                        />
                                        {errors.dns_primary && <p className="text-sm text-red-600">{errors.dns_primary}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="dns_secondary">DNS Secundario</Label>
                                        <Input
                                            id="dns_secondary"
                                            value={data.dns_secondary}
                                            onChange={(e) => setData('dns_secondary', e.target.value)}
                                            placeholder="Ej: 8.8.4.4"
                                        />
                                        {errors.dns_secondary && <p className="text-sm text-red-600">{errors.dns_secondary}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Configuración DHCP */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Configuración DHCP</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="dhcp_enabled">DHCP Habilitado</Label>
                                        <Select value={data.dhcp_enabled} onValueChange={(value) => setData('dhcp_enabled', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Sí</SelectItem>
                                                <SelectItem value="false">No</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {data.dhcp_enabled === 'true' && (
                                        <>
                                            <div>
                                                <Label htmlFor="dhcp_start">IP Inicio DHCP</Label>
                                                <Input
                                                    id="dhcp_start"
                                                    value={data.dhcp_start}
                                                    onChange={(e) => setData('dhcp_start', e.target.value)}
                                                    placeholder="Ej: 192.168.100.10"
                                                />
                                                {errors.dhcp_start && <p className="text-sm text-red-600">{errors.dhcp_start}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="dhcp_end">IP Final DHCP</Label>
                                                <Input
                                                    id="dhcp_end"
                                                    value={data.dhcp_end}
                                                    onChange={(e) => setData('dhcp_end', e.target.value)}
                                                    placeholder="Ej: 192.168.100.200"
                                                />
                                                {errors.dhcp_end && <p className="text-sm text-red-600">{errors.dhcp_end}</p>}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Configuración de Portal Cautivo */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Portal Cautivo</h3>
                                
                                <div>
                                    <Label htmlFor="captive_portal_option">Configuración de Portal Cautivo</Label>
                                    <Select 
                                        value={data.captive_portal_option} 
                                        onValueChange={(value) => setData('captive_portal_option', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona una opción" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Sin portal cautivo</SelectItem>
                                            <SelectItem value="existing">Usar portal existente</SelectItem>
                                            <SelectItem value="new">Crear nuevo portal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.captive_portal_option && <p className="text-sm text-red-600">{errors.captive_portal_option}</p>}
                                </div>

                                {data.captive_portal_option === 'existing' && (
                                    <div>
                                        <Label htmlFor="captive_portal_id">Portal Cautivo Existente *</Label>
                                        <Select 
                                            value={data.captive_portal_id} 
                                            onValueChange={(value) => setData('captive_portal_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un portal cautivo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {captivePortals.map((portal) => (
                                                    <SelectItem key={portal.id} value={portal.id.toString()}>
                                                        <div>
                                                            <div className="font-medium">{portal.name}</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {portal.description} • {portal.auth_method}
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.captive_portal_id && <p className="text-sm text-red-600">{errors.captive_portal_id}</p>}
                                    </div>
                                )}

                                {data.captive_portal_option === 'new' && (
                                    <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                                        <h4 className="text-sm font-medium">Configuración del Nuevo Portal</h4>
                                        
                                        <div>
                                            <Label htmlFor="new_portal_name">Nombre del Portal *</Label>
                                            <Input
                                                id="new_portal_name"
                                                value={data.new_portal_name}
                                                onChange={(e) => setData('new_portal_name', e.target.value)}
                                                placeholder="Ej: Portal WiFi Corporativo"
                                            />
                                            {errors.new_portal_name && <p className="text-sm text-red-600">{errors.new_portal_name}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="new_portal_auth_method">Método de Autenticación *</Label>
                                            <Select 
                                                value={data.new_portal_auth_method} 
                                                onValueChange={(value) => setData('new_portal_auth_method', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecciona un método" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="terms_only">Solo términos y condiciones</SelectItem>
                                                    <SelectItem value="user_password">Usuario y contraseña</SelectItem>
                                                    <SelectItem value="voucher">Voucher/Código</SelectItem>
                                                    <SelectItem value="social">Redes sociales</SelectItem>
                                                    <SelectItem value="sms">SMS</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.new_portal_auth_method && <p className="text-sm text-red-600">{errors.new_portal_auth_method}</p>}
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                            <p>Se creará un portal con configuración básica. Podrás personalizarlo después en la sección de Portales Cautivos.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                    

                            {/* Botones de acción */}
                            <div className="flex justify-end space-x-4 pt-6 border-t">
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creando...' : 'Crear VLAN'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
