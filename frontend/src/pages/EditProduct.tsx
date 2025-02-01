import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductService } from '../services/api';
import { useProductForm } from '../hooks/useProductForm';
import { ValidationService } from '../services/ValidationService';

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any | null>(null);
  const { formData, handleChange } = useProductForm(initialData || {}); // Removido setFormData
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getById(Number(id));
        console.log('Produto carregado:', response.data.data);

        const productData = {
          name: response.data.data.name,
          price: String(response.data.data.price),
          quantity: Number(response.data.data.quantity),
          description: response.data.data.description,
        };

        setInitialData(productData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = ValidationService.validateProductForm(formData);
    if (validationError) return alert(validationError);

    try {
      await ProductService.update(Number(id), formData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? <p className="text-center">Carregando...</p> : <ProductForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />}
    </div>
  );
};