import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, getThemeColors } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { StyledText } from './styles';

const CurrencyToggle: React.FC = () => {
  const { toggleCurrency, currency } = useCurrency();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.primary }]} 
      onPress={toggleCurrency}
    >
      <StyledText style={styles.text}>{currency === 'USD' ? '$' : '₺'}</StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  }
});

export default CurrencyToggle; 