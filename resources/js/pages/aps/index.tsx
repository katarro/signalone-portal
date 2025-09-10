import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Link, useForm } from "@inertiajs/react";
import { 
  Wifi, 
  MapPin, 
  Users, 
  Signal, 
  Settings, 
  Activity, 
  Timer,
  Plus,
  Trash2,
  Power,
  PowerOff,
  Edit
} from "lucide-react";

interface Ap {
  id: number;
  name: string;
  ssid: string;
  ip_address: string;
  mac_address: string;
  description?: string;
  location?: string;
  max_clients: number;
  current_clients: number;
  status: 'online' | 'offline' | 'error' | 'maintenance';
  last_ping?: string;
  ping_response_time?: number;
  is_active: boolean;
  status_color: string;
  status_text: string;
  vlan?: {
    id: number;
    name: string;
    vlan_id: number;
  };
  zona?: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface ApIndexProps {
  aps: {
    data: Ap[];
    links: any[];
    meta: any;
  };
}

export default function ApIndex({ aps }: ApIndexProps) {
  const { post, delete: destroy } = useForm();

  const handlePing = (apId: number) => {
    post(`/aps/${apId}/ping`);
  };

  const handleToggleStatus = (apId: number) => {
    post(`/aps/${apId}/toggle`, {
      method: 'patch'
    });
  };

  const handleDelete = (apId: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este Access Point?')) {
      destroy(`/aps/${apId}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />;
      case 'offline':
        return <div className="w-3 h-3 bg-red-500 rounded-full" />;
      case 'error':
        return <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />;
      case 'maintenance':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusBadge = (status: string, statusText: string) => {
    const variant = status === 'online' ? 'default' : 
                   status === 'maintenance' ? 'secondary' : 'destructive';
    
    return <Badge variant={variant as any}>{statusText}</Badge>;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Access Points</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Access Points</h2>
              <p className="text-muted-foreground">
                Gestiona los puntos de acceso de tu red inalámbrica
              </p>
            </div>
            <Link href="/create-ap">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo AP
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aps.data.map((ap) => (
              <Card key={ap.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{ap.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {ap.ssid}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ap.status)}
                      {getStatusBadge(ap.status, ap.status_text)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Información básica */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4 text-gray-500" />
                      <span className="text-muted-foreground">IP:</span>
                      <span className="font-mono">{ap.ip_address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-muted-foreground">Clientes:</span>
                      <span>{ap.current_clients}/{ap.max_clients}</span>
                    </div>
                  </div>

                  {/* VLAN y Zona */}
                  <div className="space-y-2">
                    {ap.vlan && (
                      <div className="flex items-center gap-2 text-sm">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <span className="text-muted-foreground">VLAN:</span>
                        <Badge variant="outline">
                          VLAN {ap.vlan.vlan_id} - {ap.vlan.name}
                        </Badge>
                      </div>
                    )}
                    {ap.zona && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-muted-foreground">Zona:</span>
                        <Badge variant="outline">{ap.zona.name}</Badge>
                      </div>
                    )}
                  </div>

                  {/* Información técnica */}
                  <div className="border-t pt-3 space-y-2">
                    {ap.ping_response_time && (
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="h-4 w-4 text-gray-500" />
                        <span className="text-muted-foreground">Ping:</span>
                        <span>{ap.ping_response_time}ms</span>
                      </div>
                    )}
                  </div>

                  {/* Ubicación y descripción */}
                  {(ap.location || ap.description) && (
                    <div className="border-t pt-3">
                      {ap.location && (
                        <p className="text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          {ap.location}
                        </p>
                      )}
                      {ap.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {ap.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex gap-2 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePing(ap.id)}
                      className="flex-1"
                    >
                      <Activity className="h-4 w-4 mr-1" />
                      Ping
                    </Button>
                    <Link href={`/aps/${ap.id}/edit`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(ap.id)}
                      className={ap.is_active ? "text-red-600" : "text-green-600"}
                    >
                      {ap.is_active ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(ap.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mensaje si no hay APs */}
          {aps.data.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay Access Points</h3>
                <p className="text-muted-foreground mb-4">
                  Comienza creando tu primer Access Point para tu red inalámbrica
                </p>
                <Link href="/create-ap">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear primer AP
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Paginación */}
          {aps.data.length > 0 && aps.links && (
            <div className="flex justify-center gap-2 mt-6">
              {aps.links.map((link: any, index: number) => (
                <Link
                  key={index}
                  href={link.url || '#'}
                  className={`px-3 py-2 text-sm rounded-md ${
                    link.active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border hover:bg-accent'
                  } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
