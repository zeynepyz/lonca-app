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

// @desc    Get products by vendor name
// @route   GET /api/products/vendor/:vendorName
// @access  Public
export const getProductsByVendor = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendorName = req.params.vendorName;
    
    if (!vendorName) {
      res.status(400).json({ message: 'Vendor name is required' });
      return;
    }
    
    // If vendorName is "all", return all products
    if (vendorName.toLowerCase() === 'all') {
      const products = await Product.find({});
      res.json(products);
      return;
    }
    
    // Find products by vendor name
    const products = await Product.find({ 'vendor.name': vendorName });
    
    if (!products || products.length === 0) {
      res.status(404).json({ message: `No products found for vendor: ${vendorName}` });
      return;
    }
    
    res.json(products);
  } catch (error: any) {
    console.error('Error fetching products by vendor:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all unique vendor names
// @route   GET /api/products/vendors
// @access  Public
export const getVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    // Use aggregation to get unique vendor names
    const vendors = await Product.aggregate([
      { $group: { _id: '$vendor.name' } },
      { $sort: { _id: 1 } },
      { $project: { name: '$_id', _id: 0 } }
    ]);
    
    res.json(vendors);
  } catch (error: any) {
    console.error('Error fetching vendors:', error);
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