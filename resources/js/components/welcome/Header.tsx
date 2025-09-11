import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <img 
                            src="/storage/captive-portals/logos/1757537778_Logo SignalOne.jpeg" 
                            alt="SignalOne Logo" 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                        />
                        <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:block">SignalOne</span>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 xs:hidden">S1</span>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
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

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center px-3 py-2 bg-[#0090F9] text-white rounded-lg hover:bg-[#0080e6] transition-colors text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href={login()}
                                    className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded text-sm font-medium transition-colors"
                                >
                                    Inicio
                                </Link>
                                <Link
                                    href={register()}
                                    className="bg-[#0090F9] text-white px-3 py-2 rounded-lg hover:bg-[#0080e6] transition-colors text-sm font-medium"
                                >
                                    Registro
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
