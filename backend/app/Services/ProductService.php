<?php

namespace App\Services;

use App\Http\Resources\Api\ProductResource;
use App\Repositories\ProductRepositoryInterface;

class ProductService
{
    protected ProductRepositoryInterface $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
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

    public function update($id, array $validatedData): ?ProductResource
    {
        $product = $this->productRepository->findById($id);
        if (!$product) {
            return null;
        }
        $this->productRepository->update($product, $validatedData);
        return new ProductResource($product);
    }

    public function delete($id): bool
    {
        $product = $this->productRepository->findById($id);
        return $this->productRepository->delete($product);
    }
}
