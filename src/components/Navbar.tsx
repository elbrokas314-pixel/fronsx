import React, { useState } from 'react';
import { Menu, X, Package } from 'lucide-react';
import LoginView from './LoginView';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DeliveryApp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#como-funciona" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              ¿Cómo funciona?
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Beneficios
            </a>
            <a href="#testimonios" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Testimonios
            </a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Explorar Productos
            </button>
            <button 
              onClick={() => setShowLogin(true)}
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
              <a
                href="#como-funciona"
                className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                ¿Cómo funciona?
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
              <div className="pt-4 space-y-2">
                <button className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Explorar Productos
                </button>
                <button 
                  onClick={() => {
                    setShowLogin(true);
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
      
      <LoginView isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
};

export default Navbar;