import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { router } from '@inertiajs/react';

interface AppearanceTabProps {
    data: Record<string, any>;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
}

export default function AppearanceTab({ data, setData, errors }: AppearanceTabProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const processFile = async (file: File) => {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido.');
            return;
        }

        // Validar tamaño (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('El archivo es demasiado grande. El tamaño máximo es 2MB.');
            return;
        }

        setIsUploading(true);

        try {
            // Crear FormData para enviar el archivo
            const formData = new FormData();
            formData.append('logo', file);

            // Hacer la llamada al servidor para subir el archivo
            const response = await fetch('/captive-portals/upload-logo', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const result = await response.json();

            if (result.success) {
                setUploadedImage(result.url);
                setData('logo_url', result.url);
                alert('Logo subido exitosamente');
            } else {
                alert(result.message || 'Error al subir la imagen');
            }

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen. Por favor intenta de nuevo.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        await processFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            await processFile(files[0]);
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        setData('logo_url', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const displayImage = uploadedImage || data.logo_url;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Personalización Visual</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <Label>Logo del Portal</Label>
                            
                            {/* Área de subida de imagen */}
                            <div className="space-y-3">
                                {displayImage ? (
                                    <div className="relative inline-block">
                                        <img 
                                            src={displayImage} 
                                            alt="Logo preview" 
                                            className="max-h-20 max-w-48 object-contain border rounded-lg bg-white p-2"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                            onClick={handleRemoveImage}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div 
                                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                            isDragOver 
                                                ? 'border-primary bg-primary/5' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                        onClick={handleFileSelect}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <ImageIcon className={`mx-auto h-12 w-12 mb-3 ${
                                            isDragOver ? 'text-primary' : 'text-gray-400'
                                        }`} />
                                        <p className="text-sm text-gray-600 mb-2">
                                            {isDragOver 
                                                ? 'Suelta la imagen aquí' 
                                                : 'Haz clic para subir una imagen o arrastra aquí'
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG hasta 2MB. Recomendado: 200x80px
                                        </p>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleFileSelect}
                                        disabled={isUploading}
                                        className="flex items-center gap-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        {isUploading ? 'Subiendo...' : 'Subir Imagen'}
                                    </Button>
                                    
                                    {displayImage && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleRemoveImage}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700"
                                        >
                                            <X className="h-4 w-4" />
                                            Quitar
                                        </Button>
                                    )}
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Campo de URL alternativo */}
                            <div className="space-y-2 border-t pt-4">
                                <Label htmlFor="logo_url">O ingresa una URL del logo</Label>
                                <Input
                                    id="logo_url"
                                    value={data.logo_url}
                                    onChange={(e) => {
                                        setData('logo_url', e.target.value);
                                        setUploadedImage(null);
                                    }}
                                    placeholder="https://ejemplo.com/logo.png"
                                />
                                <p className="text-xs text-muted-foreground">
                                    URL externa del logo (opcional si subiste una imagen)
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="background_color">Color de Fondo *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="background_color"
                                        value={data.background_color}
                                        onChange={(e) => setData('background_color', e.target.value)}
                                        placeholder="#ffffff"
                                    />
                                    <input
                                        type="color"
                                        value={data.background_color}
                                        onChange={(e) => setData('background_color', e.target.value)}
                                        className="w-12 h-10 border rounded cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="primary_color">Color Primario *</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="primary_color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        placeholder="#007bff"
                                    />
                                    <input
                                        type="color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        className="w-12 h-10 border rounded cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="custom_css">CSS Personalizado</Label>
                            <Textarea
                                id="custom_css"
                                value={data.custom_css}
                                onChange={(e) => setData('custom_css', e.target.value)}
                                placeholder="/* CSS personalizado */"
                                rows={8}
                                className="font-mono"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa del Portal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div 
                            className="border rounded-lg p-6 min-h-[400px] flex flex-col items-center justify-center space-y-4"
                            style={{ 
                                backgroundColor: data.background_color,
                                color: data.background_color === '#ffffff' ? '#1f2937' : '#ffffff'
                            }}
                        >
                            {data.logo_url ? (
                                <img 
                                    src={displayImage} 
                                    alt="Logo" 
                                    className="max-h-16 max-w-48 object-contain"
                                />
                            ) : (
                                <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                                    Su Logo
                                </div>
                            )}

                            <h1 className="text-2xl font-bold text-center">
                                {data.login_page_title || 'Acceso WiFi'}
                            </h1>

                            {data.welcome_message && (
                                <p className="text-center max-w-sm">
                                    {data.welcome_message}
                                </p>
                            )}

                            <div className="w-full max-w-sm space-y-3">
                                {data.auth_method === 'user_password' && (
                                    <>
                                        <input 
                                            type="text" 
                                            placeholder="Usuario" 
                                            className="w-full p-3 border rounded-lg text-gray-800"
                                            disabled 
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Contraseña" 
                                            className="w-full p-3 border rounded-lg text-gray-800"
                                            disabled 
                                        />
                                    </>
                                )}
                                
                                {data.auth_method === 'voucher' && (
                                    <input 
                                        type="text" 
                                        placeholder="Código de acceso" 
                                        className="w-full p-3 border rounded-lg text-center font-mono text-gray-800"
                                        disabled 
                                    />
                                )}

                                {data.require_terms && (
                                    <div className="flex items-start space-x-2 text-sm">
                                        <input type="checkbox" className="mt-1" disabled />
                                        <span>Acepto los términos y condiciones</span>
                                    </div>
                                )}

                                <button 
                                    className="w-full p-3 rounded-lg font-medium text-white transition-colors"
                                    style={{ backgroundColor: data.primary_color }}
                                    disabled
                                >
                                    {data.auth_method === 'terms_only' ? 'Acceder a Internet' : 
                                     data.auth_method === 'social' ? 'Conectar con Redes Sociales' :
                                     data.auth_method === 'sms' ? 'Enviar Código SMS' : 'Iniciar Sesión'}
                                </button>
                            </div>

                            <div className="text-xs opacity-75 text-center">
                                Sesión válida por {Math.floor(data.session_timeout / 60)}h {data.session_timeout % 60}min
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
