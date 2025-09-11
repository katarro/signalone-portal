import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, ArrowLeft, Network } from 'lucide-react';

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

interface Vlan {
    id: number;
    vlan_id: number;
    name: string;
    description?: string;
    subnet: string;
    gateway: string;
    dns_primary: string;
    dns_secondary?: string;
    dhcp_enabled: boolean;
    dhcp_start?: string;
    dhcp_end?: string;
    zona_id?: number;
    captive_portal_id?: number;
    priority: 'low' | 'normal' | 'high' | 'critical';
    mtu: number;
    is_active: boolean;
    bandwidth_limit?: number;
    created_at: string;
    updated_at: string;
}

interface EditVlanProps {
    vlan: Vlan;
    zonas: Zona[];
    captivePortals: CaptivePortal[];
}

export default function EditVlan({ vlan, zonas, captivePortals }: EditVlanProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'VLANs',
            href: '/vlans',
        },
        {
            title: `Editar ${vlan.name}`,
            href: `/edit-vlan?id=${vlan.id}`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        vlan_id: vlan.vlan_id.toString(),
        name: vlan.name || '',
        description: vlan.description || '',
        subnet: vlan.subnet || '',
        gateway: vlan.gateway || '',
        dns_primary: vlan.dns_primary || '',
        dns_secondary: vlan.dns_secondary || '',
        dhcp_enabled: vlan.dhcp_enabled,
        dhcp_start: vlan.dhcp_start || '',
        dhcp_end: vlan.dhcp_end || '',
        zona_id: vlan.zona_id?.toString() || 'none',
        captive_portal_id: vlan.captive_portal_id?.toString() || 'none',
        priority: vlan.priority || 'normal',
        mtu: vlan.mtu?.toString() || '1500',
        is_active: vlan.is_active,
        bandwidth_limit: vlan.bandwidth_limit?.toString() || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Convert "none" values to empty strings for backend processing
        const submitData = {
            vlan_id: data.vlan_id,
            name: data.name,
            description: data.description,
            subnet: data.subnet,
            gateway: data.gateway,
            dns_primary: data.dns_primary,
            dns_secondary: data.dns_secondary,
            dhcp_enabled: data.dhcp_enabled,
            dhcp_start: data.dhcp_start,
            dhcp_end: data.dhcp_end,
            zona_id: data.zona_id === 'none' ? '' : data.zona_id,
            captive_portal_id: data.captive_portal_id === 'none' ? '' : data.captive_portal_id,
            priority: data.priority,
            mtu: data.mtu,
            is_active: data.is_active,
            bandwidth_limit: data.bandwidth_limit,
        };
        
        // Use router.put to send the converted data
        router.put(`/vlans/${vlan.id}`, submitData, {
            onSuccess: () => {
                router.get('/vlans');
            },
        });
    };

    const handleCancel = () => {
        router.get('/vlans');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar VLAN - ${vlan.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 max-w-6xl mx-auto w-full">
                    {/* Header con botón volver */}
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a VLANs
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Network className="h-5 w-5" />
                                Editar VLAN: {vlan.name}
                            </CardTitle>
                            <CardDescription>
                                Modifica la configuración de la VLAN.
                                <span className="block mt-1 text-amber-600">
                                    ⚠️ Los cambios en configuración de red pueden afectar la conectividad.
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Estado activo/inactivo */}
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                                    <div className="space-y-1">
                                        <Label htmlFor="is_active" className="text-base font-medium">
                                            Estado de la VLAN
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {data.is_active ? 'La VLAN está activa y disponible para uso.' : 'La VLAN está desactivada.'}
                                        </p>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>

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
                                                className={errors.vlan_id ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.vlan_id && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.vlan_id}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="name">Nombre *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Ej: VLAN Oficinas"
                                                className={errors.name ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.name && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="description">Descripción</Label>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Describe el propósito de esta VLAN..."
                                                rows={3}
                                                className={errors.description ? 'border-red-500' : ''}
                                            />
                                            {errors.description && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.description}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="zona_id">Zona</Label>
                                            <Select value={data.zona_id} onValueChange={(value) => setData('zona_id', value)}>
                                                <SelectTrigger className={errors.zona_id ? 'border-red-500' : ''}>
                                                    <SelectValue placeholder="Seleccionar zona..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Sin zona asignada</SelectItem>
                                                    {zonas.map((zona) => (
                                                        <SelectItem key={zona.id} value={zona.id.toString()}>
                                                            {zona.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.zona_id && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.zona_id}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Configuración de red */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Configuración de Red</h3>
                                        
                                        <div>
                                            <Label htmlFor="subnet">Subred *</Label>
                                            <Input
                                                id="subnet"
                                                value={data.subnet}
                                                onChange={(e) => setData('subnet', e.target.value)}
                                                placeholder="Ej: 192.168.1.0/24"
                                                className={errors.subnet ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.subnet && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.subnet}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="gateway">Gateway *</Label>
                                            <Input
                                                id="gateway"
                                                value={data.gateway}
                                                onChange={(e) => setData('gateway', e.target.value)}
                                                placeholder="Ej: 192.168.1.1"
                                                className={errors.gateway ? 'border-red-500' : ''}
                                                required
                                            />
                                            {errors.gateway && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.gateway}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="dns_primary">DNS Primario *</Label>
                                                <Input
                                                    id="dns_primary"
                                                    value={data.dns_primary}
                                                    onChange={(e) => setData('dns_primary', e.target.value)}
                                                    placeholder="Ej: 8.8.8.8"
                                                    className={errors.dns_primary ? 'border-red-500' : ''}
                                                    required
                                                />
                                                {errors.dns_primary && (
                                                    <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <span>{errors.dns_primary}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="dns_secondary">DNS Secundario</Label>
                                                <Input
                                                    id="dns_secondary"
                                                    value={data.dns_secondary}
                                                    onChange={(e) => setData('dns_secondary', e.target.value)}
                                                    placeholder="Ej: 8.8.4.4"
                                                    className={errors.dns_secondary ? 'border-red-500' : ''}
                                                />
                                                {errors.dns_secondary && (
                                                    <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                        <AlertCircle className="h-4 w-4" />
                                                        <span>{errors.dns_secondary}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Configuración DHCP */}
                                <div className="border-t pt-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">Configuración DHCP</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Habilita DHCP para asignación automática de IPs
                                                </p>
                                            </div>
                                            <Switch
                                                checked={data.dhcp_enabled}
                                                onCheckedChange={(checked) => setData('dhcp_enabled', checked)}
                                            />
                                        </div>

                                        {data.dhcp_enabled && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="dhcp_start">IP Inicial *</Label>
                                                    <Input
                                                        id="dhcp_start"
                                                        value={data.dhcp_start}
                                                        onChange={(e) => setData('dhcp_start', e.target.value)}
                                                        placeholder="Ej: 192.168.1.10"
                                                        className={errors.dhcp_start ? 'border-red-500' : ''}
                                                        required={data.dhcp_enabled}
                                                    />
                                                    {errors.dhcp_start && (
                                                        <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                            <AlertCircle className="h-4 w-4" />
                                                            <span>{errors.dhcp_start}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="dhcp_end">IP Final *</Label>
                                                    <Input
                                                        id="dhcp_end"
                                                        value={data.dhcp_end}
                                                        onChange={(e) => setData('dhcp_end', e.target.value)}
                                                        placeholder="Ej: 192.168.1.200"
                                                        className={errors.dhcp_end ? 'border-red-500' : ''}
                                                        required={data.dhcp_enabled}
                                                    />
                                                    {errors.dhcp_end && (
                                                        <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                            <AlertCircle className="h-4 w-4" />
                                                            <span>{errors.dhcp_end}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Configuración avanzada */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-4">Configuración Avanzada</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="priority">Prioridad</Label>
                                            <Select value={data.priority} onValueChange={(value) => setData('priority', value as any)}>
                                                <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">Baja</SelectItem>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="high">Alta</SelectItem>
                                                    <SelectItem value="critical">Crítica</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.priority && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.priority}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="mtu">MTU</Label>
                                            <Input
                                                id="mtu"
                                                type="number"
                                                min="576"
                                                max="9000"
                                                value={data.mtu}
                                                onChange={(e) => setData('mtu', e.target.value)}
                                                className={errors.mtu ? 'border-red-500' : ''}
                                            />
                                            {errors.mtu && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.mtu}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="bandwidth_limit">Límite de Ancho de Banda (Mbps)</Label>
                                            <Input
                                                id="bandwidth_limit"
                                                type="number"
                                                min="1"
                                                value={data.bandwidth_limit}
                                                onChange={(e) => setData('bandwidth_limit', e.target.value)}
                                                placeholder="Ej: 100"
                                                className={errors.bandwidth_limit ? 'border-red-500' : ''}
                                            />
                                            {errors.bandwidth_limit && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.bandwidth_limit}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Portal Cautivo */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-4">Portal Cautivo</h3>
                                    <div>
                                        <Label htmlFor="captive_portal_id">Portal Cautivo</Label>
                                        <Select value={data.captive_portal_id} onValueChange={(value) => setData('captive_portal_id', value)}>
                                            <SelectTrigger className={errors.captive_portal_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Seleccionar portal cautivo..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Sin portal cautivo</SelectItem>
                                                {captivePortals.filter(portal => portal.is_active).map((portal) => (
                                                    <SelectItem key={portal.id} value={portal.id.toString()}>
                                                        {portal.name} ({portal.auth_method})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.captive_portal_id && (
                                            <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>{errors.captive_portal_id}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Información adicional */}
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Información del registro</h4>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p>Creado: {new Date(vlan.created_at).toLocaleString('es-CL')}</p>
                                        <p>Última modificación: {new Date(vlan.updated_at).toLocaleString('es-CL')}</p>
                                        <p>ID: {vlan.id}</p>
                                    </div>
                                </div>

                                {/* Botones */}
                                <div className="flex gap-4 pt-6 border-t">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 md:flex-none"
                                    >
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        disabled={processing}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
