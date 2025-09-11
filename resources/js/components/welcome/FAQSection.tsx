import { register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function FAQSection() {
    const { auth } = usePage<SharedData>().props;

    const faqs = [
        {
            question: "¿Qué es un portal cautivo WiFi y cómo funciona?",
            answer: "Un portal cautivo WiFi es una página web que aparece automáticamente cuando los usuarios se conectan a una red WiFi. Funciona interceptando todas las solicitudes de internet y redirigiendo a los usuarios a una página de login hasta que completen la autenticación requerida. Es ideal para hoteles, restaurantes y WiFi público."
        },
        {
            question: "¿Es legal usar un portal cautivo en Chile?",
            answer: "Sí, es completamente legal usar portales cautivos en Chile. De hecho, es recomendado para WiFi público en empresas, hoteles y restaurantes, ya que permite cumplir con normativas de seguridad y protección de datos."
        },
        {
            question: "¿Cómo crear un portal cautivo para mi negocio?",
            answer: "Con SignalOne puedes crear un portal cautivo personalizado en minutos. Ofrecemos configuración para MikroTik, autenticación SMS, integración con redes sociales y soporte técnico especializado en Chile."
        },
        {
            question: "¿Qué hardware necesito para implementar un portal cautivo?",
            answer: "Nuestro portal cautivo es compatible con la mayoría de equipos de red profesionales incluyendo MikroTik, Ubiquiti y otros. Ofrecemos soporte para configuración con Radius y múltiples access points."
        },
        {
            question: "¿Cuánto cuesta implementar un portal cautivo WiFi?",
            answer: "Ofrecemos precios competitivos desde planes básicos para pequeños negocios hasta soluciones empresariales. Contacta con nuestros proveedores de portal cautivo en Santiago para una cotización personalizada."
        },
        {
            question: "¿Cómo monetizar un portal cautivo con publicidad?",
            answer: "Nuestro portal cautivo incluye opciones de monetización con espacios publicitarios personalizables, pago en línea y integración con sistemas de marketing para maximizar tus ingresos."
        }
    ];

    return (
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
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
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
    );
}
