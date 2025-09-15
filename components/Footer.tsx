'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Acerca de Nosotros', href: '/about' },
      { name: 'Cómo Funciona', href: '/how-it-works' },
      { name: 'Carreras', href: '/careers' },
      { name: 'Prensa', href: '/press' }
    ],
    support: [
      { name: 'Centro de Ayuda', href: '/help' },
      { name: 'Contacto', href: '/contact' },
      { name: 'Términos de Servicio', href: '/terms' },
      { name: 'Política de Privacidad', href: '/privacy' }
    ],
    business: [
      { name: 'Para Vendedores', href: '/sellers' },
      { name: 'Para Mensajeros', href: '/couriers' },
      { name: 'API para Desarrolladores', href: '/api' },
      { name: 'Programa de Afiliados', href: '/affiliates' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/deliveryapp' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/deliveryapp' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/deliveryapp' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/deliveryapp' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">DeliveryApp</span>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                La plataforma líder de delivery hiperlocal en Barranquilla. 
                Conectamos vendedores, compradores y mensajeros para fortalecer 
                las comunidades locales.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">Barranquilla, Colombia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">+57 300 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">hola@deliveryapp.co</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Empresa</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Soporte</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Negocios</h3>
              <ul className="space-y-3">
                {footerLinks.business.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Mantente Conectado
              </h3>
              <p className="text-gray-300">
                Recibe las últimas noticias, ofertas especiales y actualizaciones de tu comunidad local.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} DeliveryApp. Todos los derechos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Descarga la App</h4>
            <p className="text-gray-300 mb-6">
              Disponible próximamente en App Store y Google Play
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
                <div className="text-xs text-gray-400 mb-1">Próximamente en</div>
                <div className="font-semibold">App Store</div>
              </div>
              <div className="bg-gray-800 px-6 py-3 rounded-lg border border-gray-700">
                <div className="text-xs text-gray-400 mb-1">Próximamente en</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;