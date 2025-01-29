<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    use HttpResponses;
    public function index()
    {
        return ProductResource::collection(Product::all());
    }


    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'description' => 'required',
                'price' => 'required',
                'quantity' => 'required'
            ]
        );

        if ($validator->fails()) {
            return $this->errors(422, "Dados inválidos", $validator->errors());
        }
        
        $created = Product::create($validator->validated());
        return $this->success(200, "Objeto criado", $created);
    }

    public function show(string $id)
    {
        return ProductResource::make(Product::find($id));
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
