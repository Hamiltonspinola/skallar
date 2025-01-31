import axios from "axios";

export default class ProductService {
    static async getAll() {
        const response = await axios.get('/api/product');
        return response.data.data;
    }

    static async getById(id: number) {
        return await axios.get(`/api/product/${id}`);
    }

    static async create(data: object) {
        try {
            const response = await axios.post('/api/product', data);
            return { success: true, data: response.data.data };
        } catch (error) {
            if (error.response && error.response.status === 422) {
                return { success: false, errors: error.response.data.errors };
            }
            throw error;
        }
    }

    static async update(id: string, data: object) {
        try {
            const response = await axios.put(`/api/product/${id}`, data);
            return { success: true, data: response.data };
        } catch (error) {
            if (error.response && error.response.status === 422) {
                return { success: false, errors: error.response.data.errors };
            }
            throw error;
        }
    }

    static async delete(id: number) {
        return await axios.delete(`/api/product/${id}`);
    }
}
