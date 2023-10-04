<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        return response()->json(['success' => [
            'token' => auth()->user()->createToken('authToken')->plainTextToken,
            'user'  => new UserResource(auth()->user())
        ]], Response::HTTP_OK);
    }

    public function register(RegisterRequest $request)
    {
        return response()->json(
            new UserResource(
                User::create([
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('password')),
                    'name' => $request->input('name'),
                    'surname' => $request->input('surname'),
                ])
            ),
            Response::HTTP_OK
        );
    }
}
