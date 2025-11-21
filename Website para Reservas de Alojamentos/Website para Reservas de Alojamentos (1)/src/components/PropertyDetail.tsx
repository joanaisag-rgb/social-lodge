import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Star, Wifi, Coffee, Car, MapPin, Users, Calendar, Check, X as XIcon, Image as ImageIcon, Map, MessageSquare, Award, BedDouble, Bath, User, Clock, Tag, Sparkles, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef } from 'react';
import { Button } from './ui/button';

interface PropertyDetailProps {
  onBack: () => void;
}

// Apartamentos específicos para Hollywood (exemplo)
const hollywoodApartments = [
  {
    id: 'A',
    name: 'Apartment A',
    type: 'One-Bedroom Apartment',
    bedroom: '1 double bed',
    livingRoom: '1 sofa bed',
    maxGuests: 4,
    available: true,
    pricing: [
      { guests: 4, priceWith: 120, priceWithout: 110 },
      { guests: 3, priceWith: 80, priceWithout: 70 },
      { guests: 2, priceWith: 60, priceWithout: 50 },
      { guests: 1, priceWith: 50, priceWithout: 40 }
    ]
  },
  {
    id: 'B',
    name: 'Apartment B',
    type: 'One-Bedroom Apartment',
    bedroom: '1 double bed',
    livingRoom: '1 sofa bed',
    maxGuests: 4,
    available: true,
    pricing: [
      { guests: 4, priceWith: 120, priceWithout: 110 },
      { guests: 3, priceWith: 80, priceWithout: 70 },
      { guests: 2, priceWith: 60, priceWithout: 50 },
      { guests: 1, priceWith: 50, priceWithout: 40 }
    ]
  },
  {
    id: 'C',
    name: 'Apartment C',
    type: 'One-Bedroom Apartment',
    bedroom: '1 double bed',
    livingRoom: '1 sofa bed',
    maxGuests: 4,
    available: true,
    pricing: [
      { guests: 4, priceWith: 120, priceWithout: 110 },
      { guests: 3, priceWith: 80, priceWithout: 70 },
      { guests: 2, priceWith: 60, priceWithout: 50 },
      { guests: 1, priceWith: 50, priceWithout: 40 }
    ]
  },
  {
    id: 'D',
    name: 'Apartment D',
    type: 'One-Bedroom Apartment',
    bedroom: '1 double bed',
    livingRoom: '1 sofa bed',
    maxGuests: 4,
    available: false, // Example: not available
    pricing: [
      { guests: 4, priceWith: 120, priceWithout: 110 },
      { guests: 3, priceWith: 80, priceWithout: 70 },
      { guests: 2, priceWith: 60, priceWithout: 50 },
      { guests: 1, priceWith: 50, priceWithout: 40 }
    ]
  }
];

const amenities = [
  { icon: Wifi, name: 'WiFi Alta Velocidade', included: true },
  { icon: Coffee, name: 'Cozinha Equipada', included: true },
  { icon: Car, name: 'Estacionamento Gratuito', included: true },
  { icon: Users, name: 'Check-in Flexível', included: true },
  { name: 'Ar Condicionado', included: true },
  { name: 'Máquina de Lavar', included: true },
  { name: 'TV Smart', included: true },
  { name: 'Varanda/Terraço', included: true },
  { name: 'Vista para o Mar', included: false },
  { name: 'Piscina', included: false },
  { name: 'Ginásio', included: false },
  { name: 'Serviço de Limpeza', included: true }
];

const galleryImages = [
  'https://images.unsplash.com/photo-1572197491557-5b1a2c767c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxMDYzNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1704428382583-c9c7c1e55d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwZGVzaWdufGVufDF8fHx8MTc2MDk4ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MDk1ODU1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1687951276836-06efbfda608b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTA2MTA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1630699376682-84df40131d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NjA5NTk0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1593224647849-0ef96ecc2bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkcm9vbSUyMHdpbmRvd3xlbnwxfHx8fDE3NjEwNjQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
];

