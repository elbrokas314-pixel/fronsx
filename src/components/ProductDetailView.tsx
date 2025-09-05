import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Store, Loader2, AlertCircle, Check } from 'lucide-react';
import { Product } from '../types/Product';
import { useCartStore } from '../store/cartStore';

interface ProductDetailViewProps {
  productId: string;
  onBack: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId, onBack }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const addProduct = useCartStore((state) => state.addProduct);

  // Mock data for demonstration
  const mockProducts: Record<string, Product> = {
    '1': {
      id: '1',
      nombre: 'Arepa de Huevo Tradicional',
      precio: 5000,
      url_imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Comida',
      tienda: {
        nombre: 'Arepas Doña María',
        calificacion: 4.8
      },
      calificacion: 4.9,
      descripcion: 'Deliciosa arepa de huevo tradicional barranquillera, preparada con masa de maíz fresca y huevo de gallina criolla. Frita a la perfección hasta obtener una textura crujiente por fuera y suave por dentro. Un clásico de la gastronomía costeña que no puede faltar en tu mesa.'
    },
    '2': {
      id: '2',
      nombre: 'Jugo de Corozo Natural',
      precio: 3500,
      url_imagen: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Bebidas',
      tienda: {
        nombre: 'Jugos El Paraíso',
        calificacion: 4.6
      },
      calificacion: 4.7,
      descripcion: 'Refrescante jugo natural de corozo, fruta tropical típica de la región Caribe. Preparado sin azúcar añadida, conservando todo su sabor natural y propiedades nutritivas. Rico en vitaminas y antioxidantes, perfecto para hidratarte en los días calurosos de Barranquilla.'
    },
    '3': {
      id: '3',
      nombre: 'Empanadas de Pollo (3 unidades)',
      precio: 8000,
      url_imagen: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
      categoria: 'Comida',
      tienda: {
        nombre: 'Empanadas La Costeña',
        calificacion: 4.9
      },
      calificacion: 4.8,
      descripcion: 'Trio de empanadas crujientes rellenas de pollo desmechado sazonado con especias tradicionales. Masa dorada y crujiente que encierra un relleno jugoso y lleno de sabor. Acompañadas con ají casero. Perfectas para compartir o disfrutar como comida completa.'
    }
  };

  // Simulate API call
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProduct = mockProducts[productId];
        if (!mockProduct) {
          throw new Error('Producto no encontrado');
        }
        
        setProduct(mockProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate adding to cart delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addProduct(product, quantity);
    setIsAddingToCart(false);
    setShowAddedMessage(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Cargando producto...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al catálogo</span>
          </button>
          
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error al cargar el producto
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Volver al catálogo</span>
        </button>

        {/* Success message */}
        {showAddedMessage && (
          <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in-right">
            <Check className="h-5 w-5" />
            <span>¡Producto añadido al carrito!</span>
          </div>
        )}

        {/* Product detail */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="relative">
              <img
                src={product.url_imagen}
                alt={product.nombre}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>

            {/* Product info */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.nombre}
                </h1>
                
                {/* Store info */}
                <div className="flex items-center space-x-2 mb-4">
                  <Store className="h-5 w-5 text-gray-400" />
                  <span className="text-lg text-gray-600">{product.tienda.nombre}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.calificacion)}
                  </div>
                  <span className="text-gray-600">
                    ({product.calificacion.toFixed(1)})
                  </span>
                </div>

                {/* Price */}
                <div className="text-4xl font-bold text-green-600 mb-6">
                  {formatPrice(product.precio)}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              {/* Quantity selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Cantidad
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center text-lg font-semibold border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="99"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 99}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Añadiendo...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Añadir al Carrito</span>
                  </>
                )}
              </button>

              {/* Total price preview */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(product.precio * quantity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;