import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductService } from '../services/api';
import { useProductForm } from '../hooks/useProductForm';
import { ValidationService } from '../services/ValidationService';
import { useState } from 'react';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useProductForm({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = ValidationService.validateProductForm(formData);
    if (validationError) return alert(validationError);

    setIsSubmitting(true);
    try {
      await ProductService.create(formData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {isSubmitting ? <p className="text-center">Enviando...</p> : <ProductForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />}
    </div>
  );
};
