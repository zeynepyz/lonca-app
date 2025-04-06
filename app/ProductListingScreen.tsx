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

  // Loading state for the main content
  const renderContent = () => {

    if (error) {
      return (
        <StyledView style={styles.errorContainer}>
          <StyledText style={styles.errorTitle}>Ups!</StyledText>
          <StyledText style={styles.errorMessage}>{error}</StyledText>
        </StyledView>
      );
    }

    if (products.length === 0) {
      return (
        <StyledView style={styles.errorContainer}>
          <StyledText style={styles.errorTitle}>Ürün Bulunamadı</StyledText>
          <StyledText style={styles.errorMessage}>Bu kategoride henüz ürün bulunmuyor.</StyledText>
        </StyledView>
      );
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item) => {
          // Handle both string and object ID formats
          if (typeof item._id === 'string') return item._id;
          return item._id?.$oid || `item-${Math.random()}`;
        }}
        renderItem={({ item, index }) => (
          <View style={{ 
            marginRight: index % 2 === 0 ? '5%' : 0,
          }}>
            <ProductCard product={item} onPress={handleProductPress} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
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