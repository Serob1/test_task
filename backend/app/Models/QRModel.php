<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QRModel extends Model
{
    use HasFactory;

    protected $table = 'qr_code';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'content',
        'background_color',
        'fill_color',
        'size'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($qr) {
            $qr->user_id = auth('sanctum')->user()->id;
        });
    }
}
