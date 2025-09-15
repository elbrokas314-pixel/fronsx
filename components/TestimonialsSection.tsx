'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'María González',
      role: 'Dueña de Tienda',
      location: 'El Prado',
      rating: 5,
      text: 'Desde que uso DeliveryApp, mis ventas aumentaron 250%. Ahora llego a clientes que nunca hubiera alcanzado antes.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Cliente Frecuente',
      location: 'Boston',
      rating: 5,
      text: 'La comodidad de tener productos frescos de mi barrio en 20 minutos es increíble. Los precios son justos y apoyo a mi comunidad.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Ana Rodríguez',
      role: 'Mensajera',
      location: 'Riomar',
      rating: 5,
      text: 'Trabajo con horarios flexibles y genero buenos ingresos. La app es fácil de usar y las rutas están bien optimizadas.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Luis Herrera',
      role: 'Restaurante Familiar',
      location: 'Centro',
      rating: 5,
      text: 'Nuestro restaurante familiar ahora tiene delivery propio. Los clientes están felices y nosotros también.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Patricia Silva',
      role: 'Madre de Familia',
      location: 'Villa Country',
      rating: 5,
      text: 'Perfecto para cuando no puedo salir con los niños. Productos frescos del barrio directo a casa.',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Roberto Castro',
      role: 'Emprendedor',
      location: 'Altos del Prado',
      rating: 5,
      text: 'Lancé mi negocio de jugos naturales a través de DeliveryApp. En 3 meses ya tengo clientes regulares.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonios" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Lo Que Dice Nuestra Comunidad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Historias reales de personas que han transformado su forma de comprar y vender
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="h-8 w-8 text-blue-600 opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150';
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-sm p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Satisfacción Garantizada
            </h3>
            <p className="text-lg text-gray-600">
              Los números hablan por sí solos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">4.9</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(5)}
              </div>
              <div className="text-gray-600">Calificación Promedio</div>
              <div className="text-sm text-gray-500 mt-1">Basado en 2,500+ reseñas</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Clientes Satisfechos</div>
              <div className="text-sm text-gray-500 mt-1">Recomiendan DeliveryApp</div>
            </div>

            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Entregas a Tiempo</div>
              <div className="text-sm text-gray-500 mt-1">Dentro del tiempo estimado</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para Ser Parte de la Historia?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Únete a miles de personas que ya transformaron su forma de comprar y vender
          </p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg">
            Comenzar Ahora
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;