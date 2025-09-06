import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, User, Mail, Phone, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CheckoutViewProps {
  onBack: () => void;
  onOpenLogin: () => void;
  isAuthenticated: boolean;
  userProfile?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

interface DeliveryInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  neighborhood: string;
  instructions: string;
}

interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  neighborhood?: string;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ 
  onBack, 
  onOpenLogin, 
  isAuthenticated, 
  userProfile 
}) => {
  const {
    items,
    getSubtotal,
    getShippingCost,
    getTotal,
    clearCart
  } = useCartStore();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    neighborhood: '',
    instructions: ''
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Auto-fill form with user profile data when authenticated
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      setDeliveryInfo(prev => ({
        ...prev,
        fullName: userProfile.fullName || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || ''
      }));
    }
  }, [isAuthenticated, userProfile]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      onOpenLogin();
    }
  }, [isAuthenticated, onOpenLogin]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFullName = (name: string): boolean => {
    return name.trim().length >= 4;
  };

  const validateAddress = (address: string): boolean => {
    return address.trim().length >= 10;
  };

  const validateNeighborhood = (neighborhood: string): boolean => {
    return neighborhood.trim().length >= 3;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo(prev => ({ ...prev, [field]: value }));
    
    // Clear previous error
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    
    // Validate in real-time
    let error = '';
    switch (field) {
      case 'fullName':
        if (value && !validateFullName(value)) {
          error = 'El nombre debe tener mínimo 4 caracteres';
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          error = 'El teléfono debe tener exactamente 10 dígitos';
        }
        break;
      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Ingresa un email válido';
        }
        break;
      case 'address':
        if (value && !validateAddress(value)) {
          error = 'La dirección debe tener mínimo 10 caracteres';
        }
        break;
      case 'neighborhood':
        if (value && !validateNeighborhood(value)) {
          error = 'El barrio debe tener mínimo 3 caracteres';
        }
        break;
    }
    
    if (error) {
      setValidationErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle phone input (only numbers)
  const handlePhoneInput = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
    handleInputChange('phone', numbersOnly);
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!validateFullName(deliveryInfo.fullName)) {
      errors.fullName = 'El nombre es requerido (mínimo 4 caracteres)';
    }
    if (!validatePhone(deliveryInfo.phone)) {
      errors.phone = 'El teléfono es requerido (10 dígitos)';
    }
    if (!validateEmail(deliveryInfo.email)) {
      errors.email = 'El email es requerido y debe ser válido';
    }
    if (!validateAddress(deliveryInfo.address)) {
      errors.address = 'La dirección es requerida (mínimo 10 caracteres)';
    }
    if (!validateNeighborhood(deliveryInfo.neighborhood)) {
      errors.neighborhood = 'El barrio es requerido (mínimo 3 caracteres)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and show success
      clearCart();
      setOrderCompleted(true);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = getSubtotal();
  const shippingCost = getShippingCost();
  const total = getTotal();

  // Don't render if not authenticated (will redirect to login)
  if (!isAuthenticated) {
    return null;
  }

  // Order completed state
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tu pedido ha sido procesado exitosamente. Recibirás una confirmación por WhatsApp en unos minutos.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-2">Tiempo estimado de entrega:</p>
              <p className="text-xl font-bold text-blue-600">15-30 minutos</p>
            </div>
            <button
              onClick={onBack}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Continuar Comprando
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
            Finalizar Compra
          </h1>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al carrito</span>
            </button>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al carrito</span>
          </button>
          
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Finalizar Compra
          </h1>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Information Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Información de Entrega
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={deliveryInfo.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        validationErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  {validationErrors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{validationErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => handlePhoneInput(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="3001234567"
                      maxLength={10}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{validationErrors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={deliveryInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección completa *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      value={deliveryInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                        validationErrors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Calle 45 #23-67, Apartamento 301"
                      rows={2}
                    />
                  </div>
                  {validationErrors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{validationErrors.address}</span>
                    </p>
                  )}
                </div>

                {/* Neighborhood */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Barrio *
                  </label>
                  <input
                    type="text"
                    value={deliveryInfo.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      validationErrors.neighborhood ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="El Prado"
                  />
                  {validationErrors.neighborhood && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{validationErrors.neighborhood}</span>
                    </p>
                  )}
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instrucciones adicionales
                  </label>
                  <textarea
                    value={deliveryInfo.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Ej: Tocar el timbre, casa de color azul..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Método de Pago
                </h2>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nequi"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-medium text-gray-900">Nequi</div>
                      <div className="text-sm text-gray-500">Pago rápido con tu celular</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium text-gray-900">Tarjeta de Crédito</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit_card"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="font-medium text-gray-900">Tarjeta Débito</div>
                      <div className="text-sm text-gray-500">Débito Visa, Mastercard</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pse"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <div className="font-medium text-gray-900">PSE</div>
                      <div className="text-sm text-gray-500">Transferencia bancaria</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💵</span>
                    <div>
                      <div className="font-medium text-gray-900">Pago en Efectivo</div>
                      <div className="text-sm text-gray-500">Paga al recibir tu pedido</div>
                    </div>
                  </div>
                </label>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 flex items-center space-x-2">
                  <span className="text-lg">🔒</span>
                  <span>Pagos seguros procesados por ePayco</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del Pedido
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.url_imagen}
                      alt={item.product.nombre}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.product.nombre}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x {formatPrice(item.product.precio)}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(item.product.precio * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 mb-4" />

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Envío</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Entrega</span>
                </div>
                <p className="text-sm text-blue-700">
                  Tiempo estimado: 15-30 minutos
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Confirmar Pedido</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Al confirmar tu pedido aceptas nuestros términos y condiciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;