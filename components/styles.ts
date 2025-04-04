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
    },
    heading: {
      fontSize: scaledFont(24),
      fontWeight: 'bold',
      marginBottom: scaledHeight(16),
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      padding: scaledWidth(12),
      borderRadius: scaledWidth(8),
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: scaledWidth(8),
      width: scaledWidth(160),
      height: scaledHeight(257),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scaledHeight(2) },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginBottom: scaledHeight(16),
      overflow: 'hidden',
    },
    infoContainer: {
      padding: scaledWidth(8),
      flex: 1,
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
      height: scaledHeight(160),
      borderTopLeftRadius: scaledWidth(8),
      borderTopRightRadius: scaledWidth(8),
    },
    vendorName: {
      fontSize: scaledFont(12),
      color: colors.secondary,
    },
    productName: {
      fontSize: scaledFont(14),
      fontWeight: 'bold',
      color: colors.text,
    },
    productPrice: {
      fontSize: scaledFont(14),
      fontWeight: 'bold',
      color: colors.primary,
    },
    themeToggleButton: {
      position: 'absolute',
      top: scaledHeight(10),
      right: scaledWidth(10),
      padding: scaledWidth(8),
      borderRadius: scaledWidth(20),
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
      marginTop: scaledHeight(8),
      color: theme === 'dark' ? '#A0AEC0' : '#666',
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
      fontSize: scaledFont(18),
      marginBottom: scaledHeight(8),
    },
    errorMessage: {
      textAlign: 'center',
      color: colors.text,
    },
    title: {
      fontSize: scaledFont(24),
      fontWeight: 'bold',
      marginBottom: scaledHeight(16),
      color: colors.text,
    },
    // Product detail specific styles
    mainImage: {
      width: '100%',
      height: scaledHeight(400),
    },
    thumbnailContainer: {
      flexDirection: 'row',
      padding: scaledWidth(10),
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#f9f9f9',
    },
    thumbnailButton: {
      width: scaledWidth(70),
      height: scaledHeight(70),
      marginRight: scaledWidth(10),
      borderRadius: scaledWidth(5),
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
      marginBottom: scaledHeight(20),
    },
    detailsContainer: {
      marginTop: scaledHeight(20),
      borderTopWidth: 1,
      borderTopColor: theme === 'dark' ? '#333' : '#eee',
      paddingTop: scaledHeight(16),
    },
    detailsTitle: {
      fontSize: scaledFont(18),
      fontWeight: 'bold',
      marginBottom: scaledHeight(10),
      color: colors.text,
    },
    detailItem: {
      marginBottom: scaledHeight(10),
    },
    detailLabel: {
      fontWeight: 'bold',
      marginBottom: scaledHeight(2),
      color: colors.text,
    },
    detailValue: {
      lineHeight: scaledHeight(20),
      color: colors.text,
    },
    productSku: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: scaledHeight(4),
    },
    productSeries: {
      color: theme === 'dark' ? '#A0AEC0' : '#666',
      marginBottom: scaledHeight(8),
    },
  });
};

// For backward compatibility, keep the original styles
export const styles = getThemedStyles('light');
