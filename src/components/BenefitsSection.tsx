import React from 'react';
import { Shield, BarChart3, Target } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      emoji: '🔐',
      title: 'Login Sin Contraseña',
      description: 'Accede al instante con solo tu WhatsApp.',
      color: 'blue'
    },
    {
      icon: BarChart3,
      emoji: '📊',
      title: 'Gestión Total',
      description: 'Controla tu inventario, pedidos y mensajeros.',
      color: 'green'
    },
    {
      icon: Target,
      emoji: '🎯',
      title: 'Enfoque Hiperlocal',
      description: 'Hecho por y para la gente de Barranquilla.',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'orange':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Beneficios Clave
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnología simple que hace la diferencia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const colorClasses = getColorClasses(benefit.color);
            
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div className={`${colorClasses} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl mb-4">{benefit.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.5%</div>
              <div className="text-gray-600">Entregas exitosas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">15 min</div>
              <div className="text-gray-600">Tiempo promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Soporte disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;