// External Services for marketplace
const externalServices = [
  {
    id: 1,
    category: 'Transfers',
    name: 'Airport Private Transfer',
    provider: 'Madeira VIP Transport',
    description: 'Comfortable private transfer from/to Madeira Airport with professional drivers',
    price: 35,
    unit: 'per transfer',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1761574359793-6b081979a901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXhpJTIwdHJhbnNmZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MzY0MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    commission: 15
  },
  {
    id: 2,
    category: 'Activities',
    name: 'Jeep Safari Mountain Tour',
    provider: 'Island Adventures',
    description: 'Full-day 4x4 adventure exploring hidden valleys, mountain peaks, and traditional villages',
    price: 65,
    unit: 'per person',
    duration: '8 hours',
    image: 'https://images.unsplash.com/photo-1547399899-14115e6a7773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZWVwJTIwc2FmYXJpJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2MzY0MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    commission: 20
  },
  {
    id: 3,
    category: 'Activities',
    name: 'Whale & Dolphin Watching',
    provider: 'Atlantic Explorer',
    description: 'Experience marine life up close with expert guides. See dolphins, whales, and turtles',
    price: 45,
    unit: 'per person',
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1465103692162-a9bf9c7bd0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGFsZSUyMHdhdGNoaW5nJTIwb2NlYW58ZW58MXx8fHwxNzYzNjQzMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 18
  },
  {
    id: 4,
    category: 'Wellness',
    name: 'In-Room Luxury Massage',
    provider: 'Madeira Wellness',
    description: 'Professional massage therapist comes to your apartment. Swedish, Deep Tissue, or Hot Stone',
    price: 80,
    unit: 'per session',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1633526543913-d30e3c230d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBtYXNzYWdlfGVufDF8fHx8MTc2MzY0MzExNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    commission: 25
  },
  {
    id: 5,
    category: 'Wellness',
    name: 'Outdoor Yoga Session',
    provider: 'Madeira Wellness',
    description: 'Private yoga class with ocean views. All levels welcome. Mat provided',
    price: 40,
    unit: 'per session',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1599447292180-f73bc6da2e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NjM2NDMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 20
  },
  {
    id: 6,
    category: 'Car Rental',
    name: 'Luxury Car Rental',
    provider: 'Elite Drive Madeira',
    description: 'Premium vehicles including Mercedes, BMW, and convertibles. Full insurance included',
    price: 60,
    unit: 'per day',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzYzNjQzMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 15
  },
  {
    id: 7,
    category: 'Car Rental',
    name: 'Economy Car Rental',
    provider: 'Elite Drive Madeira',
    description: 'Affordable and reliable vehicles perfect for exploring the island. GPS included',
    price: 25,
    unit: 'per day',
    duration: 'Flexible',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwY2FyfGVufDF8fHx8MTc2MzY0MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 12
  },
  {
    id: 8,
    category: 'Activities',
    name: 'Levada Walking Tour',
    provider: 'Island Adventures',
    description: 'Guided hike through Madeira\'s famous irrigation channels with breathtaking scenery',
    price: 35,
    unit: 'per person',
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBtb3VudGFpbiUyMHRyYWlsfGVufDF8fHx8MTc2MzY0MzExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 18
  },
  {
    id: 9,
    category: 'Transfers',
    name: 'Island Tours with Driver',
    provider: 'Madeira VIP Transport',
    description: 'Full-day personalized tour with English-speaking driver. Customize your itinerary',
    price: 150,
    unit: 'per day',
    duration: '8 hours',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwdHJpcCUyMGRyaXZpbmd8ZW58MXx8fHwxNzYzNjQzMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    commission: 20
  }
];

