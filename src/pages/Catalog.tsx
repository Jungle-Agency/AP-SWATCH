import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { products } from "../data/products";
import { useCurrency } from "../context/CurrencyContext";
import { ArrowUpRight } from "lucide-react";

export function Catalog() {
  const { formatPrice } = useCurrency();
  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="mb-16 md:mb-24 text-center"
      >
         <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-6 block">Collection Complète</span>
         <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
           L'Excellence <span className="italic text-neutral-400">Suisse</span>
         </h1>
         <p className="font-light text-neutral-400 max-w-xl mx-auto">
           Découvrez notre gamme complète de bracelets premium FKM, conçus spécifiquement pour compléter les lignes architecturales de la Royal Pop.
         </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((strap, index) => (
          <motion.div
            key={strap.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Link to={`/product/${strap.id}`} className="group relative block cursor-pointer">
              <div className="aspect-square bg-[#0A0A0A] border border-white/5 overflow-hidden relative mb-6 rounded-sm">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={strap.image} 
                  alt={strap.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              
              <div className="flex justify-between items-start text-left">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{strap.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{strap.shortDesc}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-base font-light text-white">{formatPrice(strap.price)}</p>
                    {strap.originalPrice && (
                      <p className="text-sm font-light text-white/40 line-through">{formatPrice(strap.originalPrice)}</p>
                    )}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
