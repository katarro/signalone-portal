import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Wifi, 
    Shield, 
    Users, 
    BarChart3, 
    Settings, 
    Lock,
    Globe,
    Smartphone,
    Zap,
    ChevronRight,
    Check,
    Star,
    ArrowRight
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: Shield,
            title: "Seguridad Avanzada",
            description: "Protección de red con autenticación robusta y control de acceso granular."
        },
        {
            icon: Wifi,
            title: "Gestión de Access Points",
            description: "Monitoreo en tiempo real y administración centralizada de todos tus APs."
        },
        {
            icon: Users,
            title: "Control de Usuarios",
            description: "Gestión completa de usuarios con diferentes niveles de acceso y permisos."
        },
        {
            icon: BarChart3,
            title: "Análisis y Reportes",
            description: "Dashboard avanzado con métricas detalladas y reportes en tiempo real."
        },
        {
            icon: Settings,
            title: "Configuración Flexible",
            description: "Personalización completa de políticas de red y configuraciones de seguridad."
        },
        {
            icon: Globe,
            title: "Multi-Zona",
            description: "Soporte para múltiples zonas y VLANs con gestión independiente."
        }
    ];

    const stats = [
        { number: "99.9%", label: "Uptime" },
        { number: "500+", label: "APs Gestionados" },
        { number: "10k+", label: "Usuarios Activos" },
        { number: "24/7", label: "Monitoreo" }
    ];

    const benefits = [
        {
            title: "Configuración Rápida",
            description: "Implementación en minutos, no en días. Interface intuitiva para administradores."
        },
        {
            title: "Escalabilidad Empresarial",
            description: "Desde pequeñas oficinas hasta campus universitarios. Crece con tu organización."
        },
        {
            title: "Soporte Técnico",
            description: "Equipo especializado disponible para asistencia técnica y consultoría."
        },
        {
            title: "Actualizaciones Automáticas",
            description: "Mantente siempre actualizado con las últimas funcionalidades y parches de seguridad."
        }
    ];

    return (
        <>
            <Head title="SignalOne Portal - Gestión Inteligente de Redes WiFi">
                <meta name="description" content="Portal cautivo profesional para gestión y monitoreo de redes WiFi con autenticación segura y análisis en tiempo real." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
                <style>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.5;
                        }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.6s ease-out;
                    }
                    .animate-pulse-slow {
                        animation: pulse 2s infinite;
                    }
                `}</style>
            </Head>
            
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/storage/captive-portals/logos/1757537778_Logo SignalOne.jpeg" 
                                alt="SignalOne Logo" 
                                className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="text-xl font-bold text-gray-900">SignalOne</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center px-4 py-2 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] transition-colors"
                                >
                                    Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="bg-[#0090F9] text-white px-4 py-2 rounded-lg hover:bg-[#0080e6] transition-colors text-sm font-medium"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Portal Cautivo
                            <span className="block text-[#0090F9]">Inteligente</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Gestiona, monitorea y asegura tu red WiFi con nuestra plataforma avanzada. 
                            Control total sobre access points, usuarios y políticas de seguridad.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center px-8 py-3 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] hover:scale-105 transition-all duration-200 text-lg font-medium shadow-lg hover:shadow-xl"
                                    >
                                        Comenzar Gratis
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-lg font-medium"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="text-3xl font-bold text-[#0090F9] mb-2 group-hover:scale-110 transition-transform duration-200">{stat.number}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse-slow"></div>
                    <div className="absolute top-40 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                </div>
            </section>

            {/* Features Section */}
                        {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Características Principales
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Todo lo que necesitas para gestionar tu infraestructura de red de manera profesional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-[#0090F9] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-center w-12 h-12 bg-[#ffffff] bg-opacity-10 rounded-lg mb-6 group-hover:bg-opacity-20 transition-all duration-300">
                                    <feature.icon className="w-6 h-6 text-[#0090F9]" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                ¿Por qué elegir nuestro Portal Cautivo?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Maximiza la seguridad y eficiencia de tu red con herramientas diseñadas para profesionales
                            </p>
                            
                            <div className="space-y-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-6 h-6 bg-[#0090F9] rounded-full flex items-center justify-center mt-1">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#0090F9] mb-2">99.9%</div>
                                        <div className="text-sm text-gray-600">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#0090F9] mb-2">24/7</div>
                                        <div className="text-sm text-gray-600">Monitoreo</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#0090F9] mb-2">256-bit</div>
                                        <div className="text-sm text-gray-600">Encriptación</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#0090F9] mb-2">1000+</div>
                                        <div className="text-sm text-gray-600">Usuarios</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0090F9] bg-opacity-10 rounded-full"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500 bg-opacity-10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#0090F9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¿Listo para optimizar tu red WiFi?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Únete a miles de empresas que confían en SignalOne para gestionar su infraestructura de red.
                    </p>
                    
                    {!auth.user && (
                        <Link
                            href={register()}
                            className="inline-flex items-center px-8 py-3 bg-white text-[#0090F9] rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
                        >
                            Comenzar Ahora
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
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
        </>
    );
}
