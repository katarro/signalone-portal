import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Plus, Edit, Trash2, Eye } from 'lucide-react';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'VLANs',
        href: '/vlans',
    },
];

interface Zona {
    id: number;
    name: string;
    description: string;
    location?: string;
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
    zona?: Zona;
    priority: 'low' | 'normal' | 'high' | 'critical';
    priority_label: string;
    mtu: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface VlansIndexProps {
    vlans: {
        data: Vlan[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function VlansIndex({ vlans }: VlansIndexProps) {
    const [deletingVlan, setDeletingVlan] = useState<Vlan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionInProgress, setActionInProgress] = useState<number | null>(null);

    const handleEdit = (vlan: Vlan) => {
        setActionInProgress(vlan.id);
        router.get(`/edit-vlan?id=${vlan.id}`, {}, {
            onFinish: () => setActionInProgress(null)
        });
    };

    const handleDelete = async (vlan: Vlan) => {
        setIsDeleting(true);
        try {
            router.delete(`/vlans/${vlan.id}`, {
                onSuccess: () => {
                    setDeletingVlan(null);
                },
                onError: (errors) => {
                    console.error('Error al eliminar VLAN:', errors);
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
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'bg-gray-100 text-gray-800';
            case 'normal':
                return 'bg-blue-100 text-blue-800';
            case 'high':
                return 'bg-yellow-100 text-yellow-800';
            case 'critical':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="VLANs" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">VLANs</h1>
                        <p className="text-muted-foreground">
                            Gestiona las redes virtuales de tu infraestructura
                        </p>
                    </div>
                    <Link href="/create-vlan">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva VLAN
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-4">
                    {vlans.data.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <Network className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No hay VLANs configuradas</h3>
                                <p className="text-muted-foreground text-center mb-4">
                                    Comienza creando tu primera VLAN para organizar tu red
                                </p>
                                <Link href="/create-vlan">
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Crear primera VLAN
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {vlans.data.map((vlan) => (
                                <Card key={vlan.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Network className="h-5 w-5" />
                                                    VLAN {vlan.vlan_id} - {vlan.name}
                                                    {!vlan.is_active && (
                                                        <Badge variant="secondary">Inactiva</Badge>
                                                    )}
                                                </CardTitle>
                                                <CardDescription>
                                                    {vlan.description || 'Sin descripción'}
                                                </CardDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                <Badge className={getPriorityColor(vlan.priority)}>
                                                    {vlan.priority_label}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Subred</p>
                                                <p className="font-mono text-sm">{vlan.subnet}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Gateway</p>
                                                <p className="font-mono text-sm">{vlan.gateway}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">DNS</p>
                                                <p className="font-mono text-sm">{vlan.dns_primary}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Zona</p>
                                                <p className="text-sm">{vlan.zona?.name || 'Sin zona'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">DHCP</p>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={vlan.dhcp_enabled ? "default" : "secondary"}>
                                                        {vlan.dhcp_enabled ? 'Habilitado' : 'Deshabilitado'}
                                                    </Badge>
                                                    {vlan.dhcp_enabled && vlan.dhcp_start && (
                                                        <span className="font-mono text-sm text-muted-foreground">
                                                            {vlan.dhcp_start} - {vlan.dhcp_end}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">MTU</p>
                                                <p className="text-sm">{vlan.mtu}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Creada</p>
                                                <p className="text-sm">{new Date(vlan.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2 pt-4 border-t">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleEdit(vlan)}
                                                disabled={actionInProgress === vlan.id}
                                            >
                                                <Edit className="mr-2 h-4 w-4" />
                                                {actionInProgress === vlan.id ? 'Cargando...' : 'Editar'}
                                            </Button>
                                            
                                            <AlertDialog open={deletingVlan?.id === vlan.id} onOpenChange={(open) => !open && setDeletingVlan(null)}>
                                                <AlertDialogTrigger>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => setDeletingVlan(vlan)}
                                                        disabled={actionInProgress === vlan.id}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Eliminar
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>¿Eliminar VLAN?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            ¿Estás seguro de que quieres eliminar la VLAN <strong>"{vlan.name}" (ID: {vlan.vlan_id})</strong>? 
                                                            Esta acción no se puede deshacer y se eliminarán todas las configuraciones asociadas.
                                                            {vlan.zona && (
                                                                <span className="block mt-2 text-amber-600">
                                                                    ⚠️ Esta VLAN está asociada a la zona "{vlan.zona.name}".
                                                                </span>
                                                            )}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(vlan)}
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
                    )}
                </div>

                {/* Paginación simple */}
                {vlans.last_page > 1 && (
                    <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-muted-foreground">
                            Mostrando {vlans.data.length} de {vlans.total} VLANs
                        </div>
                        <div className="flex gap-2">
                            {vlans.current_page > 1 && (
                                <Link href={`/vlans?page=${vlans.current_page - 1}`}>
                                    <Button variant="outline">Anterior</Button>
                                </Link>
                            )}
                            {vlans.current_page < vlans.last_page && (
                                <Link href={`/vlans?page=${vlans.current_page + 1}`}>
                                    <Button variant="outline">Siguiente</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
