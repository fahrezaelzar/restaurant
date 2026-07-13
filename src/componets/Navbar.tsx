import { useState } from 'react';
import { Menu, X, Leaf, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenOrder: () => void;
  cartCount: number;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({
  onOpenOrder,
  cartCount,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { name: 'Home', action: () => { scrollTo('home'); setIsOpen(false); } },
    { name: 'About', action: () => { scrollTo('about'); setIsOpen(false); } },
    { name: 'Menu', action: () => { scrollTo('menu'); setIsOpen(false); } },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Logo */}
        <button 
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2.5 text-xl font-display font-extrabold tracking-tight text-zinc-950 cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
            <Leaf className="h-4 w-4" />
          </div>
          <span className="font-bold tracking-tighter uppercase text-zinc-900">VERDANT <span className="text-green-600 font-light">KITCHEN</span></span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-sans">
          {navLinks.map((link) => {
            const isLinkActive = link.name.toLowerCase() === activeSection;
            return (
              <button
                key={link.name}
                onClick={link.action}
                className={`relative py-2 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                  isLinkActive ? 'text-green-600' : 'text-zinc-500 hover:text-green-600'
                }`}
              >
                {link.name}
                {isLinkActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-green-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onOpenOrder}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          
          <button
            onClick={onOpenOrder}
            className="flex h-11 items-center justify-center rounded-none bg-zinc-950 px-8 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-green-600 active:scale-[0.98] cursor-pointer"
          >
            Order Now
          </button>
        </div>

        {/* Mobile Hamburger / Cart controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={onOpenOrder}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700"
            aria-label="View Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-600 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-none border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-zinc-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-4 pb-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="flex w-full py-3 text-left font-sans text-xs font-bold uppercase tracking-widest text-zinc-800 hover:text-green-600"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-3">
                <button
                  onClick={() => { setIsOpen(false); onOpenOrder(); }}
                  className="flex w-full h-12 items-center justify-center rounded-none bg-green-600 font-sans text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-green-600/10"
                >
                  Order Box Builder
                </button>
                <button
                  onClick={() => { setIsOpen(false); onOpenOrder(); }}
                  className="flex w-full h-12 items-center justify-center rounded-none bg-zinc-950 font-sans text-xs font-bold uppercase tracking-widest text-white"
                >
                  Checkout Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
