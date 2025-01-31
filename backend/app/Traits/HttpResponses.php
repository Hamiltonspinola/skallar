<?php
namespace App\Traits;
trait HttpResponses
{
    public function success(int $code, string $message = "", $data = [])
    {
        return response()->json([
            'status' => $code,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function errors(int $code, string $message = "", $errors = [], $data = [])
    {
        return response()->json([
            'status' => $code,
            'message' => $message,
            'data' => $data,
            'errors' => $errors
        ], $code);
    }
}
