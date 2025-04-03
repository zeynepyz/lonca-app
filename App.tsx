import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductListingScreen from './app/ProductListingScreen';
import ProductDetailScreen from './app/ProductDetailScreen';
import { RootStackParamList } from './types/NavigationTypes';

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductListing">
          <Stack.Screen 
            name="ProductListing" 
            component={ProductListingScreen} 
            options={{ title: 'Lonca Products' }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{ title: 'Product Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
