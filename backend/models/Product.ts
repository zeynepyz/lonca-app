import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId 
  },
  vendor: {
    name: { type: String, required: true }
  },
  series: {
    name: { type: String, required: true },
    item_quantity: { type: Number, required: true }
  },
  description_details: {
    en: {
      fabric: { type: String },
      model_measurements: { type: String },
      sample_size: { type: String },
      product_measurements: { type: String }
    }
  },
  main_image: { type: String, required: true },
  price: { type: Number, required: true },
  names: {
    en: { type: String, required: true }
  },
  images: [{ type: String }],
  product_code: { type: String, required: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product; 