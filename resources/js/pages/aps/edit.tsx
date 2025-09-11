import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Wifi, Settings, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { toast } from "sonner";

interface Ap {
  id: number;
  name: string;
  ssid: string;
  ip_address: string;
  mac_address: string;
  description?: string;
  vlan_id?: number;
  zona_id?: number;
  location?: string;
  is_active: boolean;
}

interface EditApProps {
  ap: Ap;
  vlans: Array<{
    id: number;
    name: string;
    vlan_id: number;
    zona?: {
      name: string;
    };
  }>;
  zonas: Array<{
    id: number;
    name: string;
  }>;
}

interface EditApForm {
  name: string;
  ssid: string;
  ip_address: string;
  mac_address: string;
  description: string;
  vlan_id: string;
  zona_id: string;
  location: string;
  is_active: boolean;
}

export default function EditAp({ ap, vlans, zonas }: EditApProps) {
  const { data, setData, put, processing, errors } = useForm<EditApForm>({
    name: ap.name,
    ssid: ap.ssid,
    ip_address: ap.ip_address,
    mac_address: ap.mac_address,
    description: ap.description || "",
    vlan_id: ap.vlan_id?.toString() || "none",
    zona_id: ap.zona_id?.toString() || "none",
    location: ap.location || "",
    is_active: ap.is_active,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    
    // Convertir "none" valores a empty string para el backend
    const submitData = {
      ...data,
      vlan_id: data.vlan_id === 'none' ? '' : data.vlan_id,
      zona_id: data.zona_id === 'none' ? '' : data.zona_id,
    };
    
    // Actualizar el formulario con los datos transformados
    Object.keys(submitData).forEach(key => {
      setData(key as keyof EditApForm, (submitData as any)[key]);
    });
    
    put(`/aps/${ap.id}`, {
      onSuccess: () => {
        toast.success("Access Point actualizado", {
          description: `El AP "${data.name}" ha sido actualizado exitosamente.`,
        });
      },
      onError: (errors) => {
        console.error('Error updating AP:', errors);
        toast.error("Error al actualizar", {
          description: "No se pudo actualizar el Access Point. Por favor, verifica los datos e intenta nuevamente.",
        });
      }
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Link href="/aps" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Access Points
            </Link>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Editar AP</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="max-w-4xl mx-auto w-full">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wifi className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Editar Access Point</CardTitle>
                <CardDescription>
                  Modifica la configuración del Access Point "{ap.name}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submit} className="space-y-8">
                  {/* Información básica */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-medium">Información Básica</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre del AP *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          placeholder="Ej: AP-Plaza-Armas-01"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ssid">SSID *</Label>
                        <Input
                          id="ssid"
                          type="text"
                          value={data.ssid}
                          onChange={(e) => setData('ssid', e.target.value)}
                          placeholder="Ej: WiFi-Municipal"
                          className={errors.ssid ? 'border-red-500' : ''}
                        />
                        {errors.ssid && <p className="text-sm text-red-500">{errors.ssid}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ip_address">Dirección IP *</Label>
                        <Input
                          id="ip_address"
                          type="text"
                          value={data.ip_address}
                          onChange={(e) => setData('ip_address', e.target.value)}
                          placeholder="192.168.1.100"
                          className={errors.ip_address ? 'border-red-500' : ''}
                        />
                        {errors.ip_address && <p className="text-sm text-red-500">{errors.ip_address}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mac_address">Dirección MAC *</Label>
                        <Input
                          id="mac_address"
                          type="text"
                          value={data.mac_address}
                          onChange={(e) => setData('mac_address', e.target.value)}
                          placeholder="AA:BB:CC:DD:EE:FF"
                          className={errors.mac_address ? 'border-red-500' : ''}
                        />
                        {errors.mac_address && <p className="text-sm text-red-500">{errors.mac_address}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Descripción del Access Point..."
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                  </div>

                  {/* Ubicación y Asignación */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-medium">Ubicación y Asignación</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zona">Zona</Label>
                        <Select onValueChange={(value) => setData('zona_id', value)} value={data.zona_id}>
                          <SelectTrigger className={errors.zona_id ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Selecciona una zona" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin zona</SelectItem>
                            {zonas.map((zona) => (
                              <SelectItem key={zona.id} value={zona.id.toString()}>
                                {zona.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.zona_id && <p className="text-sm text-red-500">{errors.zona_id}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vlan">VLAN Asociada</Label>
                        <Select onValueChange={(value) => setData('vlan_id', value)} value={data.vlan_id}>
                          <SelectTrigger className={errors.vlan_id ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Selecciona una VLAN" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin VLAN</SelectItem>
                            {vlans.map((vlan) => (
                              <SelectItem key={vlan.id} value={vlan.id.toString()}>
                                VLAN {vlan.vlan_id} - {vlan.name}
                                {vlan.zona && <span className="text-gray-500"> ({vlan.zona.name})</span>}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.vlan_id && <p className="text-sm text-red-500">{errors.vlan_id}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Ubicación Específica</Label>
                        <Input
                          id="location"
                          type="text"
                          value={data.location}
                          onChange={(e) => setData('location', e.target.value)}
                          placeholder="Ej: Segundo piso, oficina 201"
                          className={errors.location ? 'border-red-500' : ''}
                        />
                        {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Estado */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="is_active">Access Point Activo</Label>
                        <p className="text-sm text-gray-500">
                          El AP estará disponible para conexiones
                        </p>
                      </div>
                      <Checkbox
                        id="is_active"
                        checked={data.is_active}
                        onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Link href="/aps">
                      <Button type="button" variant="outline">
                        Cancelar
                      </Button>
                    </Link>
                    <Button type="submit" disabled={processing}>
                      {processing ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
