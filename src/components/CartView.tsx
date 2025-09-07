import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart, Package } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartViewProps {
  onBack: () => void;
  onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onBack, onCheckout }) => {
  const {
    items,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    getTotalItems,
    getSubtotal,
    getShippingCost,
    getTotal
  } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost();
  const total = getTotal();
  const totalItems = getTotalItems();

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al catálogo</span>
          </button>

          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-8">
              Explora nuestros productos y añade algunos a tu carrito
            </p>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Explorar Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4">
            Mi Carrito de Compras
          </h1>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al catálogo</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Package className="h-5 w-5" />
              <span>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.url_imagen}
                      alt={item.product.nombre}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {item.product.nombre}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {item.product.tienda.nombre}
                        </p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatPrice(item.product.precio)}
                        </p>
                      </div>

                      {/* Quantity controls and remove button */}
                      <div className="flex flex-col items-end space-y-3">
                        <button
                          onClick={() => removeProduct(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                          title="Eliminar producto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decrementQuantity(item.product.id)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          
                          <span className="text-lg font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => incrementQuantity(item.product.id)}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Subtotal for this item */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(item.product.precio * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Costo de Envío</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                  </span>
                </div>

                {shippingCost === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    ¡Felicidades! Tu pedido califica para envío gratis
                  </div>
                )}

                {subtotal < 30000 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Añade {formatPrice(30000 - subtotal)} más para envío gratis
                  </div>
                )}

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-900">Total a Pagar</span>
                  <span className="font-bold text-gray-900 text-xl">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
              >
                Finalizar Compra
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Envío estimado: 15-30 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;