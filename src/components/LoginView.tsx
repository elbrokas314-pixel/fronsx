import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Phone, Mail, Lock, User, Check, AlertCircle } from 'lucide-react';

interface LoginViewProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  phone: string;
  email: string;
  password: string;
  fullName: string;
  role: 'comprador' | 'vendedor';
}

interface ValidationErrors {
  phone?: string;
  email?: string;
  password?: string;
  fullName?: string;
}

type LoginView = 'phone' | 'otp' | 'recovery';
type Tab = 'login' | 'register';

const LoginView: React.FC<LoginViewProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [currentView, setCurrentView] = useState<LoginView>('phone');
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    email: '',
    password: '',
    fullName: '',
    role: 'comprador'
  });
  const [otpCode, setOtpCode] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [resendCooldown, setResendCooldown] = useState(0);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySubmitted, setRecoverySubmitted] = useState(false);

  // Cooldown timer for resend code
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab('login');
      setCurrentView('phone');
      setFormData({
        phone: '',
        email: '',
        password: '',
        fullName: '',
        role: 'comprador'
      });
      setOtpCode('');
      setValidationErrors({});
      setResendCooldown(0);
      setRecoveryEmail('');
      setRecoverySubmitted(false);
    }
  }, [isOpen]);

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateFullName = (name: string): boolean => {
    return name.trim().length >= 4;
  };

  // Real-time validation
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear previous error
    setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    
    // Validate in real-time
    let error = '';
    switch (field) {
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
      case 'password':
        if (value && !validatePassword(value)) {
          error = 'La contraseña debe tener mínimo 6 caracteres';
        }
        break;
      case 'fullName':
        if (value && !validateFullName(value)) {
          error = 'El nombre debe tener mínimo 4 caracteres';
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

  // Handle form submissions
  const handleSendCode = () => {
    if (validatePhone(formData.phone)) {
      setCurrentView('otp');
      setResendCooldown(60);
    }
  };

  const handleOtpSubmit = () => {
    if (otpCode.length === 6) {
      // Simulate login success
      console.log('Login successful');
      onClose();
    }
  };

  const handleRegister = () => {
    const errors: ValidationErrors = {};
    
    if (!validateFullName(formData.fullName)) {
      errors.fullName = 'El nombre debe tener mínimo 4 caracteres';
    }
    if (!validatePhone(formData.phone)) {
      errors.phone = 'El teléfono debe tener exactamente 10 dígitos';
    }
    if (!validateEmail(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }
    if (!validatePassword(formData.password)) {
      errors.password = 'La contraseña debe tener mínimo 6 caracteres';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Simulate registration success
      console.log('Registration successful', formData);
      onClose();
    }
  };

  const handleRecoverySubmit = () => {
    if (validateEmail(recoveryEmail)) {
      setRecoverySubmitted(true);
    }
  };

  const handleResendCode = () => {
    if (resendCooldown === 0) {
      setResendCooldown(60);
      // Simulate resend
      console.log('Code resent');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentView === 'recovery' ? 'Recuperar Cuenta' : 'Bienvenido'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Recovery View */}
          {currentView === 'recovery' && (
            <div className="space-y-6">
              <button
                onClick={() => setCurrentView('phone')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver</span>
              </button>

              {!recoverySubmitted ? (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Recuperar tu cuenta
                    </h3>
                    <p className="text-gray-600">
                      Ingresa tu email y te enviaremos instrucciones para recuperar tu cuenta.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleRecoverySubmit}
                    disabled={!validateEmail(recoveryEmail)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                  >
                    Enviar Instrucciones
                  </button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    ¡Instrucciones enviadas!
                  </h3>
                  <p className="text-gray-600">
                    Revisa tu email para continuar con la recuperación de tu cuenta.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Login/Register Tabs */}
          {currentView !== 'recovery' && (
            <>
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'login'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === 'register'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Registrarse
                </button>
              </div>

              {/* Login Tab Content */}
              {activeTab === 'login' && (
                <>
                  {/* Phone Input View */}
                  {currentView === 'phone' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Ingresa tu teléfono
                        </h3>
                        <p className="text-gray-600">
                          Te enviaremos un código de verificación por WhatsApp
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número de teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.phone}
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

                      <button
                        onClick={handleSendCode}
                        disabled={!validatePhone(formData.phone)}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                      >
                        Enviar Código
                      </button>

                      <div className="text-center">
                        <button
                          onClick={() => setCurrentView('recovery')}
                          className="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
                        >
                          ¿Olvidaste tu cuenta?
                        </button>
                      </div>
                    </div>
                  )}

                  {/* OTP Verification View */}
                  {currentView === 'otp' && (
                    <div className="space-y-6">
                      <button
                        onClick={() => setCurrentView('phone')}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver</span>
                      </button>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Verificar código
                        </h3>
                        <p className="text-gray-600">
                          Hemos enviado un código a{' '}
                          <span className="font-semibold text-gray-900">
                            +57 {formData.phone}
                          </span>
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Código de verificación
                        </label>
                        <input
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-2xl tracking-widest"
                          placeholder="000000"
                          maxLength={6}
                        />
                      </div>

                      <button
                        onClick={handleOtpSubmit}
                        disabled={otpCode.length !== 6}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold"
                      >
                        Ingresar
                      </button>

                      <div className="text-center">
                        <button
                          onClick={handleResendCode}
                          disabled={resendCooldown > 0}
                          className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed text-sm transition-colors duration-200"
                        >
                          {resendCooldown > 0 
                            ? `Reenviar código (${resendCooldown}s)` 
                            : 'Reenviar código'
                          }
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Register Tab Content */}
              {activeTab === 'register' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Crear cuenta nueva
                    </h3>
                    <p className="text-gray-600">
                      Únete a la comunidad de delivery local
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
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
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
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

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          validationErrors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Mínimo 6 caracteres"
                      />
                    </div>
                    {validationErrors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{validationErrors.password}</span>
                      </p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      ¿Cómo quieres usar DeliveryApp?
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="comprador"
                          checked={formData.role === 'comprador'}
                          onChange={(e) => handleInputChange('role', e.target.value as 'comprador' | 'vendedor')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">🛒</span>
                          <div>
                            <div className="font-medium text-gray-900">Comprador</div>
                            <div className="text-sm text-gray-500">Quiero comprar productos locales</div>
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="vendedor"
                          checked={formData.role === 'vendedor'}
                          onChange={(e) => handleInputChange('role', e.target.value as 'comprador' | 'vendedor')}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">🏪</span>
                          <div>
                            <div className="font-medium text-gray-900">Vendedor</div>
                            <div className="text-sm text-gray-500">Quiero vender mis productos</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleRegister}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    Crear Cuenta
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Al registrarte, aceptas nuestros{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Términos y Condiciones
                    </a>{' '}
                    y{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700">
                      Política de Privacidad
                    </a>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginView;