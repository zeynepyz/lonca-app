import axios from 'axios';
import { Product } from '../types/ProductTypes';

// Base URL for our API
// Use your computer's local IP address instead of localhost
// to allow mobile devices to connect
const API_URL = 'http://192.168.1.176:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API methods
export const productApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      
      // Ensure every product has valid properties required for rendering
      return response.data.map((product: any, index: number) => {
        // Normalize _id field - handle both string and object formats
        if (!product._id) {
          console.warn('Product missing _id, adding temporary one:', product);
          product._id = { $oid: `temp-id-${index}` };
        } else if (typeof product._id === 'string') {
          // Convert string _id to $oid format expected by the app
          const stringId = product._id;
          product._id = { $oid: stringId };
        }
        
        if (!product.images || !Array.isArray(product.images)) {
          product.images = [product.main_image || ''];
        }
        
        return product;
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get a single product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      
      if (!product) {
        console.error('No product returned from API');
        return null;
      }
      
      // Normalize _id field if it's a string
      if (typeof product._id === 'string') {
        const stringId = product._id;
        product._id = { $oid: stringId };
      }
      
      // Ensure product has valid image array
      if (!product.images || !Array.isArray(product.images)) {
        product.images = [product.main_image || ''];
      }
      
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
    }
  }
}; 