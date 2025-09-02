import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: 5,
      text: "DeliveryApp cambió mi forma de comprar. Ahora puedo encontrar productos frescos de mi barrio en minutos. ¡Increíble servicio!",
      author: "María González",
      role: "Compradora frecuente",
      location: "El Prado, Barranquilla"
    },
    {
      rating: 5,
      text: "Como vendedor, he triplicado mis ventas gracias a DeliveryApp. La plataforma es súper fácil de usar y el soporte es excelente.",
      author: "Carlos Mendoza",
      role: "Vendedor de frutas",
      location: "Centro, Barranquilla"
    },
    {
      rating: 5,
      text: "Trabajo como mensajero en mis tiempos libres y genero ingresos extra. Las rutas son eficientes y los pagos siempre llegan a tiempo.",
      author: "Alejandro Ruiz",
      role: "Mensajero",
      location: "Norte, Barranquilla"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonios" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros Usuarios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Historias reales de nuestra comunidad en Barranquilla
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4">
                <Quote className="h-8 w-8 text-gray-300" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional social proof */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">4.9/5</span>
              <span>promedio</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💬</span>
              <span className="font-semibold">1,250+</span>
              <span>reseñas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;