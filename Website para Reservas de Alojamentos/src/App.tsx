import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BookingBar } from './components/BookingBar';
import { BentoGrid } from './components/BentoGrid';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { PropertyDetail } from './components/PropertyDetail';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'property'>('home');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handlePropertyClick = (propertyName: string) => {
    setSelectedProperty(propertyName);
    setCurrentPage('property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleBackToHome} />
      
      {currentPage === 'home' ? (
        <>
          <BookingBar />
          <BentoGrid onPropertyClick={handlePropertyClick} />
          <Experience />
          <Footer />
        </>
      ) : (
        <PropertyDetail onBack={handleBackToHome} />
      )}
    </div>
  );
}