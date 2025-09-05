import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ForWhoSection from './components/ForWhoSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import LoginView from './components/LoginView';
import ProductsView from './components/ProductsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import { useCartStore } from './store/cartStore';

function App() {
  // Estado centralizado para el modal de login
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'product-detail' | 'cart'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Función para abrir el login, se comparte por prop
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowProducts = () => setCurrentView('products');
  const handleShowHome = () => setCurrentView('home');
  const handleShowProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
  };
  const handleShowCart = () => setCurrentView('cart');
  const handleCheckout = () => {
    // Here you would implement checkout logic
    console.log('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen">
      {/* Se pasa la función al Navbar */}
      <Navbar 
        onOpenLogin={handleOpenLogin} 
        onShowProducts={handleShowProducts}
        onShowHome={handleShowHome}
        onShowCart={handleShowCart}
        currentView={currentView}
        cartItemsCount={totalItems}
      />
      
      {currentView === 'home' ? (
        <>
          {/* Se pasa la función a HeroSection */}
          <HeroSection onOpenLogin={handleOpenLogin} onShowProducts={handleShowProducts} />
          <ForWhoSection />
          <BenefitsSection />
          <TestimonialsSection />
          <CtaSection onOpenLogin={handleOpenLogin} />
          <Footer />
        </>
      ) : (
        <>
          {currentView === 'products' && (
            <ProductsView onProductClick={handleShowProductDetail} />
          )}
          {currentView === 'product-detail' && selectedProductId && (
            <ProductDetailView 
              productId={selectedProductId} 
              onBack={handleShowProducts}
            />
          )}
          {currentView === 'cart' && (
            <CartView 
              onBack={handleShowProducts}
              onCheckout={handleCheckout}
            />
          )}
        </>
      )}

      {/* El login modal se controla desde aquí */}
      <LoginView isOpen={showLogin} onClose={handleCloseLogin} />
    </div>
  );
}

export default App;
