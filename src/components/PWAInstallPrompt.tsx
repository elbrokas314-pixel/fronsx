import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface PWAInstallPromptProps {
  onClose?: () => void;
}

const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onClose }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detectar si ya está instalado como PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Escuchar evento de instalación
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Mostrar prompt después de un delay para mejor UX
      setTimeout(() => {
        if (!standalone) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Limpiar listener
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA installed');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
    if (onClose) {
      onClose();
    }
  };

  // No mostrar si ya está instalado o no hay prompt disponible
  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-slide-up">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">
                Instalar DeliveryApp
              </h3>
              <p className="text-xs text-gray-600">
                Acceso rápido desde tu pantalla de inicio
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <span>Funciona sin conexión</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <span>Notificaciones de pedidos</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            <span>Acceso más rápido</span>
          </div>
        </div>

        {isIOS ? (
          <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Para instalar en iOS:</p>
            <p>1. Toca el botón de compartir en Safari</p>
            <p>2. Selecciona "Añadir a pantalla de inicio"</p>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleClose}
              className="flex-1 py-2 px-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
            >
              Ahora no
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Instalar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;