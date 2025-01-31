import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ProductService } from '../services/api';

// Define Product Type
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
}

// Define Actions
interface Action {
  type: 'SET_PRODUCTS' | 'ADD_PRODUCT' | 'UPDATE_PRODUCT' | 'DELETE_PRODUCT';
  payload?: any;
}

// Initial State
interface State {
  products: Product[];
  loading: boolean;
}
const initialState: State = {
  products: [],
  loading: true,
};

// Reducer Function
const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter((p) => p.id !== action.payload) };
    default:
      return state;
  }
};

// Create Context
const ProductContext = createContext<any>(null);

// Provider Component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch Products on Mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAll();
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.data });
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

// Hook for Using Context
export const useProductContext = () => useContext(ProductContext);