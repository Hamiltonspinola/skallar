import { useProductContext } from "../../Store/productContext";

const ProductList = () => {
    const { products } = useProductContext();

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <a href="/web/product/create" className="btn btn-primary">+ Adicionar Produto</a>

            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            {product.name} - R$ {product.price} | 
                            <a href={`/web/product/edit/${product.id}`} className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25">
                                Editar
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há produtos cadastrados.</p>
            )}
        </div>
    );
};

export default ProductList;
