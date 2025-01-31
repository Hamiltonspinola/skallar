<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use HttpResponses;

    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
{
    $perPage = (int) $request->query('per_page', 10);
    $products = $this->productService->getPaginatedProducts($perPage);

    return $this->success(
         200,
         "Produtos obtidos com sucesso!",
         $products
    );
}


    public function show(int $id)
    {
        $product = $this->productService->getProductById($id);

        if (!$product) {
            return $this->errors(404, "Produto não encontrado");
        }

        return $this->success(200, "Produto encontrado!", $product);
    }

    public function store(CreateProductRequest $request)
    {
        try {
            $product = $this->productService->create($request->validated());
            return $this->success(201, "Produto criado com sucesso!", $product);
        } catch (\Exception $e) {
            return $this->errors(500, "Erro ao criar o produto", ['exception' => $e->getMessage()]);
        }
    }

    public function update(Request $request, int $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->errors(404, "Produto não encontrado");
        }

        $updatedProduct = $this->productService->update($product, $request->all());
        return $this->success(200, "Produto atualizado com sucesso!", $updatedProduct);
    }

    public function destroy(int $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->errors(404, "Produto não encontrado");
        }

        $this->productService->delete($product);
        return $this->success(200, "Produto excluído com sucesso!");
    }
}
