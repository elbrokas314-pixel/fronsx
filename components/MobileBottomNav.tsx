'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, User, BarChart3 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuth } from '@/lib/hooks/useAuth';
import LoginView from './LoginView';

const MobileBottomNav: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleOpenLogin = useCallback(() => setShowLogin(true), []);
  const handleCloseLogin = useCallback(() => setShowLogin(false), []);
  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname.startsWith('/products');
    }
    if (path === '/dashboard') {
      return pathname.startsWith('/dashboard');
    }
    return pathname === path;
  };

  const getActiveClasses = (path: string) => {
    return isActive(path)
      ? 'text-blue-600 bg-blue-50'
      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50';
  };

  return (
    <>
      {/* Spacer para evitar que el contenido se oculte detrás de la barra */}
      <div className="h-20 md:hidden"></div>
      
      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className={`flex items-center justify-around h-16 px-4 ${
          isAuthenticated && user?.role === 'vendedor' ? 'grid grid-cols-4' : 'grid grid-cols-3'
        }`}>
          {/* Home/Products */}
          <Link
            href="/products"
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${getActiveClasses('/')}`}
          >
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </Link>

          {/* Carrito */}
          <Link
            href="/cart"
            className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${getActiveClasses('/cart')}`}
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6 mb-1" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Carrito</span>
          </Link>

          {/* Dashboard - Solo para vendedores */}
          {isAuthenticated && user?.role === 'vendedor' && (
            <Link
              href="/dashboard"
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${getActiveClasses('/dashboard')}`}
            >
              <BarChart3 className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Dashboard</span>
            </Link>
          )}

          {/* Perfil */}
          <button
            onClick={handleOpenLogin}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginView 
        isOpen={showLogin} 
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default MobileBottomNav;