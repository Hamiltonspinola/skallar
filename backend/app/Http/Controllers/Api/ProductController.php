<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateProductRequest;
use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Log;

class ProductController extends Controller
{
    use HttpResponses;

    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        return $this->success(201, "Dados obtidos",ProductResource::collection(Product::all()));
    }
    
    
    public function store(CreateProductRequest $request)
    {
        try {
            $product = $this->productService->create($request->validated());
            return $this->success(200, "Objeto criado", $product);
            
        } catch (\Exception $e) {
            return $this->errors(500, "Dados inválidos", ['exception' => $e->getMessage()]);
        }
    }
    
    public function show(string $id)
    {
        return $this->success(201, "Dados obtidos",ProductResource::make(Product::find($id)));
    }

    public function update(Request $request, string $id)
    {
        Log::info($request->all());
        $updated = Product::find($id)->update($request->all());
        if ($updated) {
            return $this->success(200, "Objeto atualizado", $updated);
        }
        return $this->error(422, "Objeto não atualizado", $updated);
    }

    public function destroy(string $id)
    {
        $deleted = Product::find($id)->delete();
        if ($deleted) {
            return $this->success(200, "Objeto excluido", $deleted);
        }
        return $this->error(422, "Objeto não excluido", ($deleted == null) ? "" : []);
    }
}
