'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay if not dismissed before
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed && !isInstalled) {
          setShowPrompt(true);
        }
      }, 10000); // Show after 10 seconds
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowPrompt(false);
      setIsInstalled(true);
      localStorage.removeItem('pwa-install-dismissed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  }, []);

  // Don't show if already installed or on iOS without manual prompt
  if (isInstalled || (!deferredPrompt && !isIOS) || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Instalar DeliveryApp</h3>
              <p className="text-sm text-gray-600">Acceso rápido desde tu inicio</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Benefits */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Acceso instantáneo sin navegador</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Funciona sin conexión</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Notificaciones de pedidos</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {isIOS ? (
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-2">
                Para instalar: toca <span className="font-semibold">Compartir</span> y luego <span className="font-semibold">"Añadir a inicio"</span>
              </p>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-blue-600 font-semibold text-sm"
              >
                Entendido
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={handleDismiss}
                className="flex-1 py-2 text-gray-600 font-medium text-sm hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Ahora no
              </button>
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Instalar</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;