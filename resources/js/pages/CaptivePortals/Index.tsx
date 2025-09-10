import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Shield, Settings, Eye, Edit, Trash2 } from 'lucide-react';

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
                    <Link href="/create-captive-portal">
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
                            <Link href="/create-captive-portal">
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
                            <Card key={portal.id}>
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
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={`/captive-portals/${portal.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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
                                                VLANs Asociadas
                                            </p>
                                            <p className="text-sm">
                                                {portal.vlans_count || 0} VLANs
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