const nearbyPlaces = [
  { 
    name: 'Mercado dos Lavradores', 
    distance: '0.5 km', 
    type: 'Market',
    description: 'A vibrant market showcasing Madeira\'s fresh produce, exotic flowers, and local crafts. Experience the authentic flavors and colors of the island in this historic building.',
    coordinates: { lat: 32.6520, lng: -16.9100 }
  },
  { 
    name: 'Funchal Marina', 
    distance: '1.2 km', 
    type: 'Marina',
    description: 'Modern marina with luxury yachts, waterfront restaurants, and stunning ocean views. Perfect spot for sunset walks and fresh seafood dining.',
    coordinates: { lat: 32.6398, lng: -16.9097 }
  },
  { 
    name: 'Madeira Story Centre', 
    distance: '0.8 km', 
    type: 'Museum',
    description: 'Interactive museum telling the fascinating story of Madeira through multimedia exhibits, from volcanic origins to modern times.',
    coordinates: { lat: 32.6485, lng: -16.9101 }
  },
  { 
    name: 'Casino da Madeira', 
    distance: '2.1 km', 
    type: 'Entertainment',
    description: 'Elegant casino designed by Oscar Niemeyer, offering gaming tables, slot machines, and spectacular shows in a modernist architectural masterpiece.',
    coordinates: { lat: 32.6442, lng: -16.9244 }
  },
  { 
    name: 'Jardim Botânico', 
    distance: '3.5 km', 
    type: 'Garden',
    description: 'Stunning botanical garden featuring exotic plants from around the world, terraced landscapes with panoramic views of Funchal Bay.',
    coordinates: { lat: 32.6619, lng: -16.8939 }
  }
];

const reviews = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: 'November 2024',
    comment: 'Absolutely stunning apartment with amazing views. The design is impeccable and the location perfect.',
    country: 'United Kingdom'
  },
  {
    id: 2,
    author: 'João P.',
    rating: 4.8,
    date: 'October 2024',
    comment: 'Great stay! Modern, clean and very comfortable. Highly recommend.',
    country: 'Portugal'
  },
  {
    id: 3,
    author: 'Emma L.',
    rating: 5,
    date: 'September 2024',
    comment: 'The best accommodation we had in Madeira. Will definitely come back!',
    country: 'Germany'
  }
];

type TabType = 'overview' | 'photos' | 'nearby' | 'services' | 'references' | 'reviews';

