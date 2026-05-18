import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency = "EUR" | "CHF";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amount: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  CHF: "CHF ",
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    const saved = localStorage.getItem("swap_currency");
    if (saved === "EUR" || saved === "CHF") setCurrencyState(saved);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("swap_currency", c);
  };

  const symbol = SYMBOLS[currency];

  const formatPrice = (amount: number) =>
    currency === "EUR" ? `${symbol}${amount}` : `${symbol}${amount}`;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
