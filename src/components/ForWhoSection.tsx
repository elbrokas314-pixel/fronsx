import React from 'react';
import { ShoppingCart, Store, Bike } from 'lucide-react';

const ForWhoSection = () => {
  const roles = [
    {
      icon: ShoppingCart,
      emoji: '🛒',
      title: 'Compradores',
      benefits: [
        'Encuentra productos locales únicos',
        'Entrega rápida en tu barrio',
        'Apoya a los negocios locales',
        'Precios competitivos y frescos'
      ],
      color: 'blue'
    },
    {
      icon: Store,
      emoji: '🏪',
      title: 'Vendedores',
      benefits: [
        'Amplía tu alcance sin inversión',
        'Gestión simple de inventario',
        'Pagos seguros y puntuales',
        'Herramientas de análisis gratis'
      ],
      color: 'green'
    },
    {
      icon: Bike,
      emoji: '🚴',
      title: 'Mensajeros',
      benefits: [
        'Gana dinero en tu tiempo libre',
        'Rutas optimizadas y cercanas',
        'Pagos inmediatos por entrega',
        'Flexibilidad total de horarios'
      ],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-600',
          hover: 'hover:bg-blue-100'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-600',
          hover: 'hover:bg-green-100'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-600',
          hover: 'hover:bg-orange-100'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-600',
          hover: 'hover:bg-gray-100'
        };
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ¿Para Quién Es DeliveryApp?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una plataforma diseñada para conectar a toda la comunidad local
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const colorClasses = getColorClasses(role.color);
            const IconComponent = role.icon;
            
            return (
              <div
                key={index}
                className={`${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} border-2 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
              >
                <div className="text-center mb-6">
                  <div className={`${colorClasses.text} mx-auto mb-4 p-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-md`}>
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <div className="text-4xl mb-2">{role.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                </div>

                <ul className="space-y-3">
                  {role.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-3">
                      <div className={`${colorClasses.text} mt-1 flex-shrink-0`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button className={`w-full py-3 px-6 ${colorClasses.text} border-2 ${colorClasses.border} rounded-lg font-semibold hover:bg-white transition-colors duration-200`}>
                    Comenzar como {role.title.slice(0, -1)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;