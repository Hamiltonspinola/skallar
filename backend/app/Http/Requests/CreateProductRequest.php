<?php

namespace App\Http\Requests;

use App\Traits\HttpResponses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class CreateProductRequest extends FormRequest
{
    use HttpResponses;
    public function authorize(): bool
    {
        // return auth()->user() && auth()->user()->isAdmin();
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'quantity' => 'required|integer|min:0'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        return $this->errors(
            422,
            'Erro de validação.',
            $validator->errors(),
            []
            

        );
    }
}
