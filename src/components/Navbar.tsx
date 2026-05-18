import { Menu, X, ShoppingBag } from "lucide-react";
import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export function Navbar({ onNavigate, currentView }: { onNavigate: (v: 'home'|'checkout') => void, currentView: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { currency, setCurrency } = useCurrency();
  
  const isHome = currentView === 'home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "#collection" },
    { name: "Savoir-Faire", href: "#expertise" },
    { name: "Héritage", href: "#heritage" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) {
       e.preventDefault();
       onNavigate('home');
       setTimeout(() => {
         const element = document.getElementById(href.replace('#', ''));
         if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
         }
       }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const bgStyle = isScrolled || !isHome
    ? "bg-[#050505]/95 backdrop-blur-md py-4 border-b border-white/5"
    : "bg-transparent py-10";

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${bgStyle}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex-shrink-0 cursor-pointer group flex items-center space-x-3">
             <svg viewBox="0 0 32 24" className="w-8 h-6 text-white group-hover:text-neutral-300 transition-colors duration-500" fill="none" stroke="currentColor" strokeWidth="1.5">
               <circle cx="10" cy="12" r="9" />
               <circle cx="22" cy="12" r="9" />
             </svg>
            <h2 className="font-sans text-xs font-bold tracking-[0.4em] uppercase group-hover:text-neutral-400 transition-colors duration-500 text-white">
              Swap Geneva
            </h2>
          </button>

          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="hidden sm:flex items-center text-[10px] uppercase tracking-[0.2em] border border-white/15 rounded-full overflow-hidden">
              {(["EUR", "CHF"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 transition-colors ${
                    currency === c
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                  aria-pressed={currency === c}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white/80 hover:text-white transition-colors flex items-center"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-black text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            
            <a href="#collection" onClick={(e) => handleNavClick(e, '#collection')} className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 text-white">
              Acquérir
            </a>
            
            <button
              className="md:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#050505]/98 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>
            <div className="flex flex-col space-y-8 items-center text-center">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-2xl font-serif font-light italic text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="w-12 h-[1px] bg-white/20 my-4" />
              <a href="#collection" onClick={(e) => handleNavClick(e, '#collection')} className="px-8 py-3 w-full max-w-sm border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 text-white">
                Acquérir
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
