import { Head } from '@inertiajs/react';

export default function SEOHead() {
    return (
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
                
                /* Custom mobile breakpoints */
                @media (min-width: 360px) {
                    .xs\\:block { display: block; }
                    .xs\\:hidden { display: none; }
                }
                
                /* Mobile-first responsive design improvements */
                @media (max-width: 640px) {
                    .mobile-compact {
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                    }
                    
                    .mobile-text-sm {
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                }
            `}</style>
        </Head>
    );
}
