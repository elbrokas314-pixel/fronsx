import React, { useState } from 'react';
import { Menu, X, Package, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
  onShowProducts: () => void;
  onShowHome: () => void;
  onShowCart: () => void;
  currentView: 'home' | 'products' | 'product-detail' | 'cart';
  cartItemsCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onOpenLogin, 
  onShowProducts, 
  onShowHome, 
  onShowCart,
  currentView,
  cartItemsCount 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={onShowHome}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DeliveryApp</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {currentView === 'home' ? (
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
                <button
                  onClick={onShowHome}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  ← Volver al inicio
                </button>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={onShowCart}
                className={`relative px-4 py-2 border rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
                  currentView === 'cart'
                    ? 'bg-blue-50 text-blue-600 border-blue-300'
                    : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Carrito</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>
              <button 
                onClick={onShowProducts}
                className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  currentView === 'products'
                    ? 'bg-blue-50 text-blue-600 border-blue-300'
                    : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Explorar Productos
              </button>
              <button 
                onClick={onOpenLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Ingresar / Registrarse
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {currentView === 'home' ? (
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
                  <button
                    onClick={() => {
                      onShowHome();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    ← Volver al inicio
                  </button>
                )}
                <div className="pt-4 space-y-2">
                  <button 
                    onClick={() => {
                      onShowCart();
                      setIsOpen(false);
                    }}
                    className={`relative w-full px-4 py-2 border rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 ${
                      currentView === 'cart'
                        ? 'bg-blue-50 text-blue-600 border-blue-300'
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Carrito</span>
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                      </span>
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      onShowProducts();
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 border rounded-lg transition-colors duration-200 ${
                      currentView === 'products'
                        ? 'bg-blue-50 text-blue-600 border-blue-300'
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Explorar Productos
                  </button>
                  <button 
                    onClick={() => {
                      onOpenLogin();
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
    </>
  );
};

export default Navbar;
