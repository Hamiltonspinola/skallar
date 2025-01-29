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

    public function update(Request $request, string $id)
    {
        $updated = Product::find($id)->update($request->all());
        if($updated){
            return $this->success(200,"Objeto atualizado", $updated);
        }
        return $this->error(422,"Objeto não atualizado", $updated);
    }
    
    public function destroy(string $id)
    {
        $deleted = Product::find($id)->delete();
        if($deleted){
            return $this->success(200,"Objeto excluido", $deleted);
        }
        return $this->error(422,"Objeto não excluido", ($deleted == null) ? "" : []);
    }
}
