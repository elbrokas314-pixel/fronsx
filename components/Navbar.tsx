'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Package, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuth } from '@/lib/hooks/useAuth';
import LoginView from './LoginView';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleOpenLogin = useCallback(() => setShowLogin(true), []);
  const handleCloseLogin = useCallback(() => setShowLogin(false), []);
  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0 pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DeliveryApp</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {pathname === '/' ? (
                <>
                  <a href="#para-quien" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    ¿Para quíen es?
                  </a>
                  <a href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Beneficios
                  </a>
                  <a href="#testimonios" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Testimonios
                  </a>
                </>
              ) : (
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  ← Volver al inicio
                </Link>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Dashboard - Solo para vendedores */}
              {isAuthenticated && user?.role === 'vendedor' && (
                <Link 
                  href="/dashboard"
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-blue-50 text-blue-600 border-blue-300'
                      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              
              <Link 
                href="/cart"
                className={`relative px-4 py-2 border rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                  isActive('/cart')
                    ? 'bg-blue-50 text-blue-600 border-blue-300'
                    : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              <Link 
                href="/products"
                className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  isActive('/products') || pathname.startsWith('/products/')
                    ? 'bg-blue-50 text-blue-600 border-blue-300'
                    : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Explorar Productos
              </Link>
              <button 
                onClick={handleOpenLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Ingresar / Registrarse
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {pathname === '/' ? (
                  <>
                    <a
                      href="#para-quien"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      ¿Para quíen es?
                    </a>
                    <a
                      href="#beneficios"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Beneficios
                    </a>
                    <a
                      href="#testimonios"
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Testimonios
                    </a>
                  </>
                ) : (
                  <Link
                    href="/"
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    ← Volver al inicio
                  </Link>
                )}
                <div className="pt-4 space-y-2">
                  {/* Dashboard móvil - Solo para vendedores */}
                  {isAuthenticated && user?.role === 'vendedor' && (
                    <Link
                      href="/dashboard"
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleOpenLogin();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Ingresar / Registrarse
                  </button>
                </div>
              </div>
            </div>
          )}
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

export default Navbar;