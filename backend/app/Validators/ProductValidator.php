<?php

namespace App\Validators;

use Illuminate\Support\Facades\Validator;
class ProductValidator
{
    public static function validate(array $data): array
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'quantity' => 'required|integer|min:0'
        ])->validate();
    }
}
