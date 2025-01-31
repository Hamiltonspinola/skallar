import { ProductTable } from '../components/ProductTable';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="w-5/6 p-6 ">
    <h1 className="text-xl font-bold">Lista de Produtos</h1>
    <Link to="/create" className="inline-block px-4 py-2 my-4 text-white rounded bg-sky-500/50">Novo Produto</Link>
    <ProductTable />
  </div>
);
