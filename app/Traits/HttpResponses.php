<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\MessageBag;

trait HttpResponses
{

    public function success(int $code, string $message = "", array|Model|bool $data = [])
    {
        return response()->json([
            'status' => $code,
            'message' =>$message,
            'data' => $data
        ], $code);

    }

    public function errors(int $code, string $message = "", array|MessageBag $errors = [], array $data = [])
    {
        return response()->json([
            'status' => $code,
            'message' =>$message,
            'data' => $data,
            'errors'=> $errors
        ], $code);

    }
}