import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db';
import Product from '../models/Product';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const importData = async () => {
  try {
    // Path to your JSON file (update this to the actual location)
    const jsonFilePath = path.join(__dirname, '../../parent_products.json');
    
    // Read JSON file
    let productsData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    
    // Convert _id objects to MongoDB ObjectId format
    productsData = productsData.map((product: any) => {
      // Convert MongoDB extended JSON format to ObjectId
      if (product._id && product._id.$oid) {
        product._id = new mongoose.Types.ObjectId(product._id.$oid);
      }
      return product;
    });
    
    // Clear existing data
    await Product.deleteMany({});
    
    // Insert new data
    const createdProducts = await Product.insertMany(productsData);
    
    console.log(`Data Import Success! ${createdProducts.length} products imported.`);
    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Execute the import
importData(); 