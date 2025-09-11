import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, MapPin, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Zona {
    id: number;
    name: string;
    description: string | null;
    location: string | null;
    contact_person: string | null;
    contact_phone: string | null;
    contact_email: string | null;
    notes: string | null;
    is_active: boolean;
    vlans_count?: number;
    created_at: string;
    updated_at: string;
}

interface EditZonaProps {
    zona: Zona;
}

interface EditZonaForm {
    name: string;
    description: string;
    location: string;
    contact_person: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
    is_active: boolean;
}

export default function EditZona({ zona }: EditZonaProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Zonas',
            href: '/zonas',
        },
        {
            title: `Editar ${zona.name}`,
            href: `/zonas/${zona.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm<EditZonaForm>({
        name: zona.name || '',
        description: zona.description || '',
        location: zona.location || '',
        contact_person: zona.contact_person || '',
        contact_phone: zona.contact_phone || '',
        contact_email: zona.contact_email || '',
        notes: zona.notes || '',
        is_active: zona.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(`/zonas/${zona.id}`, {
            onSuccess: () => {
                toast.success("Zona actualizada", {
                    description: `La zona "${data.name}" ha sido actualizada exitosamente.`,
                });
                // Redirigir a la lista de zonas después de la actualización exitosa
                router.get('/zonas');
            },
            onError: (errors) => {
                console.error('Error updating zona:', errors);
                toast.error("Error al actualizar zona", {
                    description: "No se pudo actualizar la zona. Por favor, verifica los datos e intenta nuevamente.",
                });
            }
        });
    };

    const handleCancel = () => {
        router.get('/zonas');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Zona - ${zona.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 max-w-4xl mx-auto w-full">
                    {/* Header con botón volver */}
                    <div className="flex items-center gap-4 mb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Zonas
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Editar Zona: {zona.name}
                            </CardTitle>
                            <CardDescription>
                                Modifica la información de la zona geográfica.
                                {zona.vlans_count !== undefined && zona.vlans_count > 0 && (
                                    <span className="block mt-1 text-amber-600">
                                        ⚠️ Esta zona tiene {zona.vlans_count} VLAN(s) asociada(s).
                                    </span>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Estado activo/inactivo */}
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                                    <div className="space-y-1">
                                        <Label htmlFor="is_active" className="text-base font-medium">
                                            Estado de la Zona
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            {data.is_active ? 'La zona está activa y disponible para uso.' : 'La zona está desactivada.'}
                                        </p>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>

                                {/* Información Básica */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nombre de la Zona <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ej: Plaza de Armas"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && (
                                            <div className="flex items-center gap-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>{errors.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Ubicación</Label>
                                        <Input
                                            id="location"
                                            type="text"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            placeholder="Ej: Centro de la ciudad"
                                            className={errors.location ? 'border-red-500' : ''}
                                        />
                                        {errors.location && (
                                            <div className="flex items-center gap-2 text-red-600 text-sm">
                                                <AlertCircle className="h-4 w-4" />
                                                <span>{errors.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Describe las características principales de esta zona..."
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <div className="flex items-center gap-2 text-red-600 text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.description}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información de Contacto */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium mb-4">Información de Contacto</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="contact_person">Persona de Contacto</Label>
                                            <Input
                                                id="contact_person"
                                                type="text"
                                                value={data.contact_person}
                                                onChange={(e) => setData('contact_person', e.target.value)}
                                                placeholder="Nombre completo"
                                                className={errors.contact_person ? 'border-red-500' : ''}
                                            />
                                            {errors.contact_person && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.contact_person}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact_phone">Teléfono</Label>
                                            <Input
                                                id="contact_phone"
                                                type="tel"
                                                value={data.contact_phone}
                                                onChange={(e) => setData('contact_phone', e.target.value)}
                                                placeholder="+56 9 1234 5678"
                                                className={errors.contact_phone ? 'border-red-500' : ''}
                                            />
                                            {errors.contact_phone && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.contact_phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="contact_email">Email</Label>
                                            <Input
                                                id="contact_email"
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                                placeholder="contacto@ejemplo.com"
                                                className={errors.contact_email ? 'border-red-500' : ''}
                                            />
                                            {errors.contact_email && (
                                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <span>{errors.contact_email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Notas */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notas Adicionales</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Información adicional, observaciones, horarios de acceso, etc."
                                        className={errors.notes ? 'border-red-500' : ''}
                                        rows={4}
                                    />
                                    {errors.notes && (
                                        <div className="flex items-center gap-2 text-red-600 text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{errors.notes}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Información adicional */}
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Información del registro</h4>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p>Creado: {new Date(zona.created_at).toLocaleString('es-CL')}</p>
                                        <p>Última modificación: {new Date(zona.updated_at).toLocaleString('es-CL')}</p>
                                        {zona.vlans_count !== undefined && (
                                            <p>VLANs asociadas: {zona.vlans_count}</p>
                                        )}
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
