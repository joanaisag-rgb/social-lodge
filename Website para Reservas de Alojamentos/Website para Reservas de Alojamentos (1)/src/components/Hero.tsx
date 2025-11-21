import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto w-full px-8 lg:px-16 py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Side - Typography */}
          <motion.div 
            className="lg:col-span-7"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="mb-8 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.span 
                  className="text-sm uppercase tracking-[0.3em] text-gray-500 block"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Madeira, Portugal
                </motion.span>
              </motion.div>

              <h1 className="text-[clamp(3rem,12vw,10rem)] leading-[0.9] tracking-[-0.04em] mb-8 overflow-hidden" style={{ fontWeight: 300 }}>
                <motion.span
                  className="block"
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  unforgettable
                </motion.span>
                <motion.span
                  className="block italic"
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontWeight: 300 }}
                >
                  stays
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  in
                </motion.span>
                <motion.span
                  className="block text-[#FF6B00]"
                  initial={{ y: 150, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  madeira
                </motion.span>
              </h1>

              <motion.div 
                className="flex items-start gap-16 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="flex-1 max-w-md">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Seis alojamentos locais únicos que redefinem o conceito de hospitalidade. 
                    Arquitetura contemporânea, design minimalista e conforto excepcional.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <motion.button 
                  className="group bg-black text-white px-8 py-5 text-sm uppercase tracking-wider hover:bg-[#FF6B00] transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#FF6B00]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Explorar Alojamentos</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" size={18} />
                </motion.button>
                <motion.button 
                  className="border border-black text-black px-8 py-5 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Disponibilidade
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Featured Image with Improved Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <motion.div 
              className="relative aspect-[3/4] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1572197491557-5b1a2c767c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMDYzNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Minimalist Interior"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              
              {/* Redesigned Info Card Overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <div className="p-8">
                  {/* Top Section - Price and Rating */}
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    {/* Price */}
                    <div className="border-r border-gray-200 pr-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                        A partir de
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl tracking-tight">€89</span>
                        <span className="text-sm text-gray-500">/noite</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="pl-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                        Avaliação
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-5xl tracking-tight">4.9</span>
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="fill-[#FF6B00] text-[#FF6B00]"
                                size={14}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">847 reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Quick Stats */}
                  <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                    <div className="flex-1 text-center">
                      <p className="text-xl mb-1">6</p>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Localizações
                      </p>
                    </div>
                    <div className="w-[1px] h-10 bg-gray-200" />
                    <div className="flex-1 text-center">
                      <p className="text-xl mb-1">45+</p>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Apartamentos
                      </p>
                    </div>
                    <div className="w-[1px] h-10 bg-gray-200" />
                    <div className="flex-1 text-center">
                      <p className="text-xl mb-1">100%</p>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Recomendado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-[#FF6B00] to-black" />
              </motion.div>
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-[#FF6B00] -z-10"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-8 lg:left-16"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-[1px] h-20 bg-black origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            />
            <motion.span 
              className="text-xs uppercase tracking-wider -rotate-90 origin-left text-gray-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              Scroll
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
