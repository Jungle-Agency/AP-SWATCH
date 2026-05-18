import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function Checkout({ onBack }: { onBack: () => void }) {
  const { items, totalPrice } = useCart();
  const { currency, formatPrice } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.product.id, quantity: i.quantity })),
          origin: window.location.origin,
          currency,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'initialisation du paiement.");
      }

      const { url } = await res.json();
      if (!url) throw new Error("URL de paiement manquante.");
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-serif font-light mb-6">Finaliser la précommande</h1>

          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-amber-400/40 bg-amber-400/10 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-200">Précommande — Livraison le 10 juin 2026</span>
          </div>

          <p className="text-sm text-neutral-400 leading-relaxed mb-10 max-w-md">
            Vous serez redirigé vers notre page de paiement sécurisée Stripe pour saisir vos
            coordonnées de livraison et régler votre précommande. Votre bracelet sera expédié le
            10 juin 2026, date de lancement officielle.
          </p>

          <ul className="space-y-3 text-sm text-neutral-400 mb-10 max-w-md">
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 mt-2 bg-white/40 rounded-full shrink-0"></span>
              <span>Paiement sécurisé par <span className="text-white font-medium">Stripe</span> — CB, Apple Pay & Google Pay.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 mt-2 bg-white/40 rounded-full shrink-0"></span>
              <span>Frais de port calculés à l'étape suivante selon le pays.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 mt-2 bg-white/40 rounded-full shrink-0"></span>
              <span>TVA incluse dans le prix affiché.</span>
            </li>
          </ul>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 py-4 px-10 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold border border-white hover:bg-neutral-200 transition-all rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirection…
              </>
            ) : (
              <>Procéder au paiement — {formatPrice(totalPrice)}</>
            )}
          </button>

          {error && (
            <p className="mt-6 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
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
                  <p className="text-white/80">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6 space-y-4 text-sm">
              <div className="flex justify-between text-white/60">
                <span>Sous-total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Livraison</span>
                <span>Calculée à l'étape suivante</span>
              </div>
              <div className="flex justify-between items-center text-lg text-white font-light mt-4 pt-4 border-t border-white/10">
                <span>Total avant livraison</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center space-x-2 text-[8px] uppercase tracking-[0.1em] text-white/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Paiement sécurisé par Stripe</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
