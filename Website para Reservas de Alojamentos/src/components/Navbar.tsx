import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accommodations', href: '#properties' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'PT', name: 'Português' },
    { code: 'FR', name: 'Français' },
    { code: 'ES', name: 'Español' }
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Tagline */}
            <button 
              onClick={() => onNavigate?.('home')}
              className="flex flex-col items-start group"
            >
              <span 
                className="text-2xl tracking-tight text-black transition-colors hover:text-[#FF6B00]"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                Social Lodge
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 -mt-1">
                Unforgettable stays in Madeira
              </span>
            </button>

            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 text-sm text-black hover:text-[#FF6B00] transition-colors"
                >
                  <Globe size={16} />
                  <span>{language}</span>
                </button>

                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-sm overflow-hidden min-w-[120px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-gray-50 text-[#FF6B00]' : 'text-black'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-3 group text-black"
              >
                <span className="text-sm uppercase tracking-wider">Menu</span>
                <div className="flex flex-col gap-1.5">
                  <motion.span 
                    className="w-8 h-[2px] bg-black"
                    whileHover={{ scaleX: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span 
                    className="w-8 h-[2px] bg-black"
                    whileHover={{ scaleX: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black"
          >
            <div className="h-full flex flex-col">
              {/* Close Button */}
              <div className="max-w-[1800px] mx-auto w-full px-8 lg:px-16">
                <div className="flex items-center justify-between h-24">
                  <span 
                    className="text-white text-xl"
                    style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
                  >
                    Social Lodge
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white"
                  >
                    <X size={32} />
                  </button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="max-w-[1800px] mx-auto w-full px-8 lg:px-16">
                  <div className="grid lg:grid-cols-2 gap-16">
                    {/* Navigation */}
                    <div>
                      <nav className="space-y-4">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <a
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-white text-6xl lg:text-8xl hover:text-[#FF6B00] transition-colors"
                              style={{ fontWeight: 300, letterSpacing: '-0.02em' }}
                            >
                              {link.name}
                            </a>
                          </motion.div>
                        ))}
                      </nav>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16"
                      >
                        <button className="bg-[#FF6B00] text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                          Book Now
                        </button>
                      </motion.div>
                    </div>

                    {/* Contact Info */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col justify-end text-white"
                    >
                      <div className="space-y-8">
                        <div>
                          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                            Email
                          </p>
                          <a href="mailto:info@sociallodge.com" className="text-xl hover:text-[#FF6B00] transition-colors">
                            info@sociallodge.com
                          </a>
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                            Phone
                          </p>
                          <a href="tel:+351000000000" className="text-xl hover:text-[#FF6B00] transition-colors">
                            +351 000 000 000
                          </a>
                        </div>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                            Location
                          </p>
                          <p className="text-xl">Funchal, Madeira</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}