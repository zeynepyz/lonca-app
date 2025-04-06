import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProductCard from '../components/ProductCard';
import VendorFilter from '../components/VendorFilter';
import { productApi } from '../services/api';
import { Product } from '../types/ProductTypes';
import { RootStackParamList } from '../types/NavigationTypes';
import { StyledView, StyledText, getThemedStyles } from '../components/styles';
import { useTheme } from '../context/ThemeContext';

type ProductListingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductListing'
>;

// Type for skeleton items
interface SkeletonItem {
  _id: string;
  skeleton: boolean;
}

// Union type for list items
type ListItem = Product | SkeletonItem;

// Type guard to check if item is a skeleton
const isSkeleton = (item: ListItem): item is SkeletonItem => {
  return 'skeleton' in item && item.skeleton === true;
};

const ProductListingScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  
  const navigation = useNavigation<ProductListingScreenNavigationProp>();
  const { theme, isDark } = useTheme();
  const styles = getThemedStyles(theme);
  
  // Handler for vendor selection
  const handleVendorSelect = async (vendorName: string) => {
    try {
      setLoading(true);
      setSelectedVendor(vendorName);
      // Fetch products based on selected vendor
      let data;
      if (vendorName === 'all') {
        data = await productApi.getProducts();
      } else {
        data = await productApi.getProductsByVendor(vendorName);
      }
      
      if (data && data.length > 0) {
        setProducts(data);
        setError(null);
      } else {
        console.warn(`${vendorName} için ürün bulunamadı.`);
        setProducts([]);
        setError(`${vendorName} için ürün bulunamadı. Farklı bir kategori seçin.`);
      }
    } catch (err) {
      setError(`${vendorName} için ürünleri yüklerken hata oluştu. Lütfen tekrar deneyin.`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
          setError(null);
        } else {
          setError('Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
        }
      } catch (err) {
        setError('Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId: string) => {
    if (!productId || productId === 'unknown') {
      Alert.alert('Hata', 'Bu ürün detaylarına şu anda ulaşılamıyor.');
      return;
    }
    
    navigation.navigate('ProductDetail', { productId });
  };

  // Generate placeholder items for skeleton loading
  const generateSkeletonItems = (): SkeletonItem[] => {
    return Array(8).fill(0).map((_, index) => ({ 
      _id: `skeleton-${index}`, 
      skeleton: true 
    }));
  };

  // Render content based on loading and error states
  const renderContent = () => {
    if (error && !loading && products.length === 0) {
      return (
        <StyledView style={styles.errorContainer}>
          <StyledText style={styles.errorTitle}>Ups!</StyledText>
          <StyledText style={styles.errorMessage}>{error}</StyledText>
        </StyledView>
      );
    }

    // Always return a list, with either real data or skeleton loaders
    const listData: ListItem[] = loading ? generateSkeletonItems() : products;
    
    return (
      <FlatList
        data={listData}
        keyExtractor={(item) => {
          if (isSkeleton(item)) return item._id;
          // Handle both string and object ID formats
          if (typeof item._id === 'string') return item._id;
          return item._id?.$oid || `item-${Math.random()}`;
        }}
        renderItem={({ item, index }) => (
          <View style={{ 
            marginLeft: index % 2 === 0 ? 0 : '4%',
            marginRight: index % 2 === 0 ? '4%' : 0,
          }}>
            {isSkeleton(item) ? (
              <ProductCard isLoading={true} />
            ) : (
              <ProductCard product={item} onPress={handleProductPress} />
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#131825' : '#ffffff' }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Vendor Filter */}
      <VendorFilter 
        onVendorSelect={handleVendorSelect} 
        selectedVendor={selectedVendor} 
      />
      
      <StyledView style={styles.content}>
        {renderContent()}
      </StyledView>
    </SafeAreaView>
  );
};

export default ProductListingScreen; 