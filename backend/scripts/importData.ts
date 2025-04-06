import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product';
import connectDB from '../config/db';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Import data
const importData = async (): Promise<void> => {
  try {
    // İlk olarak parent_products.json dosyasını doğru konumda arıyoruz
    let filePath = path.resolve(__dirname, '../../parent_products.json');
    
    if (!fs.existsSync(filePath)) {
      // Eğer bulamazsak, dosyayı backend klasöründe arıyoruz
      filePath = path.resolve(__dirname, '../parent_products.json');
      
      if (!fs.existsSync(filePath)) {
        process.exit(1);
      }
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    
    if (!data) {
      console.error('Dosya boş veya okunamadı.');
      process.exit(1);
    }
    
    // Parse data
    const products = JSON.parse(data); 
    // Clear existing data
    await Product.deleteMany({});
    
    // Insert new data - converting string IDs to ObjectIds if needed
    const preparedProducts = products.map((product: any) => {
      // Convert _id.$oid string to ObjectId if it exists
      if (product._id && product._id.$oid) {
        product._id = new mongoose.Types.ObjectId(product._id.$oid);
      }
      return product;
    });
    
    await Product.insertMany(preparedProducts);

    process.exit(0);
  } catch (error: any) {
    console.error(`Hata: ${error.message}`);
    process.exit(1);
  }
};

// Execute the import
importData(); 