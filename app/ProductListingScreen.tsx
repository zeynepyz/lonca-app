import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProductCard from '../components/ProductCard';
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
  
  const navigation = useNavigation<ProductListingScreenNavigationProp>();
  const { theme, isDark } = useTheme();
  const styles = getThemedStyles(theme);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId: string) => {
    
    // We now have a clean ID string from ProductCard
    if (!productId || productId === 'unknown') {
      console.error('Invalid product ID:', productId);
      return;
    }
    
    navigation.navigate('ProductDetail', { productId });
  };

  if (loading) {
    return (
      <StyledView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? '#90CAF9' : '#0000ff'} />
        <StyledText style={styles.loadingText}>Loading products...</StyledText>
      </StyledView>
    );
  }

  if (error) {
    return (
      <StyledView style={styles.errorContainer}>
        <StyledText style={styles.errorTitle}>Oops!</StyledText>
        <StyledText style={styles.errorMessage}>{error}</StyledText>
      </StyledView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f9f9f9' }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <StyledView style={styles.content}>
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
          contentContainerStyle={{ 
          }}
          numColumns={2}
        />
      </StyledView>
    </SafeAreaView>
  );
};

export default ProductListingScreen; 