import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
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
    );
}
