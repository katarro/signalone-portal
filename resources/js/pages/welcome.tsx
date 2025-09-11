import { 
    Shield, 
    Users, 
    BarChart3, 
    Settings, 
    Globe,
    Wifi
} from 'lucide-react';

// Components
import Header from '@/components/welcome/Header';
import HeroSection from '@/components/welcome/HeroSection';
import FeaturesSection from '@/components/welcome/FeaturesSection';
import UseCasesSection from '@/components/welcome/UseCasesSection';
import BenefitsSection from '@/components/welcome/BenefitsSection';
import CTASection from '@/components/welcome/CTASection';
import FAQSection from '@/components/welcome/FAQSection';
import Footer from '@/components/welcome/Footer';
import SEOHead from '@/components/welcome/SEOHead';

export default function Welcome() {
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
            <SEOHead />
            <Header />
            <HeroSection stats={stats} />
            <FeaturesSection features={features} />
            <UseCasesSection />
            <BenefitsSection benefits={benefits} />
            <CTASection />
            <FAQSection />
            <Footer />
        </>
    );
}
