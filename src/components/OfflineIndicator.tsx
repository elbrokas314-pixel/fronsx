import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3">
      <WifiOff className="h-5 w-5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-sm">Sin conexión</p>
        <p className="text-xs opacity-90">
          Algunas funciones pueden no estar disponibles
        </p>
      </div>
    </div>
  );
};

export default OfflineIndicator;