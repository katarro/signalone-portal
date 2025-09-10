import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Network } from 'lucide-react';

interface ZonaStatsProps {
    zonas: Array<{
        id: number;
        name: string;
        location?: string;
        aps_count: number;
        vlans_count: number;
    }>;
}

export function ZonaStats({ zonas }: ZonaStatsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Distribución por Zonas</CardTitle>
                <CardDescription>Top 5 zonas con más infraestructura</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {zonas.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No hay zonas configuradas</p>
                        </div>
                    ) : (
                        zonas.map((zona, index) => (
                            <div key={zona.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                        ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                                          index === 1 ? 'bg-gray-100 text-gray-800' : 
                                          index === 2 ? 'bg-orange-100 text-orange-800' : 
                                          'bg-blue-100 text-blue-800'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="font-medium">{zona.name}</div>
                                        {zona.location && (
                                            <div className="text-sm text-muted-foreground">{zona.location}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">
                                        {zona.aps_count} APs
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                        {zona.vlans_count} VLANs
                                    </Badge>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
