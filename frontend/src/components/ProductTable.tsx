import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductTable = () => {
  // 🔥 useProducts sempre é chamado, sem alterações
  const { products, loading, page, setPage, totalPages, deleteProduct } = useProducts(10);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-lg font-semibold text-gray-500 animate-pulse">Carregando produtos...</p>
        </div>
      ) : (
        <>
          <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden">
            <div className='shadow-sm overflow-hidden my-8'>
              <div className="relative rounded-xl overflow-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Nome</th>
                      <th className="border p-2">Preço</th>
                      <th className="border p-2">Quantidade</th>
                      <th className="border p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id} className="text-center">
                          <td className="border p-2">{product.name}</td>
                          <td className="border p-2">R$ {parseFloat(product.price).toFixed(2)}</td>
                          <td className="border p-2">{product.quantity}</td>
                          <td className="border p-2">
                            <Link
                              to={`/edit/${product.id}`}
                              className="px-3 py-1 bg-blue-500 text-white rounded mx-1 hover:text-white"
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="px-3 py-1 text-white bg-red-500 rounded mx-1"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center p-4 text-gray-500">Nenhum produto encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 🔥 Paginação */}
          <div className="flex justify-center items-center my-4 gap-2">
            <button
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 bg-orange-500"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Anterior
            </button>

            <span className='text-white'>Página {page} de {totalPages}</span>

            <button
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 bg-orange-500"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Próxima ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};
