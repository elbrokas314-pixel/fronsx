import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ForWhoSection from './components/ForWhoSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ForWhoSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;