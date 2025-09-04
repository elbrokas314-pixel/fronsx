import React from 'react';
import { Star, Store } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.url_imagen}
          alt={product.nombre}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.nombre}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-green-600 mb-3">
          {formatPrice(product.precio)}
        </div>

        {/* Store Info */}
        <div className="flex items-center space-x-2 mb-3">
          <Store className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600 truncate">
            {product.tienda.nombre}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(product.calificacion)}
            <span className="text-sm text-gray-500 ml-1">
              ({product.calificacion.toFixed(1)})
            </span>
          </div>
          
          {/* Category badge */}
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {product.categoria}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;