<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Log;

class CachedProductRepository implements ProductRepositoryInterface
{
    protected ProductRepositoryInterface $repository;
    protected int $cacheTtl;

    public function __construct(ProductRepositoryInterface $repository, int $cacheTtl = 3600)
    {
        $this->repository = $repository;
        $this->cacheTtl = $cacheTtl;
    }

    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        $cacheKey = "products_page_{$perPage}_" . request('page', 1);
        Log::info("Consultando o cache para a chave: {$cacheKey}");
        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($perPage) {
            return $this->repository->paginate($perPage);
        });
    }

    public function findById(int $id): ?Product
    {
        $cacheKey = "product_{$id}";

        Log::info("Consultando o cache para a chave: {$cacheKey}");
        return Cache::remember($cacheKey, $this->cacheTtl, function () use ($id) {
            return $this->repository->findById($id);
        });
    }

    public function create(array $data): Product
    {
        $product = $this->repository->create($data);
        Cache::forget("products_page_10"); 
        return $product;
    }

    public function update(Product $product, array $data): bool
    {
        $result = $this->repository->update($product, $data);
        // Invalida o cache do item e de listagens
        Cache::forget("product_{$product->id}");
        Cache::forget("products_page_10");
        return $result;
    }

    public function delete(Product $product): bool
    {
        $result = $this->repository->delete($product);
        Cache::forget("product_{$product->id}");
        Cache::forget("products_page_10");
        return $result;
    }
}
