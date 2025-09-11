import { Check } from 'lucide-react';

interface Benefit {
    title: string;
    description: string;
}

interface BenefitsProps {
    benefits: Benefit[];
}

export default function BenefitsSection({ benefits }: BenefitsProps) {
    return (
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
    );
}
