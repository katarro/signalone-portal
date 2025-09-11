import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, ThumbsUp } from 'lucide-react';

export default function CaptivePortalGoodbye() {
    const handleReconnect = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
            <Head title="Sesión Cerrada - WiFi Portal" />
            
            <div className="w-full max-w-md">
                <Card className="shadow-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                            <WifiOff className="h-8 w-8 text-orange-600" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                Sesión Cerrada
                            </CardTitle>
                            <CardDescription className="text-base mt-2">
                                Has cerrado sesión correctamente
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Mensaje de agradecimiento */}
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                            <ThumbsUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="font-medium text-blue-900 mb-1">
                                ¡Gracias por usar nuestro WiFi!
                            </p>
                            <p className="text-sm text-blue-700">
                                Esperamos que hayas tenido una buena experiencia
                            </p>
                        </div>

                        {/* Información */}
                        <div className="text-center space-y-3">
                            <p className="text-gray-600">
                                Tu conexión a Internet ha sido desconectada de forma segura.
                            </p>
                            <p className="text-sm text-gray-500">
                                Puedes volver a conectarte cuando lo desees.
                            </p>
                        </div>

                        {/* Botón para reconectar */}
                        <Button
                            onClick={handleReconnect}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="lg"
                        >
                            Conectar Nuevamente
                        </Button>

                        {/* Footer */}
                        <div className="text-xs text-gray-400 text-center pt-4 border-t">
                            <p>Portal Cautivo - Signal One</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
