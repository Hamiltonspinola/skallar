import { useState, useEffect } from 'react';
import { ProductService } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ProductService.getAll()
      .then(({ data }) => setProducts(data.data))
      .finally(() => setLoading(false));
  }, []);
  const deleteProduct = async (id: number) => {
    await ProductService.delete(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return { products, loading, deleteProduct };
};
