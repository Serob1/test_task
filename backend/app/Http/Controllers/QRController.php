<?php

namespace App\Http\Controllers;

use App\Http\Requests\QRRequest;
use App\Http\Resources\QRResource;
use App\Models\QRModel;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class QRController extends Controller
{
    public function index()
    {
        return response()->json(
            QRResource::collection(
                auth('sanctum')->user()->qrCodes()->orderBy('created_at', 'desc')->get()
            ),
            Response::HTTP_OK
        );
    }

    public function store(QRRequest $request)
    {
        return response()->json(
            QRModel::create($request->all()),
            Response::HTTP_NO_CONTENT
        );
    }
}