export function PropertyDetail({ onBack }: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [showPricingTable, setShowPricingTable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero Section - Smaller */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <ImageWithFallback
            src={galleryImages[selectedImage]}
            alt="Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        {/* Navigation Tabs + Back Button */}
        <div className="absolute top-24 left-8 lg:left-16 z-20 flex items-center gap-4">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onBack}
            className="bg-white/10 backdrop-blur-md text-white px-6 py-3 flex items-center gap-3 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </motion.button>

          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <Award size={18} />
              <span className="text-sm uppercase tracking-wider">Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'photos'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <ImageIcon size={18} />
              <span className="text-sm uppercase tracking-wider">Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('nearby')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'nearby'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <Map size={18} />
              <span className="text-sm uppercase tracking-wider">Nearby</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <ShoppingBag size={18} />
              <span className="text-sm uppercase tracking-wider">Services</span>
            </button>

            <button
              onClick={() => setActiveTab('references')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'references'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <Award size={18} />
              <span className="text-sm uppercase tracking-wider">References</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 flex items-center gap-3 transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
              }`}
            >
              <MessageSquare size={18} />
              <span className="text-sm uppercase tracking-wider">Reviews</span>
            </button>
          </motion.div>
        </div>

        {/* Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 lg:p-16">
          <div className="max-w-[1800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/80 text-sm uppercase tracking-wider">
                  Social Lodge
                </span>
                <div className="w-12 h-[1px] bg-white/40" />
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2">
                  <Star className="fill-[#FF6B00] text-[#FF6B00]" size={16} />
                  <span className="text-white text-sm">4.9</span>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-7xl text-white mb-6" style={{ fontWeight: 300, letterSpacing: '-0.03em' }}>
                Hollywood
              </h1>

              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>Funchal, Madeira</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <span>3 Apartments Available</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16 py-24">
        <div className="grid lg:grid-cols-[1fr_450px] gap-16">
          {/* Main Content */}
          <div className="space-y-16">
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Image Carousel */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-4xl" style={{ fontWeight: 300 }}>
                      Featured Photos
                    </h2>
                    <button 
                      onClick={() => setActiveTab('photos')}
                      className="text-sm text-[#FF6B00] hover:underline uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>View all photos</span>
                      <ImageIcon size={16} />
                    </button>
                  </div>
                  
                  {/* Main Image */}
                  <div 
                    className="aspect-[16/9] overflow-hidden cursor-pointer group"
                    onClick={() => setActiveTab('photos')}
                  >
                    <img 
                      src={galleryImages[selectedImage]} 
                      alt="Property" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="grid grid-cols-6 gap-2">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-[4/3] overflow-hidden border-2 transition-all ${
                          selectedImage === idx 
                            ? 'border-[#FF6B00]' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="border-l-4 border-[#FF6B00] pl-8">
                  <h2 className="text-3xl mb-6" style={{ fontWeight: 300 }}>
                    About This Property
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Welcome to Hollywood, a modern refuge where contemporary design meets Madeiran charm. 
                      Located in the heart of Funchal, this exceptional property offers three meticulously 
                      designed apartments that blend sophistication with comfort.
                    </p>
                    <p>
                      Each unit features floor-to-ceiling windows that frame stunning views of the Atlantic Ocean 
                      and the surrounding hills. The interiors showcase a minimalist aesthetic with premium finishes, 
                      natural materials, and cutting-edge amenities.
                    </p>
                    <p>
                      Experience the perfect balance of privacy and accessibility, with Funchal's vibrant cultural 
                      scene, renowned restaurants, and historic landmarks just moments away. Whether you're seeking 
                      a romantic getaway or a family adventure, Hollywood provides an unforgettable base for exploring 
                      the beauty of Madeira.
                    </p>
                  </div>
                </div>

                {/* Amenities & Services */}
                <div>
                  <h2 className="text-3xl mb-8" style={{ fontWeight: 300 }}>
                    Amenities & Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {amenities.map((amenity, idx) => {
                      const Icon = amenity.icon;
                      return (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-4 p-4 border rounded-sm transition-colors ${
                            amenity.included 
                              ? 'border-gray-200 hover:border-[#FF6B00]' 
                              : 'border-gray-100 bg-gray-50 opacity-50'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            amenity.included ? 'bg-[#FF6B00] text-white' : 'bg-gray-300 text-gray-500'
                          }`}>
                            {Icon ? (
                              <Icon size={18} />
                            ) : (
                              amenity.included ? <Check size={18} /> : <XIcon size={18} />
                            )}
                          </div>
                          <span className={amenity.included ? 'text-gray-900' : 'text-gray-400 line-through'}>
                            {amenity.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Property Highlights */}
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <h3 className="text-2xl mb-6" style={{ fontWeight: 300 }}>
                    Property Highlights
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="text-3xl text-[#FF6B00] mb-2">15 min</div>
                      <p className="text-sm text-gray-600 uppercase tracking-wider">To Funchal Center</p>
                    </div>
                    <div>
                      <div className="text-3xl text-[#FF6B00] mb-2">3</div>
                      <p className="text-sm text-gray-600 uppercase tracking-wider">Luxury Apartments</p>
                    </div>
                    <div>
                      <div className="text-3xl text-[#FF6B00] mb-2">4.9★</div>
                      <p className="text-sm text-gray-600 uppercase tracking-wider">Guest Rating</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab Content */}
            {activeTab === 'photos' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl mb-8" style={{ fontWeight: 300 }}>
                  Photo Gallery
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="aspect-[4/3] overflow-hidden cursor-pointer group"
                      whileHover={{ scale: 0.98 }}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'nearby' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex items-end justify-between border-b-2 border-black pb-6">
                  <div>
                    <h2 className="text-5xl mb-3" style={{ fontWeight: 300 }}>
                      Nearby Attractions
                    </h2>
                    <p className="text-gray-600">
                      Explore the best of Funchal from Hollywood
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-black text-white px-4 py-2">
                    <MapPin size={18} />
                    <span className="text-sm uppercase tracking-wider">5 Locations</span>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="border-2 border-black overflow-hidden">
                  <div className="aspect-[16/9] w-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25387.14982!2d-16.9244!3d32.6485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f0ba3dbb5bd%3A0x400ebbde49110!2sFunchal%2C%20Portugal!5e0!3m2!1sen!2spt!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Nearby Attractions Map"
                    />
                  </div>
                  <div className="bg-gray-50 border-t-2 border-black p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Map size={16} />
                      <span>Click on the map to explore locations in Google Maps</span>
                    </div>
                  </div>
                </div>

                {/* Attractions List */}
                <div className="space-y-4">
                  {nearbyPlaces.map((place, idx) => (
                    <motion.div 
                      key={idx}
                      className="border border-gray-200 overflow-hidden group hover:border-[#FF6B00] transition-colors"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0">
                                <span className="text-sm">{idx + 1}</span>
                              </div>
                              <div>
                                <h3 className="text-xl">{place.name}</h3>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 ml-11">
                              <span className="text-xs uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1">
                                {place.type}
                              </span>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin size={14} />
                                <span>{place.distance}</span>
                              </div>
                            </div>
                          </div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${place.coordinates.lat},${place.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-black hover:bg-[#FF6B00] text-white px-4 py-2 text-sm uppercase tracking-wider transition-colors flex-shrink-0 ml-4"
                          >
                            <Map size={14} />
                            <span>View Map</span>
                          </a>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed ml-11">
                          {place.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Distance Reference */}
                <div className="bg-gray-50 border border-gray-200 p-8">
                  <h3 className="text-2xl mb-6" style={{ fontWeight: 300 }}>
                    Distance Reference
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-lg">5 min walk</div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Funchal Marina</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                        <Car size={20} />
                      </div>
                      <div>
                        <div className="text-lg">15 min drive</div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Botanical Garden</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-lg">20 min drive</div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Airport</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="flex items-end justify-between border-b-2 border-black pb-6">
                  <div>
                    <h2 className="text-5xl mb-3" style={{ fontWeight: 300 }}>
                      Exclusive Services
                    </h2>
                    <p className="text-gray-600">
                      Curated experiences and services for our guests
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2">
                    <Sparkles size={18} />
                    <span className="text-sm uppercase tracking-wider">Partner Services</span>
                  </div>
                </div>

                {/* Featured Services - Large Cards */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Featured</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {externalServices.filter(s => s.featured).map((service) => (
                      <motion.div
                        key={service.id}
                        className="border-2 border-black overflow-hidden group hover:border-[#FF6B00] transition-colors"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Image */}
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs uppercase tracking-wider">
                            {service.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-xl mb-1">{service.name}</h4>
                              <p className="text-xs text-gray-500 uppercase tracking-wider">{service.provider}</p>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-2xl text-[#FF6B00]">€{service.price}</div>
                              <div className="text-xs text-gray-500">{service.unit}</div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {service.description}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock size={14} />
                              <span>{service.duration}</span>
                            </div>
                            <a
                              href={`https://wa.me/351912345678?text=Hi! I'm interested in ${encodeURIComponent(service.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white px-4 py-2 text-sm uppercase tracking-wider transition-colors"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* All Services - Organized by Category */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">All Services</h3>
                  
                  {/* Activities */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-[2px] bg-[#FF6B00]" />
                      <h4 className="text-2xl" style={{ fontWeight: 300 }}>Activities</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {externalServices.filter(s => s.category === 'Activities').map((service) => (
                        <motion.div
                          key={service.id}
                          className="border border-gray-200 overflow-hidden group hover:border-[#FF6B00] transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-lg flex-1">{service.name}</h5>
                              <div className="text-lg text-[#FF6B00] ml-2">€{service.price}</div>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{service.provider}</p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">{service.duration}</span>
                              <a
                                href={`https://wa.me/351912345678?text=Hi! I'm interested in ${encodeURIComponent(service.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#25D366] hover:text-[#1fb855] text-sm transition-colors"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span className="text-xs uppercase tracking-wider">Contact</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Transfers */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-[2px] bg-[#FF6B00]" />
                      <h4 className="text-2xl" style={{ fontWeight: 300 }}>Transfers & Transport</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {externalServices.filter(s => s.category === 'Transfers').map((service) => (
                        <motion.div
                          key={service.id}
                          className="border border-gray-200 overflow-hidden group hover:border-[#FF6B00] transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-lg flex-1">{service.name}</h5>
                              <div className="text-lg text-[#FF6B00] ml-2">€{service.price}</div>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{service.provider}</p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">{service.duration}</span>
                              <a
                                href={`https://wa.me/351912345678?text=Hi! I'm interested in ${encodeURIComponent(service.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#25D366] hover:text-[#1fb855] text-sm transition-colors"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span className="text-xs uppercase tracking-wider">Contact</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Wellness */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-[2px] bg-[#FF6B00]" />
                      <h4 className="text-2xl" style={{ fontWeight: 300 }}>Wellness & Relaxation</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {externalServices.filter(s => s.category === 'Wellness').map((service) => (
                        <motion.div
                          key={service.id}
                          className="border border-gray-200 overflow-hidden group hover:border-[#FF6B00] transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-lg flex-1">{service.name}</h5>
                              <div className="text-lg text-[#FF6B00] ml-2">€{service.price}</div>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{service.provider}</p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">{service.duration}</span>
                              <a
                                href={`https://wa.me/351912345678?text=Hi! I'm interested in ${encodeURIComponent(service.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#25D366] hover:text-[#1fb855] text-sm transition-colors"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span className="text-xs uppercase tracking-wider">Contact</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Car Rental */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-[2px] bg-[#FF6B00]" />
                      <h4 className="text-2xl" style={{ fontWeight: 300 }}>Car Rental</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {externalServices.filter(s => s.category === 'Car Rental').map((service) => (
                        <motion.div
                          key={service.id}
                          className="border border-gray-200 overflow-hidden group hover:border-[#FF6B00] transition-colors"
                          whileHover={{ y: -2 }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img 
                              src={service.image} 
                              alt={service.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-lg flex-1">{service.name}</h5>
                              <div className="text-lg text-[#FF6B00] ml-2">€{service.price}</div>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{service.provider}</p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500">{service.duration}</span>
                              <a
                                href={`https://wa.me/351912345678?text=Hi! I'm interested in ${encodeURIComponent(service.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[#25D366] hover:text-[#1fb855] text-sm transition-colors"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span className="text-xs uppercase tracking-wider">Contact</span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'references' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl mb-8" style={{ fontWeight: 300 }}>
                  Points of Interest
                </h2>
                <div className="space-y-8">
                  <div className="border border-gray-200 p-8">
                    <h3 className="text-2xl mb-4">Historic Center</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The historic center of Funchal is just a short walk away, offering charming cobblestone streets, 
                      traditional restaurants, and cultural landmarks that showcase Madeira's rich heritage.
                    </p>
                    <p className="text-sm text-gray-500">Walking distance: 10 minutes</p>
                  </div>
                  
                  <div className="border border-gray-200 p-8">
                    <h3 className="text-2xl mb-4">Coastal Promenade</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Enjoy stunning ocean views along the coastal promenade, perfect for morning jogs or evening strolls. 
                      The promenade connects to numerous beaches and waterfront restaurants.
                    </p>
                    <p className="text-sm text-gray-500">Walking distance: 5 minutes</p>
                  </div>

                  <div className="border border-gray-200 p-8">
                    <h3 className="text-2xl mb-4">Monte Cable Car</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Take the cable car to Monte for breathtaking panoramic views of Funchal and experience the famous 
                      toboggan ride down the steep streets.
                    </p>
                    <p className="text-sm text-gray-500">Distance: 2.5 km</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl" style={{ fontWeight: 300 }}>
                    Guest Reviews
                  </h2>
                  <div className="flex items-center gap-3 bg-black text-white px-6 py-3">
                    <Star className="fill-[#FF6B00] text-[#FF6B00]" size={24} />
                    <span className="text-3xl">4.9</span>
                    <span className="text-sm text-white/60">({reviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl mb-1">{review.author}</h3>
                          <p className="text-sm text-gray-500">{review.country}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="fill-[#FF6B00] text-[#FF6B00]" size={16} />
                            <span className="text-lg">{review.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-32 space-y-6"
            >
              {/* Compact Booking Box - For non-overview tabs */}
              {activeTab !== 'overview' && (
                <div className="border-2 border-black rounded-sm overflow-hidden">
                  <div className="bg-black text-white px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-white/60 mb-1">From</div>
                        <div className="text-2xl">€50</div>
                        <div className="text-xs text-white/60">per night</div>
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-sm">
                        <Star className="fill-[#FF6B00] text-[#FF6B00]" size={14} />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4">
                    <div className="border-2 border-black rounded-sm mb-3">
                      <div className="p-3 border-b-2 border-black">
                        <label className="text-xs mb-1 block uppercase tracking-wider text-gray-600">Check-in</label>
                        <input 
                          type="date" 
                          className="text-sm w-full focus:outline-none"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="p-3 border-b-2 border-black">
                        <label className="text-xs mb-1 block uppercase tracking-wider text-gray-600">Check-out</label>
                        <input 
                          type="date" 
                          className="text-sm w-full focus:outline-none"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="p-3">
                        <label className="text-xs mb-1 block uppercase tracking-wider text-gray-600">Guests</label>
                        <select className="text-sm w-full focus:outline-none" value={selectedGuests} onChange={(e) => setSelectedGuests(Number(e.target.value))}>
                          <option value={1}>1 adult</option>
                          <option value={2}>2 adults</option>
                          <option value={3}>3 adults</option>
                          <option value={4}>4 adults</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full bg-[#FF6B00] hover:bg-black text-white py-3 rounded-sm transition-colors mb-3">
                      Check Availability
                    </Button>

                    <div className="text-center text-xs text-gray-500">
                      No booking fees • Free cancellation
                    </div>
                  </div>
                </div>
              )}

              {/* Full Booking Card - Only for Overview */}
              {activeTab === 'overview' && (
                <>
                  <div className="border-2 border-black rounded-sm">
                    <div className="bg-white p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl">Select Apartment</h3>
                        <div className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-sm">
                          <Star className="fill-[#FF6B00] text-[#FF6B00]" size={14} />
                          <span className="text-sm">4.9</span>
                        </div>
                      </div>

                      {/* Booking Inputs */}
                      <div className="border-2 border-black rounded-sm mb-4">
                        <div className="grid grid-cols-2 divide-x-2 divide-black">
                          <div className="p-3">
                            <label className="text-xs mb-1 block uppercase tracking-wider">Check-in</label>
                            <input 
                              type="date" 
                              className="text-sm w-full focus:outline-none"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          <div className="p-3">
                            <label className="text-xs mb-1 block uppercase tracking-wider">Check-out</label>
                            <input 
                              type="date" 
                              className="text-sm w-full focus:outline-none"
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div className="border-t-2 border-black p-3">
                          <label className="text-xs mb-1 block uppercase tracking-wider">Guests</label>
                          <select className="text-sm w-full focus:outline-none" value={selectedGuests} onChange={(e) => setSelectedGuests(Number(e.target.value))}>
                            <option value={1}>1 adult</option>
                            <option value={2}>2 adults</option>
                            <option value={3}>3 adults</option>
                            <option value={4}>4 adults</option>
                          </select>
                        </div>
                      </div>

                      {/* Apartments List */}
                      <div className="space-y-3 mb-4">
                        {hollywoodApartments.filter(apt => apt.available).map((apt) => {
                          const pricing = apt.pricing.find(p => p.guests === selectedGuests);
                          return (
                            <div 
                              key={apt.id}
                              className="border-2 border-black rounded-sm p-4 hover:border-[#FF6B00] transition-colors cursor-pointer"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="text-sm mb-1">{apt.name}</div>
                                  <div className="text-xs text-gray-500">{apt.type}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-gray-500 line-through">€{pricing?.priceWith}</div>
                                  <div className="text-lg text-[#FF6B00]">€{pricing?.priceWithout}</div>
                                  <div className="text-xs text-gray-500">per night</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <BedDouble size={12} />
                                  <span>{apt.bedroom}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users size={12} />
                                  <span>{apt.livingRoom}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User size={12} />
                                  <span>Max {apt.maxGuests}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <Button className="w-full bg-[#FF6B00] hover:bg-black text-white py-3 rounded-sm transition-colors">
                        Continue to Booking
                      </Button>
                    </div>
                  </div>

                  {/* Quick Info Card */}
                  <div className="border border-gray-200 rounded-sm p-6">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                      Quick Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Check-in</span>
                        <span className="text-sm">After 3:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Check-out</span>
                        <span className="text-sm">Until 11:00 AM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Minimum Stay</span>
                        <span className="text-sm">2 nights</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Policy</span>
                        <span className="text-sm">Non-smoking</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}