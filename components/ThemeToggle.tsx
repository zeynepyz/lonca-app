import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme, getThemeColors } from '../context/ThemeContext';
import { StyledText } from './styles';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme, isDark } = useTheme();
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
      onPress={toggleTheme}
    >
      <StyledText style={[styles.icon, { color: colors.primary }]}>
        {isDark ? '☀️' : '🌙'}
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
  icon: {
    fontSize: 16,
  }
});

export default ThemeToggle; 