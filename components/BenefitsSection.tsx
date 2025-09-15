'use client';

import React from 'react';
import { Zap, Shield, Heart, Smartphone, MapPin, Clock, DollarSign, Users } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Súper Rápido',
      description: 'Entregas en 15-30 minutos directo a tu puerta',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Pagos protegidos y vendedores verificados',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Apoya lo Local',
      description: 'Cada compra fortalece tu comunidad',
      color: 'red'
    },
    {
      icon: Smartphone,
      title: 'Fácil de Usar',
      description: 'Interfaz intuitiva para todas las edades',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Hiperlocal',
      description: 'Productos frescos de tu barrio',
      color: 'purple'
    },
    {
      icon: Clock,
      title: '24/7 Disponible',
      description: 'Compra cuando quieras, como quieras',
      color: 'indigo'
    },
    {
      icon: DollarSign,
      title: 'Precios Justos',
      description: 'Sin comisiones ocultas ni sobrecostos',
      color: 'emerald'
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Conecta con vecinos y comerciantes',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            ¿Por Qué Elegir DeliveryApp?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más que una app de delivery, somos el puente que conecta tu barrio
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colorClasses = getColorClasses(benefit.color);
            
            return (
              <div
                key={index}
                className="group text-center hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 ${colorClasses} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Tecnología que Transforma Barrios
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestra plataforma utiliza algoritmos inteligentes para optimizar rutas, 
                predecir demanda y conectar de manera eficiente a toda la comunidad local.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Rutas Inteligentes</h4>
                    <p className="text-gray-600">Optimización automática para entregas más rápidas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Predicción de Demanda</h4>
                    <p className="text-gray-600">Los vendedores saben qué productos preparar</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Matching Perfecto</h4>
                    <p className="text-gray-600">Conectamos compradores con los mejores vendedores</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-16"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-20"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-28 mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;