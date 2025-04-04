import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeType, lightTheme, darkTheme } from '../context/ThemeContext';

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
      padding: 16,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    column: {
      flexDirection: 'column',
    },
    text: {
      fontSize: 16,
      color: colors.text,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: 16,
    },
    infoContainer: {
      padding: 16,
    },
    image: {
      width: '100%',
    },
    vendorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
      color: colors.text,
    },
    themeToggleButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.primary,
      zIndex: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      marginTop: 8,
      color: theme === 'dark' ? '#A0AEC0' : '#666',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 16,
    },
    errorTitle: {
      color: colors.error,
      fontSize: 18,
      marginBottom: 8,
    },
    errorMessage: {
      textAlign: 'center',
      color: colors.text,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    // Product detail specific styles
    mainImage: {
      width: '100%',
      height: 400,
    },
    thumbnailContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#f9f9f9',
    },
    thumbnailButton: {
      width: 70,
      height: 70,
      marginRight: 10,
      borderRadius: 5,
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
    },
    headerContainer: {
      marginBottom: 20,
    },
    detailsContainer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: theme === 'dark' ? '#333' : '#eee',
      paddingTop: 16,
    },
    detailsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.text,
    },
    detailItem: {
      marginBottom: 10,
    },
    detailLabel: {
      fontWeight: 'bold',
      marginBottom: 2,
      color: colors.text,
    },
    detailValue: {
      lineHeight: 20,
      color: colors.text,
    },
    productSku: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: 4,
    },
    productSeries: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: 8,
    },
  });
};

// For backward compatibility, keep the original styles
export const styles = getThemedStyles('light');
