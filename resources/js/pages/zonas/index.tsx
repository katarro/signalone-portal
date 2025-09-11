import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Edit, Trash2, Plus, Eye, Phone, Mail, User } from 'lucide-react';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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

interface ZonasIndexProps {
    zonas: {
        data: Zona[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Zonas',
        href: '/zonas',
    },
];

export default function ZonasIndex({ zonas }: ZonasIndexProps) {
    const [deletingZona, setDeletingZona] = useState<Zona | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionInProgress, setActionInProgress] = useState<number | null>(null);

    const handleView = (zona: Zona) => {
        setActionInProgress(zona.id);
        // Navegar a la página de edición que servirá como vista por ahora
        router.get(`/edit-zona?id=${zona.id}`, {}, {
            onFinish: () => setActionInProgress(null)
        });
    };

    const handleEdit = (zona: Zona) => {
        setActionInProgress(zona.id);
        router.get(`/edit-zona?id=${zona.id}`, {}, {
            onFinish: () => setActionInProgress(null)
        });
    };

    const handleDelete = async (zona: Zona) => {
        setIsDeleting(true);
        try {
            router.delete(`/zonas/${zona.id}`, {
                onSuccess: () => {
                    setDeletingZona(null);
                    // Opcional: mostrar mensaje de éxito
                },
                onError: (errors) => {
                    console.error('Error al eliminar zona:', errors);
                    // Opcional: mostrar mensaje de error
                },
                onFinish: () => {
                    setIsDeleting(false);
                }
            });
        } catch (error) {
            console.error('Error inesperado:', error);
            setIsDeleting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Zonas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestión de Zonas</h1>
                        <p className="text-muted-foreground">
                            Administra las zonas geográficas de tu red
                        </p>
                    </div>
                    <Link href="/create-zona">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Zona
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Zonas</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{zonas.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Zonas Activas</CardTitle>
                            <Badge variant="secondary" className="h-4 w-4 p-0 justify-center">
                                ✓
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {zonas.data.filter(z => z.is_active).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Con VLANs</CardTitle>
                            <Badge variant="outline" className="h-4 w-4 p-0 justify-center">
                                V
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {zonas.data.filter(z => (z.vlans_count || 0) > 0).length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Zonas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {zonas.data.map((zona) => (
                        <Card key={zona.id} className="relative">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1 flex-1">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {zona.name}
                                        </CardTitle>
                                        {zona.location && (
                                            <CardDescription>{zona.location}</CardDescription>
                                        )}
                                    </div>
                                    <Badge variant={zona.is_active ? "default" : "secondary"}>
                                        {zona.is_active ? "Activa" : "Inactiva"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {zona.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {zona.description}
                                    </p>
                                )}

                                {/* Contact Info */}
                                {(zona.contact_person || zona.contact_phone || zona.contact_email) && (
                                    <div className="space-y-2 text-sm">
                                        {zona.contact_person && (
                                            <div className="flex items-center gap-2">
                                                <User className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-muted-foreground">{zona.contact_person}</span>
                                            </div>
                                        )}
                                        {zona.contact_phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-muted-foreground">{zona.contact_phone}</span>
                                            </div>
                                        )}
                                        {zona.contact_email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-muted-foreground">{zona.contact_email}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* VLANs Count */}
                                {zona.vlans_count !== undefined && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">VLANs asociadas:</span>
                                        <Badge variant="outline">{zona.vlans_count}</Badge>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                   
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleEdit(zona)}
                                        disabled={actionInProgress === zona.id}
                                    >
                                        <Edit className="h-3 w-3 mr-1" />
                                        {actionInProgress === zona.id ? 'Cargando...' : 'Editar'}
                                    </Button>
                                    
                                    <AlertDialog open={deletingZona?.id === zona.id} onOpenChange={(open) => !open && setDeletingZona(null)}>
                                        <AlertDialogTrigger>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="text-red-600 hover:text-red-700"
                                                onClick={() => setDeletingZona(zona)}
                                                disabled={actionInProgress === zona.id}
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" />
                                                Eliminar
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Eliminar zona?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    ¿Estás seguro de que quieres eliminar la zona <strong>"{zona.name}"</strong>? 
                                                    Esta acción no se puede deshacer y se eliminarán todas las VLANs asociadas.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(zona)}
                                                    className={`bg-red-600 hover:bg-red-700 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {zonas.data.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-12">
                        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                        <CardTitle className="mb-2">No hay zonas creadas</CardTitle>
                        <CardDescription className="text-center mb-4">
                            Comienza creando tu primera zona geográfica para organizar tu red.
                        </CardDescription>
                        <Link href="/create-zona">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Crear Primera Zona
                            </Button>
                        </Link>
                    </Card>
                )}

                {/* Pagination */}
                {zonas.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: zonas.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/zonas?page=${page}`}
                                preserveState
                            >
                                <Button
                                    variant={page === zonas.current_page ? "default" : "outline"}
                                    size="sm"
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
