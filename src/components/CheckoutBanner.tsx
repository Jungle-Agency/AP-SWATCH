import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useCart } from "../context/CartContext";

type Status = "success" | "cancel" | null;

export function CheckoutBanner() {
  const { clearCart } = useCart();
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("status");
    if (s === "success") {
      setStatus("success");
      clearCart();
    } else if (s === "cancel") {
      setStatus("cancel");
    }
    if (s) {
      params.delete("status");
      params.delete("session_id");
      const query = params.toString();
      const url = window.location.pathname + (query ? `?${query}` : "");
      window.history.replaceState({}, "", url);
    }
  }, [clearCart]);

  if (!status) return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-3 px-5 py-3 rounded-full border backdrop-blur-md shadow-xl ${
        isSuccess
          ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-100"
          : "bg-red-500/15 border-red-400/30 text-red-100"
      }`}
      role="status"
    >
      {isSuccess ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span className="text-xs uppercase tracking-[0.2em]">
        {isSuccess ? "Commande confirmée — merci !" : "Paiement annulé."}
      </span>
      <button
        onClick={() => setStatus(null)}
        className="ml-2 text-white/60 hover:text-white"
        aria-label="Fermer"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
