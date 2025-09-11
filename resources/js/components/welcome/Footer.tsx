import { Wifi } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-[#0090F9] rounded-lg flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">SignalOne</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Portal cautivo profesional para la gestión inteligente de redes WiFi empresariales.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mb-4">Producto</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Características</li>
                            <li>Precios</li>
                            <li>Documentación</li>
                            <li>API</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mb-4">Soporte</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Centro de Ayuda</li>
                            <li>Contacto</li>
                            <li>Estado del Sistema</li>
                            <li>Comunidad</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SignalOne Portal. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
