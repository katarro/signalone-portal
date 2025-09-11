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
            title: "Autenticación WiFi Portal Cautivo",
            description: "Login WiFi seguro con autenticación SMS, redes sociales y términos y condiciones personalizables."
        },
        {
            icon: Wifi,
            title: "WiFi Público con Portal Cautivo", 
            description: "Solución completa para hoteles, restaurantes y centros comerciales con redirección automática."
        },
        {
            icon: Users,
            title: "Portal Cautivo con Registro de Usuarios",
            description: "Gestión completa de usuarios con límite de tiempo y cupones de acceso para eventos."
        },
        {
            icon: BarChart3,
            title: "Integración con Google Analytics",
            description: "Análisis avanzado del comportamiento de usuarios y métricas de conexión en tiempo real."
        },
        {
            icon: Settings,
            title: "Portal Cautivo Personalizado",
            description: "Configuración flexible con soporte múltiples idiomas y integración con CRM empresarial."
        },
        {
            icon: Globe,
            title: "Portal Cautivo para Empresas",
            description: "Solución empresarial con autenticación Radius y soporte para MikroTik y hardware profesional."
        }
    ];

    const stats = [
        { number: "99.9%", label: "Disponibilidad Garantizada" },
        { number: "100+", label: "APs Soportados por Sistema" },
        { number: "5k+", label: "Conexiones Simultáneas" },
        { number: "24/7", label: "Soporte Técnico" }
    ];

    const benefits = [
        {
            title: "Portal Cautivo en Santiago y Chile",
            description: "Empresa líder en proveedores de portal cautivo en Chile con precios competitivos y soporte local."
        },
        {
            title: "Portal Cautivo con Publicidad",
            description: "Monetiza tu WiFi con portal cautivo personalizado que incluye espacios publicitarios y pago en línea."
        },
        {
            title: "¿Cómo Crear un Portal Cautivo Seguro?",
            description: "Implementación profesional que cumple normativas legales chilenas con hardware certificado."
        },
        {
            title: "Portal Cautivo para Hoteles en Viña del Mar",
            description: "Solución especializada para hoteles, cafés y restaurantes con integración a sistemas hoteleros."
        }
    ];

    return (
        <>
            <Head title="Portal Cautivo WiFi Profesional | SignalOne - Mejor Software 2025">
                <meta name="description" content="Portal cautivo WiFi profesional para hoteles, restaurantes y empresas. Autenticación segura, gestión de usuarios y análisis en tiempo real. Mejor software de portal cautivo en Chile y Latinoamérica." />
                
                {/* Keywords para SEO */}
                <meta name="keywords" content="portal cautivo wifi, que es un portal cautivo, como funciona portal cautivo, wifi con portal cautivo, autenticacion wifi portal cautivo, login wifi portal cautivo, wifi publico portal cautivo, soluciones portal cautivo, portal cautivo hoteles, portal cautivo restaurantes, portal cautivo empresas, mejor software portal cautivo, portal cautivo Chile, portal cautivo Santiago, proveedores portal cautivo" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://signalone.cl/" />
                <meta property="og:title" content="Portal Cautivo WiFi Profesional | SignalOne" />
                <meta property="og:description" content="Portal cautivo WiFi profesional para hoteles, restaurantes y empresas en Chile. Autenticación segura y gestión completa de usuarios." />
                <meta property="og:image" content="/storage/captive-portals/logos/1757537778_Logo SignalOne.jpeg" />
                <meta property="og:site_name" content="SignalOne" />
                <meta property="og:locale" content="es_CL" />
                
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://signalone.cl/" />
                <meta property="twitter:title" content="Portal Cautivo WiFi Profesional | SignalOne" />
                <meta property="twitter:description" content="Portal cautivo WiFi profesional para hoteles, restaurantes y empresas en Chile. Autenticación segura y gestión completa de usuarios." />
                <meta property="twitter:image" content="/storage/captive-portals/logos/1757537778_Logo SignalOne.jpeg" />
                
                {/* SEO técnico */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href="https://signalone.cl/" />
                <meta name="author" content="SignalOne" />
                <meta name="geo.region" content="CL" />
                <meta name="geo.placename" content="Chile" />
                <meta name="language" content="es" />
                
                {/* Structured Data - Organization */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "SignalOne",
                    "url": "https://signalone.cl",
                    "logo": "https://signalone.cl/storage/captive-portals/logos/1757537778_Logo SignalOne.jpeg",
                    "description": "Portal cautivo WiFi profesional para hoteles, restaurantes y empresas",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "CL",
                        "addressRegion": "Región Metropolitana"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "availableLanguage": ["Spanish"]
                    },
                    "sameAs": [
                        "https://www.linkedin.com/company/signalone",
                        "https://www.facebook.com/signalone"
                    ]
                })}
                </script>
                
                {/* Structured Data - Software */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "SignalOne Portal Cautivo",
                    "applicationCategory": "NetworkingApplication",
                    "operatingSystem": "Web-based",
                    "description": "Portal cautivo WiFi profesional para gestión de redes empresariales",
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "CLP",
                        "availability": "https://schema.org/InStock"
                    },
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.8",
                        "ratingCount": "150"
                    },
                    "creator": {
                        "@type": "Organization",
                        "name": "SignalOne"
                    }
                })}
                </script>
                
                {/* Structured Data - FAQ */}
                <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "¿Qué es un portal cautivo WiFi?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Un portal cautivo WiFi es una página web que aparece automáticamente cuando los usuarios se conectan a una red WiFi, requiriendo autenticación antes de permitir el acceso a internet."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Cómo funciona un portal cautivo?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "El portal cautivo intercepta todas las solicitudes HTTP y redirige a los usuarios a una página de login hasta que completen la autenticación requerida."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Es legal usar un portal cautivo en Chile?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sí, es completamente legal usar portales cautivos en Chile, especialmente para redes WiFi públicas en hoteles, restaurantes y empresas."
                            }
                        }
                    ]
                })}
                </script>
                
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
                            Portal Cautivo WiFi
                            <span className="block text-[#0090F9]">Profesional</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
                            El <strong>mejor software de portal cautivo</strong> para hoteles, restaurantes y empresas en Chile. 
                            Autenticación WiFi segura con login personalizado y gestión completa de usuarios.
                        </p>
                        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
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
                                        className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 text-lg font-medium"
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

            {/* Use Cases Section */}
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

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Preguntas Frecuentes sobre Portal Cautivo WiFi
                        </h2>
                        <p className="text-xl text-gray-600">
                            Resolvemos las dudas más comunes sobre cómo funciona un portal cautivo
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Qué es un portal cautivo WiFi y cómo funciona?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Un portal cautivo WiFi es una página web que aparece automáticamente cuando los usuarios se conectan a una red WiFi. 
                                Funciona interceptando todas las solicitudes de internet y redirigiendo a los usuarios a una página de login hasta 
                                que completen la autenticación requerida. Es ideal para hoteles, restaurantes y WiFi público.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Es legal usar un portal cautivo en Chile?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Sí, es completamente legal usar portales cautivos en Chile. De hecho, es recomendado para WiFi público 
                                en empresas, hoteles y restaurantes, ya que permite cumplir con normativas de seguridad y protección de datos.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Cómo crear un portal cautivo para mi negocio?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Con SignalOne puedes crear un portal cautivo personalizado en minutos. Ofrecemos configuración para MikroTik, 
                                autenticación SMS, integración con redes sociales y soporte técnico especializado en Chile.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Qué hardware necesito para implementar un portal cautivo?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Nuestro portal cautivo es compatible con la mayoría de equipos de red profesionales incluyendo MikroTik, 
                                Ubiquiti y otros. Ofrecemos soporte para configuración con Radius y múltiples access points.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Cuánto cuesta implementar un portal cautivo WiFi?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Ofrecemos precios competitivos desde planes básicos para pequeños negocios hasta soluciones empresariales. 
                                Contacta con nuestros proveedores de portal cautivo en Santiago para una cotización personalizada.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                ¿Cómo monetizar un portal cautivo con publicidad?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Nuestro portal cautivo incluye opciones de monetización con espacios publicitarios personalizables, 
                                pago en línea y integración con sistemas de marketing para maximizar tus ingresos.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-6">
                            ¿Necesitas más información sobre nuestras soluciones de portal cautivo para empresas?
                        </p>
                        {!auth.user && (
                            <Link
                                href={register()}
                                className="inline-flex items-center px-6 py-3 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] transition-colors font-medium"
                            >
                                Solicitar Consulta Gratuita
                            </Link>
                        )}
                    </div>
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
