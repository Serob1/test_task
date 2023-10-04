<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function show()
    {
        return response()->json(
            new UserResource(auth('sanctum')->user()),
            Response::HTTP_OK
        );
    }
}