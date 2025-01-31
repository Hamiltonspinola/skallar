import React, { createContext, useContext, useState, useEffect } from "react";
import ProductService from "../Services/productService";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Carrega os produtos da API ao iniciar
    useEffect(() => {
        ProductService.getAll().then((data) => {
            console.log("Produtos carregados no contexto:", data); // Debug
            setProducts(data);
        }).catch(error => {
            console.error("Erro ao carregar produtos:", error);
        });
    }, []);

    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext deve ser usado dentro de um ProductProvider");
    }
    return context;
};
