import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductTable = () => {
  const { products, loading, deleteProduct } = useProducts();
  
  if (loading) return <p>Carregando...</p>;

  return (
    <table className="w-full border border-collapse border-gray-300 table-auto">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">Nome</th>
          <th className="p-2 border">Preço</th>
          <th className="p-2 border">Quantidade</th>
          <th className="p-2 border">Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="text-center">
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">{product.price}</td>
            <td className="p-2 border">{product.quantity}</td>
            <td className="p-2 space-x-2 border">
              <Link to={`/edit/${product.id}`} className="px-3 py-1 text-white bg-blue-500 rounded">Editar</Link>
              <button 
                onClick={() => deleteProduct(product.id)} 
                className="px-3 py-1 text-white bg-red-500 rounded"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
