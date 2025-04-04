import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Product } from '../types/ProductTypes';
import { RootStackParamList } from '../types/NavigationTypes';
import { productApi } from '../services/api';
import { 
  StyledView, 
  StyledText, 
  StyledScrollView, 
  StyledImage, 
  StyledTouchableOpacity,
  getThemedStyles
} from '../components/styles';
import { useTheme } from '../context/ThemeContext';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const { productId } = route.params;
  const { theme, isDark } = useTheme();
  const styles = getThemedStyles(theme);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Ensure we have a valid ID to fetch
        if (!productId) {
          setError('Invalid product ID');
          setLoading(false);
          return;
        }
        
        const data = await productApi.getProductById(productId);
        if (data) {
          setProduct(data);
          if (data.main_image) {
            setSelectedImage(data.main_image);
          } else if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }
        } else {
          console.error('Product not found for ID:', productId);
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <StyledView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? '#90CAF9' : '#0000ff'} />
        <StyledText style={styles.loadingText}>Loading product details...</StyledText>
      </StyledView>
    );
  }

  if (error || !product) {
    return (
      <StyledView style={styles.errorContainer}>
        <StyledText style={styles.errorTitle}>Oops!</StyledText>
        <StyledText style={styles.errorMessage}>{error || 'Product not found'}</StyledText>
        <StyledTouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <StyledText style={styles.buttonText}>Go Back</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  return (
    <StyledScrollView style={[styles.container, { paddingTop: 0 }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Main Image */}
      <StyledImage
        source={{ uri: selectedImage }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      
      {/* Thumbnail Images */}
      <StyledScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailContainer}
      >
        {Array.isArray(product.images) && product.images.map((image, index) => (
          <StyledTouchableOpacity
            key={`thumb-${index}`}
            onPress={() => setSelectedImage(image)}
            style={[
              styles.thumbnailButton,
              selectedImage === image && styles.selectedThumbnail
            ]}
          >
            <StyledImage
              source={{ uri: image }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>
      
      {/* Product Info */}
      <StyledView style={styles.infoContainer}>
        <StyledView style={styles.headerContainer}>
          <StyledText style={styles.vendorName}>{product.vendor?.name || 'Unknown Vendor'}</StyledText>
          <StyledText style={styles.productName}>{product.names?.en || 'Unnamed Product'}</StyledText>
          <StyledText style={styles.productSku}>SKU: {product.product_code || 'Unknown'}</StyledText>
          <StyledText style={styles.productSeries}>Series: {product.series?.name || 'N/A'}</StyledText>
          <StyledText style={styles.productPrice}>
            ${(product.price || 0).toFixed(2)} 
            {(product.series?.item_quantity || 0) > 1 && ` (Pack of ${product.series.item_quantity})`}
          </StyledText>
        </StyledView>
        
        {/* Product Details */}
        <StyledView style={styles.detailsContainer}>
          <StyledText style={styles.detailsTitle}>Product Details</StyledText>
          
          {product.description_details?.en?.fabric && (
            <StyledView style={styles.detailItem}>
              <StyledText style={styles.detailLabel}>Fabric</StyledText>
              <StyledText style={styles.detailValue}>{product.description_details.en.fabric}</StyledText>
            </StyledView>
          )}
          
          {product.description_details?.en?.model_measurements && (
            <StyledView style={styles.detailItem}>
              <StyledText style={styles.detailLabel}>Model Measurements</StyledText>
              <StyledText style={styles.detailValue}>{product.description_details.en.model_measurements}</StyledText>
            </StyledView>
          )}
          
          {product.description_details?.en?.sample_size && (
            <StyledView style={styles.detailItem}>
              <StyledText style={styles.detailLabel}>Sample Size</StyledText>
              <StyledText style={styles.detailValue}>{product.description_details.en.sample_size}</StyledText>
            </StyledView>
          )}
          
          {product.description_details?.en?.product_measurements && (
            <StyledView style={styles.detailItem}>
              <StyledText style={styles.detailLabel}>Product Measurements</StyledText>
              <StyledText style={styles.detailValue}>{product.description_details.en.product_measurements}</StyledText>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
};

export default ProductDetailScreen; 