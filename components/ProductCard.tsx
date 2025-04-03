import React from 'react';
import { Product } from '../types/ProductTypes';
import { StyledTouchableOpacity, StyledImage, StyledText, StyledView, styles as commonStyles } from './styles';

interface ProductCardProps {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <StyledTouchableOpacity
      style={commonStyles.card}
      onPress={() => onPress(product._id.$oid)}
    >
      <StyledImage
        source={{ uri: product.main_image }}
        style={commonStyles.image}
        resizeMode="cover"
      />
        <StyledView style={commonStyles.infoContainer}>
        <StyledText style={commonStyles.vendorName}>{product.vendor.name}</StyledText>
        <StyledText style={commonStyles.productName}>{product.names.en}</StyledText>
        <StyledText style={commonStyles.productPrice}>
          ${product.price.toFixed(2)} {product.series.item_quantity > 1 && `(Pack of ${product.series.item_quantity})`}
        </StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default ProductCard; 