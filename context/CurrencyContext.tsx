import React, { createContext, useState, useContext, useEffect } from 'react';

type CurrencyType = 'USD' | 'TRY';

interface CurrencyContextType {
  currency: CurrencyType;
  toggleCurrency: () => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  
  // Exchange rate (in a real app, this would come from an API)
  const exchangeRate = 30.5; // 1 USD = 30.5 TRY (example rate)
  
  const toggleCurrency = () => {
    setCurrency(prevCurrency => prevCurrency === 'USD' ? 'TRY' : 'USD');
  };
  
  // Memoize the formatPrice function to optimize performance
  const formatPrice = React.useCallback((price: number): string => {
    if (currency === 'USD') {
      return `$${price.toFixed(2)}`;
    } else {
      const tryPrice = price * exchangeRate;
      return `₺${tryPrice.toFixed(2)}`;
    }
  }, [currency, exchangeRate]);
  
  const value = {
    currency,
    toggleCurrency,
    formatPrice
  };
  
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 