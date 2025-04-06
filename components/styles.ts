import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeType, lightTheme, darkTheme } from '../context/ThemeContext';
import { scaledFont, scaledWidth, scaledHeight } from '../utils/scaling';

// Export components directly
export const StyledView = View;
export const StyledText = Text;
export const StyledScrollView = ScrollView;
export const StyledImage = Image;
export const StyledTouchableOpacity = TouchableOpacity;

// Create theme-specific styles
export const getThemedStyles = (theme: ThemeType) => {
  const colors = theme === 'dark' ? darkTheme : lightTheme;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: scaledHeight(10),
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scaledHeight(50),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column',
    },
    text: {
      fontSize: scaledFont(16),
      color: colors.text,
      fontFamily: 'System',
    },
    heading: {
      fontSize: scaledFont(24),
      fontWeight: '700',
      marginBottom: scaledHeight(16),
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      padding: scaledWidth(12),
      borderRadius: scaledWidth(12),
      alignItems: 'center',
      shadowColor: theme === 'dark' ? '#000' : colors.primary,
      shadowOffset: { width: 0, height: scaledHeight(4) },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 4,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: scaledFont(15),
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: scaledWidth(16),
      width: scaledWidth(160),
      height: scaledHeight(265),
      shadowColor: theme === 'dark' ? '#000' : '#888',
      shadowOffset: { width: 0, height: scaledHeight(3) },
      shadowOpacity: theme === 'dark' ? 0.4 : 0.1,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: scaledHeight(16),
      overflow: 'hidden',
      borderWidth: theme === 'dark' ? 1 : 0,
      borderColor: theme === 'dark' ? '#333' : 'transparent',
    },
    infoContainer: {
      padding: scaledWidth(12),
      flex: 1,
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
      height: scaledHeight(160),
    },
    vendorName: {
      fontSize: scaledFont(11),
      color: colors.secondary,
      marginTop: scaledHeight(2),
      fontWeight: '500',
    },
    productName: {
      fontSize: scaledFont(14),
      fontWeight: '700',
      color: colors.text,
      marginTop: scaledHeight(4),
      letterSpacing: -0.3,
    },
    productPrice: {
      fontSize: scaledFont(15),
      fontWeight: '800',
      color: colors.primary,
      marginTop: scaledHeight(5),
    },
    themeToggleButton: {
      padding: scaledWidth(10),
      borderRadius: scaledWidth(25),
      backgroundColor: colors.primary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: scaledHeight(10),
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      fontSize: scaledFont(15),
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: scaledWidth(16),
    },
    errorTitle: {
      color: colors.error,
      fontSize: scaledFont(20),
      marginBottom: scaledHeight(10),
      fontWeight: '700',
    },
    errorMessage: {
      textAlign: 'center',
      color: colors.text,
      fontSize: scaledFont(15),
    },
    title: {
      fontSize: scaledFont(24),
      fontWeight: '700',
      marginBottom: scaledHeight(16),
      color: colors.text,
      letterSpacing: -0.5,
    },
    // Product detail specific styles
    mainImage: {
      width: '100%',
      height: scaledHeight(400),
      borderRadius: theme === 'dark' ? 0 : scaledWidth(15),
      marginTop: theme === 'dark' ? 0 : scaledWidth(10),
      marginBottom: scaledHeight(5),
    },
    thumbnailContainer: {
      flexDirection: 'row',
      padding: scaledWidth(10),
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#f5f5f5',
      borderRadius: scaledWidth(15),
    },
    thumbnailButton: {
      width: scaledWidth(70),
      height: scaledHeight(70),
      marginRight: scaledWidth(10),
      borderRadius: scaledWidth(10),
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333' : '#ddd',
      overflow: 'hidden',
    },
    selectedThumbnail: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
      borderRadius: scaledWidth(9),
    },
    headerContainer: {
      marginBottom: scaledHeight(20),
      padding: scaledWidth(15),
    },
    detailsContainer: {
      marginTop: scaledHeight(20),
      borderTopWidth: 1,
      borderTopColor: theme === 'dark' ? '#333' : '#eee',
      paddingTop: scaledHeight(16),
      paddingHorizontal: scaledWidth(15),
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#fff',
      borderRadius: scaledWidth(20),
      shadowColor: theme === 'dark' ? '#000' : '#ddd',
      shadowOffset: { width: 0, height: scaledHeight(2) },
      shadowOpacity: theme === 'dark' ? 0.4 : 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    detailsTitle: {
      fontSize: scaledFont(18),
      fontWeight: '700',
      marginBottom: scaledHeight(12),
      color: colors.text,
      letterSpacing: -0.3,
    },
    detailItem: {
      marginBottom: scaledHeight(12),
      paddingVertical: scaledHeight(5),
    },
    detailLabel: {
      fontWeight: '600',
      marginBottom: scaledHeight(4),
      color: colors.text,
      fontSize: scaledFont(14),
    },
    detailValue: {
      lineHeight: scaledHeight(20),
      color: colors.text,
      fontSize: scaledFont(14),
    },
    productSku: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: scaledHeight(4),
      fontSize: scaledFont(13),
    },
    productSeries: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: scaledHeight(8),
      fontSize: scaledFont(13),
    },
  });
};

// For backward compatibility, keep the original styles
export const styles = getThemedStyles('light');
