<?php
namespace App\Services;

use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Traits\HttpResponses;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    use HttpResponses;

    protected ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getPaginatedProducts(int $perPage = 10): array
    {
        $products = $this->productRepository->paginate($perPage);

        return [
            'items' => ProductResource::collection($products),
            'totalItems' => $products->total(),
            'totalPages' => $products->lastPage(),
            'currentPage' => $products->currentPage(),
            'perPage' => $products->perPage(),
        ];
    }

    public function getProductById(int $id): ?ProductResource
    {
        $product = $this->productRepository->findById($id);
        return $product ? new ProductResource($product) : null;
    }

    public function create(array $validatedData): ProductResource
    {
        $product = $this->productRepository->create($validatedData);
        return new ProductResource($product);
    }

    public function update(Product $product, array $validatedData): ProductResource
    {
        $this->productRepository->update($product, $validatedData);
        return new ProductResource($product);
    }

    public function delete(Product $product): bool
    {
        return $this->productRepository->delete($product);
    }
}
