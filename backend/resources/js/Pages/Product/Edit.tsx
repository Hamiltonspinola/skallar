import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { useParams, useNavigate } from "react-router-dom"; // Para capturar o ID da URL
import ProductService from "../../Services/productService";

const EditProduct = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate();

    const { data, setData, setDefaults, errors, reset } = useForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });

    const [loading, setLoading] = useState(true); // Indicador de carregamento
    const [serverError, setServerError] = useState(null); // Para erros do servidor

    // Carrega os dados do produto ao montar o componente
    useEffect(() => {
        ProductService.get(id)
            .then((response) => {
                const product = response.data; // Dados do produto
                setDefaults({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity,
                });
                setLoading(false); // Dados carregados
            })
            .catch((error) => {
                console.error("Erro ao carregar produto:", error);
                setServerError("Não foi possível carregar os dados do produto.");
            });
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        setServerError(null);

        try {
            const result = await ProductService.update(id, data);
            if (result.success) {
                alert("Produto atualizado com sucesso!");
                reset(); // Reseta o formulário
                navigate("/web/product"); // Redireciona para a listagem
            } else {
                setServerError(result.errors);
            }
        } catch (error) {
            console.error("Erro no servidor:", error);
            setServerError("Erro ao atualizar o produto. Tente novamente mais tarde.");
        }
    };

    if (loading) {
        return <p>Carregando...</p>; // Exibe uma mensagem enquanto os dados são carregados
    }

    return (
        <div>
            <h1>Editar Produto</h1>
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

export default EditProduct;
