import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0A0A0A] border-l border-white/10 z-[80] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/80">
                Votre Panier
              </span>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="text-sm font-light">Votre panier est vide.</p>
                  <button 
                    onClick={() => {
                        setIsCartOpen(false);
                        const el = document.getElementById("collection");
                        if(el) el.scrollIntoView({behavior: "smooth"});
                    }}
                    className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-white/30 pb-1 hover:text-white transition-colors"
                  >
                    Découvrir la collection
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex space-x-4">
                      <div className="w-20 h-24 bg-[#111111] overflow-hidden rounded-sm flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-white">{item.product.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-white/40 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-white/50 mt-1">Bracelet FKM</p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center space-x-3 border border-white/10 rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-white/50 hover:text-white p-1"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono text-white w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-white/50 hover:text-white p-1"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-light text-white">€{item.product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 bg-[#050505]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs text-white/60 uppercase tracking-[0.1em]">Total</span>
                  <span className="text-lg font-light text-white">€{totalPrice}</span>
                </div>
                <button 
                  onClick={() => {
                     setIsCartOpen(false);
                     onCheckout();
                  }}
                  className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold flex justify-center hover:bg-neutral-200 transition-colors rounded-full"
                >
                  Procéder au paiement
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
