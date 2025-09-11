import React from 'react';
import { ArrowRight, Play, Package } from 'lucide-react';

interface HeroSectionProps {
  onOpenLogin: () => void;
  onShowProducts: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLogin, onShowProducts }) => {
  const heroImg =
    'https://ik.imagekit.io/deliveryapp/Static%20IMGs/generated-image%20(1).png?updatedAt=1757092925816&tr=e-upscale';

  return (
    <section className="pt-16 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Tu ciudad, <span className="text-blue-600">a tu puerta</span>.{' '}
              <span className="text-green-600">Rápido</span> y{' '}
              <span className="text-orange-500">local</span>.
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              La plataforma que conecta a los mejores vendedores de tu barrio contigo.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onOpenLogin}
                className="group px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span className="font-semibold">Registrarse Gratis</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={onShowProducts}
                className="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
              >
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

          {/* Visual */}
          <div className="relative">
            <div className="rounded-2xl h-96 lg:h-[500px] overflow-hidden border-2 border-blue-200">
              <img
                src={heroImg}
                alt="Delivery app hero"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
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
