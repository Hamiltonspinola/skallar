<?php
namespace App\Services;

use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use App\Traits\HttpResponses;
use App\Validators\ProductValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductService
{
    use HttpResponses;
    public function getAllProducts()
    {
        try {
            $response = Http::get(url('/api/product'));

            if ($response->successful()) {
                return ProductResource::collection(Product::all());
            }
            return $this->errors($response->status(), "Erro ao buscar produtos", $response->throwIfClientError());
        } catch (\Exception $e) {
            return $this->errors(422, "Dados inválidos", $e);
        }
    }

    public function create(array $validatedData)
    {
        return Product::create($validatedData);
    }

    public function update(Product $product, array $validatedData)
    {
        $product->update($validatedData);
        return $product;
    }
}
