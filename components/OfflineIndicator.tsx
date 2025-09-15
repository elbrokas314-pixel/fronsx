'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        setShowIndicator(true);
      } else {
        // Show "back online" message briefly
        if (!isOnline) {
          setShowIndicator(true);
          setTimeout(() => setShowIndicator(false), 3000);
        }
      }
    };

    // Set initial status
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline]);

  if (!showIndicator) return null;

  return (
    <div className={`fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-in-right ${
      isOnline ? 'animate-slide-up' : ''
    }`}>
      <div className={`rounded-lg shadow-lg border p-4 flex items-center space-x-3 ${
        isOnline 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-orange-50 border-orange-200 text-orange-800'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isOnline ? 'bg-green-100' : 'bg-orange-100'
        }`}>
          {isOnline ? (
            <Wifi className="h-4 w-4" />
          ) : (
            <WifiOff className="h-4 w-4" />
          )}
        </div>
        
        <div className="flex-1">
          <p className="font-semibold text-sm">
            {isOnline ? '¡Conexión restaurada!' : 'Sin conexión a internet'}
          </p>
          <p className="text-xs opacity-90">
            {isOnline 
              ? 'Ya puedes realizar pedidos normalmente'
              : 'Algunas funciones pueden no estar disponibles'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;