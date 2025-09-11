import { register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    const { auth } = usePage<SharedData>().props;

    return (
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
    );
}
