import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Checkout } from "./pages/Checkout";

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-neutral-700 selection:text-white relative overflow-x-hidden flex flex-col">
        {!selectedProductId && currentView === 'home' && (
          <>
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A] to-transparent opacity-30 -mr-40 -mt-40 pointer-events-none z-0"></div>
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0C0C0C] to-transparent opacity-30 -ml-20 -mb-20 pointer-events-none z-0"></div>
          </>
        )}

        <Navbar
          onNavigate={(view) => {
            setCurrentView(view);
            setSelectedProductId(null);
          }} 
          currentView={currentView}
        />
        <CartDrawer 
          onCheckout={() => {
            setCurrentView('checkout');
            setSelectedProductId(null);
          }}
        />
        
        <main className="flex-1 relative z-10 w-full">
          {currentView === 'home' && !selectedProductId && (
            <Home onSelectProduct={setSelectedProductId} />
          )}
          {selectedProductId && currentView === 'home' && (
            <ProductDetails 
              id={selectedProductId} 
              onBack={() => setSelectedProductId(null)} 
            />
          )}
          {currentView === 'checkout' && (
            <Checkout onBack={() => setCurrentView('home')} />
          )}
        </main>
        
        <Footer />

        {!selectedProductId && currentView === 'home' && (
          <div className="fixed left-4 top-1/2 -translate-y-1/2 flex items-center h-px rotate-180 z-0 origin-center mix-blend-difference hidden lg:flex" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 whitespace-nowrap">
              SWAP GENEVA — CH-1200 SWISS MADE
            </span>
          </div>
        )}

        <style>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          @keyframes slowPan {
            0% { object-position: 50% 0%; transform: scale(1.05); }
            100% { object-position: 50% 10%; transform: scale(1.1); }
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </CartProvider>
  );
}
