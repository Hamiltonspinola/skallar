import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/product',
});

export const ProductService = {
  getAll: () => api.get('/'),
  getById: (id: number) => api.get(`/${id}`),
  create: (data: any) => {
    console.log('📤 Enviando para API:', data);
    return api.post('/', {
      ...data,
      price: parseFloat(data.price).toFixed(2),
    });
  },
  update: (id: number, data: any) => api.put(`/${id}`, {
    ...data,
    price: parseFloat(data.price).toFixed(2),
  }),
  delete: (id: number) => api.delete(`/${id}`),
};
