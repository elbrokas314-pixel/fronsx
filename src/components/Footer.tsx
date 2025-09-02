import React from 'react';
import { Package, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Package className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">DeliveryApp</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              La plataforma líder de delivery hiperlocal en Barranquilla. 
              Conectamos vendedores, compradores y mensajeros para fortalecer 
              nuestra comunidad local.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <a href="#como-funciona" className="text-gray-400 hover:text-white transition-colors duration-200">
                  ¿Cómo funciona?
                </a>
              </li>
              <li>
                <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#testimonios" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">Barranquilla, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">hola@deliveryapp.co</span>
              </li>
            </ul>

            {/* Support hours */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-300 mb-2">Horarios de Soporte</h4>
              <p className="text-gray-400 text-sm">
                Lunes - Domingo<br />
                6:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 DeliveryApp. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Términos
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;