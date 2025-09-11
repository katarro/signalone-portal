import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Plus, Shield, Settings, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaptivePortal {
    id: number;
    name: string;
    description?: string;
    auth_method: string;
    is_active: boolean;
    vlans_count?: number;
    created_at: string;
}

interface Props {
    captivePortals: {
        data: CaptivePortal[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

const authMethodLabels: Record<string, string> = {
    terms_only: 'Solo términos',
    user_password: 'Usuario/Contraseña',
    voucher: 'Voucher',
    social: 'Redes sociales',
    sms: 'SMS',
};

export default function Index({ captivePortals }: Props) {
    const [deletingPortal, setDeletingPortal] = useState<number | null>(null);

    const handleDeletePortal = async (portalId: number, portalName: string) => {
        try {
            setDeletingPortal(portalId);
            await router.delete(`/captive-portals/${portalId}`, {
                onSuccess: () => {
                    // Notificar éxito
                    console.log(`Portal "${portalName}" eliminado exitosamente`);
                },
                onError: (errors) => {
                    console.error('Error al eliminar portal:', errors);
                    // Mostrar mensaje de error más específico
                    const errorMessage = typeof errors === 'object' && errors !== null 
                        ? Object.values(errors).flat().join(', ') 
                        : 'Error al eliminar el portal. Por favor, inténtalo de nuevo.';
                    alert(errorMessage);
                },
                onFinish: () => {
                    setDeletingPortal(null);
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error inesperado al eliminar el portal. Por favor, inténtalo de nuevo.');
            setDeletingPortal(null);
        }
    };
    return (
        <AppLayout>
            <Head title="Portales Cautivos" />
            
            <div className="container mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Portales Cautivos</h1>
                        <p className="text-muted-foreground">
                            Gestiona los portales cautivos para controlar el acceso a la red
                        </p>
                    </div>
                    <Link href="/captive-portals/create">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear Portal Cautivo
                        </Button>
                    </Link>
                </div>

                {captivePortals.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No hay portales cautivos</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Comienza creando tu primer portal cautivo para controlar el acceso a la red
                            </p>
                            <Link href="/captive-portals/create">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Crear Portal Cautivo
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {captivePortals.data.map((portal) => (
                            <Card 
                                key={portal.id} 
                                className={cn(
                                    "transition-opacity",
                                    deletingPortal === portal.id && "opacity-50"
                                )}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {portal.name}
                                                <Badge variant={portal.is_active ? "default" : "secondary"}>
                                                    {portal.is_active ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </CardTitle>
                                            {portal.description && (
                                                <p className="text-muted-foreground mt-1">
                                                    {portal.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/captive-portals/${portal.id}`}>
                                                <Button variant="outline" size="sm" title="Ver detalles">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/captive-portals/${portal.id}/edit`}>
                                                <Button variant="outline" size="sm" title="Editar portal">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        disabled={deletingPortal === portal.id}
                                                        title="Eliminar portal"
                                                    >
                                                        {deletingPortal === portal.id ? (
                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="flex items-center gap-2">
                                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                                            Eliminar Portal Cautivo
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            ¿Estás seguro de que deseas eliminar el portal cautivo <strong>"{portal.name}"</strong>?
                                                            <br /><br />
                                                            Esta acción no se puede deshacer y se eliminarán:
                                                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                                                <li>Toda la configuración del portal</li>
                                                                <li>Configuraciones de autenticación</li>
                                                                <li>Personalización visual</li>
                                                                <li>Estadísticas y logs asociados</li>
                                                            </ul>
                                                            <br />
                                                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                                                                <strong>Nota:</strong> Las VLANs asociadas no se eliminarán, pero perderán la referencia a este portal.
                                                            </div>
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancelar
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeletePortal(portal.id, portal.name)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            {deletingPortal === portal.id ? 'Eliminando...' : 'Sí, eliminar portal'}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Método de Autenticación
                                            </p>
                                            <p className="text-sm">
                                                {authMethodLabels[portal.auth_method] || portal.auth_method}
                                            </p>
                                        </div>
                                       
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Creado
                                            </p>
                                            <p className="text-sm">
                                                {new Date(portal.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {captivePortals.last_page > 1 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-2">
                            {/* Aquí puedes agregar controles de paginación */}
                            <p className="text-sm text-muted-foreground">
                                Página {captivePortals.current_page} de {captivePortals.last_page}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
