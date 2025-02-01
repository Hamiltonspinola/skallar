import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductTable = () => {
  // 🔥 useProducts sempre é chamado, sem alterações
  const { products, loading, page, setPage, totalPages, deleteProduct } = useProducts(10);

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-lg font-semibold text-gray-500 animate-pulse">Carregando produtos...</p>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden not-prose bg-slate-50 rounded-xl">
            <div className='my-8 overflow-hidden shadow-sm'>
              <div className="relative overflow-auto rounded-xl">
                <table className="w-full border border-collapse border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-gray-900 ext-border">Nome</th>
                      <th className="p-2 text-gray-900 ext-border">Preço</th>
                      <th className="p-2 text-gray-900 ext-border">Quantidade</th>
                      <th className="p-2 text-gray-900 ext-border">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id} className="text-center">
                          <td className="p-2 text-gray-900 border">{product.name}</td>
                          <td className="p-2 text-gray-900 border">R$ {parseFloat(product.price).toFixed(2)}</td>
                          <td className="p-2 text-gray-900 border">{product.quantity}</td>
                          <td className="p-2 text-gray-900 border">
                            <Link
                              to={`/edit/${product.id}`}
                              className="px-3 py-1 mx-1 text-white bg-blue-500 rounded hover:text-white"
                            >
                              Editar
                            </Link>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="px-3 py-1 mx-1 text-white bg-red-500 rounded"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-gray-500">Nenhum produto encontrado.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 🔥 Paginação */}
          <div className="flex items-center justify-center gap-2 my-4">
            <button
              className="px-3 py-1 bg-gray-300 bg-orange-500 rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ⬅ Anterior
            </button>

            <span className='text-white'>Página {page} de {totalPages}</span>

            <button
              className="px-3 py-1 bg-gray-300 bg-orange-500 rounded disabled:opacity-50"
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
