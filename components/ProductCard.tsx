import React from 'react';
import { Product } from '../types/ProductTypes';
import { StyledTouchableOpacity, StyledImage, StyledText, StyledView, styles as commonStyles } from './styles';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  // Ensure product has valid ID
  const productId = product?._id?.$oid || 'unknown';
  const productName = product?.names?.en || 'Unnamed Product';
  const vendorName = product?.vendor?.name || 'Unknown Vendor';
  const price = product?.price || 0;
  const itemQuantity = product?.series?.item_quantity || 1;
  const imageUrl = product?.main_image || '';

  return (
    <StyledTouchableOpacity
      style={commonStyles.card}
      onPress={() => onPress(productId)}
    >
      <StyledImage
        source={{ uri: imageUrl }}
        style={commonStyles.image}
        resizeMode="cover"
      />
      <StyledView style={commonStyles.infoContainer}>
        <StyledText style={commonStyles.vendorName}>{vendorName}</StyledText>
        <StyledText style={commonStyles.productName}>{productName}</StyledText>
        <StyledText style={commonStyles.productPrice}>
          ${price.toFixed(2)} {itemQuantity > 1 && `(Pack of ${itemQuantity})`}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ProductCard; 