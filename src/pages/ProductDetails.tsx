import { motion } from "motion/react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ChevronLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";

export function ProductDetails({ id, onBack }: { id: string, onBack: () => void }) {
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-6 md:px-12 max-w-7xl mx-auto text-white flex flex-col justify-center">
      <button onClick={onBack} className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-10 self-start">
        <ChevronLeft className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Retour</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="aspect-[4/5] bg-[#0A0A0A] border border-white/5 overflow-hidden rounded-sm relative">
            <img 
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-24 h-32 bg-[#0A0A0A] border rounded-sm overflow-hidden transition-all ${activeImage === idx ? 'border-white/50' : 'border-white/5 opacity-50 hover:opacity-100'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4 block">Bracelet Swap Geneva</span>
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-6">
            {product.name}
          </h1>
          <p className="text-xl font-light text-white mb-10">€{product.price}</p>
          
          <div className="h-[1px] w-full bg-white/10 mb-8"></div>

          <p className="text-base text-neutral-400 font-light leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="mb-12">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/80 mb-6 border-l-2 border-white/20 pl-3">Spécifications</h3>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-neutral-400">
                  <Check className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => addToCart(product, 1)}
            className="w-full py-4 px-8 border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.3em] font-bold rounded-full group flex items-center justify-center space-x-4"
          >
            <span>Ajouter au panier</span>
          </button>
          
          <div className="mt-8 flex items-center space-x-8 text-[9px] uppercase tracking-[0.2em] text-white/40">
             <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>En Stock</span>
             </div>
             <span>Livraison 48H</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
