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

function App() {
  // Estado centralizado para el modal de login
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'products'>('home');

  // Función para abrir el login, se comparte por prop
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowProducts = () => setCurrentView('products');
  const handleShowHome = () => setCurrentView('home');

  return (
    <div className="min-h-screen">
      {/* Se pasa la función al Navbar */}
      <Navbar 
        onOpenLogin={handleOpenLogin} 
        onShowProducts={handleShowProducts}
        onShowHome={handleShowHome}
        currentView={currentView}
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
        <ProductsView />
      )}

      {/* El login modal se controla desde aquí */}
      <LoginView isOpen={showLogin} onClose={handleCloseLogin} />
    </div>
  );
}

export default App;
