import React from 'react';
import { ArrowRight, Play, Package } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Tu ciudad,{' '}
              <span className="text-blue-600">a tu puerta</span>.{' '}
              <span className="text-green-600">Rápido</span> y{' '}
              <span className="text-orange-500">local</span>.
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              La plataforma que conecta a los mejores vendedores de tu barrio contigo.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span className="font-semibold">Registrarse Gratis</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span className="font-semibold">Ver Productos</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="text-2xl font-bold text-blue-600">500+</span>
                <span>Vendedores activos</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="text-2xl font-bold text-green-600">10K+</span>
                <span>Entregas realizadas</span>
              </div>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl h-96 lg:h-[500px] flex items-center justify-center border-2 border-dashed border-blue-200">
              <div className="text-center">
                <Package className="h-24 w-24 text-blue-400 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Hero Image / Illustration</p>
                <p className="text-gray-400 text-sm">Delivery app mockup</p>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-orange-100 rounded-full p-4 animate-bounce">
              <Package className="h-8 w-8 text-orange-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-100 rounded-full p-4 animate-pulse">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;