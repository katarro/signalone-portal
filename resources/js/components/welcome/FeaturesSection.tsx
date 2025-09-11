import { LucideIcon } from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeaturesProps {
    features: Feature[];
}

export default function FeaturesSection({ features }: FeaturesProps) {
    return (
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
    );
}
