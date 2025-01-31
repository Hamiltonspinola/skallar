type ProductFormProps = {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const ProductForm = ({ formData, onChange, onSubmit }: ProductFormProps) => {
  return (
    <form className="flex flex-col max-w-md gap-4 p-4 mx-auto" onSubmit={onSubmit}>
      <input className="p-2 border" name="name" placeholder="Nome" value={formData.name} onChange={onChange} />
      <input className="p-2 border" name="price" placeholder="Preço" value={formData.price} onChange={onChange} />
      <input className="p-2 border" name="quantity" placeholder="Quantidade" value={formData.quantity} onChange={onChange} />
      <textarea className="p-2 border" name="description" placeholder="Descrição" value={formData.description} onChange={onChange} />
      <button className="p-2 text-white bg-green-500 rounded">Salvar</button>
    </form>
  );
};
