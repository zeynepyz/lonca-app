export interface Product {
  _id: {
    $oid: string;
  };
  vendor: {
    name: string;
  };
  series: {
    name: string;
    item_quantity: number;
  };
  description_details: {
    en: {
      fabric?: string;
      model_measurements?: string;
      sample_size?: string;
      product_measurements?: string;
    };
  };
  main_image: string;
  price: number;
  names: {
    en: string;
  };
  images: string[];
  product_code: string;
} 