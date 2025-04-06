import axios from 'axios';
import { Product } from '../types/ProductTypes';

const API_URL = 'http://10.0.2.2:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Zaman aşımı süresini artır
  timeout: 10000,
});

// Vendor type for the filter
export interface Vendor {
  name: string;
}

// API methods
export const productApi = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      }
      
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
      console.error('Ürünler yüklenirken hata:', error);
      return [];
    }
  },

  // Get all vendors
  getVendors: async (): Promise<Vendor[]> => {
    try {
      const response = await api.get('/products/vendors');
      
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      }
      
      return response.data;
    } catch (error) {
      console.error('Vendorler yüklenirken hata:', error);
      return [];
    }
  },

  // Get products by vendor name
  getProductsByVendor: async (vendorName: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/vendor/${vendorName}`);
      
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        return [];
      }
      
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
      console.error(`${vendorName} için ürünler getirilirken hata:`, error);
      return [];
    }
  },

  // Get a single product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data;

      
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
      console.error('Ürün bulunamadı');
      return null;
    }
  }
}; 