import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
}

export const lightTheme = {
  background: '#FFFFFF',
  text: '#1A202C',
  cardBackground: '#FFFFFF',
  primary: '#7856FF',
  secondary: '#718096',
  border: '#E2E8F0',
  error: '#E53E3E',
};

export const darkTheme = {
  background: '#131825',
  text: '#F7FAFC',
  cardBackground: '#1E293B',
  primary: '#9F7AEA',
  secondary: '#A0AEC0',
  border: '#2D3748',
  error: '#F56565',
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(deviceTheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Update theme if device theme changes
  useEffect(() => {
    if (deviceTheme) {
      setTheme(deviceTheme === 'dark' ? 'dark' : 'light');
    }
  }, [deviceTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isDark: theme === 'dark' 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const getThemeColors = (theme: ThemeType) => {
  return theme === 'dark' ? darkTheme : lightTheme;
}; 