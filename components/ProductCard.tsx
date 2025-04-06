import React from 'react';
import { View, Animated } from 'react-native';
import { Product } from '../types/ProductTypes';
import { StyledTouchableOpacity, StyledImage, StyledText, StyledView, getThemedStyles } from './styles';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product?: Product;
  onPress?: (productId: string) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, isLoading = false }) => {
  const { theme, isDark } = useTheme();
  const { formatPrice } = useCurrency();
  const styles = getThemedStyles(theme);

  // Skeleton animation
  const [fadeAnim] = React.useState(new Animated.Value(0.3));

  React.useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [isLoading]);

  // Render skeleton loader
  if (isLoading) {
    return (
      <StyledTouchableOpacity
        style={styles.card}
        activeOpacity={1}
      >
        <Animated.View style={{ 
          width: '100%', 
          height: styles.image.height,
          borderTopLeftRadius: 16, 
          borderTopRightRadius: 16,
          backgroundColor: isDark ? '#2a2e3a' : '#e0e0e0',
          opacity: fadeAnim
        }} />
        <StyledView style={styles.infoContainer}>
          <View>
            <Animated.View style={{
              height: 16,
              width: '80%',
              backgroundColor: isDark ? '#2a2e3a' : '#e0e0e0',
              borderRadius: 4,
              marginBottom: 8,
              opacity: fadeAnim
            }} />
            <Animated.View style={{
              height: 14,
              width: '50%',
              backgroundColor: isDark ? '#2a2e3a' : '#e0e0e0',
              borderRadius: 4,
              opacity: fadeAnim
            }} />
          </View>
          <Animated.View style={{
            height: 18,
            width: '40%',
            backgroundColor: isDark ? '#2a2e3a' : '#e0e0e0',
            borderRadius: 4,
            marginTop: 8,
            opacity: fadeAnim
          }} />
        </StyledView>
      </StyledTouchableOpacity>
    );
  }

  // Regular card rendering for loaded data
  // Ensure product has valid ID - handle both string and object formats
  let productId: string = 'unknown';
  if (product) {
    if (typeof product._id === 'string') {
      productId = product._id;
    } else if (product._id && product._id.$oid) {
      productId = product._id.$oid;
    }
  }

  const productName = product?.names?.en || 'Unnamed Product';
  const vendorName = product?.vendor?.name || 'Unknown Vendor';
  const price = product?.price || 0;
  const itemQuantity = product?.series?.item_quantity || 1;
  const imageUrl = product?.main_image || '';

  // Handle press event
  const handlePress = () => {
    onPress && onPress(productId);
  };

  return (
    <StyledTouchableOpacity
      style={styles.card}
      onPress={handlePress}
    >
      <View style={{ 
        width: '100%', 
        height: styles.image.height,
        borderTopLeftRadius: 16, 
        borderTopRightRadius: 16,
        overflow: 'hidden',
        position: 'relative'
      }}>
        <StyledImage
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <StyledView style={styles.infoContainer}>
        <View>
          <StyledText style={styles.productName} numberOfLines={2}>{productName}</StyledText>
          <StyledText style={styles.vendorName} numberOfLines={1}>{vendorName}</StyledText>
        </View>
        <StyledText style={styles.productPrice}>
          {formatPrice(price)} {itemQuantity > 1 && `(${itemQuantity})`}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ProductCard; 