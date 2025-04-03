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
  styles as commonStyles
} from '../components/styles';

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProductById(productId);
        if (data) {
          setProduct(data);
          setSelectedImage(data.main_image);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <StyledView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <StyledText style={styles.buttonText}>Go Back</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  return (
    <StyledScrollView style={styles.container}>
      <StatusBar style="dark" />
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  errorTitle: {
    color: '#E53935',
    fontSize: 18,
    marginBottom: 8,
  },
  errorMessage: {
    textAlign: 'center',
    color: '#333',
  },
  goBackButton: {
    marginTop: 16,
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  mainImage: {
    width: '100%',
    height: 384,
  },
  thumbnailContainer: {
    padding: 8,
    backgroundColor: '#f9f9f9',
  },
  thumbnailButton: {
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#2196F3',
  },
  thumbnailImage: {
    width: 64,
    height: 64,
  },
  infoContainer: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  vendorName: {
    color: '#666',
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productSku: {
    color: '#333',
  },
  productSeries: {
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0D47A1',
    marginTop: 8,
  },
  detailsContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailItem: {
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: '500',
  },
  detailValue: {
    color: '#333',
  },
});

export default ProductDetailScreen; 