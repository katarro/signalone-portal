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

    return (
        <>
            <Head title="SignalOne Portal - Gestión Inteligente de Redes WiFi">
                <meta name="description" content="Portal cautivo profesional para gestión y monitoreo de redes WiFi con autenticación segura y análisis en tiempo real." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>
            
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">SignalOne</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
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
            <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Portal Cautivo
                            <span className="block text-blue-600">Inteligente</span>
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
                                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                                    >
                                        Comenzar Gratis
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Características Principales
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Todo lo que necesitas para gestionar tu infraestructura de red WiFi de manera profesional.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                ¿Por qué elegir SignalOne?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Interfaz intuitiva y moderna",
                                    "Monitoreo en tiempo real",
                                    "Configuración rápida y sencilla",
                                    "Soporte para múltiples protocolos",
                                    "Escalabilidad empresarial",
                                    "Soporte técnico 24/7"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <Check className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Dashboard en Vivo</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Access Points Online</span>
                                        <span className="font-semibold text-green-600">24/25</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Usuarios Conectados</span>
                                        <span className="font-semibold text-blue-600">847</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tráfico de Red</span>
                                        <span className="font-semibold text-purple-600">2.4 GB/h</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
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
                            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
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
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
