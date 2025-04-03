import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Read product data from JSON file
const productsFilePath = path.join(__dirname, '../../parent_products.json');
const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

// API Routes
app.get('/api/products', (req: Request, res: Response) => {
  res.json(productsData);
});

// Product detail route
app.get('/api/products/:id', (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = productsData.find((p: any) => p._id.$oid === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  return res.json(product);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 