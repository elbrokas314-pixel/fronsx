import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ForWhoSection from './components/ForWhoSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import LoginView from './components/LoginView';

function App() {
  // Estado centralizado para el modal de login
  const [showLogin, setShowLogin] = useState(false);

  // Función para abrir el login, se comparte por prop
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <div className="min-h-screen">
      {/* Se pasa la función al Navbar */}
      <Navbar onOpenLogin={handleOpenLogin} />
      
      {/* Se pasa la función a HeroSection */}
      <HeroSection onOpenLogin={handleOpenLogin} />

      <ForWhoSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />

      {/* El login modal se controla desde aquí */}
      <LoginView isOpen={showLogin} onClose={handleCloseLogin} />
    </div>
  );
}

export default App;
