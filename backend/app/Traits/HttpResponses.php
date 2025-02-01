<?php
namespace App\Traits;

trait HttpResponses
{
    protected function baseResponse(int $code, string $message, $data = [], array $extra = [])
    {
        $response = array_merge([
            'status'    => $code,
            'message'   => $message,
            'data'      => $data,
            'timestamp' => now()->toIso8601String(),
        ], $extra);

        return response()->json($response, $code);
    }

    public function success(int $code, string $message = "", $data = [], array $extra = [])
    {
        return $this->baseResponse($code, $message, $data, $extra);
    }

    public function errors(int $code, string $message = "", $errors = [], $data = [], array $extra = [])
    {
        $extra = array_merge(['errors' => $errors], $extra);
        return $this->baseResponse($code, $message, $data, $extra);
    }
}
