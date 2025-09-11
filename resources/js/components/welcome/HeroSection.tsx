import { login } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
    stats: Array<{
        number: string;
        label: string;
    }>;
}

export default function HeroSection({ stats }: HeroProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className="relative overflow-hidden h-[90vh] flex items-center">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/storage/captive-portals/logos/wifi-publico.jpg')"
                }}
            >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-slate-800/75 to-gray-900/80"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-fade-in-up">
                    {/* Desktop Title */}
                    <h1 className="hidden sm:block text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Portal Cautivo WiFi
                        <span className="block text-[#0090F9]">Profesional</span>
                    </h1>
                    
                    {/* Mobile Title - More Concise */}
                    <h1 className="block sm:hidden text-3xl font-bold text-white mb-4">
                        <span className="text-[#0090F9]">Portal Cautivo</span>
                        <span className="block">WiFi Chile</span>
                    </h1>

                    {/* Desktop Description */}
                    <div className="hidden sm:block">
                        <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
                            El <strong className="text-white">mejor software de portal cautivo</strong> para hoteles, restaurantes y empresas en Chile. 
                            Autenticación WiFi segura con login personalizado y gestión completa de usuarios.
                        </p>
                        <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
                            ¿Qué es un portal cautivo? Es la solución que permite controlar el acceso a tu WiFi público, 
                            perfecta para centros comerciales, cafés y espacios empresariales.
                        </p>
                    </div>

                    {/* Mobile Description - Keywords Only */}
                    <div className="block sm:hidden mb-6">
                        <p className="text-lg text-blue-100 mb-3 font-medium">
                            <strong className="text-white">WiFi Seguro</strong> • <strong className="text-[#0090F9]">Hoteles</strong> • <strong className="text-white">Restaurantes</strong>
                        </p>
                        <p className="text-sm text-blue-200">
                            Autenticación profesional para empresas en Chile
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
                        {!auth.user && (
                            <>
                                <a
                                    href="https://wa.me/56948618975?text=Hola%2C%20quiero%20contratar%20el%20Portal%20Cautivo%20WiFi%20Profesional"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] hover:scale-105 transition-all duration-200 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl"
                                >
                                    <span className="hidden sm:inline">Contratar Portal Cautivo</span>
                                    <span className="sm:hidden">Contratar Ahora</span>
                                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                </a>
                            </>
                        )}
                    </div>

                    {/* Stats - Mobile Optimized */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4  mt-8 sm:mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-2xl sm:text-3xl font-bold text-[#0090F9] mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-200">{stat.number}</div>
                                <div className="text-xs sm:text-sm text-blue-100 leading-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full opacity-30 animate-pulse-slow"></div>
                <div className="absolute top-40 right-10 w-16 h-16 bg-white/10 rounded-full opacity-30 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full opacity-30 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>
        </section>
    );
}
