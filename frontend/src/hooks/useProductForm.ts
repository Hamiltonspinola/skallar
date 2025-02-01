import { useState, useEffect } from 'react';

export const useProductForm = (initialState: any = {}) => {
  const [formData, setFormData] = useState({
    name: initialState?.name || '',
    price: initialState?.price ? String(initialState.price) : '',
    quantity: initialState?.quantity ?? 0,
    description: initialState?.description || '',
  });

  useEffect(() => {
    if (initialState && Object.keys(initialState).length > 0) {
      setFormData({
        name: initialState.name,
        price: String(initialState.price),
        quantity: initialState.quantity,
        description: initialState.description,
      });
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

  return { formData, handleChange, setFormData };
};