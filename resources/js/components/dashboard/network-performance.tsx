import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Timer, Zap } from 'lucide-react';

interface NetworkPerformanceProps {
    performance: {
        avg_response_time: number;
        total_bandwidth_allocated: number;
        peak_hours: Array<{
            hour: string;
            usage: number;
        }>;
    };
}

export function NetworkPerformance({ performance }: NetworkPerformanceProps) {
    const getResponseTimeStatus = (time: number) => {
        if (time <= 50) return { status: 'Excelente', color: 'bg-green-100 text-green-800' };
        if (time <= 100) return { status: 'Bueno', color: 'bg-yellow-100 text-yellow-800' };
        if (time <= 200) return { status: 'Regular', color: 'bg-orange-100 text-orange-800' };
        return { status: 'Lento', color: 'bg-red-100 text-red-800' };
    };

    const responseTimeStatus = getResponseTimeStatus(performance.avg_response_time);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Rendimiento de Red <i>Testing</i>
                </CardTitle>
                <CardDescription>Métricas de rendimiento y uso de la red</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Tiempo de respuesta promedio */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Tiempo de respuesta promedio</span>
                        </div>
                        <Badge className={responseTimeStatus.color}>
                            {responseTimeStatus.status}
                        </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                        {performance.avg_response_time.toFixed(1)}ms
                    </div>
                </div>

                {/* Horas pico */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Uso en horas pico</span>
                    </div>
                    {performance.peak_hours.map((hour, index) => (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>{hour.hour}</span>
                                <span className="font-medium">{hour.usage}%</span>
                            </div>
                            <Progress value={hour.usage} className="h-2" />
                        </div>
                    ))}
                </div>

                {/* Métricas adicionales */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {performance.total_bandwidth_allocated || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">Mbps asignados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            99.8%
                        </div>
                        <div className="text-xs text-muted-foreground">Uptime general</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
