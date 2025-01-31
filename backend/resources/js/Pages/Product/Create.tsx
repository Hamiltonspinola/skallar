import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useProductContext } from "../../Store/productContext";
import ProductService from "../../Services/productService";

const CreateProduct = () => {
    const { addProduct } = useProductContext(); // Hook do contexto
    const { data, setData, errors, reset } = useForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });
    const [serverError, setServerError] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setServerError(null); // Reseta os erros de servidor

        const payload = {
            name: data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
        };

        try {
            const result = await ProductService.create(payload); // Envia para a API
            if (result.success) {
                addProduct({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity,
                }); // Atualiza o contexto
                reset(); // Reseta o formulário
                alert("Produto criado com sucesso!");
            } else {
                console.error("Erros de validação:", result.errors);
                setServerError(result.errors); // Exibe erros do backend
            }
        } catch (error) {
            console.error("Erro no servidor:", error);
            setServerError("Erro ao criar o produto. Tente novamente mais tarde.");
        }
    };

    return (
        <div>
            <h1>Criar Produto</h1>
            {serverError && <div className="error">{serverError}</div>}

            <form onSubmit={submit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div>
                    <label>Descrição:</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    {errors.description && <div className="error">{errors.description}</div>}
                </div>

                <div>
                    <label>Preço:</label>
                    <input
                        type="text"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                    />
                    {errors.price && <div className="error">{errors.price}</div>}
                </div>

                <div>
                    <label>Quantidade:</label>
                    <input
                        type="number"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                    />
                    {errors.quantity && <div className="error">{errors.quantity}</div>}
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default CreateProduct;
