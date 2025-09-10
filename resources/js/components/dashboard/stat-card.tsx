import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    iconColor?: string;
}

export function StatCard({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    className,
    iconColor = "text-blue-600" 
}: StatCardProps) {
    return (
        <Card className={cn("", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={cn("h-4 w-4", iconColor)} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
                {trend && (
                    <div className="flex items-center mt-1">
                        <span
                            className={cn(
                                "text-xs font-medium",
                                trend.isPositive ? "text-green-600" : "text-red-600"
                            )}
                        >
                            {trend.isPositive ? "+" : ""}{trend.value}%
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">vs mes anterior</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
