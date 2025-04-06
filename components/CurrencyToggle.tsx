import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme, getThemeColors } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { StyledText } from './styles';

const CurrencyToggle: React.FC = () => {
  const { toggleCurrency, currency } = useCurrency();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          backgroundColor: theme === 'dark' ? 'rgba(159, 122, 234, 0.2)' : 'rgba(120, 86, 255, 0.1)',
          borderWidth: 1,
          borderColor: colors.primary
        }
      ]} 
      onPress={toggleCurrency}
    >
      <StyledText style={[styles.text, { color: colors.primary }]}>
        {currency === 'USD' ? '$' : '₺'}
      </StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  }
});

export default CurrencyToggle; 