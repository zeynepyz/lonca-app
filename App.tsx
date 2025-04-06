import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductListingScreen from './app/ProductListingScreen';
import ProductDetailScreen from './app/ProductDetailScreen';
import { RootStackParamList } from './types/NavigationTypes';
import { ThemeProvider, useTheme, getThemeColors } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import ThemeToggle from './components/ThemeToggle';
import CurrencyToggle from './components/CurrencyToggle';
import { productApi } from './services/api';
import AnimatedSplashScreen from './components/SplashScreen';

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom header component for theme-aware styling
const AppNavigator = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="ProductListing"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.cardBackground,
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
              <CurrencyToggle />
              <ThemeToggle />
            </View>
          ),
        }}
      >
        <Stack.Screen 
          name="ProductListing" 
          component={ProductListingScreen} 
          options={{ title: 'Explore Products' }}
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={({ route }) => {
            const { productId } = route.params as { productId: string };
            return { 
              title: '', // Boş başlık ile başla
              headerTitle: () => <ProductHeaderTitle productId={productId} />
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Ürün başlığını dinamik olarak gösteren bileşen
const ProductHeaderTitle: React.FC<{ productId: string }> = ({ productId }) => {
  const [productName, setProductName] = useState<string>('Product Details');
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const product = await productApi.getProductById(productId);
        if (product && product.names?.en) {
          setProductName(product.names.en);
        }
      } catch (err) {
        console.error('Error fetching product name:', err);
      }
    };
    
    fetchProductName();
  }, [productId]);
  
  return (
    <React.Fragment>
      {productName && (
        <Text style={{ color: colors.text, fontWeight: '600', fontSize: 18 }}>
          {productName.length > 25 ? `${productName.substring(0, 22)}...` : productName}
        </Text>
      )}
    </React.Fragment>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onSplashFinish = () => {
    setAppIsReady(true);
  };

  if (!appIsReady) {
    return <AnimatedSplashScreen onFinish={onSplashFinish} />;
  }

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
