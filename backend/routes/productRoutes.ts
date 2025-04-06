import express from 'express';
import { getProducts, getProductById, getProductsByVendor, getVendors } from '../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/vendors').get(getVendors);
router.route('/vendor/:vendorName').get(getProductsByVendor);
router.route('/:id').get(getProductById);

export default router; 