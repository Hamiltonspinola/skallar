import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductService } from '../services/api';
import { useProductForm } from '../hooks/useProductForm';
import { ValidationService } from '../services/ValidationService';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { formData, handleChange, isLoading } = useProductForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = ValidationService.validateProductForm(formData);
    if (validationError) return alert(validationError);

    try {
      await ProductService.create(formData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  return <ProductForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />;
};
