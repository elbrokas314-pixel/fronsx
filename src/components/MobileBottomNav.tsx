import React from 'react';
import { Home, ShoppingCart, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: 'home' | 'products' | 'product-detail' | 'cart' | 'checkout';
  cartItemsCount: number;
  onShowHome: () => void;
  onShowProducts: () => void;
  onShowCart: () => void;
  onOpenLogin: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  cartItemsCount,
  onShowHome,
  onShowProducts,
  onShowCart,
  onOpenLogin
}) => {
  const isActive = (view: string) => {
    if (view === 'home') {
      return currentView === 'home';
    }
    if (view === 'products') {
      return currentView === 'products' || currentView === 'product-detail';
    }
    if (view === 'cart') {
      return currentView === 'cart' || currentView === 'checkout';
    }
    return false;
  };

  const getActiveClasses = (view: string) => {
    return isActive(view)
      ? 'text-blue-600 bg-blue-50'
      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50';
  };

  return (
    <>
      {/* Spacer para evitar que el contenido se oculte detrás de la barra */}
      <div className="h-20 md:hidden"></div>
      
      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around h-16 px-4">
          {/* Home */}
          <button
            onClick={() => {
              if (currentView === 'home') {
                onShowProducts();
              } else {
                onShowProducts();
              }
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${getActiveClasses('products')}`}
          >
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>

          {/* Carrito */}
          <button
            onClick={onShowCart}
            className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${getActiveClasses('cart')}`}
          >
            <div className="relative">
              <ShoppingCart className="h-6 w-6 mb-1" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Carrito</span>
          </button>

          {/* Perfil */}
          <button
            onClick={onOpenLogin}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default MobileBottomNav;