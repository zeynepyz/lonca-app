import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, getThemeColors } from '../context/ThemeContext';
import { StyledText } from './styles';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme, isDark } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.primary }]} 
      onPress={toggleTheme}
    >
      <StyledText style={styles.icon}>{isDark ? '☀️' : '🌙'}</StyledText>
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
  },
  icon: {
    fontSize: 20,
  }
});

export default ThemeToggle; 