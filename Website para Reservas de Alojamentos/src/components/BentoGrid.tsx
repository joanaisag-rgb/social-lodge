import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef } from 'react';

const properties = [
  {
    name: 'Hollywood',
    image: 'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 8,
    rating: 4.9,
    price: 95
  },
  {
    name: 'Piornais',
    image: 'https://images.unsplash.com/photo-1600540974143-ac2d3cdabcc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwY3VydmVzJTIwd2hpdGV8ZW58MXx8fHwxNzYxMDYzNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 6,
    rating: 4.8,
    price: 89
  },
  {
    name: 'Galinho',
    image: 'https://images.unsplash.com/photo-1678251543028-04f1ec670c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcm9vbSUyMG5hdHVyYWwlMjBsaWdodHxlbnwxfHx8fDE3NjEwNjM0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 5,
    rating: 4.9,
    price: 110
  },
  {
    name: 'Funchal',
    image: 'https://images.unsplash.com/photo-1730094485174-e543677a2a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBsaXZpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjEwNjM0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 10,
    rating: 5.0,
    price: 125
  },
  {
    name: 'Cabouqueira',
    image: 'https://images.unsplash.com/photo-1670787318404-c7fa7a3cc339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwaW50ZXJpb3IlMjBkZXRhaWx8ZW58MXx8fHwxNzYxMDYzNDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 7,
    rating: 4.9,
    price: 99
  },
  {
    name: 'Happiness',
    image: 'https://images.unsplash.com/photo-1672757685171-190853353acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtaW5pbWFsaXN0JTIwYXBhcnRtZW50fGVufDF8fHx8MTc2MTA2MzQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    apartments: 9,
    rating: 4.8,
    price: 105
  }
];

interface BentoGridProps {
  onPropertyClick?: (propertyName: string) => void;
}

export function BentoGrid({ onPropertyClick }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="properties" className="py-32 bg-white" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4 block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Premium Stays · Funchal
            </motion.span>

            {/* OPÇÃO 1: Discover Your Island Escape */}
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 300 }}>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                discover your
              </motion.span>
              <motion.span
                className="block italic overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                island escape
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span style={{ color: '#FF6B00' }}>in madeira</span>
              </motion.span>
            </h2>

            {/* DESCOMENTA PARA USAR OPÇÃO 2: Exceptional Homes */}
            {/* <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 300 }}>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                exceptional
              </motion.span>
              <motion.span
                className="block italic overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                homes across
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span style={{ color: '#FF6B00' }}>madeira</span>
              </motion.span>
            </h2> */}

            {/* DESCOMENTA PARA USAR OPÇÃO 3: Contemporary Living */}
            {/* <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 300 }}>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                contemporary
              </motion.span>
              <motion.span
                className="block italic overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                living in
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span style={{ color: '#FF6B00' }}>madeira island</span>
              </motion.span>
            </h2> */}

            {/* DESCOMENTA PARA USAR OPÇÃO 4: Curated Spaces */}
            {/* <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 300 }}>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                curated spaces
              </motion.span>
              <motion.span
                className="block italic overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                thoughtfully designed
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span style={{ color: '#FF6B00' }}>for madeira</span>
              </motion.span>
            </h2> */}

            {/* DESCOMENTA PARA USAR OPÇÃO 5: Architectural Retreats */}
            {/* <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[1.05] tracking-[-0.03em]" style={{ fontWeight: 300 }}>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                architectural
              </motion.span>
              <motion.span
                className="block italic overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                retreats in
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <span style={{ color: '#FF6B00' }}>madeira</span>
              </motion.span>
            </h2> */}
          </motion.div>
        </div>

        {/* Airbnb-Style Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group cursor-pointer"
              onClick={() => onPropertyClick?.(property.name)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-lg">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageWithFallback
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Favorite Heart - Top Right */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 14s-6-4-6-8c0-2.5 2-4 4-4 1.5 0 2 1 2 1s.5-1 2-1c2 0 4 1.5 4 4 0 4-6 8-6 8z" />
                  </svg>
                </button>
                
                {/* Rating Badge - Top Left */}
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md flex items-center gap-1 text-xs">
                  <Star className="fill-[#FF6B00] text-[#FF6B00]" size={12} />
                  <span>{property.rating}</span>
                </div>
              </div>

              {/* Property Info */}
              <div className="space-y-1">
                {/* Title & Location */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base group-hover:text-[#FF6B00] transition-colors">
                    {property.name}, Madeira
                  </h3>
                </div>
                
                {/* Apartments */}
                <p className="text-sm text-gray-500">
                  {property.apartments} apartments available
                </p>
                
                {/* Price */}
                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-base">€{property.price}</span>
                  <span className="text-sm text-gray-500">night</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Parallax Decorative Element */}
        <motion.div
          style={{ y }}
          className="absolute right-0 top-1/2 w-64 h-64 bg-[#FF6B00] opacity-5 -z-10 pointer-events-none"
        />
      </div>
    </section>
  );
}