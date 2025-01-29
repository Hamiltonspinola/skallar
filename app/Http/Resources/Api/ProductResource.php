<?php
declare(strict_types=1);
namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Nome do produto' => $this->name,
            'Descrição do produto' => $this->description,
            'Preço do produto' => number_format($this->price, 2, ',', '.'),
            'Quantidade do produto' => $this->quantity
        ];
    }
}
