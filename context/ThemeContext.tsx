import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
}

export const lightTheme = {
  background: '#f9f9f9',
  text: '#333333',
  cardBackground: '#ffffff',
  primary: '#532d3c',
  secondary: '#6c757d',
  border: '#e1e1e1',
  error: '#E53935',
};

export const darkTheme = {
  background: '#121212',
  text: '#f5f5f5',
  cardBackground: '#1e1e1e',
  primary: '#b87a8a',
  secondary: '#A0AEC0',
  border: '#2d2d2d',
  error: '#EF5350',
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