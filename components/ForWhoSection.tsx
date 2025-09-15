'use client';

import React from 'react';
import { Store, ShoppingBag, Truck, Users, TrendingUp, Clock } from 'lucide-react';

const ForWhoSection: React.FC = () => {
  const targetAudiences = [
    {
      icon: Store,
      title: 'Vendedores Locales',
      description: 'Tiendas de barrio, restaurantes familiares y emprendedores que quieren expandir su alcance.',
      benefits: [
        'Aumenta tus ventas hasta 300%',
        'Gestión simple de inventario',
        'Pagos seguros garantizados',
        'Sin costos de instalación'
      ],
      color: 'blue'
    },
    {
      icon: ShoppingBag,
      title: 'Compradores',
      description: 'Familias y personas que buscan productos frescos y auténticos de su comunidad.',
      benefits: [
        'Productos frescos del barrio',
        'Entrega en 15-30 minutos',
        'Precios justos y transparentes',
        'Apoya el comercio local'
      ],
      color: 'green'
    },
    {
      icon: Truck,
      title: 'Mensajeros',
      description: 'Personas que buscan generar ingresos flexibles transportando productos en su zona.',
      benefits: [
        'Horarios 100% flexibles',
        'Gana hasta $50,000 al día',
        'Rutas optimizadas',
        'Pagos diarios'
      ],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        title: 'text-green-900',
        button: 'bg-green-600 hover:bg-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        title: 'text-orange-900',
        button: 'bg-orange-600 hover:bg-orange-700'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="para-quien" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            ¿Para Quién Es DeliveryApp?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una plataforma diseñada para conectar y empoderar a toda la comunidad local
          </p>
        </div>

        {/* Target Audiences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {targetAudiences.map((audience, index) => {
            const Icon = audience.icon;
            const colors = getColorClasses(audience.color);
            
            return (
              <div
                key={index}
                className={`${colors.bg} rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold ${colors.title} mb-4`}>
                    {audience.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full ${colors.icon.replace('text-', 'bg-')} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 ${colors.button} text-white rounded-lg transition-colors duration-200 font-semibold`}>
                  Comenzar Ahora
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Impacto en la Comunidad
            </h3>
            <p className="text-lg text-gray-600">
              Números que demuestran nuestro compromiso con el crecimiento local
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Vendedores Activos</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Entregas Realizadas</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">22min</div>
              <div className="text-gray-600">Tiempo Promedio</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Store className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">15</div>
              <div className="text-gray-600">Barrios Cubiertos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;