import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdvancedTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function AdvancedTab({ data, setData, errors }: AdvancedTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Configuración Avanzada</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="listening_port">Puerto de Escucha *</Label>
                    <Input
                        id="listening_port"
                        type="number"
                        value={data.listening_port}
                        onChange={(e) => setData('listening_port', parseInt(e.target.value))}
                        placeholder="8080"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="max_clients">Máximo de Clientes</Label>
                    <Input
                        id="max_clients"
                        type="number"
                        value={data.max_clients || ''}
                        onChange={(e) => setData('max_clients', e.target.value ? parseInt(e.target.value) : 0)}
                        placeholder="Sin límite"
                    />
                </div>

                <div className="space-y-2">
                    <Label>
                        <input
                            type="checkbox"
                            checked={data.force_https}
                            onChange={(e) => setData('force_https', e.target.checked)}
                            className="mr-2"
                        />
                        Forzar HTTPS
                    </Label>
                </div>

                <div className="space-y-2">
                    <Label>
                        <input
                            type="checkbox"
                            checked={data.enable_logging}
                            onChange={(e) => setData('enable_logging', e.target.checked)}
                            className="mr-2"
                        />
                        Habilitar logs de conexión
                    </Label>
                </div>
            </CardContent>
        </Card>
    );
}
