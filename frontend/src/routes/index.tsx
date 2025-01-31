import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { CreateProduct } from '../pages/CreateProduct';
import { EditProduct } from '../pages/EditProduct';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/edit/:id" element={<EditProduct />} />
    </Routes>
  </BrowserRouter>
);
