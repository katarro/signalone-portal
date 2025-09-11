import { login, register } from '@/routes';
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
        <section className="pt-24 pb-12 relative overflow-hidden">
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
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Portal Cautivo WiFi
                        <span className="block text-[#0090F9]">Profesional</span>
                    </h1>
                    <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
                        El <strong className="text-white">mejor software de portal cautivo</strong> para hoteles, restaurantes y empresas en Chile. 
                        Autenticación WiFi segura con login personalizado y gestión completa de usuarios.
                    </p>
                    <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
                        ¿Qué es un portal cautivo? Es la solución que permite controlar el acceso a tu WiFi público, 
                        perfecta para centros comerciales, cafés y espacios empresariales.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        {!auth.user && (
                            <>
                                <Link
                                    href={register()}
                                    className="inline-flex items-center px-8 py-3 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] hover:scale-105 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl"
                                >
                                    Contratar Portal Cautivo
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>
                                <Link
                                    href={login()}
                                    className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-200 text-lg font-medium backdrop-blur-sm"
                                >
                                    Ver Demo
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-3xl font-bold text-[#0090F9] mb-2 group-hover:scale-110 transition-transform duration-200">{stat.number}</div>
                                <div className="text-blue-100">{stat.label}</div>
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
