import { useState, useEffect } from 'react';

export const useProductForm = (initialState = null) => {
  const [formData, setFormData] = useState(initialState || { name: '', price: '', quantity: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialState) {
      setFormData((prev) => ({ ...prev, ...initialState }));
      setIsLoading(false);
    }
  }, [initialState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : name === 'price' ? formatPrice(value) : value,
    }));
  };

  const formatPrice = (value: string) => {
    return value.replace(',', '.').replace(/[^0-9.]/g, '');
  };

  return { formData, handleChange, setFormData, isLoading };
};
