import { register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Globe, Settings, Shield, Star, Users, Wifi } from 'lucide-react';

export default function UseCasesSection() {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className="py-20 bg-gradient-to-br from-[#0090F9] to-indigo-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Portal Cautivo para Cada Tipo de Negocio en Chile
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Soluciones especializadas de WiFi con portal cautivo para diferentes industrias
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                            <Wifi className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Portal Cautivo para Hoteles en Viña del Mar y Chile</h3>
                        <p className="text-gray-600 leading-relaxed">
                            WiFi con portal cautivo personalizado para hoteles, con integración a sistemas de gestión hotelera y términos específicos.
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">WiFi para Cafés en Santiago</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Portal cautivo con límite de tiempo y registro simple para cafeterías y espacios de coworking en la Región Metropolitana.
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Portal Cautivo para Centros Comerciales</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Solución empresarial con publicidad integrada y análisis de comportamiento para grandes espacios comerciales.
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">WiFi Corporativo con Autenticación</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Portal cautivo empresarial con autenticación Radius, integración Active Directory y políticas de seguridad avanzadas.
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Star className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Portal Cautivo para Eventos</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Solución temporal para eventos, conferencias y ferias con cupones de acceso y registro personalizado por evento.
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Configurar Portal Cautivo MikroTik</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Soporte técnico especializado para configuración en equipos MikroTik con autenticación SMS y múltiples idiomas.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-xl text-blue-100 mb-6">
                        ¿Buscas proveedores de portal cautivo en Chile?
                    </p>
                    {!auth.user && (
                        <Link
                            href={register()}
                            className="inline-flex items-center px-8 py-3 bg-white text-[#0090F9] rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium shadow-lg"
                        >
                            Solicitar Cotización
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
