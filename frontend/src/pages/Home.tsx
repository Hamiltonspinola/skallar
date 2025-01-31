import { ProductTable } from '../components/ProductTable';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="w-5/6">
    <div className="flex flex-row gap-4">
      <img src="/images/bg_skallar.jpg" alt="Background" className="w-1/4 h-auto" />
    </div>
    <Link to="/create" className="inline-block px-4 py-2 my-4 text-white rounded bg-sky-500/50">Novo Produto</Link>

    <h1 className="text-xl font-bold text-white">Lista de Produtos</h1>
    <ProductTable />
  </div>
);
