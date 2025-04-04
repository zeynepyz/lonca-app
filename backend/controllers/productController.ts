import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    
    // Don't check for length=24 as we might have different ID formats
    if (!productId) {
      res.status(400).json({ message: 'Invalid product ID format' });
      return;
    }
    
    let product = await Product.findById(productId).catch(err => {
      return null;
    });
    
    // If not found and ID looks like MongoDB ID, try using findOne
    if (!product) {
      product = await Product.findOne({ _id: productId }).catch(err => {
        return null;
      });
    }
    
    // If still not found, try by product_code as fallback
    if (!product) {
      product = await Product.findOne({ product_code: productId }).catch(err => {
        return null;
      });
    }
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}; 