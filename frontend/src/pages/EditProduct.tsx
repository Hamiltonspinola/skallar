import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductService } from '../services/api';
import { useProductForm } from '../hooks/useProductForm';
import { ValidationService } from '../services/ValidationService';

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const { formData, handleChange, setFormData, isLoading } = useProductForm(initialData);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getById(Number(id));
        console.log('Produto carregado:', response.data);

        setInitialData({
          name: response.data.data.name,
          price: response.data.data.price.replace(',', '.'),
          quantity: parseInt(response.data.data.quantity) || 0,
          description: response.data.data.description,
        });
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    if (!initialData) fetchProduct();
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

  if (isLoading || !formData) return <p className="text-center">Carregando...</p>;

  return <ProductForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />;
};
