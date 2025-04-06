import React from 'react';
import { View } from 'react-native';
import { Product } from '../types/ProductTypes';
import { StyledTouchableOpacity, StyledImage, StyledText, StyledView, getThemedStyles } from './styles';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();
  const { formatPrice } = useCurrency();
  const styles = getThemedStyles(theme);

  // Ensure product has valid ID - handle both string and object formats
  let productId: string;
  if (typeof product._id === 'string') {
    productId = product._id;
  } else if (product._id && product._id.$oid) {
    productId = product._id.$oid;
  } else {
    productId = 'unknown';
  }

  const productName = product?.names?.en || 'Unnamed Product';
  const vendorName = product?.vendor?.name || 'Unknown Vendor';
  const price = product?.price || 0;
  const itemQuantity = product?.series?.item_quantity || 1;
  const imageUrl = product?.main_image || '';

  // Handle press event
  const handlePress = () => {
    onPress(productId);
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