import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef, useState, useEffect } from 'react';

function CounterAnimation({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasStarted]);

  return (
    <div ref={ref}>
      <p className="text-4xl mb-1">{count}{label}</p>
    </div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(imageProgress, [0, 1], [-50, 50]);
  const imageScale = useTransform(imageProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <section className="py-32 bg-white relative overflow-hidden" ref={containerRef}>
      {/* Decorative Elements */}
      <motion.div
        style={{ y }}
        className="absolute left-0 top-1/4 w-96 h-96 bg-[#FF6B00] opacity-10 rounded-full blur-3xl"
      />

      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
            ref={imageRef}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1716172874868-96497ee2a0f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHZpZXclMjB0ZXJyYWNlfGVufDF8fHx8MTc2MDk1MzY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Ocean View"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Stats Card with Counter Animation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-12 -right-12 bg-black text-white p-8 shadow-xl max-w-xs border-2 border-[#FF6B00]"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <CounterAnimation target={45} label="+" />
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Apartamentos
                  </p>
                </div>
                <div>
                  <CounterAnimation target={6} label="" />
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Localizações
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-4xl mb-1 text-[#FF6B00]">4.9</p>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Avaliação Média
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Social Lodge
            </motion.span>
            
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1] tracking-[-0.03em] mb-8 overflow-hidden" style={{ fontWeight: 300 }}>
              <motion.span
                className="block"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                unforgettable
              </motion.span>
              <motion.span
                className="block italic"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                stays in
              </motion.span>
              <motion.span
                className="block text-[#FF6B00]"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                madeira
              </motion.span>
            </h2>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                No Social Lodge, acreditamos que a arquitetura e o design não são apenas 
                estética — são experiências que moldam memórias inesquecíveis.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Cada um dos nossos seis alojamentos foi cuidadosamente concebido para 
                oferecer o equilíbrio perfeito entre design contemporâneo, conforto 
                excepcional e autenticidade local.
              </motion.p>
            </div>

            <motion.button 
              className="bg-black text-white px-8 py-5 text-sm uppercase tracking-wider hover:bg-[#FF6B00] transition-colors relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-[#FF6B00]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Saber Mais</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}