import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajuste conforme necessário
});

export const ProductService = {
  getAll: (page = 1, perPage = 10) => api.get(`/product?per_page=${perPage}&page=${page}`),
  getById: (id: number) => api.get(`/product/${id}`),
  create: (data: any) => api.post('/product', { ...data, price: parseFloat(data.price).toFixed(2) }),
  update: (id: number, data: any) => api.put(`/product/${id}`, { ...data, price: parseFloat(data.price).toFixed(2) }),
  delete: (id: number) => api.delete(`/product/${id}`),
};
