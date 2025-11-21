import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Search, Users, X, Minus, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const madeiraLocations = [
  'Funchal',
  'Câmara de Lobos',
  'Ribeira Brava',
  'Ponta do Sol',
  'Calheta',
  'Porto Moniz',
  'São Vicente',
  'Santana',
  'Machico',
  'Santa Cruz',
  'Porto Santo'
];

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export function BookingBar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0
  });
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateGuests = (type: keyof GuestCounts, increment: boolean) => {
    setGuests(prev => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalGuests = guests.adults + guests.children + guests.infants;

  const getGuestsText = () => {
    if (totalGuests === 0) return 'Add guests';
    const parts = [];
    if (guests.adults > 0) parts.push(`${guests.adults} adult${guests.adults > 1 ? 's' : ''}`);
    if (guests.children > 0) parts.push(`${guests.children} child${guests.children > 1 ? 'ren' : ''}`);
    if (guests.infants > 0) parts.push(`${guests.infants} infant${guests.infants > 1 ? 's' : ''}`);
    return parts.join(', ');
  };

  return (
    <motion.div
      className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex justify-center">
        <div className="relative" ref={dropdownRef}>
          <div className="bg-white border border-gray-300 rounded-full shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-4 gap-0 items-center">
              {/* Location */}
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
                className={`px-6 py-3 border-r border-gray-300 text-left rounded-l-full transition-colors ${
                  activeDropdown === 'location' ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <p className="text-xs mb-1">Location</p>
                <p className={`text-sm truncate ${selectedLocation ? 'text-black' : 'text-gray-400'}`}>
                  {selectedLocation || 'Where are you going?'}
                </p>
              </button>

              {/* Check-in */}
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'checkin' ? null : 'checkin')}
                className={`px-6 py-3 border-r border-gray-300 text-left transition-colors ${
                  activeDropdown === 'checkin' ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <p className="text-xs mb-1">Check-in</p>
                <p className={`text-sm ${checkIn ? 'text-black' : 'text-gray-400'}`}>
                  {checkIn ? checkIn.toLocaleDateString('en-GB') : 'Add date'}
                </p>
              </button>

              {/* Check-out */}
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'checkout' ? null : 'checkout')}
                className={`px-6 py-3 border-r border-gray-300 text-left transition-colors ${
                  activeDropdown === 'checkout' ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <p className="text-xs mb-1">Check-out</p>
                <p className={`text-sm ${checkOut ? 'text-black' : 'text-gray-400'}`}>
                  {checkOut ? checkOut.toLocaleDateString('en-GB') : 'Add date'}
                </p>
              </button>

              {/* Guests + Search */}
              <div className="px-6 py-3 flex items-center justify-between gap-4 rounded-r-full">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'guests' ? null : 'guests')}
                  className={`text-left flex-1 transition-colors rounded ${
                    activeDropdown === 'guests' ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="text-xs mb-1">Guests</p>
                  <p className={`text-sm truncate ${totalGuests > 0 ? 'text-black' : 'text-gray-400'}`}>
                    {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add'}
                  </p>
                </button>
                <button className="w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#FF8C00] transition-colors">
                  <Search className="text-white" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dropdowns */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-4 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
                style={{
                  left: activeDropdown === 'location' ? '0' : 
                        activeDropdown === 'checkin' ? '25%' : 
                        activeDropdown === 'checkout' ? '50%' : '75%',
                  transform: 'translateX(-25%)',
                  minWidth: activeDropdown === 'guests' ? '400px' : '320px'
                }}
              >
                {/* Location Dropdown */}
                {activeDropdown === 'location' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg">Select location</h3>
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-1 max-h-[400px] overflow-y-auto">
                      {madeiraLocations.map((location) => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setActiveDropdown(null);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            selectedLocation === location
                              ? 'bg-gray-100 font-medium'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-gray-400" />
                            <span>{location}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Check-in Calendar */}
                {activeDropdown === 'checkin' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg">Check-in date</h3>
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={checkIn ? checkIn.toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                          setCheckIn(e.target.value ? new Date(e.target.value) : null);
                          setActiveDropdown(null);
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>
                )}

                {/* Check-out Calendar */}
                {activeDropdown === 'checkout' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg">Check-out date</h3>
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={checkOut ? checkOut.toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                          setCheckOut(e.target.value ? new Date(e.target.value) : null);
                          setActiveDropdown(null);
                        }}
                        min={checkIn ? checkIn.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      />
                    </div>
                  </div>
                )}

                {/* Guests Dropdown */}
                {activeDropdown === 'guests' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg">Who</h3>
                      <button
                        onClick={() => setActiveDropdown(null)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Adults */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div>
                          <p className="text-base">Adults</p>
                          <p className="text-sm text-gray-500">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateGuests('adults', false)}
                            disabled={guests.adults <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{guests.adults}</span>
                          <button
                            onClick={() => updateGuests('adults', true)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div>
                          <p className="text-base">Children</p>
                          <p className="text-sm text-gray-500">Ages 2–12</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateGuests('children', false)}
                            disabled={guests.children <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{guests.children}</span>
                          <button
                            onClick={() => updateGuests('children', true)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="flex items-center justify-between py-4 border-b border-gray-200">
                        <div>
                          <p className="text-base">Infants</p>
                          <p className="text-sm text-gray-500">Under 2</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateGuests('infants', false)}
                            disabled={guests.infants <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{guests.infants}</span>
                          <button
                            onClick={() => updateGuests('infants', true)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Pets */}
                      <div className="flex items-center justify-between py-4">
                        <div>
                          <p className="text-base">Pets</p>
                          <button className="text-sm text-gray-500 underline text-left hover:text-black transition-colors">
                            Bringing a service animal?
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => updateGuests('pets', false)}
                            disabled={guests.pets <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{guests.pets}</span>
                          <button
                            onClick={() => updateGuests('pets', true)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}