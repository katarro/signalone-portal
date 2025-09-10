import AppLayout from '@/layouts/app-layout';
import { createZona } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, MapPin } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Zona',
        href: createZona().url,
    },
];

interface CreateZonaForm {
    name: string;
    description: string;
    location: string;
    contact_person: string;
    contact_phone: string;
    contact_email: string;
    notes: string;
}

export default function CreateZona() {
    const { data, setData, post, processing, errors, reset } = useForm<CreateZonaForm>({
        name: '',
        description: '',
        location: '',
        contact_person: '',
        contact_phone: '',
        contact_email: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/create-zona', {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Zona" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 max-w-4xl mx-auto w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Crear Nueva Zona
                            </CardTitle>
                            <CardDescription>
                                Crea una nueva zona geográfica para organizar tu red y equipos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                {/* Botones */}
                                <div className="flex gap-4 pt-6 border-t">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 md:flex-none"
                                    >
                                        {processing ? 'Creando...' : 'Crear Zona'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => reset()}
                                        disabled={processing}
                                    >
                                        Limpiar
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
