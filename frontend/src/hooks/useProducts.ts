import { useState, useEffect } from 'react';
import { ProductService } from '../services/api';

export const useProducts = (perPage = 10) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await ProductService.getAll(page, perPage);
        const totalItems = response.data.data.totalItems || 0;
        const totalPagesCalculated = response.data.data.totalPages || Math.ceil(totalItems / perPage); // 🔥 Calcula caso totalPages seja indefinido

        setProducts(response.data.data.items);
        setTotalPages(totalPagesCalculated);

      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, perPage]);
  const deleteProduct = async (id: number) => {
    try {
      await ProductService.delete(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const editProduct = async (id: number, updatedData: any) => {
    try {
      const response = await ProductService.update(id, updatedData); // Atualiza no backend
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...response.data } : product // Atualiza no estado local
        )
      );
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  return { products, loading, page, setPage, totalPages, deleteProduct, editProduct };
};
