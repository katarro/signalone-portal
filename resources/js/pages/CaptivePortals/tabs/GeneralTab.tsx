import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';

interface GeneralTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function GeneralTab({ data, setData, errors }: GeneralTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Portal *</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Portal WiFi Corporativo"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Descripción del portal cautivo"
                        rows={3}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.description}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="mr-2"
                        />
                        Portal activo
                    </Label>
                    <p className="text-xs text-muted-foreground">
                        El portal estará disponible inmediatamente después de crearlo
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
