import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProductCard from '../components/ProductCard';
import { productApi } from '../services/api';
import { Product } from '../types/ProductTypes';
import { RootStackParamList } from '../types/NavigationTypes';
import { StyledView, StyledText, styles as commonStyles } from '../components/styles';

type ProductListingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductListing'
>;

const ProductListingScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigation = useNavigation<ProductListingScreenNavigationProp>();

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
    navigation.navigate('ProductDetail', { productId });
  };

  if (loading) {
    return (
      <StyledView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <StyledView style={styles.content}>
        <StyledText style={styles.title}>Products</StyledText>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id.$oid}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </StyledView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 16,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductListingScreen; 