import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, HeartPulse, ChevronLeft, ChevronRight, Sparkles, 
  MapPin,Flame, Award,Shield,Heart,Users,Star, Quote, Plus } from 'lucide-react';
import { DISHES, TESTIMONIALS } from './data';
import type { CartItem, Dish } from './type';

import Navbar from './componets/Navbar';
import OrderDrawer from './componets/OrderDrawer';
import SpotlightCard from './componets/SpotlightCard';
import SuccessModal from './componets/SuccessModal';

export default function App() {
  // Navigation & Modal States
  const [activeSection, setActiveSection] = useState('home');
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [successOrderDetails, setSuccessOrderDetails] = useState<{ name: string; itemsCount: number; total: number } | null>(null);

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDishToCustomize, setSelectedDishToCustomize] = useState<Dish | undefined>(undefined);

  // Spotlight Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Dynamic Menu states (Menu section)
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<'all' | 'bowls' | 'mains' | 'juices' | 'desserts'>('all');
  const [activeMenuDishId, setActiveMenuDishId] = useState<string>(DISHES[0].id);

  const filteredDishes = selectedMenuCategory === 'all'
    ? DISHES
    : DISHES.filter(d => d.category === selectedMenuCategory);

  const activeMenuDish = DISHES.find(d => d.id === activeMenuDishId) || DISHES[0];

  // Carousel slider ref to scroll cards smoothly
  const menuCarouselRef = useRef<HTMLDivElement>(null);

  // Auto-observe active scroll sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'menu'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active menu dish if category changes and current selection is excluded
  useEffect(() => {
    if (filteredDishes.length > 0) {
      const exists = filteredDishes.some(d => d.id === activeMenuDishId);
      if (!exists) {
        setActiveMenuDishId(filteredDishes[0].id);
      }
    }
  }, [selectedMenuCategory, filteredDishes, activeMenuDishId]);

  // Safe rotation indexes
  const getDishIndex = (offset: number) => {
    return (activeIndex + offset) % DISHES.length;
  };

  const activeDish = DISHES[getDishIndex(0)];

  // Set interval for image cycle (every 6 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISHES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Handlers for spotlight controls
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % DISHES.length);
  }, []);

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Menu section carousel actions
  const handlePrevMenuDish = () => {
    const currentIndex = filteredDishes.findIndex(d => d.id === activeMenuDishId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex - 1 + filteredDishes.length) % filteredDishes.length;
      setActiveMenuDishId(filteredDishes[nextIndex].id);
      scrollToActiveCarouselCard(filteredDishes[nextIndex].id);
    }
  };

  const handleNextMenuDish = () => {
    const currentIndex = filteredDishes.findIndex(d => d.id === activeMenuDishId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredDishes.length;
      setActiveMenuDishId(filteredDishes[nextIndex].id);
      scrollToActiveCarouselCard(filteredDishes[nextIndex].id);
    }
  };

  const scrollToActiveCarouselCard = (dishId: string) => {
    setTimeout(() => {
      const element = document.getElementById(`carousel-card-${dishId}`);
      if (element && menuCarouselRef.current) {
        const container = menuCarouselRef.current;
        const leftOffset = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
        container.scrollTo({ left: leftOffset, behavior: 'smooth' });
      }
    }, 50);
  };

  // Cart actions
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenCustomizeWithDish = (dish: Dish) => {
    setSelectedDishToCustomize(dish);
    setIsOrderOpen(true);
  };

  const handleOpenBlankOrder = () => {
    setSelectedDishToCustomize(undefined);
    setIsOrderOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-green-100 selection:text-green-900">
      
      {/* Navigation Bar */}
      <Navbar
        onOpenOrder={handleOpenBlankOrder}
        cartCount={cart.length}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        
        {/* SECTION 1: HERO SECTION */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)] border-b border-zinc-100">
          
          {/* LEFT COLUMN: Hero content & rotating spotlight card (Lg: 7 cols) */}
          <div className="lg:col-span-7 bg-white relative flex flex-col justify-between p-6 sm:p-10 lg:p-16 space-y-12 lg:space-y-0">
            
            {/* Subtle ambient decorative dots */}
            <div className="absolute top-20 left-10 h-64 w-64 bg-zinc-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
            
            {/* Top text content & badging */}
            <div className="space-y-6 max-w-xl">
              {/* Trust badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-semibold tracking-widest uppercase text-xs mb-2 block"
              >
                Freshly Harvested // Bio-Dynamic Farming Sourced
              </motion.div>

              {/* Big Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[0.95] text-neutral-900 mb-6"
              >
                Nourish your body <br />
                with <span className="font-black italic text-green-600">pure organic</span> culinary art.
              </motion.h1>

              {/* Paragraph Description */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg mb-8"
              >
                Delicious, chef-crafted organic meal boxes formulated by clinical nutritionists. Prepared with zero seed oils, zero refined sugars, and 100% traceable clean ingredients. Engineered for vibrant cellular energy.
              </motion.p>

              {/* Aesthetic Rating Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 py-2"
              >
                <div className="w-12 h-px bg-neutral-300"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 italic">Rated 4.9/5 by local gourmands</span>
              </motion.div>

              {/* Quick Sourcing Badges with Hover scale */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="grid grid-cols-3 gap-4 pt-4 font-display text-xs font-bold text-zinc-800 border-t border-zinc-100"
              >
                <div className="flex items-center gap-2 group cursor-help">
                  <div className="flex h-8 w-8 items-center justify-center rounded-none bg-zinc-50 text-green-600 transition-transform group-hover:scale-105">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight uppercase text-[10px]">Zero Toxins</h4>
                    <p className="font-sans text-[9px] text-zinc-400 font-normal">No Chemicals</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 group cursor-help">
                  <div className="flex h-8 w-8 items-center justify-center rounded-none bg-zinc-50 text-green-600 transition-transform group-hover:scale-105">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight uppercase text-[10px]">Nutrient Rich</h4>
                    <p className="font-sans text-[9px] text-zinc-400 font-normal">Active Enzymes</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 group cursor-help">
                  <div className="flex h-8 w-8 items-center justify-center rounded-none bg-zinc-50 text-green-600 transition-transform group-hover:scale-105">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight uppercase text-[10px]">Local Sourced</h4>
                    <p className="font-sans text-[9px] text-zinc-400 font-normal">Within 50 Miles</p>
                  </div>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-4 pt-6"
              >
                <button
                  onClick={handleOpenBlankOrder}
                  className="flex h-12 items-center justify-center gap-2 rounded-none bg-zinc-950 px-8 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-sm hover:bg-green-600 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Customize Your Box
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex h-12 items-center justify-center rounded-none border border-zinc-200 bg-white px-8 font-sans text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-all cursor-pointer"
                >
                  Explore Culinary Menu
                </button>
              </motion.div>
            </div>

            {/* Interactive Spotlight panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-xl lg:pt-8"
            >
              <SpotlightCard
                activeDish={activeDish}
                isAutoPlaying={isAutoPlaying}
                onToggleAutoPlay={handleToggleAutoPlay}
                onPrev={handlePrev}
                onNext={handleNext}
                onOrderNow={() => handleOpenCustomizeWithDish(activeDish)}
              />
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Modern Asymmetrical Abstract Photo Grid on Black Background (Lg: 5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950 relative flex items-top justify-center p-6 sm:p-10 lg:p-12 min-h-[500px] lg:min-h-0 overflow-hidden">
            
            {/* Grid background textures */}
            <div className="absolute inset-0 bg-[radial-gradient(#1c1917_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-neutral-900 rounded-full blur-3xl opacity-25 pointer-events-none" />

            {/* Abstract Grid of 3 overlapping frame elements */}
            <div className="relative w-full max-w-md aspect-[4/5] md:aspect-[1/1] lg:aspect-[4/5] flex items-center justify-center">
              
              {/* SLOT 1: Primary Large Offset Frame */}
              <motion.div
                layout
                onClick={() => setIsAutoPlaying(false)}
                className="absolute left-0 top-0 w-[64%] h-[56%] bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden shadow-2xl shadow-black/80 -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 z-20 group cursor-pointer"
                title="Primary Spot - Auto rotates. Hover to freeze. Click to inspect recipe."
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDish.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55 }}
                    className="h-full w-full relative"
                  >
                    <img
                      src={DISHES[getDishIndex(0)].image}
                      alt={DISHES[getDishIndex(0)].name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-green-500 uppercase tracking-widest block">Core Dish</span>
                        <h4 className="font-display font-extrabold text-xs text-white truncate max-w-[120px]">
                          {DISHES[getDishIndex(0)].name}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] font-extrabold bg-white text-zinc-950 px-2.5 py-1 rounded-none">
                        ${DISHES[getDishIndex(0)].price.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* SLOT 2: Secondary Accent Frame */}
              <motion.div
                layout
                onClick={() => {
                  setActiveIndex(getDishIndex(1));
                  setIsAutoPlaying(false);
                }}
                className="absolute right-0 top-[14%] w-[54%] h-[46%] bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden shadow-xl shadow-black/60 rotate-2 hover:rotate-0 hover:scale-[1.03] transition-all duration-300 z-10 group cursor-pointer"
                title="Click to spotlight this dish"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={DISHES[getDishIndex(1)].id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55 }}
                    className="h-full w-full relative"
                  >
                    <img
                      src={DISHES[getDishIndex(1)].image}
                      alt={DISHES[getDishIndex(1)].name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <h4 className="font-display font-bold text-[10px] text-white truncate max-w-[80px]">
                        {DISHES[getDishIndex(1)].name}
                      </h4>
                      <span className="font-mono text-[9px] font-bold text-green-500">
                        ${DISHES[getDishIndex(1)].price.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* SLOT 3: Balanced Overlapping Frame */}
              <motion.div
                layout
                onClick={() => {
                  setActiveIndex(getDishIndex(2));
                  setIsAutoPlaying(false);
                }}
                className="absolute left-[12%] bottom-[4%] w-[68%] h-[38%] bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden shadow-2xl shadow-black/90 -rotate-2 hover:rotate-0 hover:scale-[1.03] transition-all duration-300 z-30 group cursor-pointer"
                title="Click to spotlight this dish"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={DISHES[getDishIndex(2)].id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55 }}
                    className="h-full w-full relative"
                  >
                    <img
                      src={DISHES[getDishIndex(2)].image}
                      alt={DISHES[getDishIndex(2)].name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="font-mono text-[8px] font-semibold text-green-400 uppercase tracking-widest block">Organic pairing</span>
                        <h4 className="font-display font-extrabold text-[11px] text-white truncate">
                          {DISHES[getDishIndex(2)].name}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] font-extrabold bg-zinc-950 border border-zinc-800 text-white px-2 py-0.5 rounded-none shrink-0">
                        View
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Micro aesthetic element */}
              <div className="absolute bottom-0 right-4 flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-widest pointer-events-none">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                <span>Rotates every 6s</span>
              </div>
   
            </div>

          </div>

        </section>

        {/* SECTION 2: ABOUT SECTION */}
        <section id="about" className="py-24 px-6 sm:px-8 lg:px-16 bg-zinc-50 border-b border-zinc-100">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Header Text Block */}
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-green-600 font-semibold tracking-widest uppercase text-xs">Our Sourcing & Philosophy</span>
              <h2 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mt-3 leading-tight">
                Sourced with integrity. <br />
                <span className="font-black italic text-green-600">Plated with purpose.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-6">
                We believe food is medicine. Every dish at Verdant Kitchen is designed by certified clinical nutritionists and executed by artisanal chefs to deliver absolute health without sacrificing high-end culinary pleasure.
              </p>
            </div>

            {/* 4-Column Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-none border border-zinc-200 bg-white p-6 space-y-4 shadow-sm hover:border-zinc-400 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center bg-zinc-50 text-green-600">
                  <Shield className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-950 uppercase tracking-wider text-xs">Zero Toxins</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  No refined sugars, hydrogenated seed oils, artificial colors, or chemical preservatives. Ever.
                </p>
              </div>

              <div className="rounded-none border border-zinc-200 bg-white p-6 space-y-4 shadow-sm hover:border-zinc-400 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center bg-zinc-50 text-green-600">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-950 uppercase tracking-wider text-xs">100% Organic</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  We partner directly with 14 local bio-dynamic farms to source fresh, soil-nurtured, organic produce.
                </p>
              </div>

              <div className="rounded-none border border-zinc-200 bg-white p-6 space-y-4 shadow-sm hover:border-zinc-400 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center bg-zinc-50 text-green-600">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-950 uppercase tracking-wider text-xs">Nutrient Dense</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Engineered using cold-press and raw-state retention to maximize vitamins, active enzymes, and raw minerals.
                </p>
              </div>

              <div className="rounded-none border border-zinc-200 bg-white p-6 space-y-4 shadow-sm hover:border-zinc-400 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center bg-zinc-50 text-green-600">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-zinc-950 uppercase tracking-wider text-xs">Traceability</h4>
                <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                  Scan any order QR to trace back its complete lifecycle, from seed planting to your custom bowl.
                </p>
              </div>
            </div>

            {/* Farm-to-Table Promise layout */}
            <div className="rounded-none border border-zinc-200 bg-white p-8 md:p-10 space-y-6 max-w-5xl mx-auto shadow-sm">
              <h3 className="font-display text-xl font-bold text-zinc-900 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                Our Farm-to-Table Promise
              </h3>
              <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                By purchasing directly from growers, we bypass supply chain warehouses. This guarantees that your greens are in our kitchen less than 12 hours from harvest, preserving up to <strong className="text-green-600 font-semibold">80% more active antioxidants</strong> than typical grocery equivalents.
              </p>
              <div className="flex flex-wrap items-center justify-between border-t border-zinc-100 pt-6 text-xs font-mono text-zinc-400 gap-4">
                <span>📍 Sourced within 50 miles</span>
                <span>👨‍🌾 Fair Trade Certified</span>
                <span>🧪 Clean Label Project Verified</span>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6 pt-6">
              <div className="text-center">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-green-600">What Wellness Leaders Say</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="rounded-none border border-zinc-200 p-6 space-y-4 relative overflow-hidden bg-white shadow-sm">
                    <Quote className="absolute right-4 top-4 h-8 w-8 text-zinc-50" />
                    <div className="flex items-center gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-green-600 text-green-600" />
                      ))}
                    </div>
                    <p className="font-sans text-xs text-zinc-600 italic relative z-10 leading-relaxed">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-zinc-100">
                      <div>
                        <h5 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-900">{t.name}</h5>
                        <p className="font-sans text-[10px] text-zinc-400 mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: MENU SECTION WITH DYNAMIC SPLIT LAYOUT & CAROUSEL */}
        <section id="menu" className="py-24 px-6 sm:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* Header Title */}
            <div className="max-w-xl">
              <span className="text-green-600 font-semibold tracking-widest uppercase text-xs">Curated Plates</span>
              <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 mt-2">
                Our <span className="font-black italic text-green-600">Culinary Menu</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-zinc-500 mt-2">
                Nutrient-dense organic plates designed for longevity, cellular energy, and pristine health.
              </p>
            </div>

            {/* Split Screen Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: DYNAMIC NUTRIENT BOX (Lg: 5 cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <div className="rounded-none border border-zinc-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  {/* Dynamic image block with zoom & fade transitions */}
                  <div className="relative h-64 w-full overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeMenuDish.id}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        src={activeMenuDish.image}
                        alt={activeMenuDish.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-zinc-950 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1">
                        {activeMenuDish.category.toUpperCase()}
                      </span>
                      <span className="bg-green-600 text-white text-[10px] font-mono font-extrabold px-2.5 py-1">
                        ${activeMenuDish.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-green-600" />
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">Nutritional Focus</span>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-zinc-900">
                      {activeMenuDish.name}
                    </h3>
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                      {activeMenuDish.description}
                    </p>
                    
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeMenuDish.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-50 border border-zinc-200 text-zinc-600 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Custom macros visual progress indicators */}
                  <div className="space-y-3.5 pt-4 border-t border-zinc-100">
                    
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-1">
                      <span className="flex items-center gap-1 font-bold text-zinc-600 uppercase tracking-wide">
                        <Flame className="h-3.5 w-3.5 text-orange-500" />
                        {activeMenuDish.nutrition.calories} kcal Energy
                      </span>
                      <span>Target Proportions</span>
                    </div>

                    {/* Protein bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-600">
                        <span className="flex items-center gap-1 font-semibold">Protein <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeMenuDish.nutrition.protein}g)</span></span>
                        <span className="font-mono text-green-600 font-bold">Build & Repair</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
                        <motion.div
                          key={`menu-p-${activeMenuDish.id}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((activeMenuDish.nutrition.protein / 50) * 100, 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full bg-green-600 rounded-none"
                        />
                      </div>
                    </div>

                    {/* Carbs bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-600">
                        <span className="flex items-center gap-1 font-semibold">Healthy Carbs <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeMenuDish.nutrition.carbs}g)</span></span>
                        <span className="font-mono text-zinc-400">Complex Glycemic</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
                        <motion.div
                          key={`menu-c-${activeMenuDish.id}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((activeMenuDish.nutrition.carbs / 100) * 100, 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full bg-zinc-400 rounded-none"
                        />
                      </div>
                    </div>

                    {/* Fats bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-600">
                        <span className="flex items-center gap-1 font-semibold">Healthy Fats <span className="font-mono text-[9px] text-zinc-400 font-normal">({activeMenuDish.nutrition.fats}g)</span></span>
                        <span className="font-mono text-zinc-400">Essential Lipids</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-100 rounded-none overflow-hidden">
                        <motion.div
                          key={`menu-f-${activeMenuDish.id}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((activeMenuDish.nutrition.fats / 50) * 100, 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full bg-zinc-800 rounded-none"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Immediate Add CTA */}
                  <button
                    onClick={() => handleOpenCustomizeWithDish(activeMenuDish)}
                    className="flex w-full h-11 items-center justify-center gap-1.5 rounded-none bg-zinc-950 font-sans text-xs font-bold uppercase tracking-widest text-white hover:bg-green-600 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Customize & Order Box
                  </button>

                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE CAROUSEL TRACK (Lg: 7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Categories filtering bar */}
                <div className="border-b border-zinc-100 pb-3 flex flex-wrap gap-2 items-center justify-between">
                  
                  {/* Tabs */}
                  <div className="flex flex-wrap gap-1.5">
                    {(['all', 'bowls', 'mains', 'juices', 'desserts'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedMenuCategory(cat)}
                        className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                          selectedMenuCategory === cat
                            ? 'text-white'
                            : 'text-zinc-500 hover:text-zinc-950'
                        }`}
                      >
                        {selectedMenuCategory === cat && (
                          <motion.div
                            layoutId="active-scroll-menu-category-bg"
                            className="absolute inset-0 bg-zinc-950 rounded-none -z-10"
                            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                          />
                        )}
                        {cat === 'all' ? 'All Dishes' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Arrow controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevMenuDish}
                      className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
                      title="Previous Menu Item"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNextMenuDish}
                      className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors cursor-pointer"
                      title="Next Menu Item"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>

                {/* Horizontal sliding track */}
                <div 
                  ref={menuCarouselRef}
                  className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1"
                >
                  {filteredDishes.map((dish) => {
                    const isSelected = dish.id === activeMenuDishId;
                    return (
                      <div
                        id={`carousel-card-${dish.id}`}
                        key={dish.id}
                        onClick={() => setActiveMenuDishId(dish.id)}
                        className={`snap-center shrink-0 w-64 sm:w-72 border bg-white p-4 space-y-4 cursor-pointer transition-all duration-300 relative select-none ${
                          isSelected 
                            ? 'border-green-600 ring-2 ring-green-100 shadow-md' 
                            : 'border-zinc-200 hover:border-zinc-400 shadow-sm'
                        }`}
                      >
                        {/* Food Image with aspect ratios */}
                        <div className="relative h-44 w-full bg-zinc-50 overflow-hidden">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className={`h-full w-full object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'scale-100 group-hover:scale-102'}`}
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-white px-2 py-0.5 text-[8px] font-mono font-bold text-zinc-600 tracking-wider">
                            {dish.category.toUpperCase()}
                          </div>
                          <div className="absolute bottom-2 right-2 bg-zinc-950 text-white px-2 py-0.5 text-[10px] font-mono font-bold">
                            ${dish.price.toFixed(2)}
                          </div>
                        </div>

                        {/* Title, desc & macros overview */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className={`font-display text-xs font-bold uppercase tracking-wider truncate max-w-[180px] ${isSelected ? 'text-green-600' : 'text-zinc-900'}`}>
                              {dish.name}
                            </h4>
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-green-600" />
                            )}
                          </div>
                          <p className="font-sans text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>

                        {/* Quick specs bar */}
                        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-[9px] font-mono text-zinc-400">
                          <span className="flex items-center gap-0.5">
                            <Flame className="h-3 w-3 text-orange-500 shrink-0" />
                            {dish.nutrition.calories} kcal
                          </span>
                          <span>
                            P: {dish.nutrition.protein}g // C: {dish.nutrition.carbs}g
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Extra prompt/helper caption */}
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 justify-end">
                  <span>💡 Click any card above or swipe horizontally to cycle dishes</span>
                </div>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER: Lightweight clean bar */}
      <footer className="border-t border-zinc-100 py-8 px-8 bg-zinc-50">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
          <p>© 2026 Verde Kitchen Restaurant. Plated with purpose.</p>
          <div className="flex items-center gap-6 font-semibold tracking-wide uppercase text-[10px] text-zinc-400">
            <button onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-green-600 transition-colors cursor-pointer">Sourcing Integrity</button>
            <button onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-green-600 transition-colors cursor-pointer">Dietary Standards</button>
          </div>
        </div>
      </footer>

      {/* SLIDE-OVER PANELS & OVERLAYS */}
      <AnimatePresence>
        
        {/* Order Customizer Drawer / Cart */}
        {isOrderOpen && (
          <OrderDrawer
            onClose={() => setIsOrderOpen(false)}
            initialSelectedDish={selectedDishToCustomize}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onCheckoutSuccess={(details) => setSuccessOrderDetails(details)}
          />
        )}

        {/* Successful Order Modal */}
        {successOrderDetails && (
          <SuccessModal
            onClose={() => setSuccessOrderDetails(null)}
            orderDetails={successOrderDetails}
          />
        )}

      </AnimatePresence>

    </div>
  );
}
