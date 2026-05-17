import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export function Checkout({ onBack }: { onBack: () => void }) {
  const { items, totalPrice } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return (
      <div className="pt-40 min-h-screen text-center text-white px-6">
        <h2 className="text-3xl font-serif mb-6">Votre panier est vide</h2>
        <button onClick={onBack} className="text-[10px] uppercase tracking-[0.2em] border-b border-white/30 pb-1">
          Retour à la collection
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen relative z-10 px-6 md:px-12 max-w-7xl mx-auto text-white">
      <button onClick={onBack} className="inline-flex items-center space-x-2 text-white/50 hover:text-white transition-colors mb-10">
        <ChevronLeft className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Retour</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="lg:col-span-7"
         >
           <h1 className="text-3xl font-serif font-light mb-10">Informations de Paiement</h1>
           
           <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Ceci est une démo. Paiement simulé avec succès.')}}>
              <div>
                 <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">Contact</h3>
                 <input 
                   type="email" 
                   placeholder="Email *" 
                   className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                   required
                 />
              </div>
              
              <div>
                 <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 mt-8">Livraison</h3>
                 <div className="grid grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Prénom *" 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Nom *" 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                      required
                    />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Adresse *" 
                   className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors mt-6"
                   required
                 />
                 <div className="grid grid-cols-2 gap-6 mt-6">
                    <input 
                      type="text" 
                      placeholder="Code Postal *" 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Ville *" 
                      className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                      required
                    />
                 </div>
                 <select required className="w-full bg-black/50 border-b border-white/20 py-4 outline-none text-sm text-white/70 focus:border-white transition-colors mt-6 appearance-none cursor-pointer">
                    <option value="" disabled selected>Pays de livraison *</option>
                    <option value="CH">Suisse</option>
                    <option value="FR">France</option>
                    <option value="UK">Royaume-Uni</option>
                    <option value="US">États-Unis</option>
                 </select>
              </div>

              <div>
                 <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 mt-8">Paiement</h3>
                 <div className="p-6 border border-white/10 rounded-sm bg-[#0A0A0A] space-y-6">
                    <input 
                      type="text" 
                      placeholder="Numéro de carte *" 
                      className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                      required
                    />
                    <div className="grid grid-cols-2 gap-6">
                       <input 
                         type="text" 
                         placeholder="MM/AA *" 
                         className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                         required
                       />
                       <input 
                         type="text" 
                         placeholder="CVC *" 
                         className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-sm placeholder:text-white/30 focus:border-white transition-colors"
                         required
                       />
                    </div>
                 </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-8 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold border border-white hover:bg-neutral-200 transition-all rounded-full"
              >
                Payer {totalPrice} €
              </button>
           </form>
         </motion.div>

         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="lg:col-span-5"
         >
           <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-sm sticky top-32">
             <h3 className="text-xs uppercase tracking-[0.2em] text-white/80 mb-8 border-b border-white/10 pb-4">Résumé de la commande</h3>
             
             <div className="space-y-6 mb-8">
               {items.map(item => (
                 <div key={item.product.id} className="flex justify-between items-center text-sm">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-16 bg-[#111111] overflow-hidden rounded-sm flex-shrink-0">
                       <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                     </div>
                     <div>
                       <p className="text-white font-medium">{item.product.name}</p>
                       <p className="text-white/40 text-xs mt-1">Qté: {item.quantity}</p>
                     </div>
                   </div>
                   <p className="text-white/80">€{item.product.price * item.quantity}</p>
                 </div>
               ))}
             </div>
             
             <div className="border-t border-white/10 pt-6 space-y-4 text-sm">
                <div className="flex justify-between text-white/60">
                   <span>Sous-total</span>
                   <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/60">
                   <span>Livraison Standard (Suisse)</span>
                   <span>Offerte</span>
                </div>
                <div className="flex justify-between items-center text-lg text-white font-light mt-4 pt-4 border-t border-white/10">
                   <span>Total</span>
                   <span>€{totalPrice}</span>
                </div>
             </div>
             
             <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center space-x-2 text-[8px] uppercase tracking-[0.1em] text-white/30">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               <span>Paiement 100% Sécurisé</span>
             </div>
           </div>
         </motion.div>
      </div>
    </div>
  );
}
