<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QRResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'content'          => $this->content,
            'background_color' => $this->background_color,
            'fill_color'       => $this->fill_color,
            'size'             => $this->size
        ];
    }
}
