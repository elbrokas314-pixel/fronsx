'use client';

import React, { useState, useCallback } from 'react';
import { ArrowRight, Smartphone, Clock, MapPin } from 'lucide-react';
import LoginView from './LoginView';

const CtaSection: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleOpenLogin = useCallback(() => setShowLogin(true), []);
  const handleCloseLogin = useCallback(() => setShowLogin(false), []);
  const handleLoginSuccess = useCallback(() => {
    setShowLogin(false);
  }, []);

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              ¿Listo Para Comenzar?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              Únete a la revolución del delivery local en Barranquilla
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Registro Rápido</h3>
                  <p className="opacity-90">Solo con tu WhatsApp</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">En 5 Minutos</h3>
                  <p className="opacity-90">Configuración completa</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">100% Local</h3>
                  <p className="opacity-90">Tu barrio, tu comunidad</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleOpenLogin}
                className="group px-10 py-5 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 text-lg font-semibold"
              >
                <span>Registrarse Ahora</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="px-10 py-5 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 text-lg font-semibold">
                Ver Demo
              </button>
            </div>

            <p className="mt-8 text-sm opacity-75">
              Sin costos ocultos • Soporte 24/7 • Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginView 
        isOpen={showLogin} 
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default CtaSection